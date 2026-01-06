# Practical Exercise 4: Implement Cache-Aside Pattern

## Objective

Implement a cache-aside pattern in Node.js with Redis.

## Prerequisites

- Node.js installed
- Redis running locally (`redis-server` or Docker)
- Basic understanding of async/await

## Instructions

### Part 1: Setup

Create a new directory and initialize:

```bash
mkdir cache-aside-exercise
cd cache-aside-exercise
npm init -y
npm install ioredis pg
```

### Part 2: Basic Implementation

Create `cache.js`:

```javascript
const Redis = require('ioredis');
const redis = new Redis();

class CacheAside {
  constructor(options = {}) {
    this.defaultTTL = options.ttl || 3600; // 1 hour default
    this.prefix = options.prefix || '';
  }

  /**
   * Get value from cache, or fetch from source if not cached
   * @param {string} key - Cache key
   * @param {function} fetchFn - Async function to fetch data if cache miss
   * @param {number} ttl - Optional TTL override
   * @returns {Promise<any>}
   */
  async get(key, fetchFn, ttl = this.defaultTTL) {
    const cacheKey = this.prefix + key;
    
    // TODO: Implement cache-aside logic
    // 1. Try to get from cache
    // 2. If cache hit, return parsed value
    // 3. If cache miss, call fetchFn
    // 4. Store result in cache with TTL
    // 5. Return result
  }

  /**
   * Invalidate a cache entry
   * @param {string} key - Cache key to invalidate
   */
  async invalidate(key) {
    // TODO: Implement invalidation
  }

  /**
   * Invalidate multiple keys matching a pattern
   * @param {string} pattern - Redis key pattern (e.g., "user:*")
   */
  async invalidatePattern(pattern) {
    // TODO: Implement pattern-based invalidation
  }
}

module.exports = CacheAside;
```

### Part 3: Your Implementation

Fill in the TODO sections above. Here's a reference implementation to check against after attempting:

<details>
<summary>Click to reveal reference implementation</summary>

```javascript
const Redis = require('ioredis');
const redis = new Redis();

class CacheAside {
  constructor(options = {}) {
    this.defaultTTL = options.ttl || 3600;
    this.prefix = options.prefix || '';
  }

  async get(key, fetchFn, ttl = this.defaultTTL) {
    const cacheKey = this.prefix + key;
    
    // 1. Try to get from cache
    const cached = await redis.get(cacheKey);
    
    // 2. Cache hit - return parsed value
    if (cached !== null) {
      console.log(`Cache HIT: ${cacheKey}`);
      return JSON.parse(cached);
    }
    
    // 3. Cache miss - fetch from source
    console.log(`Cache MISS: ${cacheKey}`);
    const value = await fetchFn();
    
    // 4. Store in cache (only if value exists)
    if (value !== null && value !== undefined) {
      await redis.setex(cacheKey, ttl, JSON.stringify(value));
    }
    
    // 5. Return result
    return value;
  }

  async invalidate(key) {
    const cacheKey = this.prefix + key;
    await redis.del(cacheKey);
    console.log(`Invalidated: ${cacheKey}`);
  }

  async invalidatePattern(pattern) {
    const keys = await redis.keys(this.prefix + pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`Invalidated ${keys.length} keys matching: ${pattern}`);
    }
  }
}

module.exports = CacheAside;
```

</details>

### Part 4: Usage Example

Create `app.js`:

```javascript
const CacheAside = require('./cache');

// Simulated database
const db = {
  users: {
    1: { id: 1, name: 'Alice', email: 'alice@example.com' },
    2: { id: 2, name: 'Bob', email: 'bob@example.com' },
  },
  
  async getUser(id) {
    // Simulate database latency
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users[id] || null;
  },
  
  async updateUser(id, data) {
    await new Promise(resolve => setTimeout(resolve, 50));
    this.users[id] = { ...this.users[id], ...data };
    return this.users[id];
  }
};

// Initialize cache
const cache = new CacheAside({ 
  ttl: 300,  // 5 minutes
  prefix: 'myapp:'
});

// User service with caching
const userService = {
  async getUser(id) {
    return cache.get(`user:${id}`, () => db.getUser(id));
  },
  
  async updateUser(id, data) {
    const user = await db.updateUser(id, data);
    // Invalidate cache after update
    await cache.invalidate(`user:${id}`);
    return user;
  }
};

// Test the implementation
async function main() {
  console.log('=== First request (cache miss) ===');
  console.time('First request');
  const user1 = await userService.getUser(1);
  console.timeEnd('First request');
  console.log(user1);
  
  console.log('\n=== Second request (cache hit) ===');
  console.time('Second request');
  const user1Again = await userService.getUser(1);
  console.timeEnd('Second request');
  console.log(user1Again);
  
  console.log('\n=== Update user (invalidates cache) ===');
  await userService.updateUser(1, { name: 'Alice Updated' });
  
  console.log('\n=== Third request (cache miss after invalidation) ===');
  console.time('Third request');
  const user1Updated = await userService.getUser(1);
  console.timeEnd('Third request');
  console.log(user1Updated);
  
  process.exit(0);
}

main().catch(console.error);
```

### Part 5: Run and Verify

```bash
# Make sure Redis is running
redis-server &

# Run the app
node app.js
```

**Expected output:**
```
=== First request (cache miss) ===
Cache MISS: myapp:user:1
First request: ~100ms
{ id: 1, name: 'Alice', email: 'alice@example.com' }

=== Second request (cache hit) ===
Cache HIT: myapp:user:1
Second request: ~1ms
{ id: 1, name: 'Alice', email: 'alice@example.com' }

=== Update user (invalidates cache) ===
Invalidated: myapp:user:1

=== Third request (cache miss after invalidation) ===
Cache MISS: myapp:user:1
Third request: ~100ms
{ id: 1, name: 'Alice Updated', email: 'alice@example.com' }
```

---

## Part 6: Advanced Challenges

### Challenge 1: Cache Stampede Prevention

Implement locking to prevent multiple simultaneous cache misses:

```javascript
async getWithLock(key, fetchFn, ttl) {
  // TODO: Implement with Redis SETNX for locking
  // 1. Check cache
  // 2. If miss, try to acquire lock
  // 3. If got lock, fetch and set cache
  // 4. If didn't get lock, wait and retry
}
```

<details>
<summary>Hint</summary>

Use Redis `SET key value NX PX timeout` to atomically set a lock with expiration.

</details>

### Challenge 2: Batch Operations

Implement batch get with caching:

```javascript
async getMany(keys, fetchManyFn) {
  // TODO: Implement batch get
  // 1. MGET all keys from cache
  // 2. Identify cache misses
  // 3. Fetch missing from database
  // 4. Store fetched in cache
  // 5. Return all results in order
}
```

### Challenge 3: Cache Null Values

Handle the cache penetration problem:

```javascript
// When database returns null, cache a marker
const NULL_MARKER = '__NULL__';

async getWithNullCache(key, fetchFn, ttl) {
  // TODO: Implement null caching
  // Cache null results with shorter TTL to prevent
  // repeated database queries for non-existent data
}
```

---

## Reflection Questions

1. Why is cache-aside also called "lazy loading"?
2. What happens if the cache server goes down?
3. How would you handle cache invalidation across multiple app servers?
4. What's the trade-off between cache TTL and data freshness?

## Checklist

- [ ] Implemented basic cache-aside pattern
- [ ] Tested cache hit vs miss performance
- [ ] Implemented cache invalidation
- [ ] Verified invalidation works after updates
- [ ] (Bonus) Implemented stampede prevention
- [ ] (Bonus) Implemented batch operations
- [ ] Can explain the pattern in an interview
