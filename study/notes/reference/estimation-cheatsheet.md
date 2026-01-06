# Back-of-the-Envelope Estimation Cheatsheet

## Powers of Two (MEMORIZE)

| Power | Exact | Approx | Bytes |
|-------|-------|--------|-------|
| 10 | 1,024 | 1 thousand | 1 KB |
| 20 | 1,048,576 | 1 million | 1 MB |
| 30 | 1,073,741,824 | 1 billion | 1 GB |
| 40 | 1,099,511,627,776 | 1 trillion | 1 TB |
| 50 | | 1 quadrillion | 1 PB |

**Memory trick:** Each +10 power = 1000x

## Time Conversions

```
1 second     = 1,000 ms
1 minute     = 60 seconds
1 hour       = 3,600 seconds
1 day        = 86,400 seconds ≈ 100,000 seconds
1 month      = 2,592,000 seconds ≈ 2.5 million seconds
1 year       = 31,536,000 seconds ≈ 30 million seconds
```

**Quick approximations:**
- 1 day ≈ 10^5 seconds (100K)
- 1 month ≈ 2.5 × 10^6 seconds (2.5M)
- 1 year ≈ 3 × 10^7 seconds (30M)

## Request Rate Conversions

| RPS | Per Day | Per Month | Per Year |
|-----|---------|-----------|----------|
| 1 | 86,400 | 2.5M | 30M |
| 10 | 864,000 | 25M | 300M |
| 100 | 8.64M | 250M | 3B |
| 1,000 | 86.4M | 2.5B | 30B |
| 10,000 | 864M | 25B | 300B |

**Quick math:**
- 1 req/sec ≈ 2.5M req/month
- 100 req/sec ≈ 250M req/month
- 1000 req/sec ≈ 2.5B req/month

## Common Data Sizes

| Item | Size |
|------|------|
| UUID | 16 bytes |
| Integer | 4 bytes |
| Long | 8 bytes |
| Timestamp | 8 bytes |
| Short URL | 7-10 bytes |
| Email address | 50-100 bytes |
| Tweet | 280 bytes (text only) |
| URL | 100-500 bytes |
| Database row (small) | 100-500 bytes |
| Database row (medium) | 1-5 KB |
| Image thumbnail | 10-50 KB |
| Image (web) | 100-500 KB |
| Image (high-res) | 2-5 MB |
| Video (1 min, compressed) | 10-50 MB |
| Video (1 min, HD) | 100-200 MB |

## QPS Estimation Formula

```
QPS = (DAU × actions_per_user) / seconds_per_day

Example:
- 10M DAU
- 10 actions per user
- QPS = (10M × 10) / 86,400 ≈ 1,200 QPS

Peak QPS = Average QPS × 2-3
```

## Storage Estimation Formula

```
Storage = users × data_per_user × time_period

Example (URL shortener):
- 100M new URLs/month
- 500 bytes per URL
- 5 years retention

Storage = 100M × 500 bytes × 12 months × 5 years
        = 100M × 500 × 60
        = 3 TB
```

## Bandwidth Estimation Formula

```
Bandwidth = requests × response_size / time

Example:
- 1M requests/day
- 50 KB average response

Bandwidth = 1M × 50 KB / 86,400 sec
          = 50 GB / 86,400
          ≈ 600 KB/sec
          ≈ 5 Mbps
```

## Cache Size Estimation

**Rule of thumb:** Cache 20% of daily data (80/20 rule)

```
Cache = (daily_requests × data_size × 0.2)

Example:
- 1M requests/day
- 1 KB per item
- Cache = 1M × 1 KB × 0.2 = 200 MB
```

## Database Estimation

**Writes per second a single DB can handle:**
- Simple writes: 5,000-10,000/sec
- Complex writes: 1,000-5,000/sec

**When to shard:**
- Single table > 100GB
- Writes > 5,000/sec
- Queries consistently slow

## Server Capacity

**Typical web server handles:**
- 1,000-10,000 concurrent connections
- 10,000-100,000 requests/sec (simple)
- 1,000-10,000 requests/sec (complex)

**Typical server specs:**
- 16-64 GB RAM
- 8-32 CPU cores
- 500 GB - 2 TB SSD

## Quick Estimation Templates

### Template 1: Social Media Platform

```
Given:
- 100M DAU
- 10 posts viewed per user per day
- 1 post created per 10 users per day

Calculations:
- Read QPS: (100M × 10) / 86,400 ≈ 12,000 QPS
- Write QPS: (100M / 10) / 86,400 ≈ 120 QPS
- Read:Write ratio ≈ 100:1

Storage (1 year):
- Posts: (100M/10) × 365 × 1 KB = 365 TB
- With media: 365 TB × 10 = 3.6 PB
```

### Template 2: URL Shortener

```
Given:
- 100M new URLs/month
- Read:Write = 100:1
- 5 year retention

Calculations:
- Write QPS: 100M / 2.5M ≈ 40 QPS
- Read QPS: 40 × 100 = 4,000 QPS

Storage:
- 100M × 12 × 5 × 500 bytes = 300 GB URLs
- With logs/analytics: ~3 TB
```

### Template 3: Chat Application

```
Given:
- 50M DAU
- 50 messages sent per user per day
- 100 bytes per message

Calculations:
- Message QPS: (50M × 50) / 86,400 ≈ 29,000 QPS
- Peak: ~90,000 QPS

Storage (1 year):
- 50M × 50 × 365 × 100 bytes = 91 TB
```

## Common Mistakes to Avoid

1. **Forgetting peak load** - Multiply average by 2-3x
2. **Ignoring replication** - Storage × 3 for replicas
3. **Underestimating media** - Images/videos dominate storage
4. **Missing metadata** - Logs, indexes, backups add 2-3x
5. **Wrong units** - KB vs MB vs GB (off by 1000x!)

## Interview Calculation Tips

1. **Round aggressively** - 86,400 → 100,000
2. **Use powers of 10** - Easier mental math
3. **State assumptions** - "Assuming 500 bytes per record..."
4. **Show your work** - Write it down step by step
5. **Sanity check** - Does the answer make sense?

## Practice Problems

**Problem 1:** Estimate Twitter's storage needs
- 500M users, 200M DAU
- 500 tweets/second created
- Average tweet: 300 bytes

**Problem 2:** Design cache for e-commerce
- 10M products
- 1M product views/hour
- Product data: 10 KB

**Problem 3:** Calculate video streaming bandwidth
- 10M concurrent viewers
- 5 Mbps per stream
- 30% watch HD (20 Mbps)

---

## Quick Reference Card

```
┌────────────────────────────────────────┐
│         ESTIMATION CHEAT SHEET         │
├────────────────────────────────────────┤
│ 1 KB = 2^10 bytes (1,000)              │
│ 1 MB = 2^20 bytes (1,000,000)          │
│ 1 GB = 2^30 bytes (1,000,000,000)      │
│ 1 TB = 2^40 bytes                      │
├────────────────────────────────────────┤
│ 1 day = 86,400 sec ≈ 100,000 sec       │
│ 1 month = 2.5 million sec              │
│ 1 year = 30 million sec                │
├────────────────────────────────────────┤
│ 1 req/sec = 2.5M req/month             │
│ 100 req/sec = 250M req/month           │
│ 1000 req/sec = 2.5B req/month          │
├────────────────────────────────────────┤
│ Peak = Average × 2-3                   │
│ Cache = 20% of daily data              │
│ Replicas = Storage × 3                 │
└────────────────────────────────────────┘
```
