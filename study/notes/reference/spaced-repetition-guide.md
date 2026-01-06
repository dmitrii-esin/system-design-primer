# Spaced Repetition Guide for System Design

## Why Spaced Repetition?

Research shows spaced repetition is the most effective way to move information from short-term to long-term memory. Instead of cramming, you review material at increasing intervals.

## Review Schedule

### Week 1-6: Learning Phase

| Day | Activity | Time |
|-----|----------|------|
| Morning | Anki review | 15-20 min |
| After studying | Create 5-10 new cards | 10 min |
| Before bed | Quick review of day's concepts | 5 min |

### Week 7-12: Practice Phase

| Day | Activity | Time |
|-----|----------|------|
| Morning | Anki review | 15-20 min |
| Midday | Quick drill exercise | 10 min |
| Evening | Full design practice | 45 min |

---

## Anki Configuration (Recommended)

### Settings
```
New cards/day: 20
Maximum reviews/day: 200
Learning steps: 1m 10m 1d
Graduating interval: 4 days
Easy interval: 7 days
Starting ease: 250%
Interval modifier: 100%
```

### Card Types

Use these card types for different concepts:

**1. Definition Cards (Basic)**
```
Front: What is CAP theorem?
Back: In a distributed system, you can only guarantee 2 of 3:
      Consistency, Availability, Partition Tolerance
```

**2. Comparison Cards**
```
Front: SQL vs NoSQL: When to choose SQL?
Back: - Need complex JOINs
      - ACID transactions required
      - Structured schema
      - Strong consistency needed
```

**3. Scenario Cards**
```
Front: You're designing a banking system. CP or AP? Why?
Back: CP - Because financial data must be consistent.
      Users should see "unavailable" rather than wrong balance.
```

**4. Calculation Cards**
```
Front: 50M DAU, 20 requests/user/day. What's the QPS?
Back: 50M × 20 / 86,400 ≈ 11,500 QPS
      Peak: ~35,000 QPS (3x average)
```

---

## Custom Flashcard Templates

### Copy these into Anki:

---

#### TEMPLATE 1: Core Concept

**Front:**
```
[CONCEPT NAME]

What is it?
```

**Back:**
```
Definition: [1-2 sentences]

Key Points:
• [Point 1]
• [Point 2]  
• [Point 3]

Example: [Real-world example]
```

---

#### TEMPLATE 2: Trade-off Comparison

**Front:**
```
[OPTION A] vs [OPTION B]

When to choose each?
```

**Back:**
```
Choose [OPTION A] when:
• [Condition 1]
• [Condition 2]

Choose [OPTION B] when:
• [Condition 1]
• [Condition 2]

Key difference: [One sentence]
```

---

#### TEMPLATE 3: Design Decision

**Front:**
```
SCENARIO: [Describe situation]

What would you use and why?
```

**Back:**
```
Solution: [Technology/Pattern]

Reasoning:
• [Reason 1]
• [Reason 2]

Alternative: [Other option and why not chosen]
```

---

#### TEMPLATE 4: Number Recall

**Front:**
```
[What is the number for?]

Quick, from memory!
```

**Back:**
```
[Number with unit]

Related facts:
• [Context 1]
• [Context 2]
```

---

#### TEMPLATE 5: Algorithm/Pattern

**Front:**
```
[PATTERN NAME]

How does it work?
```

**Back:**
```
Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Use case: [When to use]
Trade-off: [What you give up]
```

---

## Pre-Made Flashcard Content

Copy these directly into Anki:

### Latency Numbers

```
Q: L1 cache reference latency?
A: 0.5 nanoseconds

Q: Main memory (RAM) reference latency?
A: 100 nanoseconds

Q: SSD random read latency?
A: 150 microseconds

Q: HDD seek latency?
A: 10 milliseconds

Q: Datacenter roundtrip latency?
A: 0.5 milliseconds

Q: Cross-continent roundtrip latency?
A: 150 milliseconds

Q: How much faster is RAM than SSD?
A: ~1000x faster (100ns vs 150μs)
```

### Time Conversions

```
Q: Seconds in a day (approximate)?
A: ~100,000 (86,400 exactly)

Q: Seconds in a month (approximate)?
A: ~2.5 million

Q: Seconds in a year (approximate)?
A: ~30 million

Q: 1 req/sec = how many per month?
A: ~2.5 million requests
```

### Powers of Two

```
Q: 2^10 bytes = ?
A: 1 KB (~1,000)

Q: 2^20 bytes = ?
A: 1 MB (~1 million)

Q: 2^30 bytes = ?
A: 1 GB (~1 billion)

Q: 2^40 bytes = ?
A: 1 TB (~1 trillion)
```

### CAP Theorem

```
Q: What does CAP stand for?
A: Consistency, Availability, Partition Tolerance

Q: Why can't you have all 3 in CAP?
A: Partitions WILL happen. When they do, you must choose:
   CP = wait for partition to heal (consistent but unavailable)
   AP = serve potentially stale data (available but inconsistent)

Q: Banking system: CP or AP?
A: CP - Must be consistent (wrong balance is unacceptable)

Q: Social media likes: CP or AP?
A: AP - Eventual consistency acceptable (stale count is OK)
```

### Database Concepts

```
Q: What is ACID?
A: Atomicity, Consistency, Isolation, Durability

Q: Master-Slave replication: what can each do?
A: Master: reads AND writes
   Slaves: reads only (replicate from master)

Q: When to shard vs federate?
A: Federation: Split by domain (users DB, orders DB)
   Sharding: Split same data by key (users A-M, N-Z)

Q: 4 types of NoSQL?
A: 1. Key-Value (Redis)
   2. Document (MongoDB)
   3. Wide Column (Cassandra)
   4. Graph (Neo4j)
```

### Caching

```
Q: Cache-aside pattern steps?
A: 1. Check cache
   2. If miss, read from DB
   3. Store in cache
   4. Return data

Q: Write-through vs Write-behind?
A: Write-through: Cache + DB synchronously (slower, consistent)
   Write-behind: Cache now, DB async (faster, risk of data loss)

Q: What is cache stampede?
A: Many requests hit DB when popular key expires
   Fix: Locking, early refresh, staggered TTL

Q: Redis vs Memcached?
A: Redis: Data structures, persistence, replication
   Memcached: Simple key-value, maximum performance
```

### Infrastructure

```
Q: Layer 4 vs Layer 7 load balancing?
A: L4: Route by IP/port (fast, simple)
   L7: Route by URL/headers (flexible, slower)

Q: Push CDN vs Pull CDN?
A: Push: You upload content (small sites, rarely changing)
   Pull: CDN fetches on demand (high traffic, dynamic)

Q: What is a reverse proxy?
A: Server that sits in front of backends
   Benefits: Security, caching, SSL termination
```

### Async Processing

```
Q: 3 message delivery guarantees?
A: At-most-once (may lose)
   At-least-once (may duplicate)
   Exactly-once (hardest)

Q: What is back pressure?
A: Protecting system when queue grows too fast
   Solutions: Rate limiting, queue limits, 503

Q: RPC vs REST: when each?
A: RPC: Internal services, high performance
   REST: Public APIs, loose coupling
```

---

## Review Schedule Calendar

### Daily Routine

| Time | Activity | Duration |
|------|----------|----------|
| 7:00 AM | Anki review (all due cards) | 15-20 min |
| 12:00 PM | Quick drill (1-2 exercises) | 5-10 min |
| 9:00 PM | Self-quiz (5 questions) | 5 min |

### Weekly Schedule

| Day | Focus | New Cards |
|-----|-------|-----------|
| Monday | Review previous week | 0 |
| Tuesday | Current topic | 10 |
| Wednesday | Current topic | 10 |
| Thursday | Practice problems | 5 |
| Friday | Review weak areas | 5 |
| Saturday | Mock interview | 0 |
| Sunday | Light review | 0 |

### Monthly Review

At end of each month:
1. Take all self-quiz tests
2. Identify concepts scoring < 4/5
3. Create additional cards for weak areas
4. Reset difficult cards for re-learning

---

## Spaced Repetition Intervals

How Anki intervals work:

```
Day 1: Learn card
Day 2: First review (if correct, interval increases)
Day 4: Second review
Day 8: Third review
Day 16: Fourth review
Day 32: Fifth review
...

Each correct answer multiplies interval by ~2.5
Each incorrect answer resets to learning phase
```

### Tips for Maximum Retention

1. **Be consistent** - Review every day, even for 5 minutes
2. **Don't skip days** - Breaks compound negatively
3. **Create cards immediately** - After learning new concept
4. **Keep cards simple** - One fact per card
5. **Use images** - Draw diagrams on cards
6. **Say answers aloud** - Engages more memory pathways

---

## Tracking Progress

### Weekly Check-in

| Week | Cards Due | Cards Reviewed | Retention Rate | Notes |
|------|-----------|----------------|----------------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |
| 11 | | | | |
| 12 | | | | |

**Target retention rate:** 85-95%

If below 85%: Cards may be too difficult, break them down
If above 95%: Cards may be too easy, add more challenging ones
