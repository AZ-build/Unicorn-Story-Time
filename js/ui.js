/* ============================================================
   THE INTERFACE
   ============================================================ */

const UI = (function () {

  let newLook = { coat: "coat_snow", mane: "mane_sunrise" };
  let stableSlot = "coat";
  let bagTab = "treasures";
  let hintUsed = false;
  const $ = id => document.getElementById(id);

  /* ---------- screens ---------- */
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $(id).classList.add("active");
    const sa = $(id).querySelector(".scroll-area");
    if (sa) sa.scrollTop = 0;
  }

  function go(where) {
    if (where === "story")  { renderStory(); showScreen("scr-story"); }
    if (where === "map")    { renderMap();   showScreen("scr-map"); }
    if (where === "stable") { renderStable();showScreen("scr-stable"); }
    if (where === "bag")    { renderBag();   showScreen("scr-bag"); }
    closePop("menu-pop");
  }

  /* ---------- title / slots ---------- */
  function renderSlots() {
    const wrap = $("slot-list");
    wrap.innerHTML = "";
    Game.slots().forEach((s, i) => {
      if (!s) {
        const b = document.createElement("button");
        b.className = "slot empty";
        b.innerHTML = "✨ Start a New Adventure";
        b.onclick = () => startNew(i);
        wrap.appendChild(b);
      } else {
        const row = document.createElement("div");
        row.className = "slot";
        const chDone = s.chaptersDone.length;
        row.innerHTML =
          `<div class="slot-uni">${Unicorn.render(s.equipped, { animate: false })}</div>
           <div class="slot-info">
             <div class="slot-name">${escapeHtml(s.name)}</div>
             <div class="slot-meta">${chDone} chapter${chDone === 1 ? "" : "s"} done · ${s.treasures.length} treasures · ${s.words.length} words</div>
           </div>
           <button class="slot-erase" title="Erase">🗑️</button>`;
        row.onclick = (e) => {
          if (e.target.classList.contains("slot-erase")) {
            confirmBox("Erase " + s.name + "?", "This deletes that saved adventure for good. The other saves are not touched.",
              () => { Game.eraseSlot(i); renderSlots(); });
            return;
          }
          Game.resume(i); go("story");
        };
        wrap.appendChild(row);
      }
    });
  }

  function startNew(i) {
    window._newSlot = i;
    newLook = { coat: "coat_snow", mane: "mane_sunrise" };
    $("uname").value = "";
    renderNewPickers();
    showScreen("scr-new");
  }

  function renderNewPickers() {
    $("new-unicorn").innerHTML = Unicorn.render(
      Object.assign(Unicorn.defaultEquipped(), { coat: newLook.coat, mane: newLook.mane })
    );
    const build = (slot, key, el) => {
      el.innerHTML = "";
      COSMETICS[slot].items.filter(x => x.free).forEach(item => {
        const b = document.createElement("button");
        b.className = "chip" + (newLook[key] === item.id ? " on" : "");
        b.innerHTML = `<span>${item.emoji}</span> ${item.name}`;
        b.onclick = () => { newLook[key] = item.id; renderNewPickers(); };
        el.appendChild(b);
      });
    };
    build("coat", "coat", $("new-coats"));
    build("mane", "mane", $("new-manes"));
  }

  function beginStory() {
    const name = ($("uname").value || "").trim() || "Sparkle";
    const s = Game.newGame(window._newSlot, name);
    s.equipped.coat = newLook.coat;
    s.equipped.mane = newLook.mane;
    Game.goto(STORY.chapters[0].startNode, { noHistory: true });
    go("story");
    flushRewards();
  }

  /* ---------- story rendering ---------- */
  function linkify(html) {
    return html.replace(/(<[^>]+>)|([A-Za-z][A-Za-z']*)/g, (m, tag, word, off, whole) => {
      if (tag) return tag;
      // a capital letter in the middle of a sentence is a name, not a fancy word
      if (/^[A-Z]/.test(word)) {
        const before = whole.slice(0, off).replace(/(<[^>]*>|\s)+$/, "");
        if (before && !/[.!?:"'\u2014\u201c]$/.test(before)) return word;
      }
      const key = wordKey(word);
      if (key) return `<button class="w" data-w="${key}">${word}</button>`;
      return word;
    });
  }

  function renderStory() {
    const s = Game.slot();
    if (!s) { showScreen("scr-title"); return; }
    const n = Game.node();
    const ch = Game.chapterOf();

    $("chapter-name").textContent = ch ? ch.title : "";
    $("chapter-sub").textContent = ch ? ch.subtitle : "";
    $("btn-back").disabled = !Game.canGoBack();

    $("story-art").textContent = n.art || "✨";
    $("story-text").innerHTML = (n.text || []).map(p => "<p>" + linkify(p) + "</p>").join("");

    $("story-text").querySelectorAll("button.w").forEach(b => {
      b.onclick = () => showWord(b.dataset.w);
    });

    const cbox = $("choices"), pbox = $("puzzle");
    cbox.innerHTML = ""; pbox.innerHTML = "";

    if (n.puzzle) {
      cbox.hidden = true; pbox.hidden = false;
      renderPuzzle(n.puzzle);
    } else {
      pbox.hidden = true; cbox.hidden = false;
      (n.choices || []).forEach(c => {
        const locked = c.req && !Game.meets(c.req);
        if (locked && !c.showLocked) return;
        const b = document.createElement("button");
        b.className = "choice" + (locked ? " locked" : "") + ((n.choices.length === 1) ? " continue" : "");
        b.innerHTML = escapeHtml(c.t) + (locked && c.lockedNote ? `<span class="lock-note">🔒 ${escapeHtml(c.lockedNote)}</span>` : "");
        if (!locked) {
          b.onclick = () => {
            if (c.goStable) { go("stable"); return; }
            if (c.goMap)    { go("map"); return; }
            Game.choose(c);
            renderStory();
            $("story-scroll").scrollTop = 0;
            flushRewards();
          };
        }
        cbox.appendChild(b);
      });
    }
    $("story-scroll").scrollTop = 0;
    markTab("scr-story", "story");
  }

  function renderPuzzle(p) {
    hintUsed = false;
    const box = $("puzzle");
    box.innerHTML = `<div class="puzzle-q">${p.q}</div><div class="puzzle-opts" id="popts"></div>
      <button class="hint-btn" id="hintb">💡 I'd like a hint</button>
      <div class="hint-text" id="hintt" hidden></div>
      <div class="puzzle-feedback" id="pfb" hidden></div>`;
    const opts = $("popts");
    p.options.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "popt";
      b.textContent = o;
      b.onclick = () => {
        if (i === p.answer) {
          b.classList.add("right");
          opts.querySelectorAll(".popt").forEach(x => x.disabled = true);
          $("hintb").hidden = true;
          const fb = $("pfb"); fb.hidden = false;
          fb.innerHTML = linkify(p.right);
          fb.querySelectorAll("button.w").forEach(w => w.onclick = () => showWord(w.dataset.w));
          if (p.math) Game.grantBadge("b_math");
          else if (!hintUsed) Game.grantBadge("b_riddle");
          Game.save();
          const cont = document.createElement("button");
          cont.className = "btn primary full";
          cont.textContent = "Continue ✨";
          cont.onclick = () => { Game.goto(p.to); renderStory(); flushRewards(); };
          box.appendChild(cont);
          flushRewards();
        } else {
          b.classList.add("wrong");
          setTimeout(() => b.classList.remove("wrong"), 500);
          const fb = $("pfb"); fb.hidden = false; fb.innerHTML = linkify(p.wrong);
          if (navigator.vibrate) navigator.vibrate(40);
        }
      };
      opts.appendChild(b);
    });
    $("hintb").onclick = () => {
      hintUsed = true;
      $("hintb").hidden = true;
      const h = $("hintt"); h.hidden = false; h.textContent = p.hint;
    };
  }

  /* ---------- word popup ---------- */
  function showWord(key) {
    const s = Game.slot();
    const isNew = !s.words.includes(key);
    if (isNew) { s.words.push(key); Game.checkBadges(); Game.save(); }
    $("word-title").textContent = key.charAt(0).toUpperCase() + key.slice(1);
    $("word-def").textContent = WORDS[key];
    $("word-tag").textContent = "📚 " + s.words.length + " of " + Object.keys(WORDS).length + " words in your chest";
    openPop("word-pop");
  }

  /* ---------- reward popups ---------- */
  let rewardQueue = [];
  function flushRewards() {
    rewardQueue = rewardQueue.concat(Game.takePending());
    if (!$("reward-pop").hidden) return;
    nextReward();
  }
  function nextReward() {
    if (!rewardQueue.length) { closePop("reward-pop"); return; }
    const r = rewardQueue.shift();
    const kind = r.kind === "treasure" ? "Treasure found"
              : r.kind === "cosmetic" ? "New look unlocked"
              : "Badge earned";
    $("reward-kind").textContent = kind;
    $("reward-emoji").textContent = r.emoji || "✨";
    $("reward-name").textContent = r.name;
    $("reward-desc").textContent = r.desc || (r.why ? "Unlocked " + r.why + "." : "Try it on in the Stable!");
    openPop("reward-pop");
    if (navigator.vibrate) navigator.vibrate([18, 40, 18]);
  }

  /* ---------- map ---------- */
  function renderMap() {
    const list = $("map-list");
    list.innerHTML = "";
    Game.chapterProgress().forEach(ch => {
      const b = document.createElement("button");
      b.className = "map-card" + (ch.unlocked ? "" : " locked");
      let tag = "";
      if (ch.current) tag = `<span class="map-badge here">You are here</span>`;
      else if (ch.done) tag = `<span class="map-badge done">✓ Finished — replay it</span>`;
      else if (ch.unlocked) tag = `<span class="map-badge new">Ready</span>`;
      b.innerHTML = `<div class="map-emoji">${ch.unlocked ? ch.emoji : "🔒"}</div>
        <div><div class="map-title">${escapeHtml(ch.title)}</div>
        <div class="map-sub">${escapeHtml(ch.subtitle)}</div>${tag}</div>`;
      if (ch.unlocked && !ch.current) {
        b.onclick = () => confirmBox("Jump to " + ch.title + "?",
          "You can always go back with the ⏪ button. Everything you've collected stays with you.",
          () => { Game.jumpToChapter(ch.id); go("story"); flushRewards(); });
      } else if (ch.current) {
        b.onclick = () => go("story");
      }
      list.appendChild(b);
    });
    const s = Game.slot();
    const t = Game.totals();
    const stats = document.createElement("div");
    stats.className = "unlock-list";
    stats.style.marginTop = "18px";
    stats.innerHTML = `
      <div class="unlock"><span class="ue" style="filter:none;opacity:1">💎</span><div style="flex:1"><div class="unlock-name">${s.treasures.length} / ${t.treasures} treasures</div></div></div>
      <div class="unlock"><span class="ue" style="filter:none;opacity:1">📚</span><div style="flex:1"><div class="unlock-name">${s.words.length} / ${t.words} fancy words</div></div></div>
      <div class="unlock"><span class="ue" style="filter:none;opacity:1">🏅</span><div style="flex:1"><div class="unlock-name">${s.badges.length} / ${t.badges} badges</div></div></div>
      <div class="unlock"><span class="ue" style="filter:none;opacity:1">🎠</span><div style="flex:1"><div class="unlock-name">${s.owned.length} / ${t.cosmetics} looks unlocked</div></div></div>`;
    list.appendChild(stats);
    markTab("scr-map", "map");
  }

  /* ---------- stable ---------- */
  function renderStable() {
    const s = Game.slot();
    $("stable-title").textContent = s.name + "'s Stable";
    $("stable-count").textContent = s.owned.length + " of " + Game.totals().cosmetics + " looks unlocked";
    $("stable-unicorn").innerHTML = Unicorn.render(s.equipped);

    const tabs = $("slot-tabs"); tabs.innerHTML = "";
    Object.keys(COSMETICS).forEach(slot => {
      const owned = COSMETICS[slot].items.filter(i => s.owned.includes(i.id)).length;
      const b = document.createElement("button");
      b.className = "slot-tab" + (stableSlot === slot ? " on" : "");
      b.innerHTML = COSMETICS[slot].emoji + " " + COSMETICS[slot].label + " <span style='opacity:.6'>" + owned + "</span>";
      b.onclick = () => { stableSlot = slot; renderStable(); };
      tabs.appendChild(b);
    });

    const grid = $("cosmetic-grid"); grid.innerHTML = "";
    COSMETICS[stableSlot].items.forEach(item => {
      const owned = s.owned.includes(item.id);
      const b = document.createElement("button");
      b.className = "cos" + (s.equipped[stableSlot] === item.id ? " on" : "") + (owned ? "" : " locked");
      b.innerHTML = `<span class="ce">${owned ? item.emoji : "🔒"}</span><span class="cn">${owned ? escapeHtml(item.name) : "Locked"}</span>`;
      if (owned) b.onclick = () => { Game.equip(item.id); renderStable(); flushRewards(); };
      grid.appendChild(b);
    });

    const ul = $("unlock-list"); ul.innerHTML = "";
    Game.unlockProgress()
      .filter(u => !u.got)
      .sort((a, b) => (b.have / b.need) - (a.have / a.need))
      .slice(0, 8)
      .forEach(u => {
        const item = Unicorn.itemById(u.item);
        const pct = Math.min(100, Math.round((u.have / u.need) * 100));
        const d = document.createElement("div");
        d.className = "unlock";
        d.innerHTML = `<span class="ue">${item.emoji}</span>
          <div style="flex:1">
            <div class="unlock-name">${escapeHtml(item.name)}</div>
            <div class="unlock-need">Earned for ${escapeHtml(u.label)} — you have ${u.have}</div>
            <div class="unlock-bar"><i style="width:${pct}%"></i></div>
          </div>`;
        ul.appendChild(d);
      });
    if (!ul.children.length) ul.innerHTML = `<div class="unlock"><span class="ue" style="filter:none">🎉</span><div class="unlock-name">You've unlocked everything. Wow.</div></div>`;
    markTab("scr-stable", "stable");
  }

  /* ---------- bag ---------- */
  function renderBag() {
    const s = Game.slot();
    const body = $("bag-body");
    document.querySelectorAll("#bag-seg .seg-btn").forEach(b =>
      b.classList.toggle("active", b.dataset.bag === bagTab));
    body.innerHTML = "";

    if (bagTab === "treasures") {
      const ids = Object.keys(TREASURES);
      body.innerHTML = `<div class="count-line">${s.treasures.length} of ${ids.length} treasures found</div>`;
      ids.forEach(id => {
        const t = TREASURES[id], has = s.treasures.includes(id);
        body.innerHTML += `<div class="treasure${has ? "" : " miss"}">
          <div class="te">${has ? t.emoji : "❔"}</div>
          <div><div class="tn">${has ? escapeHtml(t.name) : "Not found yet"}</div>
          <div class="td">${has ? escapeHtml(t.desc) : "Somewhere out there…"}</div>
          <div class="tc">Chapter ${t.ch}</div></div></div>`;
      });
    }

    if (bagTab === "words") {
      const total = Object.keys(WORDS).length;
      body.innerHTML = `<div class="count-line">${s.words.length} of ${total} fancy words collected</div>`;
      const sorted = s.words.slice().sort();
      if (!sorted.length) body.innerHTML += `<div class="count-line">Read the story and words will collect themselves. Tap any glowing word to see what it means.</div>`;
      sorted.forEach(w => {
        body.innerHTML += `<div class="wordrow"><b>${escapeHtml(w)}</b><span>${escapeHtml(WORDS[w])}</span></div>`;
      });
    }

    if (bagTab === "badges") {
      const ids = Object.keys(BADGES);
      body.innerHTML = `<div class="count-line">${s.badges.length} of ${ids.length} badges earned</div><div class="badge-grid" id="bgrid"></div>`;
      const g = body.querySelector("#bgrid");
      ids.forEach(id => {
        const b = BADGES[id], has = s.badges.includes(id);
        g.innerHTML += `<div class="badge${has ? "" : " miss"}"><div class="be">${has ? b.emoji : "🔒"}</div>
          <div class="bn">${escapeHtml(b.name)}</div><div class="bd">${escapeHtml(b.desc)}</div></div>`;
      });
    }
    markTab("scr-bag", "bag");
  }

  /* ---------- popups ---------- */
  function openPop(id) { $(id).hidden = false; }
  function closePop(id) { $(id).hidden = true; }

  function confirmBox(title, text, onYes) {
    $("confirm-title").textContent = title;
    $("confirm-text").textContent = text;
    $("confirm-yes").onclick = () => { closePop("confirm-pop"); onYes(); };
    openPop("confirm-pop");
  }

  /* ---------- helpers ---------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function markTab(screenId, name) {
    document.querySelectorAll("#" + screenId + " .tab").forEach(t =>
      t.classList.toggle("active", t.dataset.go === name));
  }

  /* ---------- boot ---------- */
  function init() {
    Game.load();
    renderSlots();
    showScreen("scr-title");

    $("begin-btn").onclick = beginStory;
    $("uname").addEventListener("keydown", e => { if (e.key === "Enter") { e.target.blur(); beginStory(); } });

    $("btn-back").onclick = () => { Game.back(); renderStory(); flushRewards(); };
    $("btn-menu").onclick = () => openPop("menu-pop");
    $("reward-ok").onclick = () => { closePop("reward-pop"); setTimeout(nextReward, 120); };

    document.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
    document.querySelectorAll("#bag-seg .seg-btn").forEach(b =>
      b.onclick = () => { bagTab = b.dataset.bag; renderBag(); });

    $("menu-back").onclick = () => { closePop("menu-pop"); Game.back(); renderStory(); };
    $("menu-restart").onclick = () => {
      closePop("menu-pop");
      confirmBox("Start this story fresh?",
        "You'll go back to the very first page. Your treasures, words, badges and looks will all be cleared for this save. Your other saves are safe.",
        () => { Game.restart(); Game.goto(STORY.chapters[0].startNode, { noHistory: true }); go("story"); flushRewards(); });
    };
    $("menu-switch").onclick = () => { closePop("menu-pop"); renderSlots(); showScreen("scr-title"); };

    document.querySelectorAll(".pop").forEach(p => {
      p.addEventListener("click", e => { if (e.target === p && p.id !== "reward-pop") p.hidden = true; });
    });
  }

  return { init, showScreen, go, closePop, openPop, renderStory };
})();

document.addEventListener("DOMContentLoaded", UI.init);
