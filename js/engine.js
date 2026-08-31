/* ============================================================
   THE ENGINE
   Handles saving, loading, traits, choices, rewards and rewind.
   ============================================================ */

const Game = (function () {

  const KEY = "unicornStoryTime.v1";
  let data = null;          // the whole save file (3 slots)
  let NODES = {};           // flat lookup of every story node
  let NODE_CH = {};         // nodeId -> chapterId
  const pending = [];       // rewards waiting to be shown

  /* ---------- boot ---------- */

  function indexStory() {
    NODES = {}; NODE_CH = {};
    STORY.chapters.forEach(ch => {
      Object.keys(ch.nodes).forEach(id => {
        NODES[id] = ch.nodes[id];
        NODE_CH[id] = ch.id;
      });
    });
  }

  function blankSlot(name) {
    return {
      name: name || "Sparkle",
      created: Date.now(),
      updated: Date.now(),
      node: STORY.chapters[0].startNode,
      history: [],
      traits: { brave: 0, kind: 0, clever: 0, curious: 0 },
      flags: {},
      owned: Unicorn.freeIds(),
      equipped: Unicorn.defaultEquipped(),
      treasures: [],
      words: [],
      badges: [],
      chaptersDone: [],
      stats: { choices: 0, riddles: 0, hints: 0, rewinds: 0, restyles: 0 }
    };
  }

  function load() {
    indexStory();
    try {
      const raw = localStorage.getItem(KEY);
      data = raw ? JSON.parse(raw) : null;
    } catch (e) { data = null; }
    if (!data || !Array.isArray(data.slots)) {
      data = { version: 1, slots: [null, null, null], active: null };
    }
    // repair older saves so new cosmetics/fields never break an existing game
    data.slots.forEach(s => {
      if (!s) return;
      const b = blankSlot(s.name);
      Object.keys(b).forEach(k => { if (s[k] === undefined) s[k] = b[k]; });
      Object.keys(b.equipped).forEach(k => { if (!s.equipped[k]) s.equipped[k] = b.equipped[k]; });
      Unicorn.freeIds().forEach(id => { if (!s.owned.includes(id)) s.owned.push(id); });
    });
    return data;
  }

  function save() {
    if (data.active !== null && data.slots[data.active]) {
      data.slots[data.active].updated = Date.now();
    }
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (e) { console.warn("Could not save:", e); }
  }

  /* ---------- slots ---------- */

  const slots = () => data.slots;
  const slot = () => (data.active === null ? null : data.slots[data.active]);

  function newGame(i, name) {
    data.slots[i] = blankSlot(name);
    data.active = i;
    save();
    return data.slots[i];
  }

  function resume(i) {
    if (!data.slots[i]) return null;
    data.active = i;
    save();
    return data.slots[i];
  }

  function eraseSlot(i) {
    data.slots[i] = null;
    if (data.active === i) data.active = null;
    save();
  }

  function restart() {
    const s = slot();
    if (!s) return;
    const keptName = s.name;
    data.slots[data.active] = blankSlot(keptName);
    save();
  }

  /* ---------- story navigation ---------- */

  const node = (id) => NODES[id || slot().node];
  const chapterOf = (id) => STORY.chapters.find(c => c.id === NODE_CH[id || slot().node]);

  function meets(req) {
    if (!req) return true;
    const s = slot();
    if (req.trait && (s.traits[req.trait] || 0) < (req.min || 1)) return false;
    if (req.flag && !s.flags[req.flag]) return false;
    if (req.notFlag && s.flags[req.notFlag]) return false;
    if (req.treasure && !s.treasures.includes(req.treasure)) return false;
    return true;
  }

  function visibleChoices(n) {
    n = n || node();
    return (n.choices || []).filter(c => !c.req || meets(c.req) || c.showLocked);
  }

  function goto(id, opts) {
    const s = slot();
    opts = opts || {};
    if (!opts.noHistory) {
      s.history.push(s.node);
      if (s.history.length > 200) s.history.shift();
    }
    s.node = id;
    applyNode(NODES[id]);
    save();
  }

  function choose(choice) {
    const s = slot();
    if (choice.trait) {
      s.traits[choice.trait] = (s.traits[choice.trait] || 0) + 1;
    }
    if (choice.set) Object.assign(s.flags, choice.set);
    s.stats.choices++;
    goto(choice.to);
  }

  function canGoBack() { const s = slot(); return s && s.history.length > 0; }

  function back() {
    const s = slot();
    if (!s.history.length) return;
    s.node = s.history.pop();
    s.stats.rewinds++;
    if (s.stats.rewinds === 1) grantBadge("b_rewind");
    save();
  }

  /* ---------- rewards ---------- */

  function grantWord(w) {
    const s = slot();
    const key = w.toLowerCase();
    if (WORDS[key] && !s.words.includes(key)) {
      s.words.push(key);
      return true;
    }
    return false;
  }

  function grantTreasure(id) {
    const s = slot();
    if (TREASURES[id] && !s.treasures.includes(id)) {
      s.treasures.push(id);
      pending.push({ kind: "treasure", id: id, ...TREASURES[id] });
      return true;
    }
    return false;
  }

  function grantCosmetic(id) {
    const s = slot();
    const item = Unicorn.itemById(id);
    if (item && !s.owned.includes(id)) {
      s.owned.push(id);
      pending.push({ kind: "cosmetic", id: id, slot: Unicorn.slotOf(id), name: item.name, emoji: item.emoji });
      return true;
    }
    return false;
  }

  function grantBadge(id) {
    const s = slot();
    if (BADGES[id] && !s.badges.includes(id)) {
      s.badges.push(id);
      pending.push({ kind: "badge", id: id, ...BADGES[id] });
      return true;
    }
    return false;
  }

  /* Words in the text are collected automatically as she reads. */
  function collectWordsFromText(text) {
    const found = [];
    String(text).replace(/[A-Za-z][A-Za-z']*/g, m => {
      const k = wordKey(m);
      if (k && !slot().words.includes(k) && !found.includes(k)) found.push(k);
      return m;
    });
    found.forEach(w => slot().words.push(w));
    return found;
  }

  function applyNode(n) {
    if (!n) return;
    const s = slot();
    (n.text || []).forEach(p => collectWordsFromText(p));
    if (n.give) {
      (n.give.treasures || []).forEach(grantTreasure);
      (n.give.cosmetics || []).forEach(grantCosmetic);
      (n.give.badges || []).forEach(grantBadge);
      if (n.give.flags) Object.assign(s.flags, n.give.flags);
    }
    if (n.endsChapter) {
      if (!s.chaptersDone.includes(n.endsChapter)) s.chaptersDone.push(n.endsChapter);
      const map = { ch1: "b_ch1", ch2: "b_ch2", ch3: "b_ch3" };
      if (map[n.endsChapter]) grantBadge(map[n.endsChapter]);
    }
    checkBadges();
  }

  function checkBadges() {
    const s = slot();
    if (s.traits.brave   >= 3) grantBadge("b_brave3");
    if (s.traits.kind    >= 3) grantBadge("b_kind3");
    if (s.traits.clever  >= 3) grantBadge("b_clever3");
    if (s.traits.curious >= 3) grantBadge("b_curious3");
    if (s.words.length     >= 25) grantBadge("b_words25");
    if (s.words.length     >= 60) grantBadge("b_words60");
    if (s.treasures.length >= 5)  grantBadge("b_treasure5");
    if (s.treasures.length >= 12) grantBadge("b_treasure12");
    if (s.stats.restyles   >= 1)  grantBadge("b_style");

    // milestone cosmetic unlocks
    const counts = {
      words: s.words.length,
      treasures: s.treasures.length,
      badges: s.badges.length,
      chapters: s.chaptersDone.length,
      brave: s.traits.brave, kind: s.traits.kind,
      clever: s.traits.clever, curious: s.traits.curious
    };
    UNLOCKS.forEach(u => {
      if ((counts[u.type] || 0) >= u.n && !s.owned.includes(u.item)) {
        grantCosmetic(u.item);
        const p = pending[pending.length - 1];
        if (p) p.why = "for " + u.label;
      }
    });
  }

  function unlockProgress() {
    const s = slot();
    const counts = {
      words: s.words.length, treasures: s.treasures.length,
      badges: s.badges.length, chapters: s.chaptersDone.length,
      brave: s.traits.brave, kind: s.traits.kind,
      clever: s.traits.clever, curious: s.traits.curious
    };
    return UNLOCKS.map(u => ({
      item: u.item, label: u.label, need: u.n,
      have: counts[u.type] || 0, got: s.owned.includes(u.item)
    }));
  }

  function takePending() { return pending.splice(0, pending.length); }

  /* ---------- stable ---------- */

  function equip(id) {
    const s = slot();
    const sl = Unicorn.slotOf(id);
    if (!sl || !s.owned.includes(id)) return false;
    if (s.equipped[sl] !== id) {
      s.equipped[sl] = id;
      s.stats.restyles++;
      checkBadges();
      save();
    }
    return true;
  }

  /* ---------- progress ---------- */

  function chapterProgress() {
    const s = slot();
    return STORY.chapters.map(ch => ({
      id: ch.id, title: ch.title, emoji: ch.emoji, subtitle: ch.subtitle,
      done: s.chaptersDone.includes(ch.id),
      current: NODE_CH[s.node] === ch.id,
      unlocked: ch.id === STORY.chapters[0].id
        || s.chaptersDone.includes(ch.requires)
        || NODE_CH[s.node] === ch.id
    }));
  }

  function jumpToChapter(chId) {
    const ch = STORY.chapters.find(c => c.id === chId);
    if (!ch) return;
    const s = slot();
    s.history.push(s.node);
    s.node = ch.startNode;
    applyNode(NODES[ch.startNode]);
    save();
  }

  function totals() {
    return {
      treasures: Object.keys(TREASURES).length,
      words: Object.keys(WORDS).length,
      badges: Object.keys(BADGES).length,
      cosmetics: Object.keys(COSMETICS).reduce((a, k) => a + COSMETICS[k].items.length, 0)
    };
  }

  return {
    load, save, slots, slot, newGame, resume, eraseSlot, restart,
    node, chapterOf, goto, choose, back, canGoBack, visibleChoices, meets,
    grantWord, grantTreasure, grantCosmetic, grantBadge, takePending, checkBadges,
    equip, chapterProgress, jumpToChapter, totals, unlockProgress,
    get NODES() { return NODES; }
  };
})();
