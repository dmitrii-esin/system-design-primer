# System Design Learning - Quick Start Guide

## ⚡ Before You Start: Learning How to Learn

**Read this first:** `notes/reference/learning-techniques.md`

This study plan uses evidence-based learning techniques from Dr. Barbara Oakley's "Learning How to Learn":

| Technique | How We Use It |
|-----------|--------------|
| **Retrieval Practice** | Self-quizzes, close-book recall |
| **Spaced Repetition** | Anki daily reviews |
| **Interleaving** | Mixed topic drills |
| **Feynman Technique** | Explain out loud, mock interviews |
| **Chunking** | Weekly topic groupings |
| **Dual Coding** | Whiteboard diagrams + text |
| **Pomodoro** | 25-min focused sessions |
| **Elaboration** | "Why/How" prompts in notes |

**Key principle:** Active engagement beats passive reading. Close the book and recall!

---

## Step 1: Install Anki (Day 1)

### macOS
```bash
brew install --cask anki
```

Or download from: https://apps.ankiweb.net/

### Import Flashcard Decks

1. Open Anki
2. Click "Import File" or use File → Import
3. Import these three decks (in order):
   - `resources/flash_cards/System Design.apkg` - 150+ core concept cards
   - `resources/flash_cards/System Design Exercises.apkg` - Practice problem cards
   - `resources/flash_cards/OO Design.apkg` - Object-oriented design cards

### Configure Anki Settings (Recommended)
- New cards/day: 20
- Maximum reviews/day: 200
- Learning steps: 1m 10m 1d
- Graduating interval: 4 days

## Step 2: Bookmark Key Resources

### Required Videos
- [ ] [Harvard Scalability Lecture](https://www.youtube.com/watch?v=-W9F__D3oY4) (Week 1)
- [ ] [System Design Interview Intro](https://www.youtube.com/watch?v=ZgdS0EUmn70) (Week 6)

### Required Reading
- [ ] [Scalability for Dummies](https://web.archive.org/web/20221030091841/http://www.lecloud.net/tagged/scalability/chrono)
- [ ] Main README.md in this repository

## Step 3: Daily Routine (Evidence-Based Learning)

### Morning Session (45-60 min) - Use Pomodoro!

| Pomodoro | Activity | Technique Used |
|----------|----------|----------------|
| 🍅 1 (25 min) | Anki review | Spaced Repetition |
| Break (5 min) | Walk, no screens | Diffuse Mode |
| 🍅 2 (25 min) | Read new material | Chunking, Elaboration |
| Break (5 min) | Stretch | - |
| After | Close book, write 3 points | Retrieval Practice |

### Midday (15 min)

| Activity | Technique Used |
|----------|----------------|
| Quick Drill (mixed topics) | Interleaving |
| Explain 1 concept aloud | Feynman Technique |

### Evening (45-60 min) - 3-4x per week

| Activity | Technique Used |
|----------|----------------|
| Full design problem (paper!) | Dual Coding, Write by Hand |
| Compare to solution | Self-Testing |
| Identify gaps, retry in 2-3 days | Spaced Practice |

### Before Bed (5 min)

| Activity | Technique Used |
|----------|----------------|
| Self-quiz (5 questions) | Retrieval Practice |
| What did I learn today? | Immediate Review |

### Key Principles

1. **Phone in another room** - Not face-down, AWAY
2. **Close all tabs** - Before starting
3. **Breaks = no screens** - Let brain rest (diffuse mode)
4. **Never skip Anki** - Even 5 minutes on busy days
5. **Explain out loud daily** - Feynman technique

See `notes/reference/learning-techniques.md` for the complete system.

## Step 4: Track Your Progress

Use `study/progress/TRACKER.md` to log daily progress.

## Directory Structure

```
study/
├── GETTING_STARTED.md      # This file
├── progress/
│   └── TRACKER.md          # Daily progress tracker
├── notes/
│   ├── week01-foundations.md
│   ├── week02-infrastructure.md
│   ├── week03-databases.md
│   ├── week04-caching.md
│   ├── week05-async.md
│   ├── week06-interview-framework.md
│   ├── week07-security-api.md          # NEW: Security & API Design
│   ├── week08-ratelimit-monitoring.md  # NEW: Rate Limiting & Monitoring
│   └── reference/
│       ├── latency-numbers.md
│       ├── estimation-cheatsheet.md
│       ├── spaced-repetition-guide.md  # Anki setup & flashcard templates
│       └── learning-techniques.md      # NEW: Full learning science guide
├── exercises/
│   ├── practical-01-cap-diagram.md
│   ├── practical-02-architecture-diagram.md
│   ├── practical-03-db-justification.md
│   ├── practical-04-cache-aside.md
│   ├── practical-05-notification-system.md
│   ├── practical-06-estimation.md
│   ├── quick-drills.md                 # 5-10 min daily exercises
│   ├── self-quiz.md                    # Weekly self-assessment
│   ├── whiteboard-prompts.md           # Diagram practice (dual coding)
│   └── feynman-prompts.md              # NEW: Teach concepts out loud
└── mock-interviews/
    └── templates/
        └── interview-template.md
```

## Success Metrics

By end of 12 weeks, you should be able to:

### Knowledge Metrics
- [ ] Explain any core concept in 2-3 minutes (Feynman test)
- [ ] Complete Anki reviews with 85-95% retention rate
- [ ] Score 4/5+ on all self-quiz weeks
- [ ] Draw all whiteboard prompts from memory

### Skill Metrics
- [ ] Design a system using 4-step framework in 45 minutes
- [ ] Do back-of-envelope calculations in < 2 minutes
- [ ] Whiteboard 5+ system designs without reference

### Process Metrics
- [ ] Completed 12 weeks of daily Anki (no skips)
- [ ] Used Pomodoro technique consistently
- [ ] Practiced Feynman technique on all major concepts
- [ ] Completed at least 2 mock interviews
