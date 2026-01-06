# Quick Drill Exercises (5-10 minutes each)

These short exercises are designed for daily practice. Do 1-2 per day for active recall.

---

## 🧮 Estimation Drills

### Drill E1: QPS Calculation (2 min)
**Problem:** An app has 50M DAU. Each user makes 20 requests/day. What's the average QPS? Peak QPS?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

```
Average QPS = 50M × 20 / 86,400 ≈ 11,500 QPS
Peak QPS = 11,500 × 3 ≈ 35,000 QPS
```
</details>

---

### Drill E2: Storage Estimation (3 min)
**Problem:** A messaging app stores messages for 1 year. 1B users send 10 messages/day. Average message: 200 bytes. How much storage?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

```
Daily messages = 1B × 10 = 10B messages
Daily storage = 10B × 200 bytes = 2 TB/day
Yearly storage = 2 TB × 365 = 730 TB
With 3x replication = ~2.2 PB
```
</details>

---

### Drill E3: Bandwidth Calculation (2 min)
**Problem:** A video site serves 1M videos/hour. Average video size: 50 MB. What's the bandwidth?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

```
1M videos/hour × 50 MB = 50 PB/hour
50 PB / 3600 sec ≈ 14 TB/sec ≈ 110 Tbps
```
</details>

---

### Drill E4: Cache Size (3 min)
**Problem:** An e-commerce site has 10M products. 80/20 rule: 20% of products get 80% of traffic. Each product page is 5KB. How big should the cache be?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

```
Hot products = 10M × 20% = 2M products
Cache size = 2M × 5KB = 10 GB

Note: This is a minimum. Add buffer: ~15-20 GB
```
</details>

---

### Drill E5: Database Sharding (3 min)
**Problem:** You have 500M users, each with 1KB of data. A single DB handles 1TB. How many shards needed?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

```
Total data = 500M × 1KB = 500 GB
With indexes/overhead (2x) = 1 TB
With 3x replication = 3 TB

Shards needed = 3TB / 1TB = 3 shards minimum
Recommended: 5-6 shards for headroom
```
</details>

---

## 🏗️ Architecture Drills

### Drill A1: Component Matching (2 min)
Match each scenario to the best technology:

| Scenario | Options |
|----------|---------|
| Session storage | A. PostgreSQL |
| User profiles (relational) | B. Elasticsearch |
| Full-text search | C. Redis |
| Real-time leaderboard | D. Cassandra |
| Time-series IoT data | E. S3 |
| Static file storage | F. MongoDB |

**Your answers:**
```

```

<details>
<summary>Solution</summary>

- Session storage → C. Redis (fast, TTL support)
- User profiles → A. PostgreSQL (relational, ACID)
- Full-text search → B. Elasticsearch
- Real-time leaderboard → C. Redis (sorted sets)
- Time-series IoT → D. Cassandra (write-optimized)
- Static files → E. S3 (object storage)
</details>

---

### Drill A2: Bottleneck Identification (3 min)
**Problem:** This system is slow. Identify the bottleneck:

```
[Users] → [LB] → [API Server (1 instance)] → [PostgreSQL Master] → [Read Replica]
                      ↓
                 [Redis Cache]
```

- Traffic: 10K req/sec
- API server CPU: 95%
- DB writes: 500/sec
- Cache hit rate: 80%

**Your answer (which component is the bottleneck?):**
```

```

<details>
<summary>Solution</summary>

**Bottleneck: API Server (1 instance)**

Reasons:
- CPU at 95% indicates saturation
- Single instance handling all 10K req/sec
- DB seems fine (only 500 writes/sec)
- Cache hit rate is good

**Fix:** Add more API server instances behind load balancer
</details>

---

### Drill A3: CAP Classification (2 min)
Classify each system as CP or AP:

| System | CP or AP? |
|--------|-----------|
| Bank account balance | |
| Social media likes count | |
| Shopping cart | |
| Flight booking inventory | |
| DNS | |

<details>
<summary>Solution</summary>

- Bank account → **CP** (must be accurate)
- Social media likes → **AP** (eventual consistency OK)
- Shopping cart → **AP** (availability > exact count)
- Flight booking → **CP** (can't oversell)
- DNS → **AP** (stale data OK for short time)
</details>

---

### Drill A4: Scaling Decision (3 min)
**Problem:** Your service needs to handle 100x current traffic. Current: 1 server, 100 req/sec. What do you add?

Choose all that apply:
- [ ] Add more servers
- [ ] Add load balancer
- [ ] Add database read replicas
- [ ] Add caching layer
- [ ] Shard the database

**Which order do you implement them?**
```

```

<details>
<summary>Solution</summary>

All apply. Order:
1. **Add caching layer** (quickest win, reduces DB load)
2. **Add load balancer** (prepare for multiple servers)
3. **Add more servers** (handle 10K req/sec)
4. **Add database read replicas** (handle read load)
5. **Shard database** (only if writes become bottleneck)

Reason: Start with least invasive changes first.
</details>

---

### Drill A5: Failure Scenario (3 min)
**Problem:** In this architecture, what happens if Redis fails?

```
[Client] → [API] → [Redis Cache] → [PostgreSQL]
```

Using cache-aside pattern.

**Your answer:**
```

```

<details>
<summary>Solution</summary>

**What happens:**
1. All requests become cache misses
2. All requests hit PostgreSQL directly
3. PostgreSQL may become overloaded
4. Latency increases significantly
5. System may degrade or fail

**Mitigation:**
- Use Redis Cluster/Sentinel for HA
- Add circuit breaker
- Implement graceful degradation
- Have DB connection pool limits
</details>

---

## 📊 Design Drills

### Drill D1: API Design (3 min)
Design REST endpoints for a blog with posts and comments.

**Your endpoints:**
```

```

<details>
<summary>Solution</summary>

```
# Posts
GET    /posts                 # List posts
GET    /posts/:id             # Get single post
POST   /posts                 # Create post
PUT    /posts/:id             # Update post
DELETE /posts/:id             # Delete post

# Comments (nested under posts)
GET    /posts/:id/comments    # List comments on post
POST   /posts/:id/comments    # Add comment to post
PUT    /comments/:id          # Update comment
DELETE /comments/:id          # Delete comment
```
</details>

---

### Drill D2: Schema Design (5 min)
Design a database schema for Uber (simplified): Users, Drivers, Rides.

**Your schema:**
```sql

```

<details>
<summary>Solution</summary>

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    license_number VARCHAR(50),
    vehicle_type VARCHAR(20),
    current_lat DECIMAL(10, 8),
    current_lng DECIMAL(11, 8),
    is_available BOOLEAN DEFAULT true
);

CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    driver_id INT REFERENCES drivers(id),
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    dropoff_lat DECIMAL(10, 8),
    dropoff_lng DECIMAL(11, 8),
    status VARCHAR(20), -- 'requested', 'accepted', 'in_progress', 'completed'
    fare DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_drivers_location ON drivers(current_lat, current_lng);
CREATE INDEX idx_rides_status ON rides(status);
```
</details>

---

### Drill D3: Cache Strategy (3 min)
**Problem:** You're caching user profiles. Which pattern and why?

Options:
- Cache-aside
- Write-through
- Write-behind
- Refresh-ahead

Given: Read:Write ratio is 100:1

**Your answer:**
```

```

<details>
<summary>Solution</summary>

**Best: Cache-aside**

Reasons:
- High read:write ratio (100:1) means most requests are reads
- Cache-aside only caches data that's actually requested
- Writes are infrequent, so we don't need write-through complexity
- Simple to implement and understand

Implementation:
1. Read: Check cache → if miss, read DB, write to cache
2. Write: Update DB → invalidate cache (let next read populate)
</details>

---

### Drill D4: Message Queue Choice (3 min)
Match the use case to the best queue:

| Use Case | Options |
|----------|---------|
| Simple background jobs | A. Kafka |
| Event streaming (100K/sec) | B. SQS |
| Exactly-once processing needed | C. RabbitMQ |
| Serverless, no ops | D. Redis (Bull) |

**Your answers:**
```

```

<details>
<summary>Solution</summary>

- Simple background jobs → **D. Redis (Bull)** - Simple, you probably have Redis
- Event streaming (100K/sec) → **A. Kafka** - Designed for high throughput
- Exactly-once processing → **C. RabbitMQ** - Better delivery guarantees
- Serverless, no ops → **B. SQS** - Fully managed AWS service
</details>

---

### Drill D5: Load Balancer Selection (2 min)
**Problem:** When to use Layer 4 vs Layer 7 load balancing?

**L4 scenario:**
```

```

**L7 scenario:**
```

```

<details>
<summary>Solution</summary>

**Layer 4 (Transport):**
- Simple TCP/UDP load balancing
- When you don't need to inspect content
- Gaming servers, database connections
- Maximum performance needed

**Layer 7 (Application):**
- Route based on URL path (/api vs /static)
- Route based on headers (mobile vs desktop)
- SSL termination at load balancer
- Sticky sessions based on cookies
- A/B testing, canary deployments
</details>

---

## 🔥 Speed Drills

### Speed Drill S1: Numbers Recall (1 min)
Fill in from memory:

| What | Latency |
|------|---------|
| L1 cache | |
| Main memory | |
| SSD random read | |
| HDD seek | |
| Datacenter RTT | |
| Cross-continent RTT | |

<details>
<summary>Solution</summary>

| What | Latency |
|------|---------|
| L1 cache | 0.5 ns |
| Main memory | 100 ns |
| SSD random read | 150 μs |
| HDD seek | 10 ms |
| Datacenter RTT | 0.5 ms |
| Cross-continent RTT | 150 ms |
</details>

---

### Speed Drill S2: Powers of Two (1 min)
Fill in:

| Power | Value |
|-------|-------|
| 2^10 | |
| 2^20 | |
| 2^30 | |
| 2^40 | |

<details>
<summary>Solution</summary>

| Power | Value |
|-------|-------|
| 2^10 | ~1,000 (1 KB) |
| 2^20 | ~1 million (1 MB) |
| 2^30 | ~1 billion (1 GB) |
| 2^40 | ~1 trillion (1 TB) |
</details>

---

### Speed Drill S3: Time Conversions (1 min)
Fill in:

| Time | Seconds |
|------|---------|
| 1 day | |
| 1 month | |
| 1 year | |

<details>
<summary>Solution</summary>

| Time | Seconds |
|------|---------|
| 1 day | ~100,000 (86,400) |
| 1 month | ~2.5 million |
| 1 year | ~30 million |
</details>

---

### Speed Drill S4: Request Rate (1 min)
If you have 1 req/sec, how many per month?

**Your answer:**
```

```

<details>
<summary>Solution</summary>

1 req/sec × 2.5M sec/month = **2.5 million requests/month**

Quick rule: 1 req/sec ≈ 2.5M req/month
</details>

---

## 📅 Weekly Drill Schedule

| Day | Drills | Time |
|-----|--------|------|
| Monday | E1, A1, S1 | 5 min |
| Tuesday | E2, A2, D1 | 10 min |
| Wednesday | E3, A3, S2 | 5 min |
| Thursday | E4, A4, D2 | 10 min |
| Friday | E5, A5, D3 | 10 min |
| Saturday | D4, D5, S3, S4 | 10 min |
| Sunday | Review missed drills | 10 min |

---

## Progress Tracker

| Drill | Date Completed | Time Taken | Correct? |
|-------|----------------|------------|----------|
| E1 | | | |
| E2 | | | |
| E3 | | | |
| E4 | | | |
| E5 | | | |
| A1 | | | |
| A2 | | | |
| A3 | | | |
| A4 | | | |
| A5 | | | |
| D1 | | | |
| D2 | | | |
| D3 | | | |
| D4 | | | |
| D5 | | | |
| S1 | | | |
| S2 | | | |
| S3 | | | |
| S4 | | | |
