# Week 3: Database Fundamentals

## RDBMS (Relational Databases)

Data organized in tables with relationships.

### ACID Properties

| Property | Description | Example |
|----------|-------------|---------|
| **Atomicity** | All or nothing | Transfer: debit AND credit both happen or neither |
| **Consistency** | Valid state to valid state | Balance can't go negative if rule exists |
| **Isolation** | Concurrent txns don't interfere | Two withdrawals don't overdraw |
| **Durability** | Committed = permanent | Crash after commit, data survives |

---

## Database Replication

### Master-Slave Replication

```
        [Master]
       /    |    \
      ↓     ↓     ↓
[Slave 1][Slave 2][Slave 3]
```

- **Master:** Handles reads AND writes
- **Slaves:** Handle reads only, replicate from master
- **Replication:** Can be sync or async

**Advantages:**
- Read scaling (distribute reads across slaves)
- Backup without affecting master
- Analytics queries on slaves

**Disadvantages:**
- Write bottleneck (single master)
- Replication lag (eventual consistency)
- Promotion complexity if master fails

### Master-Master Replication

```
[Master A] ←──sync──→ [Master B]
     ↑                      ↑
     └──────[Traffic]───────┘
```

- Both handle reads AND writes
- Coordinate writes between them

**Advantages:**
- No single point of failure for writes
- Geographic distribution

**Disadvantages:**
- Conflict resolution complexity
- Either loose consistency OR increased latency
- More complex setup

---

## Scaling Strategies

### Federation (Functional Partitioning)

Split databases by function/domain.

```
[App Server]
     |
     ├──→ [Users DB]
     ├──→ [Products DB]
     └──→ [Orders DB]
```

**Advantages:**
- Less read/write traffic per DB
- Smaller DBs = more fits in memory
- Can write in parallel

**Disadvantages:**
- Application must know which DB to query
- Cross-database joins are complex
- Not effective for huge single tables

### Sharding (Horizontal Partitioning)

Split data across multiple databases by a shard key.

```
          [Shard Router]
         /      |       \
        ↓       ↓        ↓
[Shard 0]  [Shard 1]  [Shard 2]
 (A-H)      (I-P)      (Q-Z)
```

**Sharding Strategies:**

| Strategy | Description | Pros | Cons |
|----------|-------------|------|------|
| Range | By value ranges (A-H, I-P) | Simple, range queries | Uneven distribution |
| Hash | hash(key) % num_shards | Even distribution | No range queries |
| Directory | Lookup table | Flexible | Extra hop, SPOF |
| Geographic | By location | Low latency | Uneven data |

**Advantages:**
- Horizontal scaling
- Less replication
- More cache hits (smaller index)

**Disadvantages:**
- Complex application logic
- Uneven data distribution (hot spots)
- Cross-shard joins/transactions hard
- Rebalancing is complex

**Consistent Hashing:** Minimizes data movement when adding/removing shards

### Denormalization

Add redundant data to avoid joins.

**Normalized:**
```sql
SELECT u.name, o.total 
FROM users u 
JOIN orders o ON u.id = o.user_id
```

**Denormalized:**
```sql
-- orders table has user_name column
SELECT user_name, total FROM orders
```

**Advantages:**
- Faster reads (no joins)
- Simpler queries
- Better for read-heavy workloads

**Disadvantages:**
- Data duplication
- Write complexity (update multiple places)
- Data inconsistency risk

**Use when:** Read:Write ratio > 10:1

---

## SQL Tuning

### Schema Optimization

| Tip | Reason |
|-----|--------|
| Use `CHAR` for fixed-length | Faster random access |
| Use `VARCHAR(255)` max | Fits in 1 byte length field |
| Use `TEXT` for large text | Stored separately with pointer |
| Use `INT` for large numbers | Up to 4 billion |
| Use `DECIMAL` for currency | Avoid floating point errors |
| Avoid large `BLOB`s | Store path instead |
| Add `NOT NULL` | Improves search performance |

### Indexing

```sql
CREATE INDEX idx_user_email ON users(email);
```

**When to index:**
- Columns in WHERE clauses
- Columns in JOIN conditions
- Columns in ORDER BY

**Index trade-offs:**
- ✅ Faster reads
- ❌ Slower writes (index updates)
- ❌ More storage

**B-tree index:** O(log n) for search, insert, delete

---

## NoSQL Databases

### BASE Properties (vs ACID)

| Property | Description |
|----------|-------------|
| **Basically Available** | System guarantees availability |
| **Soft State** | State may change without input |
| **Eventual Consistency** | System becomes consistent over time |

### Types of NoSQL

#### 1. Key-Value Store

**Abstraction:** Hash table

```
key → value
"user:123" → "{name: 'John', email: 'john@example.com'}"
```

**Characteristics:**
- O(1) reads and writes
- Simple operations (GET, SET, DELETE)
- No complex queries

**Use cases:**
- Session storage
- Caching
- Shopping carts
- Real-time data

**Examples:** Redis, Memcached, DynamoDB

#### 2. Document Store

**Abstraction:** Key-value with documents as values

```json
{
  "_id": "user123",
  "name": "John",
  "orders": [
    {"id": 1, "total": 100},
    {"id": 2, "total": 200}
  ]
}
```

**Characteristics:**
- Flexible schema
- Query on document contents
- Good for hierarchical data

**Use cases:**
- Content management
- User profiles
- Product catalogs

**Examples:** MongoDB, CouchDB, DynamoDB

#### 3. Wide Column Store

**Abstraction:** Nested map `ColumnFamily<RowKey, Columns<ColKey, Value>>`

```
RowKey → { col1: val1, col2: val2, ... }
```

**Characteristics:**
- Columns can vary per row
- Optimized for writes
- Good for time-series

**Use cases:**
- Time-series data
- IoT data
- Event logging

**Examples:** Cassandra, HBase, BigTable

#### 4. Graph Database

**Abstraction:** Nodes and edges

```
[User A] --follows--> [User B]
    |                     |
    └--likes--> [Post] <--+
```

**Characteristics:**
- Optimized for relationships
- Fast traversal
- Complex queries on connections

**Use cases:**
- Social networks
- Recommendation engines
- Fraud detection

**Examples:** Neo4j, Amazon Neptune, FlockDB

---

## SQL vs NoSQL Decision

### Choose SQL When:
- ✅ Structured data with clear schema
- ✅ Need complex joins
- ✅ ACID transactions required
- ✅ Clear scaling patterns needed
- ✅ Strong consistency required

### Choose NoSQL When:
- ✅ Semi-structured/dynamic data
- ✅ Massive scale (PBs of data)
- ✅ High write throughput needed
- ✅ Flexible schema required
- ✅ Eventual consistency acceptable

### Data Types Best Suited for NoSQL
- Clickstream/log data
- Leaderboards/scoring
- Shopping carts (temporary)
- Frequently accessed (hot) data
- Metadata/lookup tables

---

## Comparison Table

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical (mostly) | Horizontal |
| Joins | Native | Application-level |
| ACID | Yes | Usually no |
| Transactions | Yes | Limited |
| Query Language | SQL | Varies |
| Best for | Complex queries | Simple queries, scale |

---

## Study Checklist

- [ ] Can explain ACID properties with examples
- [ ] Understand master-slave vs master-master replication
- [ ] Know when to use federation vs sharding
- [ ] Can explain all 4 NoSQL types with use cases
- [ ] Know SQL vs NoSQL decision criteria
- [ ] Understand denormalization trade-offs

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| ACID | Atomicity, Consistency, Isolation, Durability |
| Master-Slave | One write node, many read nodes |
| Master-Master | Multiple write nodes |
| Federation | Split DB by function/domain |
| Sharding | Split data across DBs by shard key |
| Denormalization | Add redundant data to avoid joins |
| Key-Value Store | Simple hash table (Redis) |
| Document Store | JSON documents with queries (MongoDB) |
| Wide Column | Column-oriented (Cassandra) |
| Graph DB | Nodes and relationships (Neo4j) |
| BASE | Basically Available, Soft state, Eventual consistency |
