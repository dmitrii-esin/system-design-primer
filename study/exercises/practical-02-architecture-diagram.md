# Practical Exercise 2: Architecture Diagram

## Objective

Draw the architecture of a Node.js application you've worked on, identifying all infrastructure components.

## Instructions

### Part 1: Component Inventory

List all components in your system:

| Component Type | What You Used | Purpose |
|----------------|---------------|---------|
| Load Balancer | (e.g., NGINX, AWS ALB) | |
| Web Server | (e.g., Express, Fastify) | |
| Application Server | | |
| Cache | (e.g., Redis) | |
| Primary Database | (e.g., PostgreSQL) | |
| Secondary Database | | |
| Message Queue | (e.g., Bull, RabbitMQ) | |
| CDN | (e.g., CloudFlare, CloudFront) | |
| Object Storage | (e.g., S3) | |
| Third-party Services | | |

### Part 2: Draw the Architecture

Create a diagram showing all components and their connections:

```
[Draw your architecture here]

Example structure:

                        [CDN]
                          ↓
[Clients] ──→ [DNS] ──→ [Load Balancer]
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
              [Web Server 1]      [Web Server 2]
                    ↓                   ↓
                    └─────────┬─────────┘
                              ↓
                    [Application Logic]
                    /         |         \
                   ↓          ↓          ↓
              [Redis]    [PostgreSQL]  [S3]
                         /        \
                    [Primary]  [Replica]
```

Your diagram:

```










```

### Part 3: Traffic Flow Analysis

Trace a typical user request through your system:

**Example: User loads homepage**

```
1. Browser → DNS lookup → Get IP
2. Browser → CDN → Serve cached static assets
3. Browser → Load Balancer → Route to web server
4. Web Server → Check Redis cache
5. Cache miss → Query PostgreSQL
6. Store in Redis
7. Return response
```

**Your request flow (pick a key action):**

```
Action: ________________________________

1. 
2. 
3. 
4. 
5. 
6. 
```

### Part 4: Scaling Analysis

Answer these questions about your architecture:

1. **What's the bottleneck at 10x current traffic?**
   ```
   
   ```

2. **What's the single point of failure?**
   ```
   
   ```

3. **How would you add more capacity?**
   ```
   
   ```

4. **What would break at 100x traffic?**
   ```
   
   ```

### Part 5: Improved Architecture

Redraw your architecture with improvements to address:
- Bottlenecks
- Single points of failure
- Better scalability

```
[Draw improved architecture here]










```

**What changed and why:**

| Change | Reason |
|--------|--------|
| | |
| | |
| | |

---

## Component Deep Dives

For each major component, answer:

### Load Balancer
- Type: Layer 4 or Layer 7? Why?
- Algorithm: Round robin, least connections, etc.?
- Health checks configured?

```
Your answers:

```

### Caching Layer
- What's cached? (Sessions, queries, pages?)
- Cache invalidation strategy?
- TTL values?

```
Your answers:

```

### Database
- Primary-replica setup?
- Connection pooling?
- Read vs write split?

```
Your answers:

```

---

## Example: Typical Node.js Web App

```
                    [CloudFlare CDN]
                          ↓
                    [AWS Route 53]
                          ↓
                    [AWS ALB]
                    /        \
         [EC2: PM2 Cluster] [EC2: PM2 Cluster]
              (Express)          (Express)
                    \            /
                     \          /
                    [ElastiCache]
                      (Redis)
                         ↓
                    [RDS PostgreSQL]
                    /            \
              [Primary]      [Read Replica]
                    ↓
              [S3 Bucket]
            (File uploads)
                    ↓
              [SQS Queue]
                    ↓
              [Lambda Workers]
```

**Components explained:**
- **CloudFlare:** CDN + DDoS protection
- **Route 53:** DNS with health checks
- **ALB:** Layer 7 load balancing with sticky sessions
- **EC2 + PM2:** Node.js app with clustering
- **ElastiCache:** Redis for sessions + caching
- **RDS:** Managed PostgreSQL with auto-backups
- **S3:** Static files and user uploads
- **SQS + Lambda:** Background job processing

---

## Reflection Questions

1. Could you draw this architecture in an interview?
2. Can you explain why each component exists?
3. What would you change if starting over?
4. How does data flow for the most critical user action?

## Checklist

- [ ] Listed all components in my system
- [ ] Drew complete architecture diagram
- [ ] Traced request flow for key action
- [ ] Identified bottlenecks and SPOFs
- [ ] Drew improved architecture
- [ ] Can explain each component's purpose
