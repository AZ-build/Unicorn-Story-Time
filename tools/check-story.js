/* Story checker.
   Run it from the project folder with:   node tools/check-story.js
   It finds broken links, dead ends, unreachable pages, unspendable rewards,
   and any fancy word that never actually appears in the story. */

const fs = require("fs");
const path = require("path");
const D = path.join(__dirname, "..", "app", "data");
const read = f => fs.readFileSync(path.join(D, f), "utf8");

eval(read("words.js").replace("const WORDS", "var WORDS").replace("function wordKey", "var wordKey = function"));
eval(read("rewards.js").replace(/const (COSMETICS|TREASURES|BADGES|UNLOCKS)/g, "var $1"));
const S = eval(read("story.js").replace("const STORY", "var __S") + "; __S");

let problems = 0;
const say = (...a) => { problems++; console.log("  ✗", ...a); };

const nodes = {};
S.chapters.forEach(c => Object.keys(c.nodes).forEach(id => {
  if (nodes[id]) say("Two pages share the id:", id);
  nodes[id] = c.nodes[id];
}));

console.log("\nChecking every page leads somewhere…");
Object.entries(nodes).forEach(([id, n]) => {
  const to = (n.choices || []).map(c => c.to);
  if (n.puzzle) to.push(n.puzzle.to);
  to.forEach(t => { if (!nodes[t]) say(id, "points at a page that doesn't exist:", t); });
  if (!n.choices && !n.puzzle) say(id, "is a dead end — nothing to tap");
  if (n.puzzle && (n.puzzle.answer == null || !n.puzzle.options)) say(id, "has a broken puzzle");
});

console.log("Checking every page can be reached…");
const seen = new Set(); const q = [S.chapters[0].startNode];
while (q.length) {
  const id = q.pop(); if (seen.has(id)) continue; seen.add(id);
  const n = nodes[id]; if (!n) continue;
  (n.choices || []).forEach(c => q.push(c.to));
  if (n.puzzle) q.push(n.puzzle.to);
}
Object.keys(nodes).forEach(id => { if (!seen.has(id)) say(id, "can never be reached"); });

console.log("Checking every reward exists…");
const cosIds = []; Object.values(COSMETICS).forEach(g => g.items.forEach(i => cosIds.push(i.id)));
Object.entries(nodes).forEach(([id, n]) => {
  if (!n.give) return;
  (n.give.treasures || []).forEach(t => { if (!TREASURES[t]) say(id, "gives a treasure that doesn't exist:", t); });
  (n.give.cosmetics || []).forEach(t => { if (!cosIds.includes(t)) say(id, "gives a look that doesn't exist:", t); });
  (n.give.badges || []).forEach(t => { if (!BADGES[t]) say(id, "gives a badge that doesn't exist:", t); });
});
UNLOCKS.forEach(u => { if (!cosIds.includes(u.item)) say("Milestone unlocks a look that doesn't exist:", u.item); });

console.log("Checking every reward can actually be earned…");
const gotT = new Set(), gotC = new Set(Object.values(COSMETICS).flatMap(g => g.items.filter(i => i.free).map(i => i.id)));
Object.values(nodes).forEach(n => {
  ((n.give || {}).treasures || []).forEach(t => gotT.add(t));
  ((n.give || {}).cosmetics || []).forEach(t => gotC.add(t));
});
UNLOCKS.forEach(u => gotC.add(u.item));
Object.keys(TREASURES).forEach(t => { if (!gotT.has(t)) say("Treasure can never be found:", t); });
cosIds.forEach(c => { if (!gotC.has(c)) say("Look can never be unlocked:", c); });

console.log("Checking every fancy word appears in the story…");
let text = "";
S.chapters.forEach(c => Object.values(c.nodes).forEach(n => {
  (n.text || []).forEach(t => text += " " + t);
  (n.choices || []).forEach(c2 => text += " " + c2.t);
  if (n.puzzle) text += " " + [n.puzzle.q, n.puzzle.right, n.puzzle.wrong, n.puzzle.hint].join(" ");
}));
const hit = new Set();
text.replace(/[A-Za-z][A-Za-z']*/g, m => { const k = wordKey(m); if (k) hit.add(k); return m; });
Object.keys(WORDS).forEach(w => { if (!hit.has(w)) say("Word is in the chest but never appears in the story:", w); });

const len = text.match(/[A-Za-z']+/g).length;
console.log("\n" + (problems ? "Found " + problems + " problem(s)." : "All good — nothing broken."));
console.log("Pages: " + Object.keys(nodes).length +
            " | Chapters: " + S.chapters.length +
            " | Story length: " + len.toLocaleString() + " words" +
            " | Reading time: about " + Math.round(len / 100) + " minutes\n");
