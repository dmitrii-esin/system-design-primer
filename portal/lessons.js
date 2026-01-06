// System Design Mastery - Lessons Data
// All content converted from markdown study materials

const LESSONS = [
  {
    id: 'week1',
    week: 1,
    title: 'Core Concepts & Foundations',
    phase: 'Foundation',
    duration: '3-4 hours',
    description: 'Master the fundamental concepts: CAP theorem, consistency patterns, and availability.',
    topics: ['CAP Theorem', 'Consistency Patterns', 'Availability', 'Scalability Basics'],
    content: `
      <h1>Week 1: Core Concepts & Foundations</h1>
      
      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand the difference between performance and scalability problems</li>
          <li>Master CAP theorem and know when to choose CP vs AP</li>
          <li>Learn consistency patterns: weak, eventual, and strong</li>
          <li>Calculate availability for systems in sequence and parallel</li>
        </ul>
      </div>

      <h2>Performance vs Scalability</h2>
      <p>A service is <strong>scalable</strong> if it results in increased <strong>performance</strong> proportional to resources added.</p>
      
      <table>
        <thead>
          <tr><th>Problem Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Performance problem</strong></td><td>System is slow for a single user</td></tr>
          <tr><td><strong>Scalability problem</strong></td><td>System is fast for one user but slow under heavy load</td></tr>
        </tbody>
      </table>

      <h2>Latency vs Throughput</h2>
      <table>
        <thead>
          <tr><th>Concept</th><th>Definition</th><th>Goal</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Latency</strong></td><td>Time to perform an action</td><td>Minimize</td></tr>
          <tr><td><strong>Throughput</strong></td><td>Actions per unit of time</td><td>Maximize</td></tr>
        </tbody>
      </table>
      <p><strong>Aim for:</strong> Maximum throughput with acceptable latency</p>

      <h2>CAP Theorem</h2>
      <p>In a distributed system, you can only guarantee <strong>2 of 3</strong> properties:</p>
      
      <div class="diagram">
        Consistency
           /\\
          /  \\
         /    \\
        /      \\
       /________\\
Availability  Partition Tolerance
      </div>

      <table>
        <thead>
          <tr><th>Property</th><th>Definition</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Consistency</strong></td><td>Every read receives the most recent write or an error</td></tr>
          <tr><td><strong>Availability</strong></td><td>Every request receives a response (no guarantee it's the latest)</td></tr>
          <tr><td><strong>Partition Tolerance</strong></td><td>System operates despite network partitions</td></tr>
        </tbody>
      </table>

      <div class="tip-box">
        <strong>💡 Reality Check:</strong> Networks are unreliable → must support Partition Tolerance → choose between C and A
      </div>

      <h3>CP (Consistency + Partition Tolerance)</h3>
      <ul>
        <li>Wait for partitioned node → may timeout</li>
        <li>Good for: atomic reads/writes (banking, inventory)</li>
        <li>Examples: MongoDB (in certain configs), HBase</li>
      </ul>

      <h3>AP (Availability + Partition Tolerance)</h3>
      <ul>
        <li>Return most available data (might be stale)</li>
        <li>Good for: eventual consistency acceptable</li>
        <li>Examples: Cassandra, CouchDB, DynamoDB</li>
      </ul>

      <h2>Consistency Patterns</h2>

      <h3>1. Weak Consistency</h3>
      <ul>
        <li>After write, reads <strong>may or may not</strong> see it</li>
        <li>Best effort approach</li>
        <li><strong>Use case:</strong> VoIP, video chat, real-time games</li>
      </ul>

      <h3>2. Eventual Consistency</h3>
      <ul>
        <li>After write, reads will <strong>eventually</strong> see it (typically milliseconds)</li>
        <li>Data replicated asynchronously</li>
        <li><strong>Use case:</strong> DNS, email, social media feeds</li>
      </ul>

      <h3>3. Strong Consistency</h3>
      <ul>
        <li>After write, reads <strong>will</strong> see it immediately</li>
        <li>Data replicated synchronously</li>
        <li><strong>Use case:</strong> Financial transactions, inventory</li>
      </ul>

      <h2>Availability in Numbers (The 9s)</h2>
      <table>
        <thead>
          <tr><th>Availability</th><th>Downtime/Year</th><th>Downtime/Month</th><th>Downtime/Day</th></tr>
        </thead>
        <tbody>
          <tr><td>99% (two 9s)</td><td>3.65 days</td><td>7.31 hours</td><td>14.4 min</td></tr>
          <tr><td>99.9% (three 9s)</td><td>8h 45m</td><td>43m 50s</td><td>1m 26s</td></tr>
          <tr><td>99.99% (four 9s)</td><td>52m 36s</td><td>4m 23s</td><td>8.6s</td></tr>
          <tr><td>99.999% (five 9s)</td><td>5m 15s</td><td>26s</td><td>0.86s</td></tr>
        </tbody>
      </table>

      <h3>Availability Calculations</h3>
      <ul>
        <li><strong>In sequence:</strong> <code>Availability(Total) = A(Foo) × A(Bar)</code></li>
        <li><strong>In parallel:</strong> <code>Availability(Total) = 1 - (1 - A(Foo)) × (1 - A(Bar))</code></li>
      </ul>

      <h2>Vertical vs Horizontal Scaling</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Vertical</th><th>Horizontal</th></tr>
        </thead>
        <tbody>
          <tr><td>Approach</td><td>Bigger machine</td><td>More machines</td></tr>
          <tr><td>Cost</td><td>Expensive hardware</td><td>Commodity hardware</td></tr>
          <tr><td>Limit</td><td>Hardware limits</td><td>Practically unlimited</td></tr>
          <tr><td>Complexity</td><td>Simple</td><td>Complex</td></tr>
          <tr><td>Downtime</td><td>Required for upgrades</td><td>Rolling updates</td></tr>
          <tr><td>Failure</td><td>Single point</td><td>Fault tolerant</td></tr>
        </tbody>
      </table>
    `,
    exercises: [
      {
        title: 'CAP Classification Exercise',
        description: 'Classify real-world systems as CP or AP',
        content: `
          <h3>Exercise: Classify These Systems</h3>
          <p>For each system below, determine if it's CP or AP and explain why:</p>
          <ol>
            <li><strong>Bank account balance system</strong></li>
            <li><strong>Social media likes counter</strong></li>
            <li><strong>Shopping cart</strong></li>
            <li><strong>Flight booking inventory</strong></li>
            <li><strong>DNS (Domain Name System)</strong></li>
          </ol>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answers</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <ul>
                <li><strong>Bank account:</strong> CP - must be accurate, can't have wrong balance</li>
                <li><strong>Social media likes:</strong> AP - eventual consistency is fine</li>
                <li><strong>Shopping cart:</strong> AP - availability more important than exact count</li>
                <li><strong>Flight booking:</strong> CP - can't oversell seats</li>
                <li><strong>DNS:</strong> AP - stale data OK for short time</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        title: 'Availability Calculation',
        description: 'Calculate combined availability for systems',
        content: `
          <h3>Exercise: Calculate Availability</h3>
          <p><strong>Problem 1:</strong> Two services in sequence, each 99.9% available. What's the combined availability?</p>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answer</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <p>99.9% × 99.9% = 99.8% (0.999 × 0.999 = 0.998)</p>
            </div>
          </div>
          
          <p><strong>Problem 2:</strong> Two services in parallel, each 99% available. What's the combined availability?</p>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answer</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <p>1 - (1 - 0.99) × (1 - 0.99) = 1 - 0.01 × 0.01 = 1 - 0.0001 = 99.99%</p>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'What is the difference between a performance problem and a scalability problem?',
        answer: 'Performance problem: System is slow for a single user. Scalability problem: System is fast for one user but slow under heavy load.'
      },
      {
        question: 'Explain CAP theorem. Why can you only have 2 of 3?',
        answer: 'CAP = Consistency, Availability, Partition Tolerance. In a distributed system, network partitions WILL happen. When they do, you must choose: CP (reject requests until partition heals) or AP (serve potentially stale data).'
      },
      {
        question: 'What\'s "five nines" availability in downtime per year?',
        answer: '99.999% = approximately 5 minutes downtime per year'
      }
    ]
  },
  {
    id: 'week2',
    week: 2,
    title: 'Infrastructure Components',
    phase: 'Foundation',
    duration: '3-4 hours',
    description: 'Learn about DNS, CDN, Load Balancers, Reverse Proxies, and Microservices.',
    topics: ['DNS', 'CDN', 'Load Balancers', 'Reverse Proxy', 'Microservices'],
    content: `
      <h1>Week 2: Infrastructure Components</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand DNS resolution and routing methods</li>
          <li>Know the difference between Push and Pull CDN</li>
          <li>Master Layer 4 vs Layer 7 load balancing</li>
          <li>Understand reverse proxy benefits and use cases</li>
        </ul>
      </div>

      <h2>Domain Name System (DNS)</h2>
      <p>Translates domain names (www.example.com) to IP addresses.</p>

      <h3>DNS Hierarchy</h3>
      <div class="diagram">
Root DNS (.com, .org, etc.)
        ↓
   TLD Servers
        ↓
  Authoritative DNS
        ↓
   Local DNS Cache
        ↓
    Your Browser
      </div>

      <h3>DNS Record Types</h3>
      <table>
        <thead>
          <tr><th>Type</th><th>Name</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>NS</strong></td><td>Name Server</td><td>Specifies DNS servers for domain</td></tr>
          <tr><td><strong>MX</strong></td><td>Mail Exchange</td><td>Specifies mail servers</td></tr>
          <tr><td><strong>A</strong></td><td>Address</td><td>Points name to IPv4 address</td></tr>
          <tr><td><strong>AAAA</strong></td><td>Address</td><td>Points name to IPv6 address</td></tr>
          <tr><td><strong>CNAME</strong></td><td>Canonical</td><td>Points name to another name</td></tr>
        </tbody>
      </table>

      <h2>Content Delivery Network (CDN)</h2>
      <p>Globally distributed proxy servers serving content from locations closer to users.</p>

      <div class="diagram">
User (Tokyo) → CDN Edge (Tokyo) → Origin Server (US)
                   ↓
            Cached Content
      </div>

      <h3>Push vs Pull CDN</h3>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Push CDN</th><th>Pull CDN</th></tr>
        </thead>
        <tbody>
          <tr><td>Content upload</td><td>Manual</td><td>Automatic</td></tr>
          <tr><td>First request</td><td>Fast</td><td>Slow (cache miss)</td></tr>
          <tr><td>Storage cost</td><td>Higher</td><td>Lower</td></tr>
          <tr><td>Best for</td><td>Static, small sites</td><td>Dynamic, high traffic</td></tr>
        </tbody>
      </table>

      <h2>Load Balancer</h2>
      <p>Distributes incoming requests across multiple servers.</p>

      <div class="diagram">
                    ┌─→ [Server 1]
[Client] → [LB] ────┼─→ [Server 2]
                    └─→ [Server 3]
      </div>

      <h3>Layer 4 vs Layer 7 Load Balancing</h3>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Layer 4 (Transport)</th><th>Layer 7 (Application)</th></tr>
        </thead>
        <tbody>
          <tr><td>Inspects</td><td>IP, Port</td><td>Headers, Cookies, URL</td></tr>
          <tr><td>Speed</td><td>Faster</td><td>Slower</td></tr>
          <tr><td>Flexibility</td><td>Limited</td><td>High</td></tr>
          <tr><td>Use case</td><td>Simple distribution</td><td>Content-based routing</td></tr>
        </tbody>
      </table>

      <h3>Load Balancing Algorithms</h3>
      <table>
        <thead>
          <tr><th>Algorithm</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Round Robin</td><td>Each server in turn</td></tr>
          <tr><td>Weighted Round Robin</td><td>Based on server capacity</td></tr>
          <tr><td>Least Connections</td><td>To server with fewest active connections</td></tr>
          <tr><td>IP Hash</td><td>Based on client IP (session persistence)</td></tr>
        </tbody>
      </table>

      <h2>Reverse Proxy</h2>
      <p>Web server that forwards requests to backend servers.</p>

      <div class="diagram">
Forward: [Client] → [Proxy] → [Internet] → [Server]
         (Proxy hides client)

Reverse: [Client] → [Internet] → [Proxy] → [Server]
         (Proxy hides server)
      </div>

      <h3>Reverse Proxy Benefits</h3>
      <ul>
        <li><strong>Security</strong> - Hide backend, IP blacklisting, rate limiting</li>
        <li><strong>Scalability</strong> - Scale backend independently</li>
        <li><strong>SSL Termination</strong> - Handle HTTPS at proxy</li>
        <li><strong>Compression</strong> - Compress responses</li>
        <li><strong>Caching</strong> - Cache responses</li>
        <li><strong>Static Content</strong> - Serve directly without hitting backend</li>
      </ul>

      <h2>Microservices</h2>
      <p>Suite of small, independently deployable services.</p>

      <div class="diagram">
                    ┌─→ [User Service]
[API Gateway] ──────┼─→ [Order Service]
                    ├─→ [Payment Service]
                    └─→ [Notification Service]
      </div>

      <h3>Microservices Characteristics</h3>
      <ul>
        <li>Single responsibility</li>
        <li>Independent deployment</li>
        <li>Own database (often)</li>
        <li>Lightweight communication (HTTP/gRPC)</li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Trade-offs:</strong> Microservices add operational complexity, network latency, and distributed system challenges.
      </div>
    `,
    exercises: [
      {
        title: 'Architecture Diagram Exercise',
        description: 'Draw a complete infrastructure diagram',
        content: `
          <h3>Exercise: Design Infrastructure</h3>
          <p>Draw an architecture diagram for a web application with the following requirements:</p>
          <ul>
            <li>Handle 10,000 requests/second</li>
            <li>Serve static assets efficiently</li>
            <li>High availability (no single point of failure)</li>
          </ul>
          <p>Include: DNS, CDN, Load Balancer, Application Servers, Database, Cache</p>
          
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Solution</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <div class="diagram">
[Users]
   ↓
[DNS] → [CDN] (static assets)
   ↓
[Load Balancer] (Active-Passive for HA)
   ↓
┌─────────────────┐
│   API Servers   │
│  (3+ instances) │
└─────────────────┘
   ↓
[Redis Cache] ←→ [PostgreSQL]
                  (Master + Read Replicas)
              </div>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'What\'s the difference between Push CDN and Pull CDN?',
        answer: 'Push: You upload content proactively, best for small/static sites. Pull: CDN fetches on first request and caches, best for high-traffic dynamic sites.'
      },
      {
        question: 'When would you use Layer 4 vs Layer 7 load balancing?',
        answer: 'Layer 4: Simple TCP/UDP routing, maximum performance. Layer 7: Route by URL/headers, SSL termination, A/B testing.'
      },
      {
        question: 'What\'s the difference between a reverse proxy and a load balancer?',
        answer: 'Reverse proxy sits in front of servers for security/caching (works with single server). Load balancer distributes traffic across multiple servers (requires multiple backends).'
      }
    ]
  },
  {
    id: 'week3',
    week: 3,
    title: 'Database Fundamentals',
    phase: 'Foundation',
    duration: '4-5 hours',
    description: 'Master SQL databases, NoSQL types, replication, sharding, and when to use each.',
    topics: ['ACID', 'Replication', 'Sharding', 'SQL vs NoSQL', 'Database Types'],
    content: `
      <h1>Week 3: Database Fundamentals</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand ACID properties and their importance</li>
          <li>Master replication strategies: master-slave vs master-master</li>
          <li>Know when to use sharding vs federation</li>
          <li>Understand all 4 NoSQL types with use cases</li>
        </ul>
      </div>

      <h2>ACID Properties</h2>
      <table>
        <thead>
          <tr><th>Property</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Atomicity</strong></td><td>All or nothing</td><td>Transfer: debit AND credit both happen or neither</td></tr>
          <tr><td><strong>Consistency</strong></td><td>Valid state to valid state</td><td>Balance can't go negative if rule exists</td></tr>
          <tr><td><strong>Isolation</strong></td><td>Concurrent txns don't interfere</td><td>Two withdrawals don't overdraw</td></tr>
          <tr><td><strong>Durability</strong></td><td>Committed = permanent</td><td>Crash after commit, data survives</td></tr>
        </tbody>
      </table>

      <h2>Database Replication</h2>

      <h3>Master-Slave Replication</h3>
      <div class="diagram">
        [Master]
       /    |    \\
      ↓     ↓     ↓
[Slave 1][Slave 2][Slave 3]
      </div>
      <ul>
        <li><strong>Master:</strong> Handles reads AND writes</li>
        <li><strong>Slaves:</strong> Handle reads only, replicate from master</li>
      </ul>
      <p><strong>Pros:</strong> Read scaling, backups without affecting master</p>
      <p><strong>Cons:</strong> Write bottleneck, replication lag</p>

      <h3>Master-Master Replication</h3>
      <div class="diagram">
[Master A] ←──sync──→ [Master B]
     ↑                      ↑
     └──────[Traffic]───────┘
      </div>
      <p><strong>Pros:</strong> No single point of failure for writes</p>
      <p><strong>Cons:</strong> Conflict resolution complexity</p>

      <h2>Scaling Strategies</h2>

      <h3>Federation (Functional Partitioning)</h3>
      <p>Split databases by function/domain.</p>
      <div class="diagram">
[App Server]
     |
     ├──→ [Users DB]
     ├──→ [Products DB]
     └──→ [Orders DB]
      </div>

      <h3>Sharding (Horizontal Partitioning)</h3>
      <p>Split data across multiple databases by a shard key.</p>
      <div class="diagram">
          [Shard Router]
         /      |       \\
        ↓       ↓        ↓
[Shard 0]  [Shard 1]  [Shard 2]
 (A-H)      (I-P)      (Q-Z)
      </div>

      <table>
        <thead>
          <tr><th>Strategy</th><th>Description</th><th>Pros</th><th>Cons</th></tr>
        </thead>
        <tbody>
          <tr><td>Range</td><td>By value ranges (A-H, I-P)</td><td>Simple, range queries</td><td>Uneven distribution</td></tr>
          <tr><td>Hash</td><td>hash(key) % num_shards</td><td>Even distribution</td><td>No range queries</td></tr>
          <tr><td>Directory</td><td>Lookup table</td><td>Flexible</td><td>Extra hop, SPOF</td></tr>
        </tbody>
      </table>

      <h2>NoSQL Database Types</h2>

      <h3>1. Key-Value Store</h3>
      <p>Abstraction: Hash table</p>
      <ul>
        <li><strong>Use cases:</strong> Session storage, caching, shopping carts</li>
        <li><strong>Examples:</strong> Redis, Memcached, DynamoDB</li>
      </ul>

      <h3>2. Document Store</h3>
      <p>Key-value with documents (JSON) as values</p>
      <ul>
        <li><strong>Use cases:</strong> Content management, user profiles</li>
        <li><strong>Examples:</strong> MongoDB, CouchDB</li>
      </ul>

      <h3>3. Wide Column Store</h3>
      <p>Column-oriented storage</p>
      <ul>
        <li><strong>Use cases:</strong> Time-series data, IoT, event logging</li>
        <li><strong>Examples:</strong> Cassandra, HBase</li>
      </ul>

      <h3>4. Graph Database</h3>
      <p>Nodes and edges</p>
      <ul>
        <li><strong>Use cases:</strong> Social networks, recommendations, fraud detection</li>
        <li><strong>Examples:</strong> Neo4j, Amazon Neptune</li>
      </ul>

      <h2>SQL vs NoSQL Decision</h2>
      <table>
        <thead>
          <tr><th>Choose SQL When</th><th>Choose NoSQL When</th></tr>
        </thead>
        <tbody>
          <tr><td>Structured data with clear schema</td><td>Semi-structured/dynamic data</td></tr>
          <tr><td>Need complex joins</td><td>Massive scale (PBs of data)</td></tr>
          <tr><td>ACID transactions required</td><td>High write throughput needed</td></tr>
          <tr><td>Strong consistency required</td><td>Eventual consistency acceptable</td></tr>
        </tbody>
      </table>
    `,
    exercises: [
      {
        title: 'Database Selection Exercise',
        description: 'Choose the right database for different scenarios',
        content: `
          <h3>Exercise: Choose the Database</h3>
          <p>For each scenario, choose the best database type and explain why:</p>
          <ol>
            <li>Real-time leaderboard for a game</li>
            <li>User profiles for a social network</li>
            <li>Financial transactions for a bank</li>
            <li>Event logs from IoT sensors</li>
            <li>Friend connections in a social network</li>
          </ol>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answers</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <ol>
                <li><strong>Redis (Key-Value)</strong> - Sorted sets for fast leaderboards</li>
                <li><strong>MongoDB (Document)</strong> - Flexible schema for varying user data</li>
                <li><strong>PostgreSQL (SQL)</strong> - ACID transactions required</li>
                <li><strong>Cassandra (Wide Column)</strong> - High write throughput, time-series</li>
                <li><strong>Neo4j (Graph)</strong> - Optimized for relationship traversal</li>
              </ol>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'What are the ACID properties?',
        answer: 'Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes).'
      },
      {
        question: 'When would you use sharding vs federation?',
        answer: 'Federation: Split by function/domain (users DB, products DB). Sharding: Split same data across nodes by key (users A-M, users N-Z). Use sharding when single table is too large.'
      },
      {
        question: 'What is denormalization and when do you use it?',
        answer: 'Adding redundant data to avoid joins. Use when Read:Write ratio > 10:1 and queries are slow due to joins.'
      }
    ]
  },
  {
    id: 'week4',
    week: 4,
    title: 'Caching Strategies',
    phase: 'Intermediate',
    duration: '3-4 hours',
    description: 'Master caching layers, update strategies, and common cache problems.',
    topics: ['Cache-Aside', 'Write-Through', 'Write-Behind', 'Cache Invalidation', 'Redis'],
    content: `
      <h1>Week 4: Caching Strategies</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand all 5 caching layers</li>
          <li>Master the cache-aside pattern</li>
          <li>Know trade-offs of each update strategy</li>
          <li>Understand cache invalidation challenges</li>
        </ul>
      </div>

      <h2>Why Cache?</h2>
      <ul>
        <li><strong>Reduce latency</strong> - Memory access ~100x faster than disk</li>
        <li><strong>Reduce database load</strong> - Absorb traffic spikes</li>
        <li><strong>Handle hot data</strong> - Popular items don't hit DB</li>
      </ul>

      <h2>Caching Layers</h2>
      <div class="diagram">
[Client Browser Cache]
         ↓
    [CDN Cache]
         ↓
  [Web Server Cache]
         ↓
 [Application Cache] ← Redis/Memcached
         ↓
  [Database Cache]
         ↓
    [Database]
      </div>

      <h2>Cache Update Strategies</h2>

      <h3>1. Cache-Aside (Lazy Loading)</h3>
      <p>Application manages cache directly.</p>
      <pre><code>async function getUser(userId) {
  // 1. Check cache
  let user = await cache.get(\`user:\${userId}\`);
  
  if (!user) {
    // 2. Cache miss - load from DB
    user = await db.query('SELECT * FROM users WHERE id = ?', userId);
    
    // 3. Store in cache
    if (user) {
      await cache.set(\`user:\${userId}\`, user, { ttl: 3600 });
    }
  }
  return user;
}</code></pre>
      <p><strong>Pros:</strong> Only requested data cached, cache failures don't break system</p>
      <p><strong>Cons:</strong> Cache miss = 3 round trips, data can become stale</p>

      <h3>2. Write-Through</h3>
      <p>Cache updated on every write.</p>
      <p><strong>Pros:</strong> Cache always has latest data</p>
      <p><strong>Cons:</strong> Write latency, most written data may never be read</p>

      <h3>3. Write-Behind (Write-Back)</h3>
      <p>Write to cache, async write to DB.</p>
      <p><strong>Pros:</strong> Fast writes, batching possible</p>
      <p><strong>Cons:</strong> Data loss risk, eventual consistency</p>

      <h3>4. Refresh-Ahead</h3>
      <p>Proactively refresh before expiration.</p>
      <p><strong>Pros:</strong> Reduced latency, fresh data</p>
      <p><strong>Cons:</strong> Wasted refreshes, complexity</p>

      <h2>Strategy Comparison</h2>
      <table>
        <thead>
          <tr><th>Strategy</th><th>Write Latency</th><th>Read Latency</th><th>Consistency</th><th>Complexity</th></tr>
        </thead>
        <tbody>
          <tr><td>Cache-Aside</td><td>Fast</td><td>Miss: Slow</td><td>Eventual</td><td>Low</td></tr>
          <tr><td>Write-Through</td><td>Slow</td><td>Fast</td><td>Strong</td><td>Medium</td></tr>
          <tr><td>Write-Behind</td><td>Fast</td><td>Fast</td><td>Eventual</td><td>High</td></tr>
          <tr><td>Refresh-Ahead</td><td>N/A</td><td>Fast</td><td>Eventual</td><td>High</td></tr>
        </tbody>
      </table>

      <h2>Cache Problems</h2>

      <h3>1. Cache Stampede</h3>
      <p>Many requests hit DB simultaneously on cache miss.</p>
      <p><strong>Solution:</strong> Locking - only one request fetches from DB</p>

      <h3>2. Hot Key</h3>
      <p>Single key gets too many requests.</p>
      <p><strong>Solution:</strong> Local caching, replicate hot keys</p>

      <h3>3. Cache Penetration</h3>
      <p>Queries for non-existent data always miss.</p>
      <p><strong>Solution:</strong> Cache null values with short TTL</p>

      <div class="tip-box">
        <strong>💡 Pro Tip:</strong> "There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton
      </div>
    `,
    exercises: [
      {
        title: 'Cache Strategy Selection',
        description: 'Choose the right caching strategy for different scenarios',
        content: `
          <h3>Exercise: Choose Cache Strategy</h3>
          <p>For each scenario, choose the best caching strategy:</p>
          <ol>
            <li>User profiles with 100:1 read:write ratio</li>
            <li>Real-time stock prices</li>
            <li>Session data that must never be stale</li>
            <li>Product catalog with infrequent updates</li>
          </ol>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answers</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <ol>
                <li><strong>Cache-Aside</strong> - High read ratio, simple implementation</li>
                <li><strong>Write-Through</strong> - Real-time data needs immediate updates</li>
                <li><strong>Write-Through</strong> - Strong consistency required</li>
                <li><strong>Cache-Aside + Long TTL</strong> - Data rarely changes</li>
              </ol>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'Explain the cache-aside pattern.',
        answer: 'App checks cache first. If miss: read from DB, store in cache, return data. App is responsible for cache management.'
      },
      {
        question: 'What is a cache stampede and how do you prevent it?',
        answer: 'Many requests hit DB simultaneously when popular cache key expires. Prevent with locking (only one request fetches), early refresh, or staggered TTLs.'
      },
      {
        question: 'Redis vs Memcached: when to use each?',
        answer: 'Redis: Need data structures, persistence, replication. Memcached: Simple key-value only, maximum simplicity, pure caching.'
      }
    ]
  },
  {
    id: 'week5',
    week: 5,
    title: 'Asynchronous Processing',
    phase: 'Intermediate',
    duration: '3-4 hours',
    description: 'Learn message queues, task queues, back pressure, and communication protocols.',
    topics: ['Message Queues', 'Task Queues', 'Back Pressure', 'TCP/UDP', 'RPC vs REST'],
    content: `
      <h1>Week 5: Asynchronous Processing</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand message queue vs task queue</li>
          <li>Know when to use Redis vs RabbitMQ vs Kafka</li>
          <li>Implement back pressure strategies</li>
          <li>Understand RPC vs REST trade-offs</li>
        </ul>
      </div>

      <h2>Why Async?</h2>
      <ul>
        <li><strong>Reduce request latency</strong> - Don't wait for slow operations</li>
        <li><strong>Handle spikes</strong> - Buffer requests during high load</li>
        <li><strong>Decouple services</strong> - Producer doesn't need consumer online</li>
        <li><strong>Retry failed operations</strong> - Automatic recovery</li>
      </ul>

      <h2>Message Queues</h2>
      <div class="diagram">
[Producer] → [Queue] → [Consumer]

Producer publishes job → Queue stores job → Consumer processes job
      </div>

      <h3>Queue Guarantees</h3>
      <table>
        <thead>
          <tr><th>Guarantee</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>At-most-once</strong></td><td>Message delivered 0 or 1 times (may lose)</td></tr>
          <tr><td><strong>At-least-once</strong></td><td>Message delivered 1+ times (may duplicate)</td></tr>
          <tr><td><strong>Exactly-once</strong></td><td>Message delivered exactly 1 time (hard!)</td></tr>
        </tbody>
      </table>

      <h3>Queue Comparison</h3>
      <table>
        <thead>
          <tr><th>Feature</th><th>Redis</th><th>RabbitMQ</th><th>SQS</th><th>Kafka</th></tr>
        </thead>
        <tbody>
          <tr><td>Throughput</td><td>High</td><td>Medium</td><td>Medium</td><td>Very High</td></tr>
          <tr><td>Durability</td><td>Optional</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Complexity</td><td>Low</td><td>Medium</td><td>Low</td><td>High</td></tr>
          <tr><td>Best for</td><td>Simple jobs</td><td>Complex routing</td><td>Serverless</td><td>Event streaming</td></tr>
        </tbody>
      </table>

      <h2>Back Pressure</h2>
      <p>Protect system when queue grows too large.</p>

      <h3>Solutions</h3>
      <ol>
        <li><strong>Rate limiting producers</strong> - Control input rate</li>
        <li><strong>Queue size limits</strong> - Reject when full</li>
        <li><strong>Dynamic worker scaling</strong> - Add consumers based on depth</li>
        <li><strong>Return 503 to clients</strong> - Graceful degradation</li>
      </ol>

      <h3>Exponential Backoff</h3>
      <p>Retry with increasing delays: 1s, 2s, 4s, 8s...</p>
      <p>Add jitter (randomness) to prevent synchronized retries.</p>

      <h2>RPC vs REST</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>RPC (gRPC)</th><th>REST</th></tr>
        </thead>
        <tbody>
          <tr><td>Focus</td><td>Actions (verbs)</td><td>Resources (nouns)</td></tr>
          <tr><td>Protocol</td><td>Binary (faster)</td><td>HTTP/JSON</td></tr>
          <tr><td>Coupling</td><td>Tight</td><td>Loose</td></tr>
          <tr><td>Performance</td><td>Faster</td><td>Slower</td></tr>
          <tr><td>Best for</td><td>Internal services</td><td>Public APIs</td></tr>
        </tbody>
      </table>

      <h2>TCP vs UDP</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>TCP</th><th>UDP</th></tr>
        </thead>
        <tbody>
          <tr><td>Connection</td><td>Connection-oriented</td><td>Connectionless</td></tr>
          <tr><td>Reliability</td><td>Guaranteed delivery</td><td>Best effort</td></tr>
          <tr><td>Speed</td><td>Slower</td><td>Faster</td></tr>
          <tr><td>Use case</td><td>Web, email, files</td><td>Video, VoIP, gaming</td></tr>
        </tbody>
      </table>
    `,
    exercises: [
      {
        title: 'Queue Selection Exercise',
        description: 'Choose the right message queue for different scenarios',
        content: `
          <h3>Exercise: Choose the Queue</h3>
          <p>Match each use case to the best queue:</p>
          <ol>
            <li>Simple background jobs in a Node.js app</li>
            <li>Event streaming at 100K messages/second</li>
            <li>Serverless application on AWS</li>
            <li>Complex message routing between services</li>
          </ol>
          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answers</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <ol>
                <li><strong>Redis (Bull/BullMQ)</strong> - Simple, you probably have Redis</li>
                <li><strong>Kafka</strong> - Designed for high throughput</li>
                <li><strong>SQS</strong> - Fully managed, no ops</li>
                <li><strong>RabbitMQ</strong> - Flexible routing, exchanges</li>
              </ol>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'What are the three delivery guarantees in message queues?',
        answer: 'At-most-once (may lose), At-least-once (may duplicate), Exactly-once (delivered exactly 1 time - hardest to achieve).'
      },
      {
        question: 'What is back pressure and why is it important?',
        answer: 'Protecting system when queue grows faster than consumers process. Important because queue can exhaust memory and crash the system.'
      },
      {
        question: 'Explain exponential backoff.',
        answer: 'Retry with increasing delays (1s, 2s, 4s, 8s...). Prevents overwhelming failing services and allows time for recovery. Add jitter to prevent synchronized retries.'
      }
    ]
  },
  {
    id: 'week6',
    week: 6,
    title: 'Interview Framework',
    phase: 'Intermediate',
    duration: '4-5 hours',
    description: 'Master the 4-step system design interview approach and back-of-envelope calculations.',
    topics: ['4-Step Framework', 'Requirements', 'High-Level Design', 'Scaling', 'Estimation'],
    content: `
      <h1>Week 6: Interview Framework</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Master the 4-step interview framework</li>
          <li>Learn to ask the right clarifying questions</li>
          <li>Practice back-of-envelope calculations</li>
          <li>Know common scaling patterns</li>
        </ul>
      </div>

      <h2>The 4-Step Approach</h2>
      <div class="diagram">
┌─────────────────────────────────────────────────────┐
│  Step 1: Requirements & Constraints    (5-10 min)  │
├─────────────────────────────────────────────────────┤
│  Step 2: High-Level Design             (10-15 min) │
├─────────────────────────────────────────────────────┤
│  Step 3: Core Components               (10-15 min) │
├─────────────────────────────────────────────────────┤
│  Step 4: Scale & Bottlenecks           (10-15 min) │
└─────────────────────────────────────────────────────┘
      </div>

      <h2>Step 1: Requirements & Constraints</h2>
      <p><strong>Goal:</strong> Scope the problem before designing.</p>

      <h3>Questions to Ask</h3>
      <ul>
        <li><strong>Users:</strong> Who uses it? How many users?</li>
        <li><strong>Scale:</strong> Requests per second? Data volume?</li>
        <li><strong>Performance:</strong> Acceptable latency? Real-time needed?</li>
        <li><strong>Availability:</strong> Consistency or availability priority?</li>
      </ul>

      <h2>Step 2: High-Level Design</h2>
      <p><strong>Goal:</strong> Draw the big picture with all major components.</p>

      <div class="diagram">
[Clients]
    ↓
[Load Balancer]
    ↓
[Web Servers / API Gateway]
    ↓
[Application Servers]
    ↓
[Cache] ←→ [Database]
    ↓
[Background Workers]
    ↓
[Message Queue]
      </div>

      <h2>Step 3: Core Components</h2>
      <p><strong>Goal:</strong> Deep dive into the most important parts.</p>
      <ul>
        <li><strong>Data model</strong> - Schema, entities, relationships</li>
        <li><strong>API design</strong> - Endpoints, request/response</li>
        <li><strong>Algorithms</strong> - Key logic (hashing, encoding, etc.)</li>
        <li><strong>Technology choices</strong> - And why</li>
      </ul>

      <h2>Step 4: Scale the Design</h2>
      <p><strong>Goal:</strong> Identify bottlenecks and address them.</p>

      <table>
        <thead>
          <tr><th>Component</th><th>Bottleneck</th><th>Solution</th></tr>
        </thead>
        <tbody>
          <tr><td>Web servers</td><td>CPU/memory</td><td>Horizontal scaling + LB</td></tr>
          <tr><td>Database reads</td><td>Query load</td><td>Read replicas, caching</td></tr>
          <tr><td>Database writes</td><td>Write throughput</td><td>Sharding, write-behind</td></tr>
          <tr><td>SPOF</td><td>Availability</td><td>Redundancy, failover</td></tr>
        </tbody>
      </table>

      <h2>Back-of-Envelope Calculations</h2>

      <h3>Key Numbers to Memorize</h3>
      <table>
        <thead>
          <tr><th>Metric</th><th>Value</th></tr>
        </thead>
        <tbody>
          <tr><td>1 day</td><td>~100,000 seconds (86,400)</td></tr>
          <tr><td>1 month</td><td>~2.5 million seconds</td></tr>
          <tr><td>1 req/sec</td><td>~2.5M req/month</td></tr>
          <tr><td>100M DAU × 10 req each</td><td>~12,000 req/sec (peak: ~30K)</td></tr>
        </tbody>
      </table>

      <h3>Common Calculation: DAU → RPS</h3>
      <pre><code>100M DAU, each makes 10 requests
= 1 billion requests/day
= 1B / 86,400 sec
≈ 12,000 req/sec average
Peak = 2-3x average ≈ 30,000 req/sec</code></pre>

      <div class="tip-box">
        <strong>💡 Interview Tips:</strong>
        <ul>
          <li>Think out loud - share your thought process</li>
          <li>Ask clarifying questions first</li>
          <li>Start simple, then iterate</li>
          <li>Discuss trade-offs</li>
          <li>Use real numbers</li>
        </ul>
      </div>
    `,
    exercises: [
      {
        title: 'URL Shortener Design',
        description: 'Design a complete URL shortening service',
        content: `
          <h3>Exercise: Design a URL Shortener</h3>
          <p>Using the 4-step framework, design a URL shortening service like bit.ly.</p>
          
          <h4>Step 1: Define Requirements</h4>
          <ul>
            <li>What scale? (hint: 100M URLs/day)</li>
            <li>How long to store URLs?</li>
            <li>Analytics needed?</li>
          </ul>

          <h4>Step 2: High-Level Design</h4>
          <p>Draw the architecture components.</p>

          <h4>Step 3: Core Components</h4>
          <ul>
            <li>Design the API endpoints</li>
            <li>Design the database schema</li>
            <li>How to generate short codes?</li>
          </ul>

          <h4>Step 4: Scale It</h4>
          <p>Address bottlenecks for 100M URLs/day.</p>

          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Solution Summary</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <p><strong>Scale:</strong> 100M writes/day = ~1,200 writes/sec, Read:Write = 100:1 → 120K reads/sec</p>
              <p><strong>API:</strong> POST /shorten, GET /:code → 301 redirect</p>
              <p><strong>Short code:</strong> Base62 encoding of auto-increment ID or hash</p>
              <p><strong>Scale:</strong> Redis cache, PostgreSQL with read replicas, CDN for redirects</p>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'What are the 4 steps of the system design interview?',
        answer: '1. Requirements (scope, constraints), 2. High-level design (all components), 3. Core components (APIs, data model, algorithms), 4. Scale (identify and address bottlenecks).'
      },
      {
        question: 'How do you convert DAU to QPS?',
        answer: 'QPS = (DAU × actions_per_user) / 86,400. Example: 10M DAU × 10 actions = 100M/day ÷ 86,400 ≈ 1,160 req/sec. Peak = Average × 3.'
      },
      {
        question: 'Quick: 1 req/sec equals how many per month?',
        answer: '~2.5 million requests per month (1 × 60 × 60 × 24 × 30 ≈ 2.5M)'
      }
    ]
  },
  {
    id: 'week7',
    week: 7,
    title: 'Security & API Design',
    phase: 'Advanced',
    duration: '4-5 hours',
    description: 'Master authentication, authorization, API best practices, and common vulnerabilities.',
    topics: ['JWT', 'OAuth 2.0', 'REST API Design', 'HTTP Status Codes', 'API Gateway'],
    content: `
      <h1>Week 7: Security & API Design</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand JWT vs Session authentication</li>
          <li>Master OAuth 2.0 flow</li>
          <li>Design RESTful API endpoints</li>
          <li>Know HTTP status codes and when to use them</li>
        </ul>
      </div>

      <h2>Authentication vs Authorization</h2>
      <table>
        <thead>
          <tr><th>Concept</th><th>Question</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Authentication</strong></td><td>"Who are you?"</td><td>Login with username/password</td></tr>
          <tr><td><strong>Authorization</strong></td><td>"What can you do?"</td><td>Admin vs regular user permissions</td></tr>
        </tbody>
      </table>

      <h2>Session vs JWT Authentication</h2>

      <h3>Session-Based</h3>
      <ul>
        <li><strong>How:</strong> Server stores session, sends cookie</li>
        <li><strong>Pros:</strong> Easy to revoke, simple</li>
        <li><strong>Cons:</strong> Stateful, doesn't scale well</li>
      </ul>

      <h3>JWT (Token-Based)</h3>
      <ul>
        <li><strong>How:</strong> Server signs token, client stores it</li>
        <li><strong>Pros:</strong> Stateless, works across services</li>
        <li><strong>Cons:</strong> Can't revoke until expiry</li>
      </ul>

      <h3>JWT Structure</h3>
      <pre><code>header.payload.signature

Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "userId": 123, "role": "admin", "exp": 1699999999 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)</code></pre>

      <h2>OAuth 2.0 Flow</h2>
      <div class="diagram">
[User] → [Your App] → Redirect to Google
                           ↓
                    [Google Auth Server]
                           ↓
                    User grants permission
                           ↓
[Your App] ← Authorization code ← Google
    ↓
[Your App] → Exchange code for tokens → [Google]
    ↓
Access Token + ID Token (user info)
      </div>

      <h2>RESTful API Design</h2>

      <h3>Resource Naming (Use Nouns)</h3>
      <pre><code>✅ Good (nouns, plural):
GET    /users           # List users
GET    /users/123       # Get user 123
POST   /users           # Create user
PUT    /users/123       # Update user 123
DELETE /users/123       # Delete user 123

❌ Bad (verbs):
GET    /getUser/123
POST   /createUser</code></pre>

      <h2>HTTP Status Codes</h2>
      <table>
        <thead>
          <tr><th>Code</th><th>Meaning</th><th>When to Use</th></tr>
        </thead>
        <tbody>
          <tr><td>200</td><td>OK</td><td>Successful GET, PUT</td></tr>
          <tr><td>201</td><td>Created</td><td>Successful POST</td></tr>
          <tr><td>204</td><td>No Content</td><td>Successful DELETE</td></tr>
          <tr><td>400</td><td>Bad Request</td><td>Invalid input</td></tr>
          <tr><td>401</td><td>Unauthorized</td><td>Not authenticated</td></tr>
          <tr><td>403</td><td>Forbidden</td><td>Not authorized</td></tr>
          <tr><td>404</td><td>Not Found</td><td>Resource doesn't exist</td></tr>
          <tr><td>429</td><td>Too Many Requests</td><td>Rate limited</td></tr>
          <tr><td>500</td><td>Internal Error</td><td>Server error</td></tr>
        </tbody>
      </table>

      <h2>Common Vulnerabilities</h2>

      <h3>SQL Injection</h3>
      <pre><code>// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// ✅ Use parameterized queries
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);</code></pre>

      <h3>XSS (Cross-Site Scripting)</h3>
      <pre><code>// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Escape output
element.textContent = userInput;</code></pre>

      <h2>API Gateway</h2>
      <p>Centralized entry point for all API requests.</p>
      <ul>
        <li><strong>Authentication</strong> - Verify tokens before routing</li>
        <li><strong>Rate Limiting</strong> - Prevent abuse</li>
        <li><strong>Request Routing</strong> - Direct to correct service</li>
        <li><strong>Caching</strong> - Cache frequent responses</li>
        <li><strong>Logging</strong> - Centralized monitoring</li>
      </ul>
    `,
    exercises: [
      {
        title: 'API Design Exercise',
        description: 'Design REST endpoints for a blog application',
        content: `
          <h3>Exercise: Design Blog API</h3>
          <p>Design RESTful endpoints for a blog with posts and comments.</p>
          
          <p>Include:</p>
          <ul>
            <li>CRUD operations for posts</li>
            <li>CRUD operations for comments (nested under posts)</li>
            <li>Proper HTTP methods and status codes</li>
          </ul>

          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Solution</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <pre><code># Posts
GET    /posts                 # List posts
GET    /posts/:id             # Get single post
POST   /posts                 # Create post (201)
PUT    /posts/:id             # Update post (200)
DELETE /posts/:id             # Delete post (204)

# Comments (nested under posts)
GET    /posts/:id/comments    # List comments
POST   /posts/:id/comments    # Add comment (201)
PUT    /comments/:id          # Update comment
DELETE /comments/:id          # Delete comment</code></pre>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'JWT vs Session: pros and cons of each?',
        answer: 'JWT: Stateless, works across services, but can\'t revoke until expiry. Session: Easy to revoke, simple, but requires server storage and doesn\'t scale well.'
      },
      {
        question: 'What HTTP status code for: rate limited, not authenticated, validation error?',
        answer: 'Rate limited: 429. Not authenticated: 401. Validation error: 422 (or 400).'
      },
      {
        question: 'What is idempotency and why does it matter for APIs?',
        answer: 'Same request produces same result when repeated. Important because networks can retry requests - prevents duplicate actions. GET, PUT, DELETE are idempotent. POST is not.'
      }
    ]
  },
  {
    id: 'week8',
    week: 8,
    title: 'Rate Limiting & Monitoring',
    phase: 'Advanced',
    duration: '4-5 hours',
    description: 'Learn rate limiting algorithms, observability pillars, and the circuit breaker pattern.',
    topics: ['Token Bucket', 'Sliding Window', 'Metrics/Logs/Traces', 'SLI/SLO/SLA', 'Circuit Breaker'],
    content: `
      <h1>Week 8: Rate Limiting & Monitoring</h1>

      <div class="key-concept">
        <h4>💡 Key Learning Objectives</h4>
        <ul>
          <li>Understand rate limiting algorithms</li>
          <li>Know the three pillars of observability</li>
          <li>Understand p50, p95, p99 percentiles</li>
          <li>Implement the circuit breaker pattern</li>
        </ul>
      </div>

      <h2>Why Rate Limit?</h2>
      <ul>
        <li><strong>Prevent abuse</strong> - Stop malicious users/bots</li>
        <li><strong>Ensure fairness</strong> - No single user monopolizes resources</li>
        <li><strong>Protect infrastructure</strong> - Prevent cascade failures</li>
      </ul>

      <h2>Rate Limiting Algorithms</h2>

      <h3>1. Token Bucket</h3>
      <p>Bucket holds tokens; requests consume tokens; tokens refill at fixed rate.</p>
      <p><strong>Pros:</strong> Allows controlled bursts</p>
      <p><strong>Cons:</strong> Memory per user for bucket state</p>

      <h3>2. Leaky Bucket</h3>
      <p>Requests enter queue; processed at fixed rate; overflow rejected.</p>
      <p><strong>Pros:</strong> Smooths out bursts</p>
      <p><strong>Cons:</strong> May reject valid bursts</p>

      <h3>3. Fixed Window Counter</h3>
      <p>Count requests in fixed time windows.</p>
      <p><strong>Pros:</strong> Simple, memory efficient</p>
      <p><strong>Cons:</strong> Boundary burst problem (2x limit possible)</p>

      <h3>4. Sliding Window (Recommended)</h3>
      <p>Weighted combination of current and previous window.</p>
      <p><strong>Pros:</strong> Memory efficient, no boundary issues</p>
      <p><strong>Cons:</strong> Approximate (but close enough)</p>

      <table>
        <thead>
          <tr><th>Algorithm</th><th>Memory</th><th>Accuracy</th><th>Burst Handling</th></tr>
        </thead>
        <tbody>
          <tr><td>Token Bucket</td><td>Medium</td><td>Good</td><td>Allows controlled bursts</td></tr>
          <tr><td>Leaky Bucket</td><td>Medium</td><td>Good</td><td>Smooths bursts</td></tr>
          <tr><td>Fixed Window</td><td>Low</td><td>Poor</td><td>Boundary bursts (2x)</td></tr>
          <tr><td>Sliding Window</td><td>Low</td><td>Good</td><td>Minimal burst</td></tr>
        </tbody>
      </table>

      <h2>Three Pillars of Observability</h2>
      <div class="diagram">
┌─────────────────────────────────────────────────┐
│               OBSERVABILITY                      │
├─────────────┬─────────────┬─────────────────────┤
│   METRICS   │    LOGS     │      TRACES         │
│  (Numbers)  │   (Events)  │  (Request flow)     │
├─────────────┼─────────────┼─────────────────────┤
│ Prometheus  │ ELK Stack   │ Jaeger              │
│ Grafana     │ Loki        │ Zipkin              │
└─────────────┴─────────────┴─────────────────────┘
      </div>

      <h3>Percentiles (p50, p95, p99)</h3>
      <ul>
        <li><strong>p50 (median)</strong> - 50% of requests faster than this</li>
        <li><strong>p95</strong> - 95% of requests faster than this</li>
        <li><strong>p99</strong> - 99% of requests faster than this</li>
      </ul>

      <div class="warning-box">
        <strong>⚠️ Why not averages?</strong> Averages hide outliers. If 99% of requests are 10ms and 1% are 5000ms, average is ~60ms but user experience is poor.
      </div>

      <h2>SLI, SLO, SLA</h2>
      <table>
        <thead>
          <tr><th>Term</th><th>Definition</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>SLI</strong> (Indicator)</td><td>Metric that measures service</td><td>Request latency</td></tr>
          <tr><td><strong>SLO</strong> (Objective)</td><td>Target for the metric</td><td>p99 latency < 200ms</td></tr>
          <tr><td><strong>SLA</strong> (Agreement)</td><td>Contract with consequences</td><td>99.9% uptime or refund</td></tr>
        </tbody>
      </table>

      <h2>Circuit Breaker Pattern</h2>
      <p>Prevent cascade failures by failing fast.</p>
      <div class="diagram">
States: CLOSED → OPEN → HALF-OPEN → CLOSED

CLOSED: Normal operation, requests pass through
  ↓ (failures exceed threshold)
OPEN: Reject all requests immediately (fail fast)
  ↓ (after timeout)
HALF-OPEN: Allow limited requests to test
  ↓ (success) → CLOSED
  ↓ (failure) → OPEN
      </div>

      <h2>Health Checks</h2>
      <table>
        <thead>
          <tr><th>Check</th><th>Question</th><th>Action if Fails</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Liveness</strong></td><td>Is the process running?</td><td>Restart container</td></tr>
          <tr><td><strong>Readiness</strong></td><td>Can it handle traffic?</td><td>Remove from load balancer</td></tr>
        </tbody>
      </table>
    `,
    exercises: [
      {
        title: 'Rate Limiter Implementation',
        description: 'Choose the right rate limiting algorithm',
        content: `
          <h3>Exercise: Design Rate Limiter</h3>
          <p>For each scenario, choose the best rate limiting algorithm:</p>
          <ol>
            <li>API that should allow short bursts (user typing)</li>
            <li>Video streaming that needs smooth output</li>
            <li>Simple API protection with minimal memory</li>
            <li>High-accuracy rate limiting for billing API</li>
          </ol>

          <div class="collapsible">
            <div class="collapsible-header">
              <span>Show Answers</span>
              <span class="collapsible-icon">▼</span>
            </div>
            <div class="collapsible-content">
              <ol>
                <li><strong>Token Bucket</strong> - Allows controlled bursts</li>
                <li><strong>Leaky Bucket</strong> - Smooths output rate</li>
                <li><strong>Sliding Window Counter</strong> - Low memory, good accuracy</li>
                <li><strong>Sliding Window Log</strong> - Perfect accuracy (store all timestamps)</li>
              </ol>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        question: 'Explain the token bucket algorithm.',
        answer: 'Bucket holds tokens (capacity). Tokens refill at fixed rate. Each request consumes 1 token. If no tokens, reject. Allows controlled bursts up to bucket capacity.'
      },
      {
        question: 'What are the three pillars of observability?',
        answer: 'Metrics (numeric measurements over time), Logs (event records with context), Traces (request flow across services).'
      },
      {
        question: 'Explain the circuit breaker pattern.',
        answer: 'CLOSED: normal operation. OPEN: after failures exceed threshold, reject all requests (fail fast). HALF-OPEN: after timeout, test with limited requests. Success → CLOSED, Failure → OPEN.'
      }
    ]
  }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LESSONS };
}
