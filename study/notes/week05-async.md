# Week 5: Asynchronous Processing

## Why Async?

- **Reduce request latency** - Don't wait for slow operations
- **Handle spikes** - Buffer requests during high load
- **Decouple services** - Producer doesn't need consumer online
- **Retry failed operations** - Automatic recovery

---

## Message Queues

### How It Works

```
[Producer] → [Queue] → [Consumer]

Producer publishes job → Queue stores job → Consumer processes job
```

### Message Queue Flow

```javascript
// Producer (e.g., Web Server)
await queue.publish('email', {
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Thanks for signing up...'
});
// Return immediately to user

// Consumer (Background Worker)
queue.subscribe('email', async (message) => {
  await sendEmail(message.to, message.subject, message.body);
  message.ack(); // Mark as processed
});
```

### Queue Guarantees

| Guarantee | Description |
|-----------|-------------|
| **At-most-once** | Message delivered 0 or 1 times (may lose) |
| **At-least-once** | Message delivered 1+ times (may duplicate) |
| **Exactly-once** | Message delivered exactly 1 time (hard!) |

### Popular Message Queues

#### Redis (Simple)
```javascript
// Using Bull (Node.js)
const Queue = require('bull');
const emailQueue = new Queue('email');

// Producer
await emailQueue.add({ to: 'user@example.com', subject: 'Hello' });

// Consumer
emailQueue.process(async (job) => {
  await sendEmail(job.data);
});
```

**Pros:** Simple, fast, you probably already have Redis
**Cons:** Messages can be lost, limited features

#### RabbitMQ (Feature-rich)
```javascript
// Using amqplib
const amqp = require('amqplib');
const conn = await amqp.connect('amqp://localhost');
const channel = await conn.createChannel();

await channel.assertQueue('email');
channel.sendToQueue('email', Buffer.from(JSON.stringify(data)));
```

**Pros:** Reliable, flexible routing, acknowledgments
**Cons:** Operational complexity, AMQP learning curve

#### Amazon SQS (Managed)
```javascript
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

await sqs.sendMessage({
  QueueUrl: 'https://sqs.../email-queue',
  MessageBody: JSON.stringify(data)
}).promise();
```

**Pros:** Fully managed, scalable, no ops
**Cons:** Higher latency, possible duplicate delivery

#### Kafka (High-throughput)
- Distributed commit log
- High throughput (millions of messages/sec)
- Message retention (replay capability)
- Best for: Event streaming, log aggregation

### Queue Comparison

| Feature | Redis | RabbitMQ | SQS | Kafka |
|---------|-------|----------|-----|-------|
| Throughput | High | Medium | Medium | Very High |
| Durability | Optional | Yes | Yes | Yes |
| Ordering | FIFO | FIFO | FIFO (option) | Per partition |
| Complexity | Low | Medium | Low | High |
| Cost | Self-hosted | Self-hosted | Pay per use | Self-hosted |

---

## Task Queues

Execute tasks asynchronously with workers.

### vs Message Queues

| Message Queue | Task Queue |
|---------------|------------|
| Pass messages | Execute functions |
| Simple payload | Code execution |
| Decoupling | Background jobs |

### Node.js Task Queues

**Bull/BullMQ (Recommended for Node.js)**
```javascript
const { Queue, Worker } = require('bullmq');

// Define queue
const imageQueue = new Queue('image-processing');

// Producer
await imageQueue.add('resize', {
  imageUrl: 'https://...',
  width: 800,
  height: 600
});

// Worker
const worker = new Worker('image-processing', async (job) => {
  if (job.name === 'resize') {
    const result = await resizeImage(job.data);
    return result; // Stored as job result
  }
});

// Features
await imageQueue.add('resize', data, {
  delay: 5000,           // Delay 5 seconds
  attempts: 3,           // Retry 3 times
  backoff: { type: 'exponential', delay: 1000 },
  priority: 1,           // Higher priority
  removeOnComplete: 100, // Keep last 100 completed
});
```

### Common Task Queue Patterns

**1. Delayed Jobs**
```javascript
// Send reminder email in 24 hours
await queue.add('reminder', { userId: 123 }, { delay: 86400000 });
```

**2. Scheduled/Cron Jobs**
```javascript
await queue.add('daily-report', {}, {
  repeat: { cron: '0 9 * * *' } // Every day at 9am
});
```

**3. Job Progress**
```javascript
const worker = new Worker('video', async (job) => {
  for (let i = 0; i < 100; i++) {
    await processChunk(i);
    await job.updateProgress(i);
  }
});

// Track progress
job.on('progress', (progress) => {
  console.log(`${progress}% complete`);
});
```

---

## Back Pressure

Protect system when queue grows too large.

### The Problem

```
[Producers] ---> [Queue (growing!!!)] ---> [Slow Consumers]
                     ↑
              Memory exhausted!
```

### Solutions

**1. Rate Limiting Producers**
```javascript
const limiter = new RateLimiter({ points: 100, duration: 1 }); // 100/sec

async function publish(message) {
  try {
    await limiter.consume(1);
    await queue.publish(message);
  } catch (e) {
    // Rate limited - return 429
    throw new TooManyRequestsError();
  }
}
```

**2. Queue Size Limits**
```javascript
// BullMQ
const queue = new Queue('tasks', {
  defaultJobOptions: {
    removeOnComplete: 1000, // Limit completed jobs
    removeOnFail: 5000
  }
});

// Check queue size before adding
const waiting = await queue.getWaitingCount();
if (waiting > 10000) {
  throw new ServiceUnavailableError('Queue full');
}
```

**3. Dynamic Worker Scaling**
```javascript
// Scale workers based on queue depth
const queueDepth = await queue.getWaitingCount();
const desiredWorkers = Math.ceil(queueDepth / 100);
scaleWorkers(desiredWorkers);
```

**4. Return 503 to Clients**
```javascript
app.post('/submit', async (req, res) => {
  if (await isOverloaded()) {
    return res.status(503)
      .header('Retry-After', '30')
      .json({ error: 'Service busy, retry later' });
  }
  // Process request
});
```

### Exponential Backoff

Client-side retry with increasing delays.

```javascript
async function fetchWithBackoff(url, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      
      const delay = Math.min(1000 * Math.pow(2, i), 30000); // Max 30s
      const jitter = Math.random() * 1000; // Add jitter
      await sleep(delay + jitter);
    }
  }
}
```

---

## Communication Protocols

### TCP vs UDP

| Aspect | TCP | UDP |
|--------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best effort |
| Ordering | In-order delivery | May be out of order |
| Speed | Slower (handshake, ack) | Faster |
| Use case | Web, email, file transfer | Video, VoIP, gaming |

**Choose TCP when:**
- Need all data to arrive
- Order matters
- Can tolerate latency

**Choose UDP when:**
- Speed > reliability
- Late data is worse than lost data
- Real-time applications

### RPC vs REST

#### Remote Procedure Call (RPC)

Call remote functions as if local.

```javascript
// gRPC example (Protocol Buffers)
const response = await userService.getUser({ id: 123 });
```

**Characteristics:**
- Action-oriented (verbs)
- Tight coupling
- Binary protocols (faster)
- Best for: Internal services

**Popular frameworks:** gRPC, Thrift, Avro

#### REST (Representational State Transfer)

Resource-oriented API design.

```javascript
// REST example
GET /users/123
POST /users
PUT /users/123
DELETE /users/123
```

**Characteristics:**
- Resource-oriented (nouns)
- Loose coupling
- HTTP/JSON (human-readable)
- Best for: Public APIs

### RPC vs REST Comparison

| Aspect | RPC | REST |
|--------|-----|------|
| Focus | Actions | Resources |
| Protocol | Any (often binary) | HTTP |
| Coupling | Tight | Loose |
| Performance | Faster | Slower |
| Flexibility | Less | More |
| Caching | Harder | Built into HTTP |
| Best for | Internal services | Public APIs |

### When to Use What

| Scenario | Protocol |
|----------|----------|
| Public API | REST |
| Internal microservices | gRPC/RPC |
| Real-time bidirectional | WebSocket |
| File uploads | REST + multipart |
| Browser clients | REST / GraphQL |
| Mobile native | gRPC or REST |
| High-performance internal | gRPC |

---

## Node.js Async Patterns

### Event-Driven Architecture

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Publisher
emitter.emit('user:created', { id: 123, email: 'user@example.com' });

// Subscribers
emitter.on('user:created', async (user) => {
  await sendWelcomeEmail(user);
});

emitter.on('user:created', async (user) => {
  await setupDefaultSettings(user);
});
```

### Pub/Sub with Redis

```javascript
const Redis = require('ioredis');
const publisher = new Redis();
const subscriber = new Redis();

// Publish
await publisher.publish('notifications', JSON.stringify({
  type: 'NEW_MESSAGE',
  userId: 123
}));

// Subscribe
subscriber.subscribe('notifications');
subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  handleNotification(data);
});
```

---

## Study Checklist

- [ ] Understand message queue vs task queue
- [ ] Know when to use Redis vs RabbitMQ vs SQS vs Kafka
- [ ] Can implement back pressure strategies
- [ ] Understand TCP vs UDP trade-offs
- [ ] Know RPC vs REST differences
- [ ] Can implement exponential backoff

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| Message Queue | Store-and-forward messages between services |
| Task Queue | Execute background jobs with workers |
| At-least-once | Message delivered 1+ times (may duplicate) |
| Back Pressure | Protect system when queue grows too large |
| Exponential Backoff | Retry with increasing delays |
| RPC | Call remote function as if local |
| REST | Resource-oriented HTTP API |
| TCP | Reliable, ordered, connection-oriented |
| UDP | Fast, unreliable, connectionless |
| gRPC | Google's high-performance RPC framework |
| Bull/BullMQ | Node.js task queue built on Redis |
