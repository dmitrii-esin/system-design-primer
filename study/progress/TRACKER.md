# System Design Study Progress Tracker

## Overview

| Week | Phase | Status | Start Date | End Date |
|------|-------|--------|------------|----------|
| 1 | Foundation - Core Concepts | ⬜ Not Started | | |
| 2 | Foundation - Infrastructure | ⬜ Not Started | | |
| 3 | Foundation - Databases | ⬜ Not Started | | |
| 4 | Intermediate - Caching | ⬜ Not Started | | |
| 5 | Intermediate - Async | ⬜ Not Started | | |
| 6 | Intermediate - Interview Framework | ⬜ Not Started | | |
| 7 | Practice - Problems Set 1 | ⬜ Not Started | | |
| 8 | Practice - Problems Set 2 | ⬜ Not Started | | |
| 9 | Practice - Advanced Problems | ⬜ Not Started | | |
| 10 | Practice - OO Design | ⬜ Not Started | | |
| 11 | Advanced - Real Architectures | ⬜ Not Started | | |
| 12 | Advanced - Mock Interviews | ⬜ Not Started | | |

**Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Week 1: Core Concepts and Setup

### Day 1-2: Environment Setup
- [ ] Install Anki
- [ ] Import System Design.apkg
- [ ] Import System Design Exercises.apkg
- [ ] Import OO Design.apkg
- [ ] Configure Anki settings

### Day 3-4: Scalability Fundamentals
- [ ] Watch Harvard Scalability Lecture (1 hour)
- [ ] Read Scalability for Dummies Part 1: Clones
- [ ] Read Scalability for Dummies Part 2: Database
- [ ] Read Scalability for Dummies Part 3: Cache
- [ ] Read Scalability for Dummies Part 4: Asynchronism
- [ ] Study README: Performance vs Scalability
- [ ] Study README: Latency vs Throughput

### Day 5-7: Trade-offs Deep Dive
- [ ] Study README: CAP Theorem
- [ ] Study README: Consistency Patterns (Weak, Eventual, Strong)
- [ ] Memorize Latency Numbers (see notes/reference/latency-numbers.md)
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-01-cap-diagram.md

**Week 1 Notes:**
```
(Add your notes here)
```

---

## Week 2: Infrastructure Components

### Day 1-2: DNS and CDN
- [ ] Study README: Domain Name System
- [ ] Study README: Content Delivery Network
- [ ] Understand Push vs Pull CDNs
- [ ] Map to JS experience (Vercel, Cloudflare)

### Day 3-4: Load Balancers
- [ ] Study README: Load Balancer section
- [ ] Understand Layer 4 vs Layer 7
- [ ] Study Horizontal Scaling
- [ ] Relate to Node.js clustering

### Day 5-7: Reverse Proxy and Application Layer
- [ ] Study README: Reverse Proxy
- [ ] Study README: Application Layer
- [ ] Study README: Microservices
- [ ] Study README: Service Discovery
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-02-architecture-diagram.md

**Week 2 Notes:**
```
(Add your notes here)
```

---

## Week 3: Database Fundamentals

### Day 1-3: SQL Databases
- [ ] Study README: RDBMS section
- [ ] Study Master-slave replication
- [ ] Study Master-master replication
- [ ] Study Federation
- [ ] Study Sharding
- [ ] Study Denormalization
- [ ] Study SQL Tuning

### Day 4-5: NoSQL Databases
- [ ] Study README: NoSQL section
- [ ] Study Key-value stores
- [ ] Study Document stores
- [ ] Study Wide column stores
- [ ] Study Graph databases

### Day 6-7: SQL vs NoSQL
- [ ] Study README: SQL or NoSQL section
- [ ] Understand ACID vs BASE
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-03-db-justification.md

**Week 3 Notes:**
```
(Add your notes here)
```

---

## Week 4: Caching Strategies

### Day 1-3: Caching Layers
- [ ] Study README: Cache section
- [ ] Study Client caching
- [ ] Study CDN caching
- [ ] Study Web server caching
- [ ] Study Database caching
- [ ] Study Application caching

### Day 4-7: Cache Update Strategies
- [ ] Study Cache-aside pattern
- [ ] Study Write-through pattern
- [ ] Study Write-behind pattern
- [ ] Study Refresh-ahead pattern
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-04-cache-aside.md

**Week 4 Notes:**
```
(Add your notes here)
```

---

## Week 5: Asynchronous Processing

### Day 1-3: Message Queues
- [ ] Study README: Asynchronism section
- [ ] Study Message queues
- [ ] Study Task queues
- [ ] Compare RabbitMQ, Redis, SQS

### Day 4-5: Back Pressure
- [ ] Study README: Back pressure
- [ ] Understand queue management
- [ ] Study rate limiting

### Day 6-7: Communication Protocols
- [ ] Study README: TCP section
- [ ] Study README: UDP section
- [ ] Study README: RPC section
- [ ] Study README: REST section
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-05-notification-system.md

**Week 5 Notes:**
```
(Add your notes here)
```

---

## Week 6: Interview Framework

### Day 1-2: 4-Step Approach
- [ ] Study README: How to approach a system design interview question
- [ ] Master Step 1: Outline use cases, constraints, assumptions
- [ ] Master Step 2: Create high-level design
- [ ] Master Step 3: Design core components
- [ ] Master Step 4: Scale the design

### Day 3-5: Back-of-the-envelope Calculations
- [ ] Memorize Powers of two table
- [ ] Practice estimation exercises
- [ ] Master request/second calculations

### Day 6-7: Review and Practice
- [ ] Watch System Design Interview Intro video
- [ ] Re-read interview approach section
- [ ] Daily Anki reviews completed

### Practical Exercise
- [ ] Complete exercises/practical-06-estimation.md

**Week 6 Notes:**
```
(Add your notes here)
```

---

## Week 7: System Design Problems - Set 1

### Day 1-2: Design Pastebin/Bit.ly
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/pastebin/README.md
- [ ] Identify gaps in approach
- [ ] Re-attempt after 2 days

### Day 3-4: Design Twitter Timeline
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/twitter/README.md
- [ ] Identify gaps in approach
- [ ] Re-attempt after 2 days

### Day 5-7: Design Web Crawler
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/web_crawler/README.md
- [ ] Identify gaps in approach
- [ ] Daily Anki reviews completed

**Week 7 Notes:**
```
(Add your notes here)
```

---

## Week 8: System Design Problems - Set 2

### Day 1-2: Design Mint.com
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/mint/README.md
- [ ] Identify gaps in approach

### Day 3-4: Design Social Graph
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/social_graph/README.md
- [ ] Identify gaps in approach

### Day 5-7: Design Query Cache
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/query_cache/README.md
- [ ] Identify gaps in approach
- [ ] Daily Anki reviews completed

**Week 8 Notes:**
```
(Add your notes here)
```

---

## Week 9: Advanced System Design Problems

### Day 1-2: Design Sales Rank
- [ ] Attempt solution independently (30 min)
- [ ] Review solutions/system_design/sales_rank/README.md
- [ ] Understand MapReduce patterns

### Day 3-5: Design System at Scale on AWS
- [ ] Study solutions/system_design/scaling_aws/README.md thoroughly
- [ ] Understand iterative scaling approach
- [ ] Map AWS services to concepts

### Day 6-7: Review and Consolidation
- [ ] Review all problems solved so far
- [ ] Create personal summary notes
- [ ] Daily Anki reviews completed

**Week 9 Notes:**
```
(Add your notes here)
```

---

## Week 10: Object-Oriented Design Problems

### Day 1-2: LRU Cache
- [ ] Study solutions/object_oriented_design/lru_cache/lru_cache.ipynb
- [ ] Implement in JavaScript/TypeScript

### Day 3-4: Hash Map
- [ ] Study solutions/object_oriented_design/hash_table/hash_map.ipynb
- [ ] Understand collision handling

### Day 5-6: Parking Lot
- [ ] Study solutions/object_oriented_design/parking_lot/parking_lot.ipynb
- [ ] Apply OO design principles

### Day 7: Online Chat
- [ ] Study solutions/object_oriented_design/online_chat/online_chat.ipynb
- [ ] Daily Anki reviews completed

**Week 10 Notes:**
```
(Add your notes here)
```

---

## Week 11: Real-World Architectures

### Day 1-2: Twitter Architecture
- [ ] Read Twitter timeline scalability article
- [ ] Study how they handle 150M users

### Day 3-4: Netflix and Instagram
- [ ] Read Netflix architecture article
- [ ] Read Instagram architecture article

### Day 5-6: Facebook/WhatsApp
- [ ] Read Facebook engineering articles
- [ ] Read WhatsApp architecture article

### Day 7: Target Company Engineering Blogs
- [ ] Read 2-3 blogs from companies you're targeting
- [ ] Daily Anki reviews completed

**Week 11 Notes:**
```
(Add your notes here)
```

---

## Week 12: Mock Interviews and Final Review

### Day 1-3: Additional Problems
- [ ] Design Dropbox file sync
- [ ] Design Google Docs
- [ ] Design WhatsApp
- [ ] Design API rate limiter

### Day 4-5: Mock Interviews
- [ ] Schedule mock interview 1
- [ ] Complete mock interview 1
- [ ] Schedule mock interview 2
- [ ] Complete mock interview 2

### Day 6-7: Final Review
- [ ] Complete all outstanding Anki reviews
- [ ] Re-read interview approach framework
- [ ] Light review of key patterns
- [ ] Self-assessment

**Week 12 Notes:**
```
(Add your notes here)
```

---

## Daily Log

Use this section to log your daily study sessions:

| Date | Time Spent | Topics Covered | Anki Cards Reviewed | Notes |
|------|------------|----------------|---------------------|-------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## Reflection Questions (End of Each Week)

1. What concepts do I understand well now?
2. What concepts still feel unclear?
3. What should I review more next week?
4. Am I keeping up with Anki reviews?
5. What practical exercises helped most?
