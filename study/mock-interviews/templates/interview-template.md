# System Design Mock Interview Template

## Instructions

- Set a timer for 45 minutes
- Use this template to structure your approach
- Practice explaining your design out loud

---

## Problem Statement

**System to design:** _________________________________

**Time started:** _______

---

## Step 1: Requirements (5-10 minutes)

### Clarifying Questions Asked

1. 
2. 
3. 
4. 
5. 

### Functional Requirements

- [ ] 
- [ ] 
- [ ] 
- [ ] 

### Non-Functional Requirements

| Requirement | Value | Notes |
|-------------|-------|-------|
| Users (DAU/MAU) | | |
| Requests/sec | | |
| Data size | | |
| Latency | | |
| Availability | | |
| Consistency | | |

### Scope

**In scope:**
- 
- 
- 

**Out of scope:**
- 
- 
- 

### Back-of-Envelope Calculations

```
Users:

QPS:

Storage:

Bandwidth:

```

---

## Step 2: High-Level Design (10-15 minutes)

### Architecture Diagram

```
[Draw your architecture here]












```

### Component List

| Component | Purpose |
|-----------|---------|
| | |
| | |
| | |
| | |
| | |

---

## Step 3: Core Components (10-15 minutes)

### API Design

```
Endpoint 1:
  Method: 
  Path: 
  Request: 
  Response: 

Endpoint 2:
  Method: 
  Path: 
  Request: 
  Response: 

Endpoint 3:
  Method: 
  Path: 
  Request: 
  Response: 
```

### Data Model

```sql
-- Table 1


-- Table 2


-- Indexes

```

### Key Algorithm/Logic

```
[Describe the core algorithm or data flow]





```

---

## Step 4: Scale & Deep Dive (10-15 minutes)

### Bottleneck Analysis

| Component | Bottleneck | Solution |
|-----------|------------|----------|
| | | |
| | | |
| | | |

### Scaling Strategy

**Database:**
```

```

**Cache:**
```

```

**Application:**
```

```

### Trade-offs Discussed

| Decision | Pros | Cons |
|----------|------|------|
| | | |
| | | |
| | | |

### Failure Scenarios

| Scenario | Impact | Mitigation |
|----------|--------|------------|
| DB fails | | |
| Cache fails | | |
| Region down | | |

---

## Post-Interview Reflection

**Time ended:** _______   **Total time:** _______

### What went well?

1. 
2. 
3. 

### What could improve?

1. 
2. 
3. 

### Topics to review:

- [ ] 
- [ ] 
- [ ] 

### Score (self-assessment)

| Criteria | Score (1-5) |
|----------|-------------|
| Requirements gathering | /5 |
| High-level design | /5 |
| Component detail | /5 |
| Scaling discussion | /5 |
| Communication | /5 |
| Time management | /5 |
| **Total** | **/30** |

---

## Notes for Next Attempt

```




```

---

## Common Problems to Practice

Use this template for each of these problems:

### Week 7-8 (With solutions in repo)
- [ ] Design Pastebin/URL Shortener
- [ ] Design Twitter Timeline
- [ ] Design Web Crawler
- [ ] Design Mint.com
- [ ] Design Social Graph
- [ ] Design Query Cache
- [ ] Design Sales Rank
- [ ] Design System on AWS

### Week 12 (Additional practice)
- [ ] Design Dropbox/File Sync
- [ ] Design Google Docs
- [ ] Design WhatsApp
- [ ] Design Instagram
- [ ] Design YouTube
- [ ] Design API Rate Limiter
- [ ] Design Uber
- [ ] Design Yelp/Nearby Search
- [ ] Design Ticketmaster

### Object-Oriented Design
- [ ] Design LRU Cache
- [ ] Design Parking Lot
- [ ] Design Chess
- [ ] Design Elevator System
- [ ] Design Library Management
