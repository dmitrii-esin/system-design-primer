# Practical Exercise 3: Database Choice Justification

## Objective

For a recent project, justify your database choice using SQL vs NoSQL criteria.

## Instructions

### Part 1: Project Description

**Project Name:** 
```

```

**Brief Description:**
```

```

**Key Data Entities:**
```
1. 
2. 
3. 
4. 
```

### Part 2: Database Choice Analysis

**Database(s) used:**
```

```

**Why this choice?**

Score each factor (1-5, where 5 = strongly favors your choice):

| Factor | Score | Notes |
|--------|-------|-------|
| Schema structure (fixed vs flexible) | /5 | |
| Relationship complexity | /5 | |
| Transaction requirements | /5 | |
| Scale requirements | /5 | |
| Query patterns | /5 | |
| Team familiarity | /5 | |
| Ecosystem/tooling | /5 | |

### Part 3: SQL vs NoSQL Criteria Checklist

#### Reasons to Choose SQL ✅

- [ ] Structured data with clear schema
- [ ] Need for complex JOINs
- [ ] ACID transactions required
- [ ] Relational data model fits well
- [ ] Need for data integrity constraints
- [ ] Mature tooling and ORM support
- [ ] Team has SQL expertise

**Which apply to your project?**
```

```

#### Reasons to Choose NoSQL ✅

- [ ] Semi-structured or dynamic data
- [ ] Flexible schema needed
- [ ] Horizontal scaling required
- [ ] High write throughput needed
- [ ] Simple query patterns
- [ ] Document-oriented data
- [ ] Key-value access patterns

**Which apply to your project?**
```

```

### Part 4: Data Model Design

**If using SQL, show your schema:**
```sql
-- Main tables and relationships







```

**If using NoSQL, show your document structure:**
```javascript
// Example documents







```

### Part 5: Trade-off Analysis

**What you gained with your choice:**
```
1. 
2. 
3. 
```

**What you gave up:**
```
1. 
2. 
3. 
```

**Challenges encountered:**
```
1. 
2. 
```

### Part 6: Alternative Analysis

**If you had chosen the opposite (SQL ↔ NoSQL):**

**How would the data model change?**
```





```

**What would be easier?**
```

```

**What would be harder?**
```

```

**Would you change your decision now? Why/why not?**
```

```

---

## Example: E-commerce Platform

### Project: Online Marketplace

**Databases used:**
- PostgreSQL (primary: users, orders, products)
- Redis (cache, sessions)
- Elasticsearch (product search)

### SQL Choice Justification (PostgreSQL)

| Factor | Score | Notes |
|--------|-------|-------|
| Schema structure | 5/5 | Products have consistent fields |
| Relationship complexity | 5/5 | Orders → Users → Products → Categories |
| Transaction requirements | 5/5 | Payment processing must be ACID |
| Scale requirements | 3/5 | 10K orders/day, manageable |
| Query patterns | 4/5 | Complex reports, joins needed |
| Team familiarity | 5/5 | Team knows PostgreSQL well |

### Why Not MongoDB?

- Orders require ACID transactions (payment integrity)
- Complex relationships (orders → products → inventory)
- Need for JOINs in reports
- Existing PostgreSQL expertise

### What We Gained
1. Data integrity for financial transactions
2. Powerful reporting with SQL
3. Foreign key constraints prevent orphaned data

### What We Gave Up
1. Flexibility to add product attributes without migrations
2. Easier horizontal scaling
3. Document-oriented product data

### Challenges
1. Schema migrations on large tables are slow
2. Scaling writes requires careful planning

---

## Polyglot Persistence Analysis

Many systems use multiple databases. Analyze when this makes sense:

| Data Type | Best Database | Why |
|-----------|---------------|-----|
| User profiles | PostgreSQL | Relational, ACID |
| Shopping cart | Redis | Fast, ephemeral |
| Product catalog | MongoDB | Flexible attributes |
| Search | Elasticsearch | Full-text search |
| Analytics | ClickHouse | Column-oriented |
| Sessions | Redis | Fast, TTL support |
| Logs | Elasticsearch | Time-series, search |
| Social graph | Neo4j | Graph traversal |

**Does your project need multiple databases?**
```

```

---

## Reflection Questions

1. Can you justify your database choice in 2 minutes?
2. What would make you reconsider?
3. How would your choice change at 10x scale?
4. What's the most important factor for your domain?

## Checklist

- [ ] Described project and data entities
- [ ] Scored each decision factor
- [ ] Reviewed SQL vs NoSQL criteria
- [ ] Documented data model
- [ ] Analyzed trade-offs
- [ ] Considered alternative approach
- [ ] Can explain decision in interview
