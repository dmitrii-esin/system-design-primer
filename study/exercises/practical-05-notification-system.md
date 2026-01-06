# Practical Exercise 5: Design a Notification System

## Objective

Design a notification system using message queues for a social media application.

## Problem Statement

Design a system that can send notifications when:
- Someone likes your post
- Someone comments on your post
- Someone follows you
- Someone mentions you

**Requirements:**
- Support push notifications, email, and in-app notifications
- Handle 10M users, 100M notifications/day
- Notifications should be delivered within 1 minute
- Users can configure notification preferences

---

## Part 1: Requirements Gathering

### Functional Requirements

- [ ] Multiple notification channels (push, email, in-app)
- [ ] User notification preferences
- [ ] Notification templates
- [ ] Delivery confirmation/tracking
- [ ] Retry failed notifications

### Non-Functional Requirements

| Requirement | Value |
|-------------|-------|
| Daily notifications | 100M |
| Peak notifications/sec | ? (calculate) |
| Delivery latency | < 1 minute |
| Availability | 99.9% |

**Calculate peak notifications/sec:**
```
100M / day
= 100M / 86,400 sec
≈ 1,200 notifications/sec average
Peak (3x) ≈ 3,600 notifications/sec
```

---

## Part 2: High-Level Design

Draw your architecture:

```
[Draw your design here]

Example structure:

[Event Producers]
(Post Service, Follow Service, etc.)
        ↓
[Event Bus / Message Queue]
        ↓
[Notification Service]
        ↓
┌───────┼───────┐
↓       ↓       ↓
[Push] [Email] [In-App]
Queue   Queue   Queue
  ↓       ↓       ↓
Workers Workers Workers
  ↓       ↓       ↓
[FCM]  [SendGrid] [WebSocket]
```

Your design:
```










```

---

## Part 3: Component Design

### Event Schema

```javascript
// Notification Event
{
  "eventId": "uuid",
  "eventType": "POST_LIKED",  // POST_LIKED, POST_COMMENTED, FOLLOWED, MENTIONED
  "timestamp": "2024-01-15T10:30:00Z",
  "actor": {
    "userId": "user123",
    "username": "alice"
  },
  "recipient": {
    "userId": "user456"
  },
  "context": {
    "postId": "post789",
    "commentId": null
  }
}
```

### Notification Preferences Schema

```javascript
{
  "userId": "user456",
  "preferences": {
    "POST_LIKED": {
      "push": true,
      "email": false,
      "inApp": true
    },
    "POST_COMMENTED": {
      "push": true,
      "email": true,
      "inApp": true
    },
    "FOLLOWED": {
      "push": true,
      "email": false,
      "inApp": true
    },
    "MENTIONED": {
      "push": true,
      "email": true,
      "inApp": true
    }
  },
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "08:00",
    "timezone": "America/New_York"
  }
}
```

### Database Schema

```sql
-- Design your tables here

CREATE TABLE notifications (
    -- TODO: Define columns
);

CREATE TABLE notification_preferences (
    -- TODO: Define columns
);

CREATE TABLE notification_delivery (
    -- TODO: Define columns
);
```

---

## Part 4: Message Queue Design

### Queue Architecture

```
                    ┌─→ [Push Queue] ─→ [Push Workers] ─→ [FCM/APNS]
                    │
[Main Event Queue] ─┼─→ [Email Queue] ─→ [Email Workers] ─→ [SendGrid]
                    │
                    └─→ [In-App Queue] ─→ [In-App Workers] ─→ [WebSocket/DB]
```

### Implementation with Bull (Node.js)

```javascript
const Queue = require('bull');

// Create queues
const notificationQueue = new Queue('notifications');
const pushQueue = new Queue('push-notifications');
const emailQueue = new Queue('email-notifications');
const inAppQueue = new Queue('inapp-notifications');

// Main notification processor
notificationQueue.process(async (job) => {
  const event = job.data;
  const preferences = await getUserPreferences(event.recipient.userId);
  
  // TODO: Implement routing logic
  // 1. Check user preferences for this event type
  // 2. Check quiet hours
  // 3. Route to appropriate channel queues
});

// Push notification worker
pushQueue.process(async (job) => {
  const { userId, title, body, data } = job.data;
  
  // TODO: Implement push notification
  // 1. Get user's device tokens
  // 2. Send to FCM/APNS
  // 3. Handle failures and retries
});

// Email worker
emailQueue.process(async (job) => {
  const { userId, templateId, templateData } = job.data;
  
  // TODO: Implement email notification
  // 1. Get user's email
  // 2. Render template
  // 3. Send via email provider
});

// In-app worker
inAppQueue.process(async (job) => {
  const { userId, notification } = job.data;
  
  // TODO: Implement in-app notification
  // 1. Store in database
  // 2. Send via WebSocket if user online
});
```

---

## Part 5: Handle Edge Cases

### Rate Limiting

```javascript
// Prevent notification spam
const rateLimit = {
  maxPerMinute: 10,
  maxPerHour: 50,
  maxPerDay: 200
};

async function shouldSendNotification(userId, eventType) {
  // TODO: Implement rate limiting
  // 1. Check recent notification count
  // 2. Return false if limit exceeded
}
```

### Aggregation (Batching)

```javascript
// Instead of "Alice, Bob, Carol liked your post" (3 notifications)
// Send "Alice and 2 others liked your post" (1 notification)

async function aggregateNotifications(userId, eventType, timeWindow) {
  // TODO: Implement aggregation
  // 1. Collect similar events within time window
  // 2. Create single aggregated notification
}
```

### Retry Strategy

```javascript
const pushQueue = new Queue('push-notifications', {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000  // 1s, 2s, 4s
    },
    removeOnComplete: 1000,
    removeOnFail: 5000
  }
});
```

---

## Part 6: Scaling Considerations

### Questions to Answer

1. **How do you handle 3,600 notifications/sec?**
   ```
   
   ```

2. **What if email provider is slow?**
   ```
   
   ```

3. **How do you ensure exactly-once delivery?**
   ```
   
   ```

4. **How do you handle user coming online after missing notifications?**
   ```
   
   ```

5. **How do you monitor the system?**
   ```
   
   ```

---

## Part 7: Your Complete Design

Summarize your design:

### Architecture Diagram
```
[Final architecture]





```

### Key Components
| Component | Technology | Purpose |
|-----------|------------|---------|
| Event Bus | | |
| Queue | | |
| Push Service | | |
| Email Service | | |
| Database | | |
| Cache | | |

### Data Flow
```
1. User likes a post
2. 
3. 
4. 
5. Notification delivered
```

### Scaling Strategy
```




```

---

## Reflection Questions

1. Why use separate queues for each channel?
2. How would you add a new notification channel (SMS)?
3. What's the trade-off between real-time and batched notifications?
4. How would you handle international users (timezone, language)?

## Checklist

- [ ] Defined functional and non-functional requirements
- [ ] Drew high-level architecture
- [ ] Designed event and data schemas
- [ ] Implemented queue routing logic
- [ ] Handled rate limiting and aggregation
- [ ] Addressed scaling concerns
- [ ] Can explain design decisions in interview
