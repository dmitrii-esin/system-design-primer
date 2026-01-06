# System Design Learning - Quick Start Guide

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

## Step 3: Daily Routine

| Time | Activity | Notes |
|------|----------|-------|
| Morning | 15-20 min Anki review | Before other work |
| Lunch | 20-30 min concept reading | From README.md sections |
| Evening | 30-60 min practice problem | 3-4x per week |

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
│   └── reference/
│       ├── latency-numbers.md
│       └── estimation-cheatsheet.md
├── exercises/
│   ├── practical-01-cap-diagram.md
│   ├── practical-02-architecture-diagram.md
│   ├── practical-03-db-justification.md
│   ├── practical-04-cache-aside.md
│   ├── practical-05-notification-system.md
│   └── practical-06-estimation.md
└── mock-interviews/
    └── templates/
        └── interview-template.md
```

## Success Metrics

By end of 12 weeks, you should be able to:
- [ ] Explain any core system design concept in 2-3 minutes
- [ ] Complete Anki reviews with 90%+ retention rate
- [ ] Design a system following the 4-step framework in 45 minutes
- [ ] Do back-of-envelope calculations confidently
- [ ] Whiteboard 5+ common system designs from memory
