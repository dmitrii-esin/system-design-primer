# Week 2: Infrastructure Components

## Domain Name System (DNS)

Translates domain names (www.example.com) to IP addresses.

### DNS Hierarchy
```
Root DNS (.com, .org, etc.)
        ↓
   TLD Servers
        ↓
  Authoritative DNS
        ↓
   Local DNS Cache
        ↓
    Your Browser
```

### DNS Record Types

| Type | Name | Purpose |
|------|------|---------|
| **NS** | Name Server | Specifies DNS servers for domain |
| **MX** | Mail Exchange | Specifies mail servers |
| **A** | Address | Points name to IPv4 address |
| **AAAA** | Address | Points name to IPv6 address |
| **CNAME** | Canonical | Points name to another name |

### DNS Routing Methods
1. **Weighted Round Robin** - Distribute by weight
2. **Latency-based** - Route to lowest latency
3. **Geolocation-based** - Route by user location

### DNS Disadvantages
- Slight delay (mitigated by caching)
- Complex management
- DDoS vulnerability

**Services:** CloudFlare, AWS Route 53, Google Cloud DNS

---

## Content Delivery Network (CDN)

Globally distributed proxy servers serving content from locations closer to users.

### How CDN Works
```
User (Tokyo) → CDN Edge (Tokyo) → Origin Server (US)
                   ↓
            Cached Content
```

### Push CDN
- **You upload** content to CDN when it changes
- Full control over content and expiration
- **Best for:** Small traffic sites, rarely changing content
- More storage, less traffic

### Pull CDN
- **CDN fetches** content on first request, then caches
- Slower first request (cache miss)
- **Best for:** Heavy traffic sites
- Less storage, redundant traffic on expiration

### CDN Comparison

| Aspect | Push CDN | Pull CDN |
|--------|----------|----------|
| Content upload | Manual | Automatic |
| First request | Fast | Slow (cache miss) |
| Storage cost | Higher | Lower |
| Best for | Static, small sites | Dynamic, high traffic |

### CDN Disadvantages
- Cost (but often worth it)
- Stale content before TTL expires
- Requires URL changes for static content

**Services:** CloudFlare, AWS CloudFront, Akamai, Fastly

---

## Load Balancer

Distributes incoming requests across multiple servers.

### Benefits
- Prevents overloading single servers
- Eliminates single point of failure
- SSL termination (offload encryption)
- Session persistence (sticky sessions)

### Load Balancer Architecture
```
                    ┌─→ [Server 1]
[Client] → [LB] ────┼─→ [Server 2]
                    └─→ [Server 3]
```

### Layer 4 vs Layer 7 Load Balancing

| Aspect | Layer 4 (Transport) | Layer 7 (Application) |
|--------|---------------------|----------------------|
| Inspects | IP, Port | Headers, Cookies, URL |
| Speed | Faster | Slower |
| Flexibility | Limited | High |
| Use case | Simple distribution | Content-based routing |

**Layer 4 Example:** Route all traffic to server pool
**Layer 7 Example:** Route /api to API servers, /static to CDN

### Load Balancing Algorithms

| Algorithm | Description |
|-----------|-------------|
| Round Robin | Each server in turn |
| Weighted Round Robin | Based on server capacity |
| Least Connections | To server with fewest active connections |
| IP Hash | Based on client IP (session persistence) |
| Random | Random selection |

### High Availability Load Balancers
```
[Active LB] ←heartbeat→ [Passive LB]
      ↓
 [Server Pool]
```

**Software:** HAProxy, NGINX, Envoy
**Cloud:** AWS ELB/ALB, GCP Load Balancer

---

## Reverse Proxy

Web server that forwards requests to backend servers.

### Forward Proxy vs Reverse Proxy
```
Forward: [Client] → [Proxy] → [Internet] → [Server]
         (Proxy hides client)

Reverse: [Client] → [Internet] → [Proxy] → [Server]
         (Proxy hides server)
```

### Reverse Proxy Benefits
- **Security** - Hide backend, IP blacklisting, rate limiting
- **Scalability** - Scale backend independently
- **SSL Termination** - Handle HTTPS at proxy
- **Compression** - Compress responses
- **Caching** - Cache responses
- **Static Content** - Serve directly without hitting backend

### Load Balancer vs Reverse Proxy

| Scenario | Use |
|----------|-----|
| Single backend server | Reverse Proxy |
| Multiple servers, same function | Load Balancer |
| Multiple servers, content routing | Both |

**Software:** NGINX, HAProxy, Apache, Traefik

---

## Application Layer

### Separating Web and Application Layers

```
[Client] → [Web Server] → [App Server] → [Database]
              (NGINX)       (Node.js)     (PostgreSQL)
```

**Benefits:**
- Scale independently
- Different optimization strategies
- Separate concerns

### Microservices

Suite of small, independently deployable services.

```
                    ┌─→ [User Service]
[API Gateway] ──────┼─→ [Order Service]
                    ├─→ [Payment Service]
                    └─→ [Notification Service]
```

**Characteristics:**
- Single responsibility
- Independent deployment
- Own database (often)
- Lightweight communication (HTTP/gRPC)

**Example (Pinterest):**
- User profile service
- Follower service
- Feed service
- Search service
- Photo upload service

### Service Discovery

How services find each other in dynamic environments.

**Tools:** Consul, Etcd, Zookeeper, Kubernetes DNS

```
[Service A] → [Service Registry] ← [Service B]
                    ↓
            "Service B at 10.0.0.5:8080"
```

**Health Checks:** Regular HTTP pings to verify service health

### Application Layer Disadvantages
- Architectural complexity
- Operational overhead
- Network latency between services
- Distributed system challenges

---

## Horizontal Scaling

Adding more machines vs upgrading existing ones.

### Vertical vs Horizontal Scaling

| Aspect | Vertical | Horizontal |
|--------|----------|------------|
| Approach | Bigger machine | More machines |
| Cost | Expensive hardware | Commodity hardware |
| Limit | Hardware limits | Practically unlimited |
| Complexity | Simple | Complex |
| Downtime | Required for upgrades | Rolling updates |
| Failure | Single point | Fault tolerant |

### Horizontal Scaling Requirements

1. **Stateless servers** - No session data on server
2. **Centralized session storage** - Redis, database
3. **Shared storage** - For files, assets
4. **Database scaling** - Replication, sharding

### Node.js Specific (For JS Developers)

**PM2 Cluster Mode:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    instances: 'max',  // Use all CPU cores
    exec_mode: 'cluster'
  }]
}
```

**Behind Load Balancer:**
```
[NGINX/HAProxy]
      ↓
┌─────┼─────┐
↓     ↓     ↓
[PM2] [PM2] [PM2]
(Node) (Node) (Node)
```

---

## Study Checklist

- [ ] Can explain DNS resolution process
- [ ] Know difference between Push and Pull CDN
- [ ] Understand Layer 4 vs Layer 7 load balancing
- [ ] Can explain reverse proxy benefits
- [ ] Understand microservices pros/cons
- [ ] Know when to use vertical vs horizontal scaling

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| DNS | Translates domain names to IP addresses |
| CDN | Distributed network serving content from nearby locations |
| Push CDN | You upload content; best for small/static sites |
| Pull CDN | CDN fetches on request; best for high traffic |
| Load Balancer | Distributes traffic across multiple servers |
| Layer 4 LB | Routes based on IP/port (transport layer) |
| Layer 7 LB | Routes based on content (application layer) |
| Reverse Proxy | Server that forwards requests to backends |
| Microservices | Small, independent, deployable services |
| Service Discovery | How services find each other dynamically |
