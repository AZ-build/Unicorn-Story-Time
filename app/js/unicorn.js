/* ============================================================
   THE UNICORN
   Draws a customizable unicorn as SVG. Every cosmetic she earns
   is a layer that gets turned on or swapped out here.
   ============================================================ */

const Unicorn = (function () {

  function find(slot, id) {
    const list = COSMETICS[slot].items;
    return list.find(i => i.id === id) || list[0];
  }

  /* ---------- MANE ---------- */
  function manePaths(m) {
    const flow = [
      { d: "M 288 48 C 246 54 216 94 210 146 C 207 172 213 186 205 198", w: 25, c: m.c3 },
      { d: "M 295 58 C 258 66 232 102 226 148 C 224 170 229 182 222 192", w: 20, c: m.c1 },
      { d: "M 300 70 C 270 80 248 110 244 150 C 243 166 247 176 240 184", w: 13, c: m.c2 }
    ];
    const curl = [
      { d: "M 288 48 C 240 52 218 90 212 124 C 206 152 220 162 208 184 C 202 196 210 202 202 208", w: 24, c: m.c3 },
      { d: "M 295 58 C 254 64 234 98 229 130 C 224 156 236 166 226 184 C 221 194 228 200 221 204", w: 19, c: m.c1 },
      { d: "M 300 70 C 270 78 250 106 246 138 C 243 158 252 166 244 180 C 240 188 246 194 240 198", w: 12, c: m.c2 }
    ];
    let strands = (m.style === "curl" ? curl : flow).slice();
    if (m.rainbow) {
      strands.push({ d: "M 303 80 C 280 92 262 116 259 150 C 258 166 263 176 256 184", w: 10, c: m.c4 });
      strands.push({ d: "M 306 90 C 288 100 274 122 272 150 C 271 164 275 172 270 178", w: 7, c: m.c5 });
    }
    let svg = strands.map(s =>
      `<path d="${s.d}" stroke="${s.c}" stroke-width="${s.w}" fill="none" stroke-linecap="round"/>`
    ).join("");
    // forelock over the forehead
    svg += `<path d="M 286 60 C 272 70 268 84 274 100" stroke="${m.c1}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    svg += `<path d="M 294 62 C 284 70 281 82 284 94" stroke="${m.c2}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    if (m.sparkle) {
      svg += `<g class="u-mane-sparkle">
        <circle cx="224" cy="112" r="3" fill="#fff"/>
        <circle cx="212" cy="168" r="2.4" fill="#fff"/>
        <circle cx="248" cy="142" r="2" fill="#fff"/>
        <circle cx="280" cy="70" r="2.4" fill="#fff"/></g>`;
    }
    return svg;
  }

  function tailPaths(m) {
    const t = [
      { d: "M 98 180 C 62 184 42 216 50 256", w: 27, c: m.c3 },
      { d: "M 96 194 C 60 204 44 240 56 276", w: 23, c: m.c1 },
      { d: "M 94 206 C 66 222 58 252 72 284", w: 15, c: m.c2 }
    ];
    let svg = t.map(s =>
      `<path d="${s.d}" stroke="${s.c}" stroke-width="${s.w}" fill="none" stroke-linecap="round"/>`
    ).join("");
    if (m.rainbow) {
      svg += `<path d="M 100 214 C 78 232 74 258 86 284" stroke="${m.c4}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
      svg += `<path d="M 102 222 C 86 238 84 258 94 280" stroke="${m.c5}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    }
    return svg;
  }

  /* ---------- HORN ---------- */
  function hornSvg(h) {
    const id = "hg" + Math.floor(Math.random() * 1e6);
    let svg = `<defs><linearGradient id="${id}" x1="0" y1="1" x2="0.4" y2="0">
      <stop offset="0%" stop-color="${h.c2}"/><stop offset="100%" stop-color="${h.c1}"/>
    </linearGradient></defs>`;
    // (glow, if any, is added next and needs its own gradient)
    if (h.glow) {
      svg += `<defs><radialGradient id="${id}g"><stop offset="0%" stop-color="${h.c1}" stop-opacity="0.75"/>
        <stop offset="55%" stop-color="${h.c1}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${h.c1}" stop-opacity="0"/></radialGradient></defs>
        <ellipse class="u-hornglow" cx="298" cy="30" rx="46" ry="54" fill="url(#${id}g)"/>`;
    }
    svg += `<path d="M 274 66 L 306 54 L 318 0 Z" fill="url(#${id})" stroke="${h.c2}" stroke-width="2" stroke-linejoin="round"/>`;
    const stripes = [
      "M 279 58 L 305 47", "M 285 44 L 308 35", "M 292 30 L 311 24", "M 299 16 L 314 12"
    ];
    svg += stripes.map(d =>
      `<path d="${d}" stroke="${h.stripe ? h.c2 : h.c2}" stroke-width="${h.stripe ? 4 : 2.2}" opacity="${h.stripe ? 0.9 : 0.5}" stroke-linecap="round"/>`
    ).join("");
    if (h.sparkle) {
      svg += `<g class="u-hornsparkle" fill="#fff"><text x="326" y="14" font-size="16">✦</text><text x="262" y="36" font-size="12">✦</text></g>`;
    }
    return svg;
  }

  /* ---------- WINGS ---------- */
  function wingsSvg(w) {
    if (w.type === "none") return "";
    let near = "", far = "";
    if (w.type === "feather") {
      const petals = (fill, o) => `
        <ellipse cx="122" cy="106" rx="20" ry="56" transform="rotate(-38 122 106)" fill="${fill}" opacity="${o}"/>
        <ellipse cx="154" cy="98"  rx="19" ry="53" transform="rotate(-19 154 98)"  fill="${fill}" opacity="${o}"/>
        <ellipse cx="186" cy="100" rx="17" ry="46" transform="rotate(-3 186 100)"  fill="${fill}" opacity="${o}"/>`;
      far = `<g transform="translate(-16,-10)">${petals(w.c2, w.op * 0.75)}</g>`;
      near = petals(w.c1, w.op) +
        `<ellipse cx="154" cy="98" rx="19" ry="53" transform="rotate(-19 154 98)" fill="none" stroke="${w.c2}" stroke-width="1.6" opacity="0.6"/>`;
    } else if (w.type === "butterfly") {
      const shape = (fill, o) => `
        <path d="M 178 148 C 154 92 124 60 100 66 C 78 72 80 114 106 140 C 126 160 160 164 178 148 Z" fill="${fill}" opacity="${o}"/>
        <path d="M 178 152 C 154 152 128 166 122 186 C 118 202 134 212 152 204 C 168 197 177 174 178 152 Z" fill="${fill}" opacity="${o}"/>`;
      far = `<g transform="translate(-18,-8)">${shape(w.c2, w.op * 0.7)}</g>`;
      near = shape(w.c1, w.op) +
        `<circle cx="130" cy="104" r="9" fill="${w.c2}" opacity="0.7"/>
         <circle cx="146" cy="184" r="6" fill="${w.c2}" opacity="0.7"/>`;
    } else if (w.type === "crystal") {
      const shape = (fill, o) => `
        <polygon points="178,150 150,84 116,54 110,96 134,132" fill="${fill}" opacity="${o}"/>
        <polygon points="178,150 134,132 104,142 122,172 154,178" fill="${fill}" opacity="${o}"/>`;
      far = `<g transform="translate(-18,-8)">${shape(w.c2, w.op * 0.7)}</g>`;
      near = shape(w.c1, w.op) +
        `<polyline points="178,150 150,84" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
         <polyline points="178,150 134,132" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>`;
    }
    return `<g class="u-wings">${far}${near}</g>`;
  }

  /* ---------- HEADWEAR ---------- */
  function headSvg(h) {
    if (h.type === "none") return "";
    let inner = "";
    if (h.type === "crown") {
      inner = `<polygon points="276,64 285,36 297,55 308,28 319,53 331,38 335,64"
                 fill="${h.c1}" stroke="${h.c2}" stroke-width="2.5" stroke-linejoin="round"/>
               <rect x="274" y="60" width="63" height="9" rx="4" fill="${h.c1}" stroke="${h.c2}" stroke-width="2"/>
               <circle cx="285" cy="38" r="3.2" fill="${h.c2}"/><circle cx="308" cy="30" r="3.6" fill="${h.c2}"/>
               <circle cx="331" cy="40" r="3.2" fill="${h.c2}"/>`;
    } else if (h.type === "flowers") {
      const spots = [[278, 62], [293, 53], [308, 48], [323, 52], [336, 62]];
      const cols = [h.c1, h.c2, h.c3, h.c1, h.c2];
      inner = spots.map((p, i) => {
        const c = cols[i], r = 7;
        let f = "";
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * Math.PI * 2;
          f += `<circle cx="${(p[0] + Math.cos(a) * r).toFixed(1)}" cy="${(p[1] + Math.sin(a) * r).toFixed(1)}" r="5" fill="${c}"/>`;
        }
        return f + `<circle cx="${p[0]}" cy="${p[1]}" r="3.4" fill="#FFF3C4"/>`;
      }).join("");
    } else if (h.type === "clip") {
      inner = `<g transform="translate(272,58) scale(1.5)"><path d="M 0 -10 L 3 -3 L 10 -3 L 4.5 1.5 L 7 9 L 0 4.5 L -7 9 L -4.5 1.5 L -10 -3 L -3 -3 Z"
                 fill="${h.c1}" stroke="#E0A93F" stroke-width="1.4" stroke-linejoin="round"/></g>`;
    } else if (h.type === "party") {
      inner = `<polygon points="290,60 324,60 309,8" fill="${h.c1}" stroke="${h.c2}" stroke-width="2.5" stroke-linejoin="round"/>
               <path d="M 294 48 L 320 48 M 297 36 L 316 36" stroke="${h.c2}" stroke-width="3.5" stroke-linecap="round"/>
               <circle cx="309" cy="6" r="6" fill="${h.c2}"/>`;
    }
    return `<g transform="rotate(-14 305 95)">${inner}</g>`;
  }

  /* ---------- NECKWEAR ---------- */
  function neckSvg(n) {
    if (n.type === "none") return "";
    if (n.type === "scarf") {
      return `<g>
        <path d="M 245 108 C 262 128 268 140 272 156 C 254 168 236 172 222 168 C 224 146 232 124 245 108 Z"
              fill="${n.c1}" stroke="${n.c2}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 232 164 C 220 186 206 202 190 212 C 184 200 186 186 194 174 C 204 168 218 164 232 164 Z"
              fill="${n.c2}" stroke="${n.c1}" stroke-width="2" stroke-linejoin="round"/>
      </g>`;
    }
    if (n.type === "bell") {
      return `<g>
        <path d="M 242 116 C 258 136 266 152 270 168" fill="none" stroke="${n.c1}" stroke-width="7" stroke-linecap="round"/>
        <path d="M 242 116 C 258 136 266 152 270 168" fill="none" stroke="#fff" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
        <circle cx="272" cy="176" r="11" fill="${n.c2}" stroke="${n.c1}" stroke-width="2"/>
        <circle cx="269" cy="172" r="3" fill="#fff" opacity="0.7"/>
      </g>`;
    }
    if (n.type === "cape") {
      return `<g>
        <path d="M 252 118 C 218 126 182 144 158 172 C 145 187 143 206 152 214 C 180 202 214 182 238 162 C 253 149 258 132 252 118 Z"
              fill="${n.c1}" stroke="${n.c2}" stroke-width="2.5" stroke-linejoin="round" opacity="0.95"/>
        <text x="176" y="190" font-size="14" fill="${n.c2}">✦</text>
        <text x="206" y="168" font-size="11" fill="${n.c2}">✦</text>
        <text x="160" y="206" font-size="10" fill="${n.c2}">✦</text>
      </g>`;
    }
    return "";
  }

  function neckBack(n) { return n.type === "cape" ? neckSvg(n) : ""; }
  function neckFront(n) { return n.type === "cape" ? `<path d="M 246 112 C 258 124 260 142 256 156" fill="none" stroke="${n.c2}" stroke-width="6" stroke-linecap="round"/>` : neckSvg(n); }

  /* ---------- AURA ---------- */
  function auraSvg(a) {
    if (!a.glyphs || !a.glyphs.length) return "";
    const spots = [[52, 66], [356, 58], [66, 300], [378, 214], [196, 26], [30, 178], [344, 306], [244, 46], [110, 42], [400, 130]];
    return `<g class="u-aura">` + spots.map((p, i) =>
      `<text x="${p[0]}" y="${p[1]}" font-size="${13 + (i % 3) * 5}" class="u-spark" style="animation-delay:${(i * 0.37).toFixed(2)}s">${a.glyphs[i % a.glyphs.length]}</text>`
    ).join("") + `</g>`;
  }

  /* ---------- LEGS ---------- */
  function leg(x, y, w, c, shade, hoofC, glitter) {
    const bottom = 322;
    return `<rect x="${x}" y="${y}" width="${w}" height="${bottom - y}" rx="${w / 2}" fill="${c}"/>
            <path d="M ${x} ${bottom - 17} h ${w} v 11 a ${w / 2} ${w / 2} 0 0 1 -${w} 0 Z" fill="${hoofC}"/>
            ${glitter ? `<circle cx="${x + w / 2}" cy="${bottom - 10}" r="2" fill="#fff" opacity="0.85"/>` : ""}`;
  }

  /* ---------- MAIN RENDER ---------- */
  function render(equipped, opts) {
    opts = opts || {};
    const coat = find("coat", equipped.coat);
    const mane = find("mane", equipped.mane);
    const horn = find("horn", equipped.horn);
    const wings = find("wings", equipped.wings);
    const hoof = find("hooves", equipped.hooves);
    const head = find("headwear", equipped.headwear);
    const neck = find("neckwear", equipped.neckwear);
    const aura = find("aura", equipped.aura);

    const eyeColor = coat.dark ? "#FFFFFF" : "#3A2C46";

    return `
<svg class="unicorn-svg${opts.animate === false ? "" : " u-breathe"}" viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your unicorn">
  ${auraSvg(aura)}
  <ellipse cx="180" cy="326" rx="112" ry="14" fill="#000" opacity="0.08"/>
  ${wingsSvg(wings)}
  ${tailPaths(mane)}

  <!-- far legs -->
  ${leg(112, 250, 27, coat.shade, coat.shade, hoof.c1, hoof.glitter)}
  ${leg(206, 250, 27, coat.shade, coat.shade, hoof.c1, hoof.glitter)}

  <!-- body -->
  <ellipse cx="176" cy="204" rx="93" ry="63" fill="${coat.coat}"/>
  <ellipse cx="176" cy="222" rx="86" ry="46" fill="${coat.shade}" opacity="0.35"/>

  <!-- near legs -->
  ${leg(146, 256, 29, coat.coat, coat.shade, hoof.c1, hoof.glitter)}
  ${leg(238, 256, 29, coat.coat, coat.shade, hoof.c1, hoof.glitter)}

  <!-- neck -->
  <path d="M 220 182 C 228 132 250 100 274 82 L 318 112 C 306 146 288 176 272 198 Z" fill="${coat.coat}"/>

  <!-- head -->
  <g>
    <path d="M 268 62 C 261 34 282 30 291 44 C 294 52 292 62 288 68 Z" fill="${coat.shade}" stroke="${coat.line}" stroke-width="1.5"/>
    <ellipse cx="305" cy="95" rx="47" ry="37" transform="rotate(-14 305 95)" fill="${coat.coat}"/>
    <ellipse cx="345" cy="112" rx="24" ry="18" transform="rotate(-14 345 112)" fill="${coat.shade}"/>
    <ellipse cx="352" cy="112" rx="3.4" ry="4.6" transform="rotate(-14 352 112)" fill="${coat.line}"/>
    <path d="M 337 122 q 9 6 17 -1" fill="none" stroke="${coat.line}" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="322" cy="108" rx="10" ry="6" fill="#FF9FC4" opacity="0.45"/>
    <g class="u-eye">
      <ellipse cx="312" cy="88" rx="7.5" ry="9" fill="${eyeColor}"/>
      <circle cx="314.5" cy="85" r="2.6" fill="#fff" opacity="${coat.dark ? 0.45 : 0.95}"/>
      <path d="M 302 78 q 9 -7 19 -3" fill="none" stroke="${eyeColor}" stroke-width="3" stroke-linecap="round"/>
      <path d="M 300 74 l -6 -4 M 306 71 l -4 -6 M 313 70 l -1 -6" stroke="${eyeColor}" stroke-width="2.4" stroke-linecap="round"/>
    </g>
  </g>

  ${neckBack(neck)}
  ${manePaths(mane)}
  ${hornSvg(horn)}
  ${neckFront(neck)}
  ${headSvg(head)}
</svg>`;
  }

  function defaultEquipped() {
    return {
      coat: "coat_snow", mane: "mane_sunrise", horn: "horn_pearl", wings: "wings_none",
      hooves: "hoof_soft", headwear: "head_none", neckwear: "neck_none", aura: "aura_none"
    };
  }

  function freeIds() {
    const out = [];
    Object.keys(COSMETICS).forEach(slot => {
      COSMETICS[slot].items.forEach(i => { if (i.free) out.push(i.id); });
    });
    return out;
  }

  function slotOf(id) {
    for (const slot of Object.keys(COSMETICS)) {
      if (COSMETICS[slot].items.some(i => i.id === id)) return slot;
    }
    return null;
  }

  function itemById(id) {
    for (const slot of Object.keys(COSMETICS)) {
      const it = COSMETICS[slot].items.find(i => i.id === id);
      if (it) return it;
    }
    return null;
  }

  return { render, defaultEquipped, freeIds, slotOf, itemById };
})();
