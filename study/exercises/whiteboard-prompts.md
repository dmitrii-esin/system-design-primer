# Whiteboard Practice Prompts

Practice drawing these diagrams from memory. Use paper, whiteboard, or digital tool.

---

## How to Practice

1. **Set a timer** - 5 minutes per diagram
2. **Draw from memory** - No peeking at notes
3. **Label everything** - Component names, arrows, data flow
4. **Explain out loud** - Practice verbal explanation
5. **Compare** - Check against reference after

---

## Level 1: Basic Components (5 min each)

### Prompt 1.1: Simple Web Architecture
Draw a basic web application with:
- Load balancer
- Multiple web servers
- Database with read replica
- Cache layer

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
                    [Load Balancer]
                    /      |      \
                   ↓       ↓       ↓
            [Web 1]   [Web 2]   [Web 3]
                   \       |       /
                    \      ↓      /
                     [Redis Cache]
                          ↓
                    [PostgreSQL]
                    /           \
              [Primary]    [Read Replica]
```
</details>

---

### Prompt 1.2: CDN + Origin
Draw content delivery with:
- User
- CDN edge locations
- Origin server
- Show cache hit vs miss flow

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[User Tokyo] → [CDN Edge Tokyo]
                    ↓
            Cache hit? → Yes → Return content
                    ↓ No
            [Origin Server US]
                    ↓
            Cache content at edge
                    ↓
            Return to user
```
</details>

---

### Prompt 1.3: Database Replication
Draw master-slave replication with:
- Write flow
- Read flow
- Replication direction

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[Application]
     ↓ writes          reads ↓
[Master DB] ──replication──→ [Slave DB]
     ↓ replication
[Slave DB 2]
```
</details>

---

## Level 2: Patterns (7 min each)

### Prompt 2.1: Cache-Aside Pattern
Draw the cache-aside (lazy loading) pattern showing:
- Cache hit flow
- Cache miss flow
- All components involved

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[Client Request]
      ↓
[Application]
      ↓
1. Check [Cache]
      ↓
   Hit? ──Yes──→ Return cached data
      ↓ No
2. Query [Database]
      ↓
3. Store in [Cache]
      ↓
4. Return data
```
</details>

---

### Prompt 2.2: Message Queue Architecture
Draw async processing with:
- Producer
- Message queue
- Multiple consumers
- Dead letter queue

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[API Server] ──→ [Message Queue] ──→ [Worker 1]
(Producer)            ↓              [Worker 2]
                      ↓              [Worker 3]
                      ↓
              Failed messages
                      ↓
              [Dead Letter Queue]
```
</details>

---

### Prompt 2.3: Sharding Strategy
Draw database sharding with:
- Shard key decision
- Router/coordinator
- Multiple shards
- Show data distribution

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[Application]
      ↓
[Shard Router]
(hash(user_id) % 3)
      ↓
┌─────┼─────┐
↓     ↓     ↓
[S0]  [S1]  [S2]
A-H   I-P   Q-Z
```
</details>

---

## Level 3: Full Systems (15 min each)

### Prompt 3.1: URL Shortener
Design a URL shortener (like bit.ly) showing:
- API servers
- Database
- Cache
- URL generation logic
- Redirect flow

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
                         [CDN]
                           ↓
[Client] ──→ [Load Balancer]
                   ↓
          [API Servers (stateless)]
               ↓          ↓
        POST /shorten   GET /:code
               ↓          ↓
        Generate ID    [Redis Cache]
        base62 encode       ↓
               ↓       Cache miss
        [PostgreSQL]  ←─────┘
        
URLs Table:
- id (bigint)
- short_code (varchar)
- original_url (text)
- created_at
```
</details>

---

### Prompt 3.2: Twitter Timeline
Design Twitter home timeline showing:
- Tweet creation flow
- Timeline generation
- Fanout strategy
- Caching layer

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
WRITE PATH (Post Tweet):
[User] → [API] → [Tweet Service] → [Tweet DB]
                        ↓
               [Fanout Service]
                        ↓
               [Timeline Cache] (for each follower)

READ PATH (View Timeline):
[User] → [API] → [Timeline Service]
                        ↓
                 [Timeline Cache]
                        ↓ (cache miss)
                 [Merge Tweets from followed users]
                        ↓
                 [Return sorted timeline]

Note: Celebrities use pull model (no fanout),
      Regular users use push model (pre-computed timeline)
```
</details>

---

### Prompt 3.3: Rate Limiter
Design a distributed rate limiter showing:
- Multiple API servers
- Centralized counter
- Algorithm choice
- Response flow

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
[Client] → [Load Balancer]
                ↓
        [API Server 1]  [API Server 2]
              ↓               ↓
              └──────┬────────┘
                     ↓
              [Redis Cluster]
              (Rate limit counters)
              
Algorithm: Sliding Window Counter
Key: rate_limit:{user_id}:{window}
Value: request count

Check:
1. Get current window count
2. Get previous window count  
3. Calculate weighted sum
4. If > limit → 429 Too Many Requests
5. Else → Increment counter, allow request

Headers:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1699999999
```
</details>

---

### Prompt 3.4: Notification System
Design a notification system showing:
- Event sources
- Message routing
- Multiple channels (push, email, in-app)
- User preferences

```
[Your drawing here]




```

<details>
<summary>Reference</summary>

```
EVENT SOURCES:
[User Service]  [Order Service]  [Social Service]
      ↓               ↓                ↓
      └───────────────┴────────────────┘
                      ↓
              [Event Bus / Kafka]
                      ↓
           [Notification Service]
                      ↓
           Check user preferences
                      ↓
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
[Push Queue]   [Email Queue]  [In-App Queue]
       ↓              ↓              ↓
[Push Workers] [Email Workers] [In-App Workers]
       ↓              ↓              ↓
 [FCM/APNS]    [SendGrid]    [WebSocket/DB]
```
</details>

---

## Level 4: Interview Practice (45 min)

### Prompt 4.1: Design Uber
Full system design including:
- Rider and driver apps
- Location tracking
- Matching algorithm
- Trip management
- Payment processing

Use the 4-step framework. Time yourself.

```
Step 1: Requirements (5-10 min)

Step 2: High-Level Design (10-15 min)

Step 3: Core Components (10-15 min)

Step 4: Scale & Deep Dive (10-15 min)
```

---

### Prompt 4.2: Design WhatsApp
Full system design including:
- 1:1 messaging
- Group messaging
- Online/offline status
- Message delivery status (sent, delivered, read)
- Media sharing

Use the 4-step framework. Time yourself.

```
Step 1: Requirements (5-10 min)

Step 2: High-Level Design (10-15 min)

Step 3: Core Components (10-15 min)

Step 4: Scale & Deep Dive (10-15 min)
```

---

### Prompt 4.3: Design YouTube
Full system design including:
- Video upload and processing
- Video streaming
- Recommendations
- Comments and likes
- Search

Use the 4-step framework. Time yourself.

```
Step 1: Requirements (5-10 min)

Step 2: High-Level Design (10-15 min)

Step 3: Core Components (10-15 min)

Step 4: Scale & Deep Dive (10-15 min)
```

---

## Quick Reference Shapes

Use these shapes consistently:

```
[Rectangle]     = Service/Server
(Circle)        = Database
<Diamond>       = Decision point
──────→         = Data flow
═══════→        = Heavy traffic
- - - - →       = Async/Optional
```

---

## Diagram Checklist

Before calling your diagram "done":

- [ ] All components labeled
- [ ] Data flow directions shown
- [ ] Read vs write paths clear
- [ ] Database choices justified
- [ ] Cache placement logical
- [ ] Queue placement logical
- [ ] Single points of failure identified
- [ ] Scale strategy visible

---

## Practice Schedule

| Week | Prompts to Practice | Goal |
|------|---------------------|------|
| 1 | 1.1, 1.2, 1.3 | Master basic components |
| 2 | 1.1-1.3 (no reference), 2.1 | Speed + patterns |
| 3 | 2.1, 2.2, 2.3 | Master patterns |
| 4 | 2.1-2.3 (no reference), 3.1 | Speed + systems |
| 5 | 3.1, 3.2 | Master common systems |
| 6 | 3.3, 3.4 | Complete system practice |
| 7+ | 4.1, 4.2, 4.3 | Full interview practice |

---

## Progress Tracker

| Prompt | Date | Time | Accuracy | Notes |
|--------|------|------|----------|-------|
| 1.1 | | | /10 | |
| 1.2 | | | /10 | |
| 1.3 | | | /10 | |
| 2.1 | | | /10 | |
| 2.2 | | | /10 | |
| 2.3 | | | /10 | |
| 3.1 | | | /10 | |
| 3.2 | | | /10 | |
| 3.3 | | | /10 | |
| 3.4 | | | /10 | |
| 4.1 | | | /10 | |
| 4.2 | | | /10 | |
| 4.3 | | | /10 | |

**Accuracy scoring:**
- 10: Perfect, could interview with this
- 7-9: Minor gaps, good understanding
- 4-6: Key components missing
- 1-3: Need to restudy concept
