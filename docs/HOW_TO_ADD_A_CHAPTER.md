# How to add to the story

All the story lives in one file: **`app/data/story.js`**. You never have to touch the
game's code to write more of it.

---

## The shape of a page

Every screen in the game is a "node". One node looks like this:

```js
c4_start: {
  art: "🌙",
  text: [
    "The road north was longer than it looked.",
    "By the second morning, your hooves ached."
  ],
  choices: [
    { t: "🦁 Keep walking anyway", to: "c4_walk", trait: "brave" },
    { t: "💗 Stop and rest Pipkin's feet", to: "c4_rest", trait: "kind" }
  ]
}
```

- **`art`** — one emoji, shown big at the top
- **`text`** — one line in the list per paragraph. Use `<em>word</em>` for italics and
  `<strong>word</strong>` for bold pink.
- **`choices`** — what she can tap. `t` is the words on the button, `to` is the id of
  the node it leads to.
- **`trait`** — optional. `brave`, `kind`, `clever` or `curious`. Choices quietly build
  these up, and later chapters can check them.

---

## Giving her something

Add a `give` block to any node:

```js
give: {
  treasures: ["t_moonberry"],
  cosmetics: ["mane_ember"],
  badges: ["b_brave3"],
  flags: { metTheDragon: true }
}
```

The ids come from `app/data/rewards.js`. To invent a new treasure or cosmetic, add it
there first, then hand it out here.

---

## Locking a path behind a trait

This is the bit that makes her choices matter:

```js
{ t: "💗 Ask the dragon why she's sad",
  to: "c4_dragon_kind",
  req: { trait: "kind", min: 4 },
  showLocked: true,
  lockedNote: "Only a very kind heart would think to ask" }
```

`showLocked: true` means she still *sees* the option, greyed out, with the note
underneath. That's on purpose — a locked door she can see is far more motivating than
one she can't.

You can also gate on story flags: `req: { flag: "metTheDragon" }` or
`req: { notFlag: "metTheDragon" }`.

---

## Adding a riddle or a sums puzzle

Instead of `choices`, give the node a `puzzle`:

```js
puzzle: {
  q: "What has to be broken before you can use it?",
  options: ["A promise", "An egg", "A window"],
  answer: 1,                       // counting from 0, so this means "An egg"
  hint: "You'd find it in a kitchen, not an argument.",
  right: "The dragon nodded, impressed despite herself.",
  wrong: "“Not quite,” said the dragon. “Have another think.”",
  to: "c4_after_riddle",
  math: true                       // add this line ONLY for number puzzles
}
```

A wrong answer never ends anything — she just tries again. That's deliberate.

---

## Adding fancy words

Open **`app/data/words.js`** and add a line:

```js
"cantankerous": "Grumpy, and rather enjoying it.",
```

Any time that word appears in the story it becomes tappable, and she collects it
automatically as she reads. The game understands word endings, so writing
"cantankerously" in the story still counts as the word "cantankerous".

---

## Starting a whole new chapter

At the bottom of `story.js`, copy the shape of an existing chapter:

```js
{
  id: "ch4",
  emoji: "🏔️",
  title: "The Long Road North",
  subtitle: "Where the map runs out",
  requires: "ch3",          // she must finish chapter 3 to unlock it
  startNode: "c4_start",
  nodes: {
    c4_start: { ... }
  }
}
```

Then make the last node of Chapter 3 point at `c4_start`, and remember to give that
last node `endsChapter: "ch3"`.

---

## Checking you didn't break anything

Before publishing, it's worth checking every choice actually leads somewhere. Ask me to
run the story checker — it finds broken links, dead ends and unreachable pages in a
couple of seconds. Much faster than finding out because she got stuck.
