# Unicorn Story Time — Project Context

> This file is the single source of truth for this project. Read it at the start of every
> session. Update it whenever something important changes.

---

## Overview

Unicorn Story Time is an installable phone web app (PWA) — a choose-your-own-adventure
unicorn story built for Adrian's 7-year-old daughter, who is entering 2nd grade and reads
above her grade level. She plays AS a unicorn she names and customizes, makes choices that
genuinely change the story, and earns cosmetics, treasures, fancy words, and badges along
the way.

The goal is not "an app that teaches reading." The goal is a game she *wants* to play, that
happens to make her a stronger reader.

## Status

| Field | Value |
|-------|-------|
| **Current Version** | v0.3 |
| **Phase** | Playable build — Chapters 1–3 |
| **Started** | 2026-08-30 |
| **Last Updated** | 2026-08-30 |
| **GitHub Repo** | Not yet created — see docs/HOW_TO_PUBLISH.md |

---

## The Problem We're Solving

She's a strong reader who is not being challenged. Grade-level books are too easy, and
harder books are boring or babyish in subject matter. Reading apps mostly gamify drills
rather than stories.

**Success looks like:** she asks to play it. She finishes a chapter and immediately wants
the next one. She uses a word at dinner that she learned in the Word Chest.

## Goals

- **Primary:** She reads more, and reads harder text, because she wants to
- **Secondary:** Choices feel consequential — she replays to see the other path
- **v1.0 = done when:** 8–12 chapters exist, the full reward economy is satisfying, she has
  played it start to finish at least once, and it's installed on her phone

---

## Player Profile

| Field | Value |
|-------|-------|
| Age | 7, entering 2nd grade |
| Reading level | Above grade level — text targets 3rd–4th grade |
| Loves | Unicorns |
| Device | Phone (portrait, one-handed) |

---

## Tech Stack & Tools

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | Plain HTML / CSS / JavaScript | No frameworks, no build step. Adrian can open index.html by double-clicking it. |
| Story content | `app/data/story.js` | Story lives in a separate data file so adding chapters never touches game code |
| Backend | None | Everything runs in the browser |
| Saving | `localStorage` (3 save slots) | Progress lives on her phone. No accounts, no login, no data leaves the device. |
| Hosting | GitHub Pages | Free, static, works with PWAs |
| PWA | `manifest.json` + `sw.js` | Installable to home screen, works offline |
| Art | Inline SVG unicorn + emoji | No image assets to manage; cosmetics are SVG layers toggled on and off |

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Who she plays | She IS the unicorn (names it herself) | Cosmetic rewards become self-expression, not decoration on someone else |
| Story shape | Episodic chapters, 10–15 min each | Natural stopping points for a bedtime reader; choices still carry across chapters |
| Reading level | Stretch to 3rd–4th grade + tap-any-word-to-define | Challenge without frustration. She's never stuck. |
| Failure | No "game over," ever | Wrong turns become funny detours. Fear of failing kills reading momentum. |
| Streaks / daily goals | **Deliberately excluded** | Converts reading-for-joy into an obligation for a 7-year-old |
| Trait system | Hidden Brave / Kind / Clever / Curious scores | Later chapters unlock paths based on how she's been playing. This is what makes choices matter. |
| Build order | Engine + 3 chapters, then test with her | Her real reaction should shape chapters 4–12, not our guesses |
| No accounts / no network | Fully offline | Child safety, zero privacy surface, works in the car |

---

## The Four Reward Systems

1. **Unicorn cosmetics** — manes, horns, wings, capes, crowns, hoof colors, magical auras.
   Earned through the story and equipped in the Stable. Strongest reward: self-expression.
2. **Treasures** — emoji collectibles with names and "found in Chapter N" tags. Drives
   completionism and replay.
3. **Word Chest** — every fancy word she encounters is collected and defined. Counts toward
   badges. This is the quiet educational engine.
4. **Badges** — Brave Heart, Kind Soul, Riddle Master, Word Collector, and more.

---

## What's Not In Scope (for now)

- User accounts, cloud sync, or any server
- Sound effects and music (v2 idea — needs real audio assets)
- Multiplayer or sharing
- An in-app story editor (Adrian edits `story.js` directly)
- Native iOS/Android apps — PWA only

---

## Project Structure

```
Unicorn Story Time/
├── PROJECT_CONTEXT.md      ← you are here
├── CHANGELOG.md
├── BACKLOG.md
├── TODO.md
├── docs/
│   ├── HOW_TO_PUBLISH.md   ← plain-English GitHub Pages instructions
│   └── HOW_TO_ADD_A_CHAPTER.md
├── tools/
│   └── check-story.js      ← run `node tools/check-story.js` to find broken links
└── app/                    ← the game itself (upload the CONTENTS of this folder to GitHub)
    ├── index.html
    ├── README.md
    ├── styles.css
    ├── manifest.json
    ├── sw.js
    ├── icons/
    ├── data/
    │   ├── story.js        ← ALL story content lives here
    │   ├── words.js        ← the Word Chest glossary
    │   └── rewards.js      ← cosmetics, treasures, badges
    └── js/
        ├── unicorn.js      ← the customizable SVG unicorn
        ├── engine.js       ← state, saving, traits, node navigation
        └── ui.js           ← screens and rendering
```

---

## About the Builder

- **Name**: Adrian Zuniga
- **Role**: Senior Product Manager at Fulcrum (www.fulcrumapp.com)
- **GitHub**: https://github.com/AZ-build
- **Technical level**: Non-technical. Needs plain English explanations, step-by-step
  instructions for anything in the command line, and jargon explained when used.
- **Working style**: Prototype-first — explore visually before committing to a build.
  Appreciates being challenged and getting suggestions, not just "yes and."

---

## Session Notes

See `CHANGELOG.md` for a full session-by-session history.
