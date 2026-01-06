# Week 8: Rate Limiting & Monitoring

## Rate Limiting

### Why Rate Limit?

1. **Prevent abuse** - Stop malicious users/bots
2. **Ensure fairness** - No single user monopolizes resources
3. **Protect infrastructure** - Prevent cascade failures
4. **Manage costs** - Control API usage

### Rate Limiting Algorithms

#### 1. Token Bucket

**Concept:** Bucket holds tokens; requests consume tokens; tokens refill at fixed rate.

```
Bucket Capacity: 10 tokens
Refill Rate: 1 token/second

Request arrives:
  - If tokens > 0: Allow, decrement token
  - If tokens = 0: Reject (429)
```

```javascript
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }

  allowRequest() {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}
```

**Pros:** Allows bursts up to bucket size
**Cons:** Memory per user for bucket state

#### 2. Leaky Bucket

**Concept:** Requests enter bucket; processed at fixed rate; overflow rejected.

```
Request arrives → Enter queue (bucket)
                      ↓
              Process at fixed rate (leak)
                      ↓
              If queue full → Reject
```

**Pros:** Smooths out bursts, constant output rate
**Cons:** Bursts may be rejected even if average rate is OK

#### 3. Fixed Window Counter

**Concept:** Count requests in fixed time windows (e.g., per minute).

```
Window: 0:00 - 0:59 → Counter: 0
Request at 0:30 → Counter: 1
Request at 0:45 → Counter: 2
...
If Counter > Limit → Reject
At 1:00 → Reset counter to 0
```

```javascript
class FixedWindow {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.counters = new Map(); // key -> { count, windowStart }
  }

  allowRequest(key) {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    
    const record = this.counters.get(key);
    if (!record || record.windowStart !== windowStart) {
      this.counters.set(key, { count: 1, windowStart });
      return true;
    }
    
    if (record.count < this.limit) {
      record.count++;
      return true;
    }
    return false;
  }
}
```

**Pros:** Simple, memory efficient
**Cons:** Burst at window boundaries (2x limit possible)

#### 4. Sliding Window Log

**Concept:** Store timestamp of each request; count requests in sliding window.

```javascript
class SlidingWindowLog {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.logs = new Map(); // key -> [timestamps]
  }

  allowRequest(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    let timestamps = this.logs.get(key) || [];
    timestamps = timestamps.filter(ts => ts > windowStart);
    
    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.logs.set(key, timestamps);
      return true;
    }
    return false;
  }
}
```

**Pros:** Accurate, no boundary burst issue
**Cons:** Memory intensive (stores all timestamps)

#### 5. Sliding Window Counter (Recommended)

**Concept:** Weighted combination of current and previous window.

```
Previous window: 80 requests (limit: 100)
Current window: 30 requests
Current position: 25% into window

Weighted count = prev * (1 - 0.25) + current
               = 80 * 0.75 + 30
               = 90 requests

If weighted > limit → Reject
```

**Pros:** Memory efficient, smooth, no boundary issues
**Cons:** Approximate (but close enough)

### Algorithm Comparison

| Algorithm | Memory | Accuracy | Burst Handling |
|-----------|--------|----------|----------------|
| Token Bucket | Medium | Good | Allows controlled bursts |
| Leaky Bucket | Medium | Good | Smooths bursts |
| Fixed Window | Low | Poor | Boundary bursts (2x) |
| Sliding Log | High | Perfect | No bursts |
| Sliding Counter | Low | Good | Minimal burst |

### Distributed Rate Limiting

For multiple servers, use centralized counter (Redis).

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function slidingWindowCounter(key, limit, windowSec) {
  const now = Date.now();
  const windowKey = `ratelimit:${key}:${Math.floor(now / 1000 / windowSec)}`;
  const prevWindowKey = `ratelimit:${key}:${Math.floor(now / 1000 / windowSec) - 1}`;
  
  const [current, previous] = await redis.mget(windowKey, prevWindowKey);
  const currentCount = parseInt(current) || 0;
  const previousCount = parseInt(previous) || 0;
  
  const windowPosition = (now % (windowSec * 1000)) / (windowSec * 1000);
  const weighted = previousCount * (1 - windowPosition) + currentCount;
  
  if (weighted >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  await redis.multi()
    .incr(windowKey)
    .expire(windowKey, windowSec * 2)
    .exec();
  
  return { allowed: true, remaining: Math.floor(limit - weighted - 1) };
}
```

### Rate Limit Response Headers

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1699999999
Retry-After: 30
```

---

## Monitoring & Observability

### Three Pillars of Observability

```
┌─────────────────────────────────────────────────┐
│               OBSERVABILITY                      │
├─────────────┬─────────────┬─────────────────────┤
│   METRICS   │    LOGS     │      TRACES         │
│  (Numbers)  │   (Events)  │  (Request flow)     │
├─────────────┼─────────────┼─────────────────────┤
│ Prometheus  │ ELK Stack   │ Jaeger              │
│ Grafana     │ Loki        │ Zipkin              │
│ Datadog     │ Splunk      │ AWS X-Ray           │
└─────────────┴─────────────┴─────────────────────┘
```

### 1. Metrics

Numeric measurements over time.

#### Key Metrics to Track

**USE Method (Resources):**
| Metric | Description |
|--------|-------------|
| **U**tilization | % of resource capacity used |
| **S**aturation | Queue length / backlog |
| **E**rrors | Error count |

**RED Method (Services):**
| Metric | Description |
|--------|-------------|
| **R**ate | Requests per second |
| **E**rrors | Error rate (%) |
| **D**uration | Latency percentiles |

#### Four Golden Signals (Google SRE)

1. **Latency** - Time to service a request
2. **Traffic** - Requests per second
3. **Errors** - Rate of failed requests
4. **Saturation** - How "full" the service is

```javascript
// Example: Express middleware for metrics
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = { method: req.method, route: req.route?.path, status_code: res.statusCode };
    httpRequestDuration.observe(labels, duration);
    httpRequestTotal.inc(labels);
  });
  next();
});
```

#### Percentiles (p50, p95, p99)

- **p50** (median) - 50% of requests faster than this
- **p95** - 95% of requests faster than this
- **p99** - 99% of requests faster than this

**Why not averages?** Averages hide outliers. If 99% of requests are 10ms and 1% are 5000ms, average is ~60ms but user experience is poor.

### 2. Logs

Event records with context.

#### Log Levels

| Level | When to Use |
|-------|-------------|
| ERROR | Errors requiring attention |
| WARN | Potential issues |
| INFO | Important business events |
| DEBUG | Development debugging |

#### Structured Logging

```javascript
// ❌ Unstructured (hard to parse)
console.log('User 123 logged in from 192.168.1.1');

// ✅ Structured (JSON, queryable)
logger.info({
  event: 'user_login',
  userId: 123,
  ip: '192.168.1.1',
  timestamp: new Date().toISOString()
});
```

#### Log Aggregation Architecture

```
[App 1] ─┐
[App 2] ─┼─→ [Log Shipper] → [Message Queue] → [Log Storage] → [Search/UI]
[App 3] ─┘   (Fluentd)       (Kafka)          (Elasticsearch)  (Kibana)
```

### 3. Distributed Tracing

Follow a request across services.

```
Request ID: abc-123

[API Gateway]     [User Service]     [Order Service]     [Payment Service]
     │                  │                  │                    │
     ├──────────────────>                  │                    │
     │    getUserInfo   │                  │                    │
     <──────────────────┤                  │                    │
     │                  │                  │                    │
     ├─────────────────────────────────────>                    │
     │                           createOrder                    │
     │                                     ├────────────────────>
     │                                     │    processPayment  │
     │                                     <────────────────────┤
     <─────────────────────────────────────┤                    │
     │                                     │                    │
```

#### Trace Propagation

```javascript
// Inject trace context into headers
const traceId = req.headers['x-trace-id'] || generateTraceId();
const spanId = generateSpanId();

// Pass to downstream services
await fetch('http://user-service/users/123', {
  headers: {
    'x-trace-id': traceId,
    'x-parent-span-id': spanId
  }
});
```

---

## Alerting

### Alert Design Principles

1. **Alert on symptoms, not causes** - "Error rate > 1%" not "Server CPU > 90%"
2. **Actionable alerts** - Every alert should have a clear response
3. **Avoid alert fatigue** - Too many alerts = ignored alerts

### SLI, SLO, SLA

| Term | Definition | Example |
|------|------------|---------|
| **SLI** (Indicator) | Metric that measures service | Request latency |
| **SLO** (Objective) | Target for the metric | p99 latency < 200ms |
| **SLA** (Agreement) | Contract with consequences | 99.9% uptime or refund |

### Error Budget

```
SLO: 99.9% availability = 0.1% allowed downtime
Monthly error budget: 30 days × 24 hours × 60 min × 0.1% = 43.2 minutes

If you've used 30 minutes this month → 13.2 minutes remaining
```

### Example Alert Rules

```yaml
# Prometheus alerting rules
groups:
- name: api-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status_code=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      
  - alert: HighLatency
    expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 0.5
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "p99 latency > 500ms"
```

---

## Health Checks

### Liveness vs Readiness

| Check | Question | Action if Fails |
|-------|----------|-----------------|
| **Liveness** | Is the process running? | Restart container |
| **Readiness** | Can it handle traffic? | Remove from load balancer |

```javascript
// Express health check endpoints
app.get('/health/live', (req, res) => {
  // Basic check - process is alive
  res.status(200).json({ status: 'alive' });
});

app.get('/health/ready', async (req, res) => {
  try {
    // Check dependencies
    await db.query('SELECT 1');
    await redis.ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

---

## Dashboard Design

### Key Dashboards

1. **Service Overview**
   - Request rate
   - Error rate
   - Latency percentiles
   - Active users

2. **Infrastructure**
   - CPU, Memory, Disk
   - Network I/O
   - Container count

3. **Business Metrics**
   - Orders per minute
   - Revenue
   - User signups

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  SERVICE: Order Service         [Last 6 hours ▼]       │
├─────────────────────────┬───────────────────────────────┤
│  Requests/sec           │  Error Rate                   │
│  ████████████  1.2K     │  ██░░░░░░░░░░  0.2%          │
├─────────────────────────┼───────────────────────────────┤
│  p50 Latency            │  p99 Latency                  │
│  ████████  45ms         │  ████████████████  180ms     │
├─────────────────────────┴───────────────────────────────┤
│  Request Rate Over Time                                 │
│  ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█               │
├─────────────────────────────────────────────────────────┤
│  Recent Errors                                          │
│  10:30:45  500  POST /orders  "Database connection..."  │
│  10:28:12  503  GET /orders/123  "Timeout..."          │
└─────────────────────────────────────────────────────────┘
```

---

## Circuit Breaker Pattern

Prevent cascade failures by failing fast.

```
States: CLOSED → OPEN → HALF-OPEN → CLOSED

CLOSED: Normal operation, requests pass through
  ↓ (failures exceed threshold)
OPEN: Reject all requests immediately (fail fast)
  ↓ (after timeout)
HALF-OPEN: Allow limited requests to test
  ↓ (success) → CLOSED
  ↓ (failure) → OPEN
```

```javascript
class CircuitBreaker {
  constructor(options) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailure = null;
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
```

---

## Study Checklist

- [ ] Can explain all 5 rate limiting algorithms
- [ ] Know when to use which algorithm
- [ ] Understand distributed rate limiting with Redis
- [ ] Know the three pillars of observability
- [ ] Can explain p50, p95, p99 percentiles
- [ ] Understand SLI/SLO/SLA and error budgets
- [ ] Can implement circuit breaker pattern

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| Token Bucket | Bucket of tokens consumed by requests, refilled at fixed rate |
| Leaky Bucket | Queue processed at fixed rate, overflow rejected |
| Sliding Window | Weighted count of current and previous windows |
| Rate Limiting | Control request frequency to prevent abuse |
| SLI | Service Level Indicator - metric measuring service |
| SLO | Service Level Objective - target for the metric |
| SLA | Service Level Agreement - contract with consequences |
| Error Budget | Allowed failures before violating SLO |
| Circuit Breaker | Fail fast pattern to prevent cascade failures |
| p99 Latency | 99% of requests are faster than this value |
| Distributed Tracing | Following requests across multiple services |
