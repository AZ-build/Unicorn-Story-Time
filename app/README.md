# Unicorn Story Time 🦄

A choose-your-own-adventure unicorn story, built as an installable web app for a
seven-year-old who reads better than her grade level.

**Play it:** https://az-build.github.io/unicorn-story-time/

## What it does

- Three chapters (~7,000 words) of branching story at a 3rd–4th grade reading level
- Tap **any** glowing word for a kid-friendly definition — words collect themselves as she reads
- A hidden Brave / Kind / Clever / Curious trait system that unlocks different paths later on
- Riddles and number puzzles with hints, and no way to fail them
- 62 unicorn cosmetics, 18 treasures, 97 collectable words, 17 badges
- Three save slots, automatic saving, rewind-one-step, and start-fresh
- Works completely offline once installed

## How it's built

Plain HTML, CSS and JavaScript. No frameworks, no build step, no server, no accounts.
Open `index.html` in any browser and it runs.

```
index.html      the screens
styles.css      all the styling
manifest.json   makes it installable
sw.js           makes it work offline
data/story.js   ALL the story content — edit this to write more
data/words.js   the Word Chest glossary
data/rewards.js cosmetics, treasures, badges, milestone unlocks
js/unicorn.js   draws the customizable unicorn as SVG
js/engine.js    saving, traits, choices, rewards
js/ui.js        screens and rendering
```

Progress is stored in the browser's `localStorage` and never leaves the device.

See `../docs/HOW_TO_ADD_A_CHAPTER.md` to write more of the story.
