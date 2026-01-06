# Practical Exercise 6: Back-of-the-Envelope Estimation

## Objective

Practice estimation calculations for system design interviews.

## Reference Numbers (Memorize These)

```
Time:
- 1 day ≈ 100,000 seconds (86,400)
- 1 month ≈ 2.5 million seconds
- 1 year ≈ 30 million seconds

Requests:
- 1 req/sec ≈ 2.5M req/month
- 100 req/sec ≈ 250M req/month

Storage:
- 1 KB = 1,000 bytes
- 1 MB = 1,000 KB = 1 million bytes
- 1 GB = 1,000 MB = 1 billion bytes
- 1 TB = 1,000 GB = 1 trillion bytes
```

---

## Problem 1: Twitter Storage

**Scenario:** Estimate Twitter's daily storage needs for tweets.

**Given:**
- 500 million tweets per day
- Average tweet: 280 characters + metadata
- Metadata: user_id (8 bytes), timestamp (8 bytes), tweet_id (8 bytes)

**Your calculation:**
```
Step 1: Size per tweet


Step 2: Daily storage


Step 3: Yearly storage


Step 4: With replication (3x)


```

<details>
<summary>Check your answer</summary>

```
Step 1: Size per tweet
- Text: 280 chars × 4 bytes (UTF-8) = 1,120 bytes ≈ 1 KB
- Metadata: 8 + 8 + 8 = 24 bytes
- Total: ~1 KB per tweet

Step 2: Daily storage
500M tweets × 1 KB = 500 GB/day

Step 3: Yearly storage
500 GB × 365 = 182 TB/year

Step 4: With replication (3x)
182 TB × 3 = 546 TB/year ≈ 0.5 PB/year
```

</details>

---

## Problem 2: URL Shortener QPS

**Scenario:** Design a URL shortener like bit.ly.

**Given:**
- 100 million new URLs per month
- Read:Write ratio = 100:1
- URLs stored for 5 years

**Calculate:**
1. Write QPS (queries per second)
2. Read QPS
3. Total storage needed

**Your calculation:**
```
Step 1: Write QPS


Step 2: Read QPS


Step 3: Total URLs over 5 years


Step 4: Storage (500 bytes per URL)


```

<details>
<summary>Check your answer</summary>

```
Step 1: Write QPS
100M / month = 100M / 2.5M seconds ≈ 40 writes/sec

Step 2: Read QPS
40 × 100 = 4,000 reads/sec

Step 3: Total URLs over 5 years
100M × 12 months × 5 years = 6 billion URLs

Step 4: Storage
6B × 500 bytes = 3 TB
With replication: 3 TB × 3 = 9 TB
```

</details>

---

## Problem 3: Video Streaming Bandwidth

**Scenario:** Netflix-like streaming service.

**Given:**
- 10 million concurrent viewers
- 70% watch SD (3 Mbps)
- 30% watch HD (8 Mbps)

**Calculate:**
1. Total bandwidth required
2. Daily data transfer

**Your calculation:**
```
Step 1: SD bandwidth


Step 2: HD bandwidth


Step 3: Total bandwidth


Step 4: Daily data transfer (assume 4 hours average watch time)


```

<details>
<summary>Check your answer</summary>

```
Step 1: SD bandwidth
10M × 0.7 × 3 Mbps = 21 Tbps

Step 2: HD bandwidth
10M × 0.3 × 8 Mbps = 24 Tbps

Step 3: Total bandwidth
21 + 24 = 45 Tbps

Step 4: Daily data transfer
45 Tbps × 4 hours × 3600 sec/hour = 648 PB/day
(Or: 45 Tbps ÷ 8 = 5.6 TB/sec × 14,400 sec = 81 PB)
```

Note: This is peak concurrent. Average daily would be lower.

</details>

---

## Problem 4: Chat Application

**Scenario:** WhatsApp-like messaging app.

**Given:**
- 1 billion DAU
- Average: 50 messages sent per user per day
- Average message size: 100 bytes
- Messages stored for 30 days

**Calculate:**
1. Messages per second
2. Daily storage
3. Total storage (30 days)
4. Database write throughput needed

**Your calculation:**
```
Step 1: Daily messages


Step 2: Messages per second


Step 3: Daily storage


Step 4: 30-day storage


Step 5: Peak write throughput (3x average)


```

<details>
<summary>Check your answer</summary>

```
Step 1: Daily messages
1B users × 50 messages = 50 billion messages/day

Step 2: Messages per second
50B / 86,400 ≈ 580,000 messages/sec

Step 3: Daily storage
50B × 100 bytes = 5 TB/day

Step 4: 30-day storage
5 TB × 30 = 150 TB
With replication: 450 TB

Step 5: Peak write throughput
580K × 3 = 1.74M writes/sec
Need sharding across many database nodes!
```

</details>

---

## Problem 5: E-commerce Product Images

**Scenario:** Amazon-like product catalog.

**Given:**
- 100 million products
- 5 images per product
- Average image size: 200 KB (compressed)
- Multiple resolutions: thumbnail (10 KB), medium (50 KB), large (200 KB)

**Calculate:**
1. Total number of images
2. Total storage for all resolutions
3. CDN bandwidth for 1 billion image views/day

**Your calculation:**
```
Step 1: Total images


Step 2: Storage per product (all resolutions)


Step 3: Total storage


Step 4: CDN bandwidth (assume 50% thumbnail, 40% medium, 10% large)


```

<details>
<summary>Check your answer</summary>

```
Step 1: Total images
100M products × 5 images = 500M images

Step 2: Storage per product
5 images × (10 + 50 + 200) KB = 1.3 MB per product

Step 3: Total storage
100M × 1.3 MB = 130 TB

Step 4: CDN bandwidth
1B views/day breakdown:
- 500M thumbnails × 10 KB = 5 TB
- 400M medium × 50 KB = 20 TB
- 100M large × 200 KB = 20 TB
Total: 45 TB/day = 45 TB / 86400 ≈ 520 MB/sec ≈ 4 Gbps
```

</details>

---

## Problem 6: Real-Time Leaderboard

**Scenario:** Mobile game with global leaderboard.

**Given:**
- 50 million DAU
- Average: 10 score updates per user per day
- Leaderboard queries: 100 million per day
- Need top 100 players globally

**Calculate:**
1. Score update QPS
2. Leaderboard query QPS
3. Can a single Redis instance handle this?

**Your calculation:**
```
Step 1: Score update QPS


Step 2: Leaderboard query QPS


Step 3: Redis capacity analysis
(Redis sorted set: ~1M ops/sec for simple operations)


```

<details>
<summary>Check your answer</summary>

```
Step 1: Score update QPS
50M × 10 / 86,400 ≈ 5,800 updates/sec

Step 2: Leaderboard query QPS
100M / 86,400 ≈ 1,150 queries/sec

Step 3: Redis capacity analysis
Total ops: 5,800 + 1,150 ≈ 7,000 ops/sec
Single Redis: ~100K simple ops/sec
Sorted set ops are more expensive: ~10-50K ops/sec

Conclusion: Single Redis instance can handle this.
For redundancy, use Redis Cluster or Sentinel.
```

</details>

---

## Practice Template

For any system design estimation:

```
1. USERS & ACTIONS
   - DAU/MAU: ____
   - Actions per user per day: ____
   - Total actions per day: ____

2. THROUGHPUT
   - Average QPS: ____ / 86,400 = ____
   - Peak QPS (×3): ____
   - Read:Write ratio: ____

3. STORAGE
   - Size per item: ____
   - Items per day: ____
   - Daily storage: ____
   - Yearly storage: ____
   - With replication (×3): ____

4. BANDWIDTH
   - Incoming: ____ requests × ____ KB = ____
   - Outgoing: ____ requests × ____ KB = ____

5. SANITY CHECK
   - Does this seem reasonable?
   - Compare to known systems
```

---

## Quick Estimation Shortcuts

| Scenario | Quick Formula |
|----------|---------------|
| DAU to QPS | DAU × actions / 100,000 |
| Monthly to QPS | Monthly / 2.5M |
| Storage/year | Daily × 400 |
| Peak vs Average | Peak ≈ Average × 3 |
| With replication | Storage × 3 |

---

## Checklist

- [ ] Can estimate QPS from DAU
- [ ] Can calculate storage requirements
- [ ] Can estimate bandwidth needs
- [ ] Know common data sizes by heart
- [ ] Can do calculations quickly (< 2 minutes)
- [ ] Remember to account for peak load
- [ ] Remember replication multiplier
