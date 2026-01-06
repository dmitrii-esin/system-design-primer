# Week 6: Interview Framework

## The 4-Step Approach

System design interviews are **open-ended conversations**. You lead the discussion.

```
┌─────────────────────────────────────────────────────┐
│  Step 1: Requirements & Constraints    (5-10 min)  │
├─────────────────────────────────────────────────────┤
│  Step 2: High-Level Design             (10-15 min) │
├─────────────────────────────────────────────────────┤
│  Step 3: Core Components               (10-15 min) │
├─────────────────────────────────────────────────────┤
│  Step 4: Scale & Bottlenecks           (10-15 min) │
└─────────────────────────────────────────────────────┘
```

---

## Step 1: Requirements & Constraints

**Goal:** Scope the problem before designing.

### Questions to Ask

**Users & Use Cases:**
- Who is going to use it?
- How are they going to use it?
- What are the main use cases?
- What's in scope vs out of scope?

**Scale:**
- How many users?
- How many requests per second?
- How much data do we expect?
- What's the expected read/write ratio?

**Performance:**
- What's acceptable latency?
- Is real-time required?
- Is consistency or availability more important?

**Existing System:**
- Are we building from scratch?
- What existing infrastructure can we use?

### Example: URL Shortener

**Clarifying questions:**
```
Q: Who uses this?
A: Anyone on the internet

Q: How many URLs shortened per day?
A: 100 million new URLs/day

Q: How long are URLs stored?
A: 5 years by default, custom expiration optional

Q: Are analytics needed?
A: Yes, track click counts

Q: Custom short URLs allowed?
A: Yes, but not required for MVP
```

**Derived constraints:**
```
- 100M writes/day = ~1,200 writes/sec
- Read:Write ratio = 100:1 → 120,000 reads/sec
- Storage: 100M × 365 × 5 × 500 bytes = ~90 TB
```

---

## Step 2: High-Level Design

**Goal:** Draw the big picture with all major components.

### Template

```
[Clients]
    ↓
[Load Balancer]
    ↓
[Web Servers / API Gateway]
    ↓
[Application Servers]
    ↓
[Cache] ←→ [Database]
    ↓
[Background Workers]
    ↓
[Message Queue]
```

### What to Include

1. **Client types** - Web, mobile, API consumers
2. **Load balancers** - Traffic distribution
3. **Web/App servers** - Request handling
4. **Databases** - Primary data store
5. **Caches** - Performance optimization
6. **CDN** - Static content
7. **Message queues** - Async processing
8. **Third-party services** - Payments, email, etc.

### Example: URL Shortener High-Level

```
[Browser/App]
      ↓
[DNS] → [CDN] (static assets)
      ↓
[Load Balancer]
      ↓
┌─────────────────┐
│   API Servers   │
│  (stateless)    │
└─────────────────┘
      ↓
[Redis Cache] ←→ [PostgreSQL]
                  (Master-Slave)
```

---

## Step 3: Core Components

**Goal:** Deep dive into the most important parts.

### For Each Component, Discuss:

1. **Data model** - Schema, entities, relationships
2. **API design** - Endpoints, request/response
3. **Algorithms** - Key logic (hashing, encoding, etc.)
4. **Technology choices** - And why

### Example: URL Shortener Core

**API Design:**
```
POST /api/v1/shorten
Request:  { "url": "https://example.com/very/long/path" }
Response: { "short_url": "https://short.ly/abc123" }

GET /:shortCode
Response: 301 Redirect to original URL
```

**Data Model:**
```sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
```

**URL Shortening Algorithm:**
```javascript
// Option 1: Base62 encoding of auto-increment ID
function encode(id) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (id > 0) {
        result = chars[id % 62] + result;
        id = Math.floor(id / 62);
    }
    return result;
}

// Option 2: MD5 hash + truncate
function shorten(url) {
    const hash = md5(url + timestamp);
    return base62(hash.substring(0, 7));
}
```

---

## Step 4: Scale the Design

**Goal:** Identify bottlenecks and address them.

### Scaling Checklist

| Component | Bottleneck | Solution |
|-----------|------------|----------|
| Web servers | CPU/memory | Horizontal scaling + LB |
| Database reads | Query load | Read replicas, caching |
| Database writes | Write throughput | Sharding, write-behind |
| Cache | Memory | Distributed cache (cluster) |
| Single points of failure | Availability | Redundancy, failover |

### Common Scaling Patterns

**1. Add Caching**
```
Before: Client → Server → DB
After:  Client → Server → Cache → DB
```

**2. Database Replication**
```
Before: [Single DB]
After:  [Master] → [Slave 1] → [Slave 2]
        (writes)   (reads)     (reads)
```

**3. Database Sharding**
```
Before: [Single DB with all data]
After:  [Shard 1: A-M] [Shard 2: N-Z]
```

**4. Async Processing**
```
Before: Client → Server → [slow task] → Response
After:  Client → Server → Queue → Response (fast)
                             ↓
                        [Worker] → [slow task]
```

### Example: URL Shortener Scaled

```
                        [CDN]
                          ↓
                    [DNS Round Robin]
                    ↙     ↓      ↘
               [LB 1]  [LB 2]  [LB 3]
                    ↘     ↓      ↙
              ┌───────────────────────┐
              │     API Servers       │
              │   (Auto-scaling)      │
              └───────────────────────┘
                          ↓
              ┌───────────────────────┐
              │    Redis Cluster      │
              │   (Distributed Cache) │
              └───────────────────────┘
                          ↓
    ┌─────────────────────────────────────────┐
    │              PostgreSQL                  │
    │  [Master] → [Slave] → [Slave]           │
    │  (writes)   (reads)   (reads)           │
    └─────────────────────────────────────────┘
                          ↓
              ┌───────────────────────┐
              │    Analytics Queue    │
              │      (Kafka)          │
              └───────────────────────┘
                          ↓
              ┌───────────────────────┐
              │   Analytics Workers   │
              │   → Data Warehouse    │
              └───────────────────────┘
```

---

## Back-of-the-Envelope Calculations

### Key Numbers to Memorize

**Time:**
```
1 day    = 86,400 seconds  ≈ 100,000 seconds
1 month  = 2.5 million seconds
1 year   = 30 million seconds
```

**Requests:**
```
1 req/sec    = 2.5M req/month
10 req/sec   = 25M req/month  
100 req/sec  = 250M req/month
1000 req/sec = 2.5B req/month
```

**Storage:**
```
1 KB  = 1,000 bytes
1 MB  = 1,000 KB
1 GB  = 1,000 MB
1 TB  = 1,000 GB
1 PB  = 1,000 TB
```

**Data Sizes:**
```
Tweet       ≈ 300 bytes
URL entry   ≈ 500 bytes
Image       ≈ 300 KB
Video (1min)≈ 50 MB
```

### Common Calculations

**Daily Active Users → RPS**
```
100M DAU, each makes 10 requests
= 1 billion requests/day
= 1B / 86,400 sec
≈ 12,000 req/sec average
Peak = 2-3x average ≈ 30,000 req/sec
```

**Storage over time**
```
10M new records/day × 1 KB each × 365 days × 3 years
= 10M × 1KB × 365 × 3
= 11 TB
```

**Bandwidth**
```
1M requests/day × 50KB response
= 50 GB/day outbound
= 50 GB / 86400 sec
≈ 600 KB/sec average
```

---

## Interview Tips

### Do's ✅

1. **Think out loud** - Share your thought process
2. **Ask clarifying questions** - Show you understand scope
3. **Start simple, then iterate** - Don't jump to complex solutions
4. **Discuss trade-offs** - Show you understand options
5. **Use real numbers** - Back-of-envelope calculations
6. **Draw diagrams** - Visual communication is key
7. **Consider failure modes** - What can go wrong?

### Don'ts ❌

1. **Don't dive into details too early** - Big picture first
2. **Don't forget about requirements** - Revisit constraints
3. **Don't ignore the interviewer** - It's a conversation
4. **Don't skip estimation** - Numbers matter
5. **Don't overcomplicate** - Start simple
6. **Don't forget non-functional requirements** - Security, monitoring

### Communication Framework

```
"For this system, I'm thinking about using [X] because [reason].
The trade-off is [downside], but given our requirements of [constraint],
I think this is the right choice. Does that sound reasonable?"
```

### Time Management

| Section | Time | Notes |
|---------|------|-------|
| Requirements | 5-10 min | Don't rush this |
| High-level design | 10-15 min | Cover all components |
| Deep dive | 10-15 min | Focus on 1-2 areas |
| Scaling | 10-15 min | Address bottlenecks |
| Buffer | 5 min | Questions, wrap-up |

---

## Practice Problems Approach

For each practice problem:

1. **Set a timer** - 45 minutes
2. **Write out requirements** - Before designing
3. **Draw the diagram** - On paper/whiteboard
4. **Do the math** - Storage, bandwidth, RPS
5. **Compare with solution** - Identify gaps
6. **Re-attempt** - After 2-3 days

---

## Study Checklist

- [ ] Can lead a 45-minute system design discussion
- [ ] Know the 4-step framework by heart
- [ ] Can do back-of-envelope calculations quickly
- [ ] Know common scaling patterns
- [ ] Practice at least 5 problems with the framework
- [ ] Can discuss trade-offs fluently

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| Step 1 | Requirements: Who, what, how much, constraints |
| Step 2 | High-level: Draw all major components |
| Step 3 | Core components: APIs, data model, algorithms |
| Step 4 | Scale: Identify and address bottlenecks |
| RPS | Requests per second - key scaling metric |
| DAU | Daily Active Users |
| SLA | Service Level Agreement (e.g., 99.9% uptime) |
| Trade-off | Every design decision has pros and cons |
| Bottleneck | Component limiting overall system performance |
