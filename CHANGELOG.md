# Changelog — Unicorn Story Time

All notable changes are documented here, session by session. Newest entries go at the top.

---

## [v0.3.2] — 2026-08-31

### White bar along the bottom of the installed app

**The bug:** installed on a home screen, a white strip showed under the tab bar.

**The cause:** `<html>` had no background of its own. Only `<body>` did. In a
standalone PWA the page extends into the phone's home-indicator strip, and that strip
is painted by the browser *canvas*, not by `<body>` — so the browser used its default
white. `body{overflow:hidden}` plus `background-attachment:fixed` stopped the body
gradient from propagating out to cover it.

**The fix:** `html{background:#140B26}` — the same colour as the last stop of the body
gradient, so the join is invisible. Added `overscroll-behavior:none` on both while
there, which kills the rubber-band bounce that exposes the same strip.

**Also:** service-worker cache bumped to `v3`. Project is now single-copy on the E:
drive; the C:\Users\bird mirror was deleted.

**Dropped the deploy zip.** Adrian pushed back and he was right: GitHub's web uploader
can't unzip, so a zip only adds an extract step before the same drag-and-drop, and it
becomes a stale second copy the moment `app/` changes. `app/` is the one source of
truth — upload its contents directly.

---

## [v0.3.1] — 2026-08-31

### Session 2 — Real app icon and deployment package

**What we did:**
- Replaced the placeholder icon with Adrian's new unicorn-reading-a-book artwork
- Generated the full PWA icon set from the one 1254px source: 192, 512, a 512 maskable,
  a 180 apple-touch icon and a 32 favicon
- Master artwork moved to `art/unicorn-story-time-icon-source.png` so the `app` folder
  stays clean for drag-and-drop uploading
- Added `.nojekyll`, wired all five icons into `manifest.json` and `index.html`
- Bumped the service-worker cache to `v2` so installed copies pick the new icons up
- Updated `docs/HOW_TO_PUBLISH.md` with the home-screen-icon quirk

**Decisions made:**
- Maskable icon puts the badge at 86% over a blurred bleed of itself, so Android's
  circle *or* squircle crop never clips the unicorn or the book and shows no seam
- Apple-touch icon is opaque and full-bleed — iOS renders transparency as black and
  applies its own rounding
- Favicon is a tight crop on the head and horn; the whole scene turns to mush at 32px
- No LICENSE file — a public repo with no licence is "all rights reserved", which is
  the right default for a personal gift

**Verified:** story checker clean (57 pages, 0 broken links), all JS parses, every
`index.html` reference resolves, every manifest icon exists at its declared size, and
every asset is in the service-worker cache list.

**Next session focus:**
- Publish to GitHub Pages, install on her phone, then watch her play Chapters 1–3

---

## [v0.3] — 2026-08-30

### Session 1 — Project setup, engine, and first three chapters

**What we did:**
- Set up the project: PROJECT_CONTEXT.md, CHANGELOG.md, BACKLOG.md, TODO.md
- Built the full game engine (story renderer, choices, hidden trait system, puzzles,
  tap-any-word definitions, rewind, 3 save slots, start-fresh)
- Built the customizable SVG unicorn — swappable mane, horn, wings, hooves, accessories
  and magical auras, all earned through play
- Built the four reward systems: cosmetics, treasures, Word Chest, badges
- Wrote Chapters 1–3 with branching paths, riddles, math moments, jokes and rhymes
- Made it an installable PWA that works offline
- Wrote plain-English publishing instructions and a story-checker script
- Verified: 57 pages, 0 broken links, 0 unreachable pages, all 18 treasures and all 62
  looks obtainable, all 97 words appear in the text, ~7,061 words (~70 min of reading)

**Decisions made:**
- She plays AS the unicorn and names it herself — makes cosmetics personal
- Episodic chapters over one long epic — natural bedtime stopping points
- Hidden Brave/Kind/Clever/Curious traits gate special paths in later chapters
- No "game over" state anywhere — wrong turns are funny detours
- Deliberately NO streaks or daily goals — those turn reading into a chore for a 7-year-old
- Build 3 chapters, then watch her play before writing chapters 4–12

**Next session focus:**
- Watch her play Chapters 1–3 and take notes on where she pauses, laughs, or gets stuck
- Publish to GitHub Pages and install it on her phone
- Use her reaction to shape Chapters 4–6

---

<!--
HOW TO ADD A NEW ENTRY:

Copy this block and paste it above the previous entry:

## [vX.X] — [Date]

### Session N — [Short title describing the session]

**What we did:**
-

**Decisions made:**
-

**Next session focus:**
-

-->
