/* ============================================================
   REWARDS: cosmetics, treasures, and badges
   ============================================================ */

/* ---------- COSMETICS ----------------------------------------
   Slots are drawn in this order by the unicorn renderer.
   "free: true" means she starts with it already unlocked.
   ------------------------------------------------------------ */

const COSMETICS = {
  coat: { label: "Coat", emoji: "🎨", items: [
    { id:"coat_snow",   name:"Snowdrift",     emoji:"🤍", free:true,  coat:"#FFFBFD", shade:"#F0E3EE", line:"#D9C4D6" },
    { id:"coat_rose",   name:"Rose Petal",    emoji:"🌸", free:true,  coat:"#FFE2EC", shade:"#F7C8DA", line:"#E0A4BE" },
    { id:"coat_lav",    name:"Lavender Dusk", emoji:"💜", free:true,  coat:"#EADCFF", shade:"#D6C2F5", line:"#B79FE0" },
    { id:"coat_mint",   name:"Mint Meadow",   emoji:"🌿", coat:"#DCF7E9", shade:"#BFEBD6", line:"#96CFB6" },
    { id:"coat_butter", name:"Buttercream",   emoji:"🧈", coat:"#FFF3D6", shade:"#FAE3AE", line:"#DEC287" },
    { id:"coat_sky",    name:"Summer Sky",    emoji:"🩵", coat:"#DBF0FF", shade:"#BADFF8", line:"#8FC0E0" },
    { id:"coat_peach",  name:"Peach Glow",    emoji:"🍑", coat:"#FFE6D6", shade:"#FCCBAE", line:"#E3A883" },
    { id:"coat_mid",    name:"Midnight Blue", emoji:"🌌", coat:"#3B3F6B", shade:"#2C2F52", line:"#1E2039", dark:true },
    { id:"coat_storm",  name:"Storm Cloud",   emoji:"☁️", coat:"#C9CEDA", shade:"#AEB4C4", line:"#8890A3" },
    { id:"coat_cocoa",  name:"Cocoa Bean",    emoji:"🤎", coat:"#C99A76", shade:"#B2825E", line:"#8E6244" }
  ]},

  mane: { label: "Mane", emoji: "💫", items: [
    { id:"mane_sunrise", name:"Sunrise",     emoji:"🌅", free:true, style:"flow", c1:"#FFB3C9", c2:"#FFD59E", c3:"#FF8FB1" },
    { id:"mane_ocean",   name:"Ocean Song",  emoji:"🌊", free:true, style:"flow", c1:"#7FD8F0", c2:"#9BB8F5", c3:"#5EC3E6" },
    { id:"mane_candy",   name:"Cotton Candy",emoji:"🍭", free:true, style:"curl", c1:"#FFC2E8", c2:"#C9B6FF", c3:"#FF9FDC" },
    { id:"mane_rainbow", name:"True Rainbow",emoji:"🌈", style:"flow", c1:"#FF8A8A", c2:"#FFD36E", c3:"#7FE3A8", c4:"#7FC4F5", c5:"#C79BF5", rainbow:true },
    { id:"mane_star",    name:"Starlight",   emoji:"⭐", style:"flow", c1:"#4A5390", c2:"#8E9BE8", c3:"#DCE3FF", sparkle:true },
    { id:"mane_meadow",  name:"Wildflower",  emoji:"🌼", style:"curl", c1:"#A8E6A1", c2:"#FFE690", c3:"#7FD489" },
    { id:"mane_ember",   name:"Ember",       emoji:"🔥", style:"flow", c1:"#FF9A5B", c2:"#FFD07A", c3:"#F26D4E" },
    { id:"mane_frost",   name:"Frostfall",   emoji:"❄️", style:"curl", c1:"#D6F2FF", c2:"#AEE0F5", c3:"#EAF9FF", sparkle:true },
    { id:"mane_moss",    name:"Deep Forest", emoji:"🍃", style:"curl", c1:"#5EA87A", c2:"#8CCB93", c3:"#3F7D5C" },
    { id:"mane_plum",    name:"Plum Twilight",emoji:"🍇",style:"flow", c1:"#9B6BC4", c2:"#D2A0E8", c3:"#7A4CA0" }
  ]},

  horn: { label: "Horn", emoji: "🦄", items: [
    { id:"horn_pearl",  name:"Pearl",       emoji:"🤍", free:true, c1:"#FFF6FA", c2:"#E4D2E0" },
    { id:"horn_gold",   name:"Sunspun Gold",emoji:"🥇", c1:"#FFD97A", c2:"#E0A93F" },
    { id:"horn_crystal",name:"Crystal",     emoji:"💎", c1:"#CFF2FF", c2:"#8FD6F0", glow:true },
    { id:"horn_candy",  name:"Peppermint",  emoji:"🍬", c1:"#FFFFFF", c2:"#FF7A9C", stripe:true },
    { id:"horn_star",   name:"Fallen Star", emoji:"🌟", c1:"#FFF0B8", c2:"#FFC94D", glow:true, sparkle:true },
    { id:"horn_moon",   name:"Moonsilver",  emoji:"🌙", c1:"#EAF0FF", c2:"#A9B6D8", glow:true },
    { id:"horn_coral",  name:"Coral Spiral",emoji:"🪸", c1:"#FFC3B0", c2:"#F08A6E" }
  ]},

  wings: { label: "Wings", emoji: "🪽", items: [
    { id:"wings_none",   name:"No Wings",    emoji:"🚫", free:true, type:"none" },
    { id:"wings_feather",name:"Soft Feather",emoji:"🪶", type:"feather", c1:"#FFFFFF", c2:"#F0E6F2", op:0.95 },
    { id:"wings_butter", name:"Butterfly",   emoji:"🦋", type:"butterfly", c1:"#B8E4FF", c2:"#F2C8FF", op:0.8 },
    { id:"wings_crystal",name:"Crystal",     emoji:"💠", type:"crystal", c1:"#D6F4FF", c2:"#96D9F5", op:0.7 },
    { id:"wings_gold",   name:"Golden",      emoji:"✨", type:"feather", c1:"#FFE9A8", c2:"#F0C55E", op:0.95 },
    { id:"wings_leaf",   name:"Leafwing",    emoji:"🍃", type:"butterfly", c1:"#BDEFC6", c2:"#8FD9A0", op:0.85 },
    { id:"wings_dusk",   name:"Dusk Feather",emoji:"🌒", type:"feather", c1:"#6C74B0", c2:"#4A5390", op:0.95 }
  ]},

  hooves: { label: "Hooves", emoji: "🎠", items: [
    { id:"hoof_soft",  name:"Soft Grey",   emoji:"🩶", free:true, c1:"#C9BFD2" },
    { id:"hoof_gold",  name:"Gold Dipped", emoji:"🥇", c1:"#F2C55E" },
    { id:"hoof_silver",name:"Silver Dipped",emoji:"🥈",c1:"#D8DEE8" },
    { id:"hoof_pink",  name:"Glitter Pink",emoji:"💖", c1:"#FF9FC4", glitter:true },
    { id:"hoof_mint",  name:"Sea Glass",   emoji:"🫧", c1:"#9EE0CB" },
    { id:"hoof_flame", name:"Emberstep",   emoji:"🔥", c1:"#FF9A5B", glitter:true }
  ]},

  headwear: { label: "Head", emoji: "👑", items: [
    { id:"head_none",   name:"Nothing",       emoji:"🚫", free:true, type:"none" },
    { id:"head_flower", name:"Flower Crown",  emoji:"🌸", type:"flowers", c1:"#FF9FC4", c2:"#FFE690", c3:"#C9B6FF" },
    { id:"head_gold",   name:"Golden Crown",  emoji:"👑", type:"crown", c1:"#FFD97A", c2:"#E0A93F" },
    { id:"head_leaf",   name:"Leaf Circlet",  emoji:"🍀", type:"flowers", c1:"#8FD9A0", c2:"#BDEFC6", c3:"#6DBF83" },
    { id:"head_star",   name:"Star Clip",     emoji:"⭐", type:"clip", c1:"#FFD54D" },
    { id:"head_party",  name:"Party Hat",     emoji:"🎉", type:"party", c1:"#FF8FB1", c2:"#7FC4F5" },
    { id:"head_moon",   name:"Moon Circlet",  emoji:"🌙", type:"crown", c1:"#EAF0FF", c2:"#A9B6D8" }
  ]},

  neckwear: { label: "Neck", emoji: "🧣", items: [
    { id:"neck_none",   name:"Nothing",      emoji:"🚫", free:true, type:"none" },
    { id:"neck_scarf",  name:"Cozy Scarf",   emoji:"🧣", type:"scarf", c1:"#FF7A7A", c2:"#FFD36E" },
    { id:"neck_bell",   name:"Silver Bell",  emoji:"🔔", type:"bell", c1:"#D8DEE8", c2:"#F2C55E" },
    { id:"neck_cape",   name:"Star Cape",    emoji:"🌟", type:"cape", c1:"#5C63A8", c2:"#FFE28A" },
    { id:"neck_moss",   name:"Mosswoven Cloak",emoji:"🍂",type:"cape", c1:"#5E8F63", c2:"#C7E6A8" },
    { id:"neck_pearl",  name:"Pearl Strand", emoji:"📿", type:"bell", c1:"#FFF6FA", c2:"#F5D9E8" },
    { id:"neck_sun",    name:"Sunburst Cape",emoji:"☀️", type:"cape", c1:"#FFB35B", c2:"#FFE9A8" }
  ]},

  aura: { label: "Magic", emoji: "🌟", items: [
    { id:"aura_none",   name:"Nothing",     emoji:"🚫", free:true, glyphs:[] },
    { id:"aura_sparkle",name:"Sparkles",    emoji:"✨", glyphs:["✨","✨","⋆","✦"] },
    { id:"aura_stars",  name:"Starfall",    emoji:"⭐", glyphs:["⭐","🌟","✦","⋆"] },
    { id:"aura_bubble", name:"Bubbles",     emoji:"🫧", glyphs:["🫧","○","🫧","∘"] },
    { id:"aura_fire",   name:"Fireflies",   emoji:"🪰", glyphs:["🟡","✦","🟨","⋆"] },
    { id:"aura_snow",   name:"Snowfall",    emoji:"❄️", glyphs:["❄️","✦","❄","⋆"] },
    { id:"aura_petal",  name:"Petalstorm",  emoji:"🌸", glyphs:["🌸","🌺","🌸","✿"] },
    { id:"aura_leaf",   name:"Leaf Whirl",  emoji:"🍃", glyphs:["🍃","🍂","🍃","❧"] }
  ]}
};

/* ---------- TREASURES ---------------------------------------- */

const TREASURES = {
  t_dewdrop:    { name:"Everdew Drop",       emoji:"💧", ch:1, desc:"A drop of morning dew that never dries. It hums when you hold it." },
  t_feather:    { name:"Silver Feather",     emoji:"🪶", ch:1, desc:"Too heavy to be a feather. Too soft to be silver." },
  t_acorn:      { name:"Lucky Acorn",        emoji:"🌰", ch:1, desc:"Pipkin swears it brings luck. Pipkin has never tested this." },
  t_bell:       { name:"Hush Bell",          emoji:"🔔", ch:1, desc:"When it rings, the whole meadow goes quiet to listen." },
  t_pebble:     { name:"Singing Pebble",     emoji:"🪨", ch:1, desc:"Hums a different note depending on your mood." },
  t_moonberry:  { name:"Moonberry",          emoji:"🫐", ch:2, desc:"Glows faintly in the dark. Tastes like the smell of rain." },
  t_key:        { name:"Rusted Star Key",    emoji:"🗝️", ch:2, desc:"It opens something. Nobody remembers what." },
  t_mushroom:   { name:"Lantern Mushroom",   emoji:"🍄", ch:2, desc:"A living nightlight. It gets brighter when you're afraid." },
  t_coin:       { name:"Troll Coin",         emoji:"🪙", ch:2, desc:"One side is a face. The other side is also a face. Rude." },
  t_poem:       { name:"Bramblewick's Poem", emoji:"📜", ch:2, desc:"Nine lines long. Only eight of them rhyme, and it bothers him." },
  t_thorn:      { name:"Glass Thorn",        emoji:"🌹", ch:2, desc:"Sharper than it looks. Prettier than it should be." },
  t_cloudpuff:  { name:"Bottled Cloud",      emoji:"☁️", ch:3, desc:"Shake it and it rains. Very slightly. On your hoof." },
  t_compass:    { name:"Wandering Compass",  emoji:"🧭", ch:3, desc:"Doesn't point north. Points toward whatever you miss most." },
  t_ribbon:     { name:"Skyweaver Ribbon",   emoji:"🎀", ch:3, desc:"Woven from actual wind. Ties itself into bows when bored." },
  t_lens:       { name:"Truthglass",         emoji:"🔍", ch:3, desc:"Look through it and lies look a bit purple." },
  t_map:        { name:"Half a Map",         emoji:"🗺️", ch:3, desc:"The important half is missing. Of course it is." },
  t_marble:     { name:"Sky Marble",         emoji:"🔮", ch:3, desc:"There's a tiny storm inside. It has weather." },
  t_charm:      { name:"Magpie's Charm",     emoji:"💍", ch:3, desc:"Stolen. Then stolen back. Then given, properly, at last." }
};

/* ---------- BADGES ------------------------------------------- */

const BADGES = {
  b_first:     { name:"First Light",      emoji:"🌅", desc:"Your horn glowed for the very first time." },
  b_brave3:    { name:"Brave Heart",      emoji:"🦁", desc:"Made three brave choices." },
  b_kind3:     { name:"Kind Soul",        emoji:"💗", desc:"Made three kind choices." },
  b_clever3:   { name:"Sharp Mind",       emoji:"🧠", desc:"Made three clever choices." },
  b_curious3:  { name:"Wide Eyes",        emoji:"👀", desc:"Made three curious choices." },
  b_riddle:    { name:"Riddle Master",    emoji:"🧩", desc:"Solved a riddle without a hint." },
  b_math:      { name:"Number Whisperer", emoji:"🔢", desc:"Solved a number puzzle." },
  b_words25:   { name:"Word Collector",   emoji:"📚", desc:"Collected 25 fancy words." },
  b_words60:   { name:"Word Dragon",      emoji:"🐉", desc:"Collected 60 fancy words. That's a hoard." },
  b_treasure5: { name:"Pocket Full",      emoji:"👜", desc:"Found 5 treasures." },
  b_treasure12:{ name:"Treasure Hunter",  emoji:"🏆", desc:"Found 12 treasures." },
  b_style:     { name:"Sparkle Stylist",  emoji:"💅", desc:"Changed your look in the Stable." },
  b_ch1:       { name:"Meadow Walker",    emoji:"🌾", desc:"Finished Chapter One." },
  b_ch2:       { name:"Woods Wanderer",   emoji:"🌲", desc:"Finished Chapter Two." },
  b_ch3:       { name:"Cloud Climber",    emoji:"☁️", desc:"Finished Chapter Three." },
  b_rewind:    { name:"Second Thoughts",  emoji:"⏪", desc:"Went back and chose differently. Smart." },
  b_allpaths:  { name:"Every Road",       emoji:"🛤️", desc:"Found a path that most players never see." }
};

/* ---------- MILESTONE UNLOCKS -------------------------------
   Cosmetics she earns by collecting, not by story choices.
   This is what makes the Word Chest actually pay off.
   ------------------------------------------------------------ */

const UNLOCKS = [
  { type:"words", n:10, item:"coat_mint",     label:"10 fancy words" },
  { type:"words", n:20, item:"mane_ember",    label:"20 fancy words" },
  { type:"words", n:30, item:"horn_gold",     label:"30 fancy words" },
  { type:"words", n:40, item:"wings_butter",  label:"40 fancy words" },
  { type:"words", n:50, item:"coat_sky",      label:"50 fancy words" },
  { type:"words", n:60, item:"aura_snow",     label:"60 fancy words" },
  { type:"words", n:75, item:"head_moon",     label:"75 fancy words" },
  { type:"words", n:90, item:"horn_candy",    label:"90 fancy words" },

  { type:"treasures", n:3,  item:"hoof_silver", label:"3 treasures" },
  { type:"treasures", n:6,  item:"coat_butter", label:"6 treasures" },
  { type:"treasures", n:9,  item:"neck_bell",   label:"9 treasures" },
  { type:"treasures", n:12, item:"head_gold",   label:"12 treasures" },
  { type:"treasures", n:15, item:"wings_gold",  label:"15 treasures" },
  { type:"treasures", n:18, item:"coat_mid",    label:"every treasure" },

  { type:"badges", n:4,  item:"hoof_pink",   label:"4 badges" },
  { type:"badges", n:7,  item:"mane_frost",  label:"7 badges" },
  { type:"badges", n:10, item:"coat_peach",  label:"10 badges" },
  { type:"badges", n:13, item:"neck_cape",   label:"13 badges" },
  { type:"badges", n:16, item:"mane_plum",   label:"16 badges" },

  { type:"chapters", n:1, item:"head_leaf",     label:"finishing Chapter 1" },
  { type:"chapters", n:2, item:"wings_crystal", label:"finishing Chapter 2" },
  { type:"chapters", n:2, item:"hoof_mint",     label:"finishing Chapter 2" },
  { type:"chapters", n:3, item:"coat_storm",    label:"finishing Chapter 3" },
  { type:"chapters", n:3, item:"neck_sun",      label:"finishing Chapter 3" },
  { type:"chapters", n:3, item:"aura_leaf",     label:"finishing Chapter 3" },

  { type:"brave",   n:5, item:"horn_coral", label:"5 brave choices" },
  { type:"kind",    n:5, item:"coat_cocoa", label:"5 kind choices" },
  { type:"clever",  n:5, item:"mane_moss",  label:"5 clever choices" },
  { type:"curious", n:5, item:"head_party", label:"5 curious choices" },

  { type:"curious", n:7, item:"wings_leaf", label:"7 curious choices" },
  { type:"words", n:93, item:"horn_star", label:"93 fancy words — nearly the whole chest" }
];
