# Latency Numbers Every Programmer Should Know

## Core Numbers (MEMORIZE THESE)

```
L1 cache reference                           0.5 ns
L2 cache reference                           7   ns         14x L1
Main memory reference                      100   ns         20x L2, 200x L1
SSD random read                            150   μs         150,000 ns
Read 1 MB sequentially from memory         250   μs
Round trip within datacenter               500   μs
Read 1 MB sequentially from SSD          1,000   μs    1 ms
HDD seek                                10,000   μs   10 ms
Read 1 MB sequentially from HDD         30,000   μs   30 ms
Send packet CA→Netherlands→CA          150,000   μs  150 ms
```

## Visual Scale

```
L1 cache      │
L2 cache      │▌
Main memory   │████████████████████
SSD read      │████████████████████████████████████████ (150μs)
              │
Memory 1MB    │█████ (250μs)
Datacenter RT │██████████ (500μs)
SSD 1MB       │████████████████████ (1ms)
HDD seek      │████████████████████████████████████████████████████ (10ms)
HDD 1MB       │████████████████████████████████████████████████████████████████ (30ms)
Internet RT   │█████████████████████████████████████████████████████████████████████ (150ms)
```

## Quick Reference Card

| Operation | Latency | Notes |
|-----------|---------|-------|
| L1 cache | 0.5 ns | Fastest |
| L2 cache | 7 ns | 14x L1 |
| RAM | 100 ns | 200x L1 |
| SSD random | 150 μs | 1,500x RAM |
| RAM 1MB | 250 μs | Sequential |
| Datacenter roundtrip | 500 μs | Same region |
| SSD 1MB | 1 ms | 4x memory |
| HDD seek | 10 ms | Slow! |
| HDD 1MB | 30 ms | 120x memory |
| Internet roundtrip | 150 ms | Cross-continent |

## Key Insights

### Memory vs Disk
- **Memory is 1000x faster than SSD** for random access
- **SSD is 30x faster than HDD** for random access
- **Sequential reads** are much faster than random

### Network
- **Datacenter roundtrip:** 500 μs (0.5 ms)
- **Cross-continent:** 150 ms (300x datacenter)
- **Network is often the bottleneck**

### Practical Implications

| Design Decision | Why |
|-----------------|-----|
| Use in-memory cache | 1000x faster than SSD |
| Avoid disk seeks | 10ms each adds up |
| Batch network calls | 500μs per roundtrip |
| Use CDN | Reduce cross-continent latency |
| Keep data in same region | 300x faster than cross-continent |

## Throughput Numbers

| Operation | Throughput |
|-----------|------------|
| Read from HDD | 30 MB/s |
| Read from 1 Gbps network | 100 MB/s |
| Read from SSD | 1 GB/s |
| Read from RAM | 4 GB/s |

## Useful Conversions

```
1 ns  = 10^-9 seconds
1 μs  = 10^-6 seconds = 1,000 ns
1 ms  = 10^-3 seconds = 1,000 μs = 1,000,000 ns

1 second = 1,000 ms = 1,000,000 μs = 1,000,000,000 ns
```

## Memory Tricks

**"100 rule":**
- L1 → L2: ~10x slower
- L2 → RAM: ~10x slower  
- RAM → SSD: ~1000x slower

**"Network is slow":**
- Same datacenter: 0.5 ms
- Cross-continent: 150 ms (300x!)

**"Sequential is fast":**
- SSD random: 150 μs
- SSD sequential 1MB: 1 ms (better throughput)

## What This Means for System Design

1. **Cache everything you can** - RAM is 1000x faster than disk
2. **Minimize network hops** - Each adds ~500μs minimum
3. **Batch operations** - Amortize network/disk latency
4. **Use SSDs over HDDs** - 30x faster random access
5. **Keep services in same region** - 300x faster than cross-continent
6. **Pre-compute where possible** - Avoid repeated calculations
7. **Use CDNs** - Serve static content from edge locations

## Practice: Calculate Latencies

**Example 1: Simple web request**
```
DNS lookup:          50 ms (cached: 0)
TCP handshake:      150 ms (cross-continent)
TLS handshake:      150 ms
HTTP request:       150 ms
Server processing:   50 ms
HTTP response:      150 ms
─────────────────────────
Total:              700 ms (first request)
```

**Example 2: Database query**
```
Network to DB:        1 ms (same datacenter)
Parse query:        0.1 ms
Index lookup:       0.5 ms (in memory)
Fetch rows:           5 ms (SSD)
Network back:         1 ms
─────────────────────────
Total:              ~8 ms
```

**Example 3: Cached vs uncached**
```
Cache hit (Redis):    1 ms
Cache miss + DB:     10 ms
Cache miss + HDD:    40 ms
```

---

## Flashcard Format

**Q:** L1 cache reference latency?
**A:** 0.5 nanoseconds

**Q:** Main memory reference latency?
**A:** 100 nanoseconds (200x L1)

**Q:** SSD random read latency?
**A:** 150 microseconds

**Q:** Datacenter roundtrip latency?
**A:** 500 microseconds (0.5 ms)

**Q:** HDD seek latency?
**A:** 10 milliseconds

**Q:** Cross-continent roundtrip latency?
**A:** 150 milliseconds

**Q:** How much faster is RAM than SSD for random access?
**A:** ~1000x faster (100ns vs 150μs)

**Q:** How much faster is same-datacenter than cross-continent?
**A:** ~300x faster (0.5ms vs 150ms)
