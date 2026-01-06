# Practical Exercise 1: CAP Theorem Diagram

## Objective

Create a diagram explaining CAP theorem trade-offs for a system you've built or used.

## Instructions

### Part 1: Understand the Triangle

Draw the CAP triangle:

```
        Consistency
           /\
          /  \
         /    \
        /  ??  \
       /________\
Availability  Partition
              Tolerance
```

### Part 2: Classify Real Systems

For each system below, identify if it's CP or AP:

| System | CP or AP? | Why? |
|--------|-----------|------|
| MySQL (single node) | | |
| MongoDB (default) | | |
| Cassandra | | |
| Redis (single node) | | |
| DynamoDB | | |
| PostgreSQL with sync replication | | |
| Your last project's database | | |

### Part 3: Your System Analysis

Think of a system you've built or worked on. Answer these questions:

1. **What was the system?**
   ```
   
   ```

2. **What database(s) did it use?**
   ```
   
   ```

3. **Was it CP or AP? Why?**
   ```
   
   ```

4. **What would happen during a network partition?**
   ```
   
   ```

5. **Was this the right choice for the use case?**
   ```
   
   ```

### Part 4: Draw Your Architecture

Draw your system's architecture highlighting:
- Where data is stored
- How data is replicated
- What happens during a partition

```
[Draw your architecture here]





```

### Part 5: Alternative Design

If you had chosen the opposite (CP → AP or AP → CP):

1. **What would change in the architecture?**
   ```
   
   ```

2. **What user experience would be different?**
   ```
   
   ```

3. **What trade-offs would you accept?**
   ```
   
   ```

---

## Example Solution

### System: E-commerce Shopping Cart

**Database:** Redis (in-memory) + PostgreSQL (orders)

**Classification:** 
- Shopping cart (Redis): AP - availability is more important than perfect consistency
- Orders (PostgreSQL): CP - must be consistent for financial transactions

**During partition:**
- Cart: User can still add/view items (might see stale data)
- Orders: Order placement may fail if master is unreachable

**Architecture:**
```
[User] → [Load Balancer]
              ↓
        [App Server]
         /        \
[Redis Cluster]  [PostgreSQL]
(Cart - AP)      (Orders - CP)
   |                  |
[Replica]       [Master-Slave]
```

**Right choice?** Yes, because:
- Cart data loss is acceptable (user can re-add items)
- Order data must never be lost or inconsistent

---

## Reflection Questions

After completing this exercise, you should be able to answer:

1. Why can't a distributed system have all three CAP properties?
2. When would you choose CP over AP?
3. When would you choose AP over CP?
4. How do real systems handle the CAP trade-off?

## Checklist

- [ ] Drew CAP triangle
- [ ] Classified 5+ real systems
- [ ] Analyzed a system I've worked on
- [ ] Drew my system's architecture
- [ ] Designed an alternative approach
- [ ] Can explain trade-offs verbally
