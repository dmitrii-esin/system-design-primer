# Self-Quiz Questions

Test your knowledge after each week. Try to answer without looking at notes first.

---

## Week 1: Core Concepts

### Quiz Questions

**Q1:** What is the difference between a performance problem and a scalability problem?

<details>
<summary>Answer</summary>

- **Performance problem:** System is slow for a single user
- **Scalability problem:** System is fast for one user but slow under heavy load
</details>

---

**Q2:** Explain CAP theorem. Why can you only have 2 of 3?

<details>
<summary>Answer</summary>

CAP = Consistency, Availability, Partition Tolerance

In a distributed system, network partitions WILL happen. When they do, you must choose:
- **CP:** Reject requests until partition heals (consistent but unavailable)
- **AP:** Serve potentially stale data (available but inconsistent)

You can't have both: if network splits, you either wait (C) or serve stale data (A).
</details>

---

**Q3:** What's the difference between eventual and strong consistency?

<details>
<summary>Answer</summary>

- **Strong:** Reads always return the most recent write (synchronous replication)
- **Eventual:** Reads may return stale data temporarily, but will converge (async replication)

Strong: Banking transactions
Eventual: Social media likes, DNS
</details>

---

**Q4:** Calculate availability: Two services in sequence, each 99.9% available. Combined availability?

<details>
<summary>Answer</summary>

In sequence: multiply availabilities
99.9% × 99.9% = 99.8% (0.999 × 0.999 = 0.998)
</details>

---

**Q5:** What's "five nines" availability in downtime per year?

<details>
<summary>Answer</summary>

99.999% = ~5 minutes downtime per year
</details>

---

## Week 2: Infrastructure

### Quiz Questions

**Q1:** What's the difference between Push CDN and Pull CDN?

<details>
<summary>Answer</summary>

- **Push:** You upload content to CDN proactively. Better for small, rarely changing sites.
- **Pull:** CDN fetches from origin on first request, then caches. Better for high-traffic, dynamic sites.
</details>

---

**Q2:** When would you use Layer 4 vs Layer 7 load balancing?

<details>
<summary>Answer</summary>

- **Layer 4 (Transport):** Simple TCP/UDP routing, maximum performance, gaming servers
- **Layer 7 (Application):** Route by URL/headers, SSL termination, A/B testing, sticky sessions
</details>

---

**Q3:** What's the difference between a reverse proxy and a load balancer?

<details>
<summary>Answer</summary>

- **Reverse proxy:** Sits in front of servers, provides security, caching, SSL termination. Works with single server.
- **Load balancer:** Distributes traffic across multiple servers. Always involves multiple backends.

A load balancer IS a reverse proxy, but a reverse proxy isn't always a load balancer.
</details>

---

**Q4:** Name 3 benefits of microservices and 2 drawbacks.

<details>
<summary>Answer</summary>

Benefits:
1. Independent deployment
2. Scale services independently
3. Technology flexibility per service

Drawbacks:
1. Network latency between services
2. Operational complexity
3. Distributed system challenges (consistency, debugging)
</details>

---

**Q5:** What is service discovery and why is it needed?

<details>
<summary>Answer</summary>

Service discovery lets services find each other dynamically without hardcoded IPs.

Needed because:
- Services can move (containers, auto-scaling)
- IPs change
- Instances come and go

Tools: Consul, etcd, Kubernetes DNS
</details>

---

## Week 3: Databases

### Quiz Questions

**Q1:** What are the ACID properties?

<details>
<summary>Answer</summary>

- **A**tomicity: All or nothing (transaction either completes fully or rolls back)
- **C**onsistency: Valid state to valid state (constraints maintained)
- **I**solation: Concurrent transactions don't interfere
- **D**urability: Committed data survives crashes
</details>

---

**Q2:** When would you use sharding vs federation?

<details>
<summary>Answer</summary>

- **Federation:** Split by function/domain (users DB, products DB, orders DB). Use when different data types have different access patterns.

- **Sharding:** Split same data across nodes by key (users A-M, users N-Z). Use when single table is too large.
</details>

---

**Q3:** List 4 types of NoSQL databases with one use case each.

<details>
<summary>Answer</summary>

1. **Key-Value (Redis):** Session storage, caching
2. **Document (MongoDB):** User profiles, content management
3. **Wide Column (Cassandra):** Time-series, IoT data
4. **Graph (Neo4j):** Social networks, recommendation engines
</details>

---

**Q4:** When would you choose SQL over NoSQL?

<details>
<summary>Answer</summary>

Choose SQL when:
- Need complex JOINs
- ACID transactions required
- Clear, structured schema
- Strong consistency needed
- Relational data model fits well
</details>

---

**Q5:** What is denormalization and when do you use it?

<details>
<summary>Answer</summary>

Denormalization = adding redundant data to avoid JOINs.

Use when:
- Read:Write ratio > 10:1
- Queries are slow due to JOINs
- Can tolerate stale data
- Write complexity is acceptable
</details>

---

## Week 4: Caching

### Quiz Questions

**Q1:** Explain the cache-aside pattern.

<details>
<summary>Answer</summary>

1. App checks cache first
2. If hit: return cached data
3. If miss: read from DB
4. Store result in cache
5. Return data

App is responsible for cache management. Also called "lazy loading."
</details>

---

**Q2:** What's the difference between write-through and write-behind?

<details>
<summary>Answer</summary>

- **Write-through:** Write to cache AND DB synchronously. Strong consistency, slower writes.
- **Write-behind:** Write to cache, async write to DB. Fast writes, risk of data loss.
</details>

---

**Q3:** What is a cache stampede and how do you prevent it?

<details>
<summary>Answer</summary>

Cache stampede = many requests hit DB simultaneously when popular cache key expires.

Prevention:
- Locking (only one request fetches from DB)
- Early expiration/refresh-ahead
- Staggered TTLs
- Background refresh
</details>

---

**Q4:** Redis vs Memcached: when to use each?

<details>
<summary>Answer</summary>

**Redis:**
- Need data structures (lists, sets, sorted sets)
- Need persistence
- Need replication
- Feature-rich caching

**Memcached:**
- Simple key-value only
- Maximum simplicity
- Pure caching (no persistence needed)
</details>

---

**Q5:** What is cache penetration and how do you solve it?

<details>
<summary>Answer</summary>

Cache penetration = queries for non-existent data always miss cache and hit DB.

Solution: Cache null values with short TTL
```javascript
if (!data) cache.set(key, NULL_MARKER, 300);
```
</details>

---

## Week 5: Async Processing

### Quiz Questions

**Q1:** What are the three delivery guarantees in message queues?

<details>
<summary>Answer</summary>

1. **At-most-once:** May lose messages (fire and forget)
2. **At-least-once:** Messages delivered 1+ times (may duplicate)
3. **Exactly-once:** Each message delivered exactly once (hardest to achieve)
</details>

---

**Q2:** What is back pressure and why is it important?

<details>
<summary>Answer</summary>

Back pressure = protecting system when queue grows faster than consumers can process.

Important because:
- Queue can exhaust memory
- System can crash
- Need graceful degradation

Solutions: Rate limiting, queue size limits, 503 responses
</details>

---

**Q3:** RPC vs REST: when to use each?

<details>
<summary>Answer</summary>

**RPC (gRPC):**
- Internal microservices communication
- High performance needed
- Tight coupling acceptable
- Binary protocol (faster)

**REST:**
- Public APIs
- Browser clients
- Loose coupling needed
- HTTP caching beneficial
</details>

---

**Q4:** TCP vs UDP: give one use case for each.

<details>
<summary>Answer</summary>

**TCP:** Web requests, file transfers, email (reliability matters)
**UDP:** Video streaming, VoIP, gaming (speed matters, loss is tolerable)
</details>

---

**Q5:** Explain exponential backoff.

<details>
<summary>Answer</summary>

Retry with increasing delays: 1s, 2s, 4s, 8s...

Why:
- Avoid overwhelming failing service
- Allow time for recovery
- Spread out retry storms

Add jitter (randomness) to prevent synchronized retries.
</details>

---

## Week 6: Interview Framework

### Quiz Questions

**Q1:** What are the 4 steps of the system design interview?

<details>
<summary>Answer</summary>

1. **Requirements** (5-10 min): Clarify scope, constraints, scale
2. **High-Level Design** (10-15 min): Draw major components
3. **Core Components** (10-15 min): APIs, data model, algorithms
4. **Scale & Bottlenecks** (10-15 min): Identify and address scaling issues
</details>

---

**Q2:** How do you convert DAU to QPS?

<details>
<summary>Answer</summary>

QPS = (DAU × actions_per_user) / 86,400

Example: 10M DAU, 10 actions each
QPS = (10M × 10) / 86,400 ≈ 1,160 req/sec

Peak = Average × 3
</details>

---

**Q3:** Quick estimation: 1 req/sec = how many per month?

<details>
<summary>Answer</summary>

~2.5 million requests per month

(1 × 60 × 60 × 24 × 30 = 2,592,000)
</details>

---

**Q4:** What should you discuss in Step 4 (Scale)?

<details>
<summary>Answer</summary>

1. Identify bottlenecks
2. Add caching
3. Database scaling (replicas, sharding)
4. Horizontal scaling
5. Async processing
6. Failure scenarios and mitigation
</details>

---

**Q5:** Name 3 "do's" and 3 "don'ts" for system design interviews.

<details>
<summary>Answer</summary>

**Do's:**
1. Think out loud
2. Ask clarifying questions
3. Start simple, then iterate

**Don'ts:**
1. Dive into details too early
2. Skip estimation
3. Ignore the interviewer (it's a conversation)
</details>

---

## Week 7: Security & API Design

### Quiz Questions

**Q1:** JWT vs Session: pros and cons of each?

<details>
<summary>Answer</summary>

**JWT:**
- ✅ Stateless (no server storage)
- ✅ Works across services
- ❌ Can't revoke until expiry
- ❌ Larger payload size

**Session:**
- ✅ Easy to revoke (delete session)
- ✅ Simple implementation
- ❌ Requires server storage
- ❌ Doesn't scale easily
</details>

---

**Q2:** What HTTP status code for: rate limited, not authenticated, validation error?

<details>
<summary>Answer</summary>

- Rate limited: **429** Too Many Requests
- Not authenticated: **401** Unauthorized
- Validation error: **422** Unprocessable Entity (or 400 Bad Request)
</details>

---

**Q3:** What is idempotency and why does it matter for APIs?

<details>
<summary>Answer</summary>

Idempotency = same request produces same result when repeated.

Matters because:
- Network can retry requests
- Client can retry on timeout
- Prevents duplicate actions (double payments)

GET, PUT, DELETE are idempotent. POST is not (by default).
</details>

---

**Q4:** Cursor pagination vs offset pagination: when to use each?

<details>
<summary>Answer</summary>

**Offset:** Simple, allows jumping to any page. Bad for large datasets (slow at high offsets).

**Cursor:** Efficient for large datasets, consistent results. Can't jump to arbitrary page.

Use cursor for infinite scroll, offset for page numbers.
</details>

---

**Q5:** What does an API Gateway do? Name 4 responsibilities.

<details>
<summary>Answer</summary>

1. Authentication/authorization
2. Rate limiting
3. Request routing
4. SSL termination
5. Caching
6. Request/response transformation
7. Logging and monitoring
</details>

---

## Week 8: Rate Limiting & Monitoring

### Quiz Questions

**Q1:** Explain the token bucket algorithm.

<details>
<summary>Answer</summary>

- Bucket holds tokens (capacity)
- Tokens refill at fixed rate
- Each request consumes 1 token
- If no tokens, reject request

Allows controlled bursts up to bucket capacity.
</details>

---

**Q2:** What are the three pillars of observability?

<details>
<summary>Answer</summary>

1. **Metrics:** Numeric measurements over time (Prometheus)
2. **Logs:** Event records with context (ELK Stack)
3. **Traces:** Request flow across services (Jaeger)
</details>

---

**Q3:** What's the difference between p50, p95, and p99 latency?

<details>
<summary>Answer</summary>

- **p50 (median):** 50% of requests faster than this
- **p95:** 95% of requests faster than this
- **p99:** 99% of requests faster than this

Use percentiles instead of averages because averages hide outliers.
</details>

---

**Q4:** SLI vs SLO vs SLA: explain each.

<details>
<summary>Answer</summary>

- **SLI (Indicator):** The metric (e.g., request latency)
- **SLO (Objective):** Target for the metric (e.g., p99 < 200ms)
- **SLA (Agreement):** Contract with consequences (e.g., 99.9% or refund)
</details>

---

**Q5:** Explain the circuit breaker pattern.

<details>
<summary>Answer</summary>

Prevents cascade failures by failing fast.

States:
- **CLOSED:** Normal, requests pass through
- **OPEN:** Failures exceeded threshold, reject all requests
- **HALF-OPEN:** After timeout, test with limited requests

If test succeeds → CLOSED
If test fails → OPEN
</details>

---

## Scoring Guide

For each week:
- **5/5:** Ready to move on
- **4/5:** Review missed concept
- **3/5:** Re-study the week
- **≤2/5:** Spend more time with Anki + notes

| Week | Score | Date | Notes |
|------|-------|------|-------|
| 1 | /5 | | |
| 2 | /5 | | |
| 3 | /5 | | |
| 4 | /5 | | |
| 5 | /5 | | |
| 6 | /5 | | |
| 7 | /5 | | |
| 8 | /5 | | |
