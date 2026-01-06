# Week 7: Security & API Design

## Authentication & Authorization

### Authentication vs Authorization

| Concept | Question Answered | Example |
|---------|-------------------|---------|
| **Authentication** | "Who are you?" | Login with username/password |
| **Authorization** | "What can you do?" | Admin vs regular user permissions |

### Authentication Methods

#### 1. Session-Based Authentication

```
[Client] → POST /login (credentials)
    ↓
[Server] → Validate → Create session → Store in Redis
    ↓
[Server] → Set-Cookie: session_id=abc123
    ↓
[Client] → Cookie sent with every request
    ↓
[Server] → Look up session in Redis → Identify user
```

**Pros:**
- Simple to implement
- Easy to revoke (delete session)
- Server has full control

**Cons:**
- Stateful (session storage needed)
- Doesn't scale well across services
- CSRF vulnerability

#### 2. Token-Based Authentication (JWT)

```
[Client] → POST /login (credentials)
    ↓
[Server] → Validate → Create JWT → Sign with secret
    ↓
[Server] → Return: { token: "eyJhbGc..." }
    ↓
[Client] → Authorization: Bearer eyJhbGc...
    ↓
[Server] → Verify signature → Decode payload → Identify user
```

**JWT Structure:**
```
header.payload.signature

Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "userId": 123, "role": "admin", "exp": 1699999999 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

**Pros:**
- Stateless (no session storage)
- Works across services/domains
- Contains user info (claims)

**Cons:**
- Can't revoke until expiry
- Token size (sent with every request)
- Security if secret is compromised

#### 3. OAuth 2.0 / OpenID Connect

For third-party authentication (Login with Google/GitHub).

```
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
```

**Use OAuth when:**
- Need "Login with X" functionality
- Accessing user data from third-party APIs
- Building multi-tenant SaaS

### Token Storage Best Practices

| Storage | XSS Safe | CSRF Safe | Best For |
|---------|----------|-----------|----------|
| localStorage | ❌ | ✅ | SPAs (with XSS mitigation) |
| httpOnly Cookie | ✅ | ❌ | Traditional web apps |
| Memory (variable) | ✅ | ✅ | Highest security |

**Recommendation:** HttpOnly cookie with CSRF token

---

## Authorization Patterns

### Role-Based Access Control (RBAC)

```javascript
const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
};

function authorize(user, action) {
  return roles[user.role]?.includes(action);
}
```

### Attribute-Based Access Control (ABAC)

```javascript
const policies = [
  {
    effect: 'allow',
    action: 'edit',
    resource: 'document',
    condition: (user, resource) => resource.ownerId === user.id
  },
  {
    effect: 'allow',
    action: 'edit',
    resource: 'document',
    condition: (user) => user.role === 'admin'
  }
];
```

---

## HTTPS & TLS

### Why HTTPS?

1. **Encryption** - Data can't be read in transit
2. **Authentication** - Server identity verified
3. **Integrity** - Data can't be modified

### TLS Handshake (Simplified)

```
[Client]                              [Server]
    |                                     |
    |--- Client Hello (supported ciphers)--->
    |                                     |
    |<-- Server Hello + Certificate -------|
    |                                     |
    |--- Verify cert with CA ------------->|
    |                                     |
    |--- Key Exchange -------------------->|
    |                                     |
    |<========= Encrypted Session ========>|
```

**Latency Impact:** ~1-2 RTT for TLS handshake (can be reduced with TLS 1.3)

### Certificate Chain

```
Root CA (Browser trusts)
    ↓
Intermediate CA
    ↓
Your Certificate (example.com)
```

---

## Data Security

### Data at Rest

- **Encryption:** AES-256 for stored data
- **Key Management:** Use AWS KMS, HashiCorp Vault
- **Database:** Enable Transparent Data Encryption (TDE)

### Data in Transit

- **Always use HTTPS** (TLS 1.2+)
- **Certificate pinning** for mobile apps
- **mTLS** for service-to-service

### Sensitive Data Handling

```javascript
// ❌ Never log sensitive data
console.log(`User login: ${email}, password: ${password}`);

// ✅ Mask sensitive fields
console.log(`User login: ${email}, password: ***`);

// ❌ Never store plaintext passwords
db.insert({ password: userInput });

// ✅ Use bcrypt with salt
const hash = await bcrypt.hash(userInput, 12);
db.insert({ password: hash });
```

### PII (Personally Identifiable Information)

| PII Type | Storage | Access |
|----------|---------|--------|
| SSN, Credit Cards | Encrypted, separate DB | Need-to-know only |
| Email, Phone | Encrypted at rest | Authenticated users |
| Name, Preferences | Standard encryption | Application access |

---

## Common Security Vulnerabilities

### 1. SQL Injection

```javascript
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Use parameterized queries
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);
```

### 2. XSS (Cross-Site Scripting)

```javascript
// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Escape output
element.textContent = userInput;
// Or use sanitization library
```

### 3. CSRF (Cross-Site Request Forgery)

```html
<!-- Include CSRF token in forms -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  ...
</form>
```

### 4. Rate Limiting (DoS Protection)

```javascript
const rateLimit = require('express-rate-limit');

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
}));
```

---

## API Design Best Practices

### RESTful API Design

#### Resource Naming

```
✅ Good (nouns, plural):
GET    /users           # List users
GET    /users/123       # Get user 123
POST   /users           # Create user
PUT    /users/123       # Update user 123
DELETE /users/123       # Delete user 123

❌ Bad (verbs):
GET    /getUser/123
POST   /createUser
DELETE /deleteUser/123
```

#### Nested Resources

```
GET /users/123/posts          # Posts by user 123
GET /users/123/posts/456      # Post 456 by user 123
POST /users/123/posts         # Create post for user 123
```

#### Query Parameters

```
GET /users?role=admin                    # Filtering
GET /users?sort=created_at&order=desc    # Sorting
GET /users?page=2&limit=20               # Pagination
GET /users?fields=id,name,email          # Field selection
```

### HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | Not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable | Validation failed |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Error | Server error |

### API Response Format

```javascript
// Success response
{
  "data": {
    "id": 123,
    "name": "John",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "message": "must be a valid email" }
    ]
  }
}

// Paginated response
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### API Versioning

```
# URL versioning (most common)
GET /api/v1/users
GET /api/v2/users

# Header versioning
GET /api/users
Accept: application/vnd.myapp.v1+json

# Query parameter
GET /api/users?version=1
```

### Idempotency

Operations that can be repeated without different outcomes.

| Method | Idempotent? | Notes |
|--------|-------------|-------|
| GET | ✅ Yes | Safe, no side effects |
| PUT | ✅ Yes | Same result every time |
| DELETE | ✅ Yes | Already deleted = same result |
| POST | ❌ No | Creates new resource each time |

**Making POST idempotent:**
```javascript
// Client sends unique idempotency key
POST /payments
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000

// Server checks if key was already processed
const existing = await db.findByIdempotencyKey(key);
if (existing) return existing.result;
```

---

## API Gateway

Centralized entry point for all API requests.

```
[Clients]
    ↓
[API Gateway]
    ├── Authentication
    ├── Rate Limiting
    ├── Request Routing
    ├── Load Balancing
    ├── Caching
    └── Logging
    ↓
[Microservices]
```

### API Gateway Responsibilities

| Function | Description |
|----------|-------------|
| **Authentication** | Verify tokens before routing |
| **Rate Limiting** | Prevent abuse |
| **Routing** | Direct requests to correct service |
| **Transformation** | Convert protocols/formats |
| **Aggregation** | Combine multiple service calls |
| **Caching** | Cache frequent responses |

**Popular Solutions:** AWS API Gateway, Kong, NGINX, Envoy

---

## Pagination Strategies

### Offset Pagination

```sql
SELECT * FROM posts ORDER BY created_at LIMIT 20 OFFSET 40;
```

**Pros:** Simple, allows jumping to any page
**Cons:** Slow for large offsets, inconsistent with new data

### Cursor Pagination (Recommended)

```sql
SELECT * FROM posts 
WHERE created_at < '2024-01-15T10:00:00Z'
ORDER BY created_at DESC 
LIMIT 20;
```

```javascript
// Response includes cursor for next page
{
  "data": [...],
  "cursors": {
    "next": "eyJjcmVhdGVkX2F0IjoiMjAyNC0wMS0xNVQxMDowMDowMFoifQ=="
  }
}
```

**Pros:** Consistent results, efficient for large datasets
**Cons:** Can't jump to arbitrary page

---

## Study Checklist

- [ ] Can explain OAuth 2.0 flow
- [ ] Understand JWT structure and trade-offs
- [ ] Know when to use session vs token auth
- [ ] Can design RESTful API endpoints
- [ ] Understand HTTP status codes
- [ ] Know pagination strategies and trade-offs
- [ ] Can explain TLS handshake basics

## Key Terms Flashcard Summary

| Term | One-liner |
|------|-----------|
| JWT | Stateless token containing encoded claims |
| OAuth 2.0 | Authorization framework for third-party access |
| RBAC | Role-Based Access Control |
| CSRF | Attack exploiting authenticated session |
| XSS | Injection of malicious scripts |
| Idempotency | Operation produces same result when repeated |
| API Gateway | Centralized entry point for API requests |
| Cursor Pagination | Page using last item's ID, not offset |
| TLS | Transport Layer Security for encrypted connections |
