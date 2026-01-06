# Week 1: Core Concepts and Setup

## Performance vs Scalability

A service is **scalable** if it results in increased **performance** proportional to resources added.

**Key distinction:**
- **Performance problem** → System is slow for a single user
- **Scalability problem** → System is fast for one user but slow under heavy load

## Latency vs Throughput

| Concept | Definition | Goal |
|---------|------------|------|
| **Latency** | Time to perform an action | Minimize |
| **Throughput** | Actions per unit of time | Maximize |

**Aim for:** Maximum throughput with acceptable latency

## CAP Theorem

In a distributed system, you can only guarantee **2 of 3**:

```
        Consistency
           /\
          /  \
         /    \
        /      \
       /________\
Availability  Partition Tolerance
```

| Property | Definition |
|----------|------------|
| **Consistency** | Every read receives the most recent write or an error |
| **Availability** | Every request receives a response (no guarantee it's the latest) |
| **Partition Tolerance** | System operates despite network partitions |

**Reality:** Networks are unreliable → must support Partition Tolerance → choose between C and A

### CP (Consistency + Partition Tolerance)
- Wait for partitioned node → may timeout
- Good for: atomic reads/writes (banking, inventory)
- Examples: MongoDB (in certain configs), HBase

### AP (Availability + Partition Tolerance)
- Return most available data (might be stale)
- Good for: eventual consistency acceptable
- Examples: Cassandra, CouchDB, DynamoDB

## Consistency Patterns

### 1. Weak Consistency
- After write, reads **may or may not** see it
- Best effort approach
- **Use case:** VoIP, video chat, real-time games
- **Example:** Memcached

### 2. Eventual Consistency
- After write, reads will **eventually** see it (typically milliseconds)
- Data replicated asynchronously
- **Use case:** DNS, email, social media feeds
- **Example:** Cassandra, DynamoDB

### 3. Strong Consistency
- After write, reads **will** see it immediately
- Data replicated synchronously
- **Use case:** Financial transactions, inventory
- **Example:** PostgreSQL, MySQL with sync replication

## Availability Patterns

### Fail-over

**Active-Passive (Master-Slave)**
```
[Active Server] ←heartbeat→ [Passive Server (standby)]
        ↓
   [Traffic]
```
- Passive takes over if heartbeat interrupted
- Hot standby = faster recovery
- Cold standby = needs startup time

**Active-Active (Master-Master)**
```
[Server A] ←sync→ [Server B]
     ↑              ↑
     └──[Traffic]───┘
```
- Both handle traffic
- DNS or load balancer distributes
- More complex conflict resolution

### Availability in Numbers (The 9s)

| Availability | Downtime/Year | Downtime/Month | Downtime/Day |
|--------------|---------------|----------------|--------------|
| 99% (two 9s) | 3.65 days | 7.31 hours | 14.4 min |
| 99.9% (three 9s) | 8h 45m | 43m 50s | 1m 26s |
| 99.99% (four 9s) | 52m 36s | 4m 23s | 8.6s |
| 99.999% (five 9s) | 5m 15s | 26s | 0.86s |

**Availability calculation:**
- In sequence: `Availability(Total) = A(Foo) × A(Bar)`
- In parallel: `Availability(Total) = 1 - (1 - A(Foo)) × (1 - A(Bar))`

## Scalability Video Lecture Key Points

From Harvard's CS75 Scalability Lecture:

### Vertical Scaling
- Add more resources to single machine (CPU, RAM, disk)
- Simpler but has limits
- Single point of failure

### Horizontal Scaling
- Add more machines
- Requires load balancing
- Better fault tolerance
- More complex

### Key Concepts Covered
1. **Caching** - Store computed results
2. **Load Balancing** - Distribute traffic
3. **Database Replication** - Read replicas
4. **Database Partitioning** - Sharding data

---

## 🤔 Elaboration Questions (Ask Yourself)

Use these to deepen understanding. Answer without looking at notes.

### WHY Questions
1. **Why** can't a distributed system have all three CAP properties?
2. **Why** do networks fail (causing partitions)?
3. **Why** would anyone choose eventual consistency over strong consistency?
4. **Why** is five-nines (99.999%) availability so much harder than four-nines?

### HOW Questions
1. **How** does a system detect that a partition has occurred?
2. **How** does eventual consistency actually work under the hood?
3. **How** do you calculate combined availability for systems in parallel?

### WHAT-IF Questions
1. **What if** your banking app used eventual consistency?
2. **What if** you needed 99.999% availability but only had one server?
3. **What if** a partition lasts for days instead of seconds?

### Connection Questions
1. How does CAP theorem relate to database replication (Week 3)?
2. How does caching (Week 4) affect consistency?
3. How do message queues (Week 5) help with availability?

---

## Study Checklist

- [ ] Can explain CAP theorem in 2 minutes
- [ ] Know when to choose CP vs AP
- [ ] Understand all three consistency patterns with examples
- [ ] Calculate availability for systems in sequence/parallel
- [ ] Explain vertical vs horizontal scaling trade-offs
- [ ] Memorized latency numbers (see reference/latency-numbers.md)
- [ ] Answered elaboration questions above without notes

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| Scalability | Performance increases proportionally with added resources |
| Latency | Time to perform an action |
| Throughput | Actions per unit of time |
| CAP Theorem | Choose 2: Consistency, Availability, Partition Tolerance |
| Eventual Consistency | Reads eventually see writes (async replication) |
| Strong Consistency | Reads immediately see writes (sync replication) |
| Failover | Backup takes over when primary fails |
| The 9s | Availability percentage (99.99% = "four nines") |
