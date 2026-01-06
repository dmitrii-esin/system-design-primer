# Week 4: Caching Strategies

## Why Cache?

- **Reduce latency** - Memory access ~100x faster than disk
- **Reduce database load** - Absorb traffic spikes
- **Handle hot data** - Popular items don't hit DB

## Caching Layers

```
[Client Browser Cache]
         ↓
    [CDN Cache]
         ↓
  [Web Server Cache]
         ↓
 [Application Cache] ← Redis/Memcached
         ↓
  [Database Cache]
         ↓
    [Database]
```

### 1. Client Caching

Browser and OS cache.

**HTTP Cache Headers:**
```http
Cache-Control: max-age=3600, public
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
```

**Types:**
- Browser cache
- HTTP cache (controlled by headers)
- Application state (localStorage, IndexedDB)

### 2. CDN Caching

See Week 2 - Content Delivery Network.

- Cache static assets at edge locations
- Controlled by Cache-Control headers and CDN rules
- TTL-based expiration

### 3. Web Server Caching

Reverse proxies can cache responses.

**Varnish/NGINX caching:**
- Cache entire HTTP responses
- Serve cached content without hitting app server
- URL-based cache keys

### 4. Database Caching

Built into most databases.

- Query cache (MySQL, deprecated in 8.0)
- Buffer pool (InnoDB)
- Shared buffers (PostgreSQL)

**Tuning:** Adjust memory allocation for cache

### 5. Application Caching

In-memory stores between app and database.

```
[App] → [Redis/Memcached] → [Database]
```

**Redis vs Memcached:**

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data structures | Rich (lists, sets, hashes) | Simple strings |
| Persistence | Yes (optional) | No |
| Replication | Yes | No |
| Clustering | Yes | Client-side |
| Use case | Feature-rich caching | Simple high-performance |

---

## What to Cache

### Database Query Level

Cache the result of database queries.

```javascript
// Cache key = hash of query
const key = hash("SELECT * FROM users WHERE id = 123");
const result = await cache.get(key) || await db.query(...);
```

**Problems:**
- Hard to invalidate with complex queries
- One cell change → invalidate many cached queries

### Object Level (Recommended)

Cache assembled objects/entities.

```javascript
// Cache the user object, not the query
const user = await cache.get(`user:${userId}`) 
  || await assembleUserFromDB(userId);
```

**What to cache as objects:**
- User sessions
- Fully rendered pages
- Activity streams
- User profile data
- Computed results

---

## Cache Update Strategies

### 1. Cache-Aside (Lazy Loading)

**Application manages cache directly.**

```javascript
async function getUser(userId) {
  // 1. Check cache
  let user = await cache.get(`user:${userId}`);
  
  if (!user) {
    // 2. Cache miss - load from DB
    user = await db.query('SELECT * FROM users WHERE id = ?', userId);
    
    // 3. Store in cache
    if (user) {
      await cache.set(`user:${userId}`, user, { ttl: 3600 });
    }
  }
  
  return user;
}
```

**Flow:**
```
Read: App → Cache (miss) → DB → Cache (store) → App
Write: App → DB (cache not updated automatically)
```

**Pros:**
- Only requested data is cached
- Cache failures don't break the system
- Simple to implement

**Cons:**
- Cache miss = 3 round trips
- Data can become stale
- Need TTL or manual invalidation

### 2. Write-Through

**Cache is updated on every write.**

```javascript
async function updateUser(userId, data) {
  // 1. Update database
  await db.query('UPDATE users SET ? WHERE id = ?', data, userId);
  
  // 2. Update cache (synchronously)
  await cache.set(`user:${userId}`, { ...existingUser, ...data });
}
```

**Flow:**
```
Write: App → Cache → DB (synchronous)
Read: App → Cache (usually hit)
```

**Pros:**
- Cache always has latest data
- Subsequent reads are fast

**Cons:**
- Write latency (must update both)
- Most written data may never be read
- New nodes start with empty cache

### 3. Write-Behind (Write-Back)

**Write to cache, async write to DB.**

```javascript
async function updateUser(userId, data) {
  // 1. Update cache immediately
  await cache.set(`user:${userId}`, data);
  
  // 2. Queue async write to DB
  await queue.push({ type: 'UPDATE_USER', userId, data });
}

// Background worker
async function processQueue() {
  const job = await queue.pop();
  await db.query('UPDATE users SET ? WHERE id = ?', job.data, job.userId);
}
```

**Flow:**
```
Write: App → Cache → Return (DB updated async)
```

**Pros:**
- Fast writes
- Batching possible
- Good for write-heavy workloads

**Cons:**
- Data loss risk if cache fails before DB write
- Complexity
- Eventual consistency

### 4. Refresh-Ahead

**Proactively refresh before expiration.**

```javascript
// Cache entry with TTL of 60s
// At 50s (before expiration), refresh in background

async function get(key) {
  const entry = await cache.getWithMeta(key);
  
  if (entry.ttlRemaining < 10) { // 10s threshold
    // Trigger async refresh
    refreshInBackground(key);
  }
  
  return entry.value;
}
```

**Flow:**
```
Read: App → Cache (hit, triggers background refresh if near expiry)
```

**Pros:**
- Reduced latency (no cache miss)
- Fresh data

**Cons:**
- Wasted refreshes if data not accessed again
- Complexity in predicting access patterns

---

## Strategy Comparison

| Strategy | Write Latency | Read Latency | Consistency | Complexity |
|----------|--------------|--------------|-------------|------------|
| Cache-Aside | Fast | Miss: Slow | Eventual | Low |
| Write-Through | Slow | Fast | Strong | Medium |
| Write-Behind | Fast | Fast | Eventual | High |
| Refresh-Ahead | N/A | Fast | Eventual | High |

### Common Combinations

1. **Cache-Aside + TTL** - Simple, good for most cases
2. **Write-Through + Cache-Aside** - Handle cold starts
3. **Write-Behind + Refresh-Ahead** - High performance, complex

---

## Cache Invalidation

> "There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton

### Strategies

**1. TTL (Time To Live)**
```javascript
await cache.set(key, value, { ttl: 3600 }); // 1 hour
```

**2. Event-based Invalidation**
```javascript
// On user update
await cache.delete(`user:${userId}`);
await cache.delete(`user:${userId}:profile`);
```

**3. Version-based Keys**
```javascript
const version = await cache.get('user_schema_version'); // e.g., "v3"
const key = `user:${userId}:${version}`;
```

**4. Pub/Sub Invalidation**
```javascript
// Publisher
redis.publish('cache_invalidate', `user:${userId}`);

// Subscriber (all app servers)
redis.subscribe('cache_invalidate', (key) => {
  localCache.delete(key);
});
```

---

## Cache Problems

### 1. Cache Stampede

Many requests hit DB simultaneously on cache miss.

**Solution - Locking:**
```javascript
async function getWithLock(key) {
  let value = await cache.get(key);
  if (value) return value;
  
  // Try to acquire lock
  const lock = await cache.set(`lock:${key}`, 1, { nx: true, ttl: 10 });
  
  if (lock) {
    // Got lock - fetch from DB
    value = await db.query(...);
    await cache.set(key, value);
    await cache.delete(`lock:${key}`);
  } else {
    // Wait and retry
    await sleep(100);
    return getWithLock(key);
  }
  
  return value;
}
```

### 2. Hot Key

Single key gets too many requests.

**Solutions:**
- Local caching in app
- Replicate hot keys across shards
- Add random suffix: `hot_key:${random(1,10)}`

### 3. Cache Penetration

Queries for non-existent data always miss.

**Solution - Cache null:**
```javascript
if (!value) {
  await cache.set(key, NULL_MARKER, { ttl: 300 });
}
```

---

## Node.js Implementation Example

```javascript
const Redis = require('ioredis');
const redis = new Redis();

class CacheAside {
  constructor(options = {}) {
    this.defaultTTL = options.ttl || 3600;
  }

  async get(key, fetchFn) {
    // Try cache first
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss - fetch from source
    const value = await fetchFn();
    
    if (value !== null && value !== undefined) {
      await redis.setex(key, this.defaultTTL, JSON.stringify(value));
    }

    return value;
  }

  async invalidate(key) {
    await redis.del(key);
  }

  async invalidatePattern(pattern) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}

// Usage
const cache = new CacheAside({ ttl: 3600 });

const user = await cache.get(`user:${userId}`, async () => {
  return db.query('SELECT * FROM users WHERE id = ?', userId);
});
```

---

## Study Checklist

- [ ] Can explain all 5 caching layers
- [ ] Understand Cache-Aside pattern deeply
- [ ] Know trade-offs of each update strategy
- [ ] Can implement cache-aside in Node.js
- [ ] Understand cache invalidation challenges
- [ ] Know solutions for stampede, hot keys, penetration

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| Cache-Aside | App checks cache, loads from DB on miss, stores in cache |
| Write-Through | Write to cache, cache writes to DB synchronously |
| Write-Behind | Write to cache, async write to DB later |
| Refresh-Ahead | Proactively refresh cache before expiration |
| Cache Stampede | Many requests hit DB simultaneously on cache miss |
| Cache Penetration | Queries for non-existent data always bypass cache |
| TTL | Time To Live - automatic cache expiration |
| Redis | In-memory data structure store with persistence |
| Memcached | Simple high-performance distributed cache |
