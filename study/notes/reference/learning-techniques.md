# Learning Techniques Guide
## Based on "Learning How to Learn" by Dr. Barbara Oakley

This guide integrates proven learning science into your system design study plan.

---

## 🧠 The Science of Effective Learning

**Key insight:** Passive reading creates the *illusion* of knowledge. Active engagement builds *actual* knowledge.

```
❌ Ineffective: Read → Highlight → Re-read → Hope you remember
✅ Effective: Read → Close book → Recall → Test → Teach → Space out reviews
```

---

## 1. Active Recall & Practice

### 1.1 Retrieval Practice

**What:** Close your notes and try to recall information from memory.

**Why it works:** Every time you retrieve information, you strengthen neural pathways.

**How to apply:**

After reading each section of weekly notes:
```
1. Close the file/book
2. Write down everything you remember (paper or blank doc)
3. Check what you missed
4. Focus extra attention on gaps
```

**Template for Retrieval Practice:**
```
Topic: _____________________
Date: _____________________

What I remember (without looking):
1.
2.
3.
4.
5.

What I missed (after checking):
-
-

Key insight I need to reinforce:
```

### 1.2 Self-Testing

**What:** Regularly quiz yourself, especially on challenging material.

**How to apply:**
- Use `exercises/self-quiz.md` after each week
- Use `exercises/quick-drills.md` daily
- Create Anki cards for concepts you struggle with
- **Focus on failures** - cards you get wrong are the most valuable

**Testing schedule:**
| When | What | Time |
|------|------|------|
| After each section | Quick recall (no notes) | 2 min |
| End of day | Review day's concepts | 5 min |
| End of week | Self-quiz for the week | 10 min |
| Before moving on | Must score 4/5 or repeat | - |

### 1.3 Feynman Technique (Teach Others)

**What:** Explain concepts as if teaching a 12-year-old. If you can't explain simply, you don't understand deeply.

**The 4 Steps:**
1. **Choose a concept** (e.g., "CAP Theorem")
2. **Explain it simply** - Write/speak as if to someone with no technical background
3. **Identify gaps** - Where did you struggle or use jargon?
4. **Simplify and retry** - Go back to source, then explain again

**Feynman Practice Template:**
```
Concept: _____________________

My simple explanation (no jargon):




Analogy I can use:



Where I struggled to explain:



What I need to review:
```

**Built-in Feynman opportunities:**
- Mock interviews (explain designs out loud)
- Whiteboard prompts (explain while drawing)
- Weekly notes have "Key Terms" - explain each without looking

**Practice partner options:**
- Rubber duck (literally explain to an object)
- Voice record yourself, listen back
- Study buddy / peer
- Write a blog post explaining the concept

---

## 2. Connecting & Organizing Information

### 2.1 Chunking

**What:** Break complex information into meaningful, connected groups.

**Why it works:** Working memory holds ~4 items. Chunks let you pack more into each slot.

**System Design Chunks:**

```
CHUNK 1: Data Storage
├── SQL (ACID, relations, joins)
├── NoSQL (types: KV, doc, column, graph)
└── When to use each

CHUNK 2: Scaling Patterns
├── Vertical vs Horizontal
├── Replication (master-slave, master-master)
└── Sharding strategies

CHUNK 3: Performance
├── Caching (layers, patterns, invalidation)
├── CDN
└── Async processing

CHUNK 4: Reliability
├── Load balancing
├── Redundancy
├── Circuit breakers

CHUNK 5: Communication
├── Sync (REST, RPC)
├── Async (queues, pub-sub)
└── Protocols (TCP, UDP)
```

**How to build chunks:**
1. Focus on understanding, not memorizing
2. Practice until pattern becomes automatic
3. Connect chunks to bigger picture
4. Review chunks regularly

**Chunking exercise:** For each weekly topic, create a chunk map like above.

### 2.2 Interleaving

**What:** Mix different topics/problem types in a single study session.

**Why it works:** Teaches your brain *when* to use each technique, not just *how*.

**❌ Blocked practice (less effective):**
```
Day 1: Caching, caching, caching
Day 2: Databases, databases, databases
Day 3: Queues, queues, queues
```

**✅ Interleaved practice (more effective):**
```
Day 1: Caching problem → Database problem → Queue problem
Day 2: Database problem → Queue problem → Caching problem
Day 3: Queue problem → Caching problem → Database problem
```

**Interleaved Quick Drill Schedule:**
| Day | Drill Mix |
|-----|-----------|
| Mon | Estimation + Architecture + Speed recall |
| Tue | Architecture + Design + Estimation |
| Wed | Design + Speed + Architecture |
| Thu | Speed + Estimation + Design |
| Fri | Mix of hardest from the week |

**Interleaved Design Practice:**
When practicing full designs, alternate between:
- Read-heavy systems (Twitter timeline)
- Write-heavy systems (Chat app)
- Computation-heavy (Video processing)
- Real-time systems (Uber)

### 2.3 Elaboration

**What:** Ask "why" and "how" questions. Connect new ideas to what you already know.

**Elaboration prompts to ask yourself:**

```
WHY questions:
- Why does this pattern exist?
- Why would I choose this over alternatives?
- Why might this fail?

HOW questions:
- How does this actually work under the hood?
- How would I implement this?
- How does this connect to [other concept]?

WHAT IF questions:
- What if traffic increased 100x?
- What if this component failed?
- What if requirements changed to [X]?
```

**Elaboration exercise for each topic:**
```
Topic: Cache-Aside Pattern

Why does it exist?
→ Databases are slow, memory is fast, not all data is accessed equally

How does it work?
→ Check cache → miss → query DB → store in cache → return

How does it connect to what I know?
→ Like browser caching I've used, but server-side
→ Similar to memoization in programming

What if cache server dies?
→ All requests hit DB, need circuit breaker or fallback
```

### 2.4 Dual Coding

**What:** Combine verbal/written information with visual representations.

**Why it works:** Creates two memory pathways instead of one.

**Apply to system design:**

For every concept, have BOTH:
1. **Verbal:** Written explanation you can recite
2. **Visual:** Diagram you can draw from memory

**Dual coding practice:**
```
1. Read the concept (verbal)
2. Draw it without looking (visual)
3. Explain your drawing out loud (verbal + visual)
4. Compare to reference diagram
```

**Visual library to memorize:**
- [ ] Basic web architecture (LB → servers → DB)
- [ ] Master-slave replication
- [ ] Cache-aside flow
- [ ] Message queue architecture
- [ ] Sharding with router
- [ ] CDN request flow
- [ ] Microservices with API gateway
- [ ] Rate limiter flow

Use `exercises/whiteboard-prompts.md` for structured visual practice.

---

## 3. Mindset & Environment

### 3.1 Minimize Distractions

**The science:** Context switching costs 23 minutes to regain focus. Notifications destroy deep learning.

**Study environment checklist:**
- [ ] Phone on silent, in another room (not just face-down)
- [ ] Close all unrelated browser tabs
- [ ] Close Slack/Discord/email
- [ ] Use website blocker if needed (Cold Turkey, Freedom)
- [ ] Noise-canceling headphones or quiet space
- [ ] Water bottle ready (don't use thirst as excuse to leave)

**Focus ritual:**
```
Before starting:
1. Set specific goal ("Complete Week 3 notes + self-quiz")
2. Set timer (Pomodoro - see below)
3. Put phone away
4. Close everything except study materials
5. Take 3 deep breaths
6. Start
```

### 3.2 Pomodoro Technique

**What:** Work in focused 25-minute blocks with 5-minute breaks.

**Why it works:** 
- Creates urgency (beat the timer!)
- Prevents burnout
- Breaks trigger diffuse mode thinking

**Pomodoro structure for system design:**

```
🍅 Pomodoro 1 (25 min): Read new concept
   Break (5 min): Walk, stretch, look away from screen
   
🍅 Pomodoro 2 (25 min): Retrieval practice + Anki
   Break (5 min): Get water, bathroom
   
🍅 Pomodoro 3 (25 min): Practice problem
   Break (5 min): Quick snack
   
🍅 Pomodoro 4 (25 min): Continue problem / review
   Long break (15-30 min): Walk outside, different activity
```

**Pomodoro rules:**
- If interrupted, the pomodoro doesn't count (restart)
- Write down distracting thoughts to address later
- During break: NO screens (let brain rest)
- After 4 pomodoros: longer break (15-30 min)

**Recommended apps:** 
- Pomodoro Timer (simple)
- Forest (gamified)
- Be Focused (macOS)

### 3.3 Get the Big Picture First

**What:** Before diving deep, understand the overall structure and where pieces fit.

**Why it works:** Creates mental "hooks" for new information to attach to.

**Before each week:**
1. Skim the entire week's notes (5 min)
2. Look at all headings and diagrams
3. Read the "Key Terms" section
4. Ask: "How does this connect to previous weeks?"

**System Design Big Picture Map:**

```
                    SYSTEM DESIGN
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
FUNDAMENTALS         BUILDING            PRACTICE
    │                 BLOCKS                 │
    │                    │                    │
┌───┴───┐         ┌──────┼──────┐      ┌─────┴─────┐
│Week 1 │         │Week 2│Week 3│      │ Week 9-12 │
│CAP    │         │Infra │  DB  │      │ Problems  │
│Scale  │         │      │      │      │ Mock Int  │
└───────┘         └──────┴──────┘      └───────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
           Week 4     Week 5     Week 6
           Cache      Async      Interview
                                Framework
                         │
              ┌──────────┴──────────┐
              │                     │
           Week 7              Week 8
           Security            Monitoring
           API Design          Rate Limit
```

### 3.4 Write by Hand

**What:** Take notes with pen and paper, not typing.

**Why it works:** 
- Forces you to process and summarize (can't write as fast as type)
- Better retention than verbatim typing
- Engages motor memory

**When to write by hand:**
- [ ] Whiteboard prompt practice (paper or actual whiteboard)
- [ ] Retrieval practice (blank paper, write what you remember)
- [ ] System design diagrams
- [ ] Key formulas and numbers
- [ ] Chunk maps and concept summaries

**Handwriting practice:**
1. After reading a section, close it
2. On paper, write the key points from memory
3. Draw the main diagram from memory
4. Check and correct

---

## 4. Application & Review

### 4.1 Practice Problems

**What:** For technical subjects, work through problems step-by-step.

**System design practice hierarchy:**

```
Level 1: Quick Drills (5-10 min)
→ Estimation, component selection, pattern matching

Level 2: Whiteboard Prompts (15-30 min)  
→ Draw specific architectures from memory

Level 3: Full Design Problems (45 min)
→ Complete system design with 4-step framework

Level 4: Mock Interviews (45-60 min)
→ Realistic practice with time pressure
```

**Problem-solving protocol:**
```
1. Read problem completely
2. Identify what type of problem (estimation, design, trade-off)
3. Recall relevant patterns/chunks
4. Attempt solution WITHOUT looking at notes
5. Check solution
6. Identify gaps
7. Re-attempt in 2-3 days
```

### 4.2 Immediate Review

**What:** Briefly review material right after learning it.

**Why it works:** Consolidates short-term memory before it fades.

**Immediate review protocol:**

```
After finishing a study session:

1. Close all materials (2 min)
   - Put away notes
   - Close tabs

2. Recall out loud (3 min)
   - What were the main topics?
   - What's the ONE key insight?
   - What diagram should I remember?

3. Quick write (2 min)
   - On paper, write 3 bullet points of what you learned

4. Preview tomorrow (1 min)
   - What will you study next?
   - How does it connect?
```

**Immediate review template:**
```
Date: ___________
Session: ___________

3 things I learned:
1.
2.
3.

1 key insight:


1 question I still have:


Tomorrow I'll study:
```

---

## 📅 Integrated Daily Schedule

Incorporating ALL techniques:

```
┌─────────────────────────────────────────────────────────────┐
│ MORNING SESSION (45-60 min)                                 │
├─────────────────────────────────────────────────────────────┤
│ 🍅 Pomodoro 1: Anki Review (spaced repetition)              │
│    - Review all due cards                                   │
│    - Focus on failures                                      │
│    Break: 5 min (no screens)                                │
│                                                             │
│ 🍅 Pomodoro 2: New Material (chunking, big picture)         │
│    - Skim entire section first                              │
│    - Read with elaboration (why? how?)                      │
│    Break: 5 min                                             │
│                                                             │
│ Immediate Review: 5 min                                     │
│    - Close book, write 3 key points                         │
│    - Draw main diagram from memory                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MIDDAY SESSION (15-20 min)                                  │
├─────────────────────────────────────────────────────────────┤
│ Quick Drills (interleaved)                                  │
│    - Mix different topic types                              │
│    - Use retrieval practice                                 │
│                                                             │
│ Feynman Practice: Pick one concept                          │
│    - Explain out loud without notes                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ EVENING SESSION (45-60 min) - 3-4x per week                 │
├─────────────────────────────────────────────────────────────┤
│ Environment: Phone away, tabs closed, focus mode            │
│                                                             │
│ 🍅 Pomodoro 1: Full design problem                          │
│    - Whiteboard/paper (write by hand)                       │
│    - Draw diagrams (dual coding)                            │
│    Break: 5 min                                             │
│                                                             │
│ 🍅 Pomodoro 2: Continue + review solution                   │
│    - Compare to reference                                   │
│    - Identify gaps                                          │
│    Break: 5 min                                             │
│                                                             │
│ Immediate Review: 5 min                                     │
│    - What did I learn from this problem?                    │
│    - What pattern should I remember?                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BEFORE BED (5-10 min)                                       │
├─────────────────────────────────────────────────────────────┤
│ Self-Quiz: 5 questions from the week                        │
│ Retrieval: What did I learn today? (no notes)               │
│ Preview: What will I study tomorrow?                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Weekly Technique Checklist

Check off each technique used during the week:

| Technique | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|-----------|-----|-----|-----|-----|-----|-----|-----|
| Retrieval Practice | | | | | | | |
| Self-Testing | | | | | | | |
| Feynman (Teach) | | | | | | | |
| Spaced Repetition (Anki) | | | | | | | |
| Chunking | | | | | | | |
| Interleaving | | | | | | | |
| Elaboration (Why/How) | | | | | | | |
| Dual Coding (Visual) | | | | | | | |
| Distraction-Free | | | | | | | |
| Pomodoro | | | | | | | |
| Big Picture First | | | | | | | |
| Write by Hand | | | | | | | |
| Practice Problems | | | | | | | |
| Immediate Review | | | | | | | |

**Goal:** Use at least 10 techniques every day.

---

## 🎯 Quick Reference Card

Print this and keep at your study desk:

```
┌─────────────────────────────────────────────┐
│         LEARNING HOW TO LEARN               │
│         Quick Reference Card                │
├─────────────────────────────────────────────┤
│                                             │
│ BEFORE STUDYING:                            │
│ □ Phone away (different room)               │
│ □ Close all tabs                            │
│ □ Set specific goal                         │
│ □ Skim material for big picture             │
│ □ Set Pomodoro timer (25 min)               │
│                                             │
│ WHILE STUDYING:                             │
│ □ Ask "Why?" and "How?"                     │
│ □ Draw diagrams (dual coding)               │
│ □ Write by hand when possible               │
│ □ Take breaks (no screens!)                 │
│                                             │
│ AFTER EACH SECTION:                         │
│ □ Close book → Recall → Check               │
│ □ Write 3 key points from memory            │
│ □ Draw main diagram from memory             │
│                                             │
│ DAILY:                                      │
│ □ Anki review (spaced repetition)           │
│ □ Mix topics (interleaving)                 │
│ □ Explain one concept out loud (Feynman)    │
│                                             │
│ WEEKLY:                                     │
│ □ Self-quiz for the week                    │
│ □ Full design problem on paper              │
│ □ Review and update Anki cards              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Common Mistakes to Avoid

| ❌ Mistake | ✅ Instead |
|-----------|-----------|
| Re-reading notes | Close and recall |
| Highlighting everything | Write summary in own words |
| Studying same topic for hours | Interleave topics |
| Checking phone "just once" | Phone in another room |
| Skipping breaks | Pomodoro with real breaks |
| Passive watching videos | Pause and explain what you learned |
| Studying when tired | Sleep first, study fresh |
| Cramming before interview | Spaced practice over weeks |
