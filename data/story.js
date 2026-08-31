/* ============================================================
   THE STORY
   ------------------------------------------------------------
   ADDING TO THE STORY:
   Every "node" is one screen. It looks like this:

     node_id: {
       art: "🌅",                          <- big picture emoji
       text: ["First paragraph.",          <- one string per paragraph
              "Second paragraph."],
       choices: [
         { t: "What she taps", to: "next_node_id", trait: "brave" }
       ]
     }

   trait can be: brave, kind, clever, curious  (or leave it out)
   give: { treasures:[], cosmetics:[], badges:[], flags:{} }
   req:  { trait:"kind", min:3 } or { flag:"x" } or { notFlag:"x" }
   ============================================================ */

const STORY = {
  title: "The Glimmerlight Chronicles",

  chapters: [

/* ============================================================
   CHAPTER ONE — THE MORNING YOUR HORN WOKE UP
   ============================================================ */
{
  id: "ch1",
  emoji: "🌅",
  title: "The Morning Your Horn Woke Up",
  subtitle: "Everbloom Meadow",
  startNode: "c1_wake",
  nodes: {

  c1_wake: {
    art: "🌄",
    text: [
      "The morning you turned seven was the morning your horn woke up.",
      "You were curled in the tall grass of Everbloom Meadow, warm and drowsy, when something at the very top of your head went <em>tingle</em>. Not an itch. Not a bump. A tingle, like a tiny bell ringing somewhere under your skin.",
      "You opened one eye. The whole meadow was shimmering — every blade of grass wearing a brilliant little crown of dew.",
      "And your horn was glowing."
    ],
    choices: [
      { t: "🪞 Tiptoe to the pond and look at yourself", to: "c1_pond", trait: "curious" },
      { t: "🎉 Leap up and shout about it", to: "c1_shout", trait: "brave" },
      { t: "🤫 Hold very still and see what happens", to: "c1_still", trait: "clever" }
    ]
  },

  c1_pond: {
    art: "💧",
    give: { badges: ["b_first"], treasures: ["t_dewdrop"] },
    text: [
      "You crept to the pond so quietly that not one frog noticed you.",
      "The water was still as glass, and the whole pond was luminous with early light. And there you were — looking back at yourself, bewildered and grinning, and above your eyes, a horn lit up like a candle behind a curtain.",
      "You leaned closer. A single drop of dew rolled off a reed and landed on your nose. It did not splash. It did not pop. It just sat there, humming a note so low you felt it in your teeth.",
      "You had a peculiar feeling that it wanted to come with you. You had never held anything so small and so obviously precious."
    ],
    choices: [{ t: "Tuck it away and get up", to: "c1_pipkin" }]
  },

  c1_shout: {
    art: "🐦",
    give: { badges: ["b_first"] },
    text: [
      "You leapt straight up in the air with all four hooves and hollered, “MY HORN IS GLOWING!”",
      "Forty sparrows exploded out of the willow tree like popcorn. One of them, a small round fellow who looked absolutely furious, landed directly on your nose, blinked twice, and said:",
      "“<em>Rude.</em>”",
      "Then he flew off, muttering, and the meadow went back to being a meadow. But your horn kept glowing, and you kept grinning, and honestly you would shout again."
    ],
    choices: [{ t: "Apologize to the tree, just in case", to: "c1_pipkin", trait: "kind" }]
  },

  c1_still: {
    art: "🪨",
    give: { badges: ["b_first"], treasures: ["t_pebble"] },
    text: [
      "You did not move. Not one hair. You lay there as cautious as a rabbit and twice as patient.",
      "You lay in the grass and let the tingle do whatever it wanted to do, and slowly — so slowly you might have imagined it — a small grey pebble beside your hoof began to hum.",
      "It hummed the exact same note your horn was humming. When you felt happy, the note went up. When you held your breath, it went quiet.",
      "That is a very good trick for a pebble. You decided to keep it."
    ],
    choices: [{ t: "Stand up. Carefully.", to: "c1_pipkin" }]
  },

  c1_pipkin: {
    art: "🦔",
    text: [
      "Something small and prickly came barrelling through the grass and bounced off your front leg.",
      "It was Pipkin. Pipkin is a hedgehog, and Pipkin is anxious about almost everything, including grass, weather, Tuesdays, and his own shadow. He is the most timid creature in the meadow. He is also, without question, the most loyal.",
      "“THE STREAM,” he gasped. “The stream has gone <em>grey</em>.”",
      "He said it the way you would say the sky had fallen down."
    ],
    choices: [
      { t: "💗 “Breathe with me, Pipkin. In. Out.”", to: "c1_calm", trait: "kind" },
      { t: "🧠 “Grey how? Tell me exactly what you saw.”", to: "c1_ask", trait: "clever" },
      { t: "🦁 “Then let's go look. Right now.”", to: "c1_run", trait: "brave" }
    ]
  },

  c1_calm: {
    art: "🌬️",
    give: { treasures: ["t_acorn"], flags: { pipkinCalm: true } },
    text: [
      "You lowered your head until you were nose to nose with him.",
      "“Breathe with me,” you said. “In... and out. In... and out.”",
      "Pipkin breathed. His spines went from <em>alarmed</em> back down to <em>merely worried</em>, which for Pipkin is basically relaxed.",
      "“Thank you,” he mumbled, and there was so much gratitude packed into those two words that you felt it in your chest. Then he dug around in his cheek and produced a slightly damp acorn. “Here. It's my lucky one. You should have it. I don't know if it works. I've never really tested it.”"
    ],
    choices: [{ t: "Take it like it's made of gold", to: "c1_together", trait: "kind" }]
  },

  c1_ask: {
    art: "🔍",
    give: { flags: { knowsShimmer: true } },
    text: [
      "“Grey how?” you asked. “Grey like a rain cloud, or grey like an old photograph?”",
      "Pipkin hesitated, and stopped mid-panic. Nobody had ever asked him a follow-up question before, and he found it strangely calming.",
      "“Like... like the sparkle went out of it,” he said slowly. “The water still moves. It still sounds like water. But it doesn't <em>shimmer</em>. And the stream has shimmered every single day of my entire life, which is two years.”",
      "You thought about that. Water can be many things. But the Glimmer — the light that lives inside the water of Everbloom — has never once gone out."
    ],
    choices: [{ t: "“Then something turned it off.”", to: "c1_together", trait: "clever" }]
  },

  c1_run: {
    art: "💨",
    give: { flags: { ranAhead: true } },
    text: [
      "You did not wait. You ran.",
      "Grass whipped past. Your hooves drummed. Your new horn left a faint streak of light in the air behind you like a sparkler, which was, frankly, extremely cool.",
      "You skidded to a stop at the top of the bank and looked down at the stream, and your stomach went cold.",
      "Four minutes later, Pipkin arrived. He has legs approximately as long as your eyelashes. He did not complain, but he did lie down flat for a while, weary right down to his bones."
    ],
    choices: [{ t: "Wait for him to catch his breath", to: "c1_together", trait: "kind" }]
  },

  c1_together: {
    art: "🌾",
    text: [
      "You walked toward the water together, the two of you, through grass still heavy with dew.",
      "“Can I tell you a joke,” said Pipkin, “to make myself feel braver?”",
      "“Always.”",
      "“Why did the unicorn cross the meadow?”",
      "“Why?”",
      "“Because it was the <em>horn</em> thing to do.”",
      "It was a terrible joke. You laughed anyway, which is what you do for a friend, and Pipkin walked a little taller after that."
    ],
    choices: [{ t: "Go to the water", to: "c1_stream" }]
  },

  c1_stream: {
    art: "🏞️",
    text: [
      "The stream was grey.",
      "Not dirty. Not muddy. Just... <em>ordinary</em>. It ran over the stones the way water is supposed to, making all the right sounds, and there was not one single spark of light inside it anywhere.",
      "It looked like a song with the music taken out. The shimmer had not faded slowly. It had simply vanished, all at once, the way a candle goes out.",
      "You caught a glimpse of something silver, mysterious and out of place, caught in the reeds at the edge."
    ],
    choices: [
      { t: "🪶 Pull the silver thing free", to: "c1_feather", req: { notFlag: "gotFeather" } },
      { t: "💧 Put your hoof in the water", to: "c1_water", req: { notFlag: "touchedWater" } },
      { t: "📣 Call out — maybe someone is nearby", to: "c1_call", req: { notFlag: "called" } },
      { t: "⬆️ Follow the stream toward the mountains", to: "c1_gate" }
    ]
  },

  c1_feather: {
    art: "🪶",
    give: { treasures: ["t_feather"], flags: { gotFeather: true } },
    text: [
      "You leaned in and tugged it loose with your teeth.",
      "It was a feather — enormous, longer than your whole face, gleaming like a spoon left out in the moonlight. It was far too heavy to be a feather and far too soft to be silver.",
      "You set it down on the grass to look at it properly. It rolled over by itself, delicate as a compass needle, and pointed north.",
      "You picked it up and turned around three times. You put it down again.",
      "North.",
      "Pipkin made a small noise. “I don't love that,” he said."
    ],
    choices: [
      { t: "Look around a bit more", to: "c1_stream", trait: "curious" },
      { t: "Follow the stream north", to: "c1_gate", trait: "brave" }
    ]
  },

  c1_water: {
    art: "🥶",
    give: { flags: { touchedWater: true } },
    text: [
      "You stepped in up to your fetlock. The water was cold — properly cold, the kind that makes your leg forget how to be a leg. You began to tremble, and not entirely from the cold.",
      "But that wasn't the strange part.",
      "The strange part was the <em>quiet</em>. Everbloom water hums. It has always hummed, low and friendly, like a grandmother in another room.",
      "This water didn't hum at all. It felt like holding the hand of someone who has fallen asleep."
    ],
    choices: [
      { t: "Get out and look around some more", to: "c1_stream" },
      { t: "Follow the stream north", to: "c1_gate", trait: "brave" }
    ]
  },

  c1_call: {
    art: "🗣️",
    give: { treasures: ["t_pebble"], flags: { called: true } },
    text: [
      "You lifted your head and called across the water. “Hello? Is anybody there?”",
      "The far bank threw your voice back at you. <em>Hello. Hello. Hell—</em>",
      "And then the echo said one more word. A word you had not said.",
      "“<em>Hurry.</em>”",
      "Pipkin rolled straight into a ball. The word hung in the air, grim and patient, and did not echo again. You stood very still, and your horn glowed a little brighter, the way a lamp does when the room gets dark. At your hoof lay a small grey pebble, humming a warning note.",
      "You took it with you."
    ],
    choices: [
      { t: "Check the reeds before you go", to: "c1_stream", trait: "curious" },
      { t: "Go north. Now.", to: "c1_gate", trait: "brave" }
    ]
  },

  c1_gate: {
    art: "🌫️",
    text: [
      "You followed the grey water uphill until the meadow ran out.",
      "In front of you stood the Whistling Gate — two ancient gnarled stones leaning together into an arch, older than the meadow, older than the stream, older than anybody's grandmother's grandmother.",
      "The wind moved through the gap and made a low whistle, and where the whistle touched the stone, letters lit up.",
      "“It's a riddle,” whispered Pipkin, hiding behind your back leg. “It's ALWAYS a riddle.”"
    ],
    puzzle: {
      q: "I have a bed, but I never sleep.<br>I have a mouth, but I never eat.<br>I run and I run, but I never walk.<br><br>What am I?",
      options: ["A very tired horse", "A river", "A dream you forgot"],
      answer: 1,
      hint: "Look down. You have been walking beside the answer all morning.",
      right: "The letters flared silver-blue, and the whistle in the stones changed into something almost like a laugh.",
      wrong: "The stones whistled — a long, unimpressed sort of whistle. Nothing bad happened. Riddles are patient. Try again.",
      to: "c1_gate_open"
    }
  },

  c1_gate_open: {
    art: "🔔",
    give: { treasures: ["t_bell"], cosmetics: ["aura_sparkle"] },
    text: [
      "The arch didn't open, exactly. It <em>allowed</em> you.",
      "As you stepped through, the air went thick and sweet, like walking through the inside of a bell, and something small dropped out of the stone and clinked at your feet: a tiny silver bell with no clapper inside it.",
      "You nudged it. It made no sound at all — and every bird, beetle, and blade of grass for a hundred steps went silent to listen.",
      "“That's the Hush Bell,” Pipkin breathed. “Those are supposed to be a story.” He said it the way you would talk about something magnificent that you had only ever seen in a painting.",
      "Small sparks drifted around you, too, catching in your mane like fireflies who had decided you were home."
    ],
    choices: [{ t: "Keep walking", to: "c1_lark" }]
  },

  c1_lark: {
    art: "🐤",
    text: [
      "A lark dropped out of the sky and landed on the Hush Bell, which was rude, but larks are like that.",
      "“You're going north,” she said. It was not a question.",
      "“I am.”",
      "She tipped her head and sang, quick and bright:",
      "<em>“The woods will whisper, the woods will lie,<br>the woods will ask you the reason why.<br>Answer with truth and the path stays wide —<br>answer with fear and it closes inside.”</em>",
      "Then she added, in a completely normal voice, “Anyway. Good luck. Watch out for the badger, he's a nightmare,” and went soaring off over the hill."
    ],
    choices: [
      { t: "“Wait — what badger?”", to: "c1_hill", trait: "curious" },
      { t: "Say nothing. Keep climbing.", to: "c1_hill", trait: "brave" }
    ]
  },

  c1_hill: {
    art: "🌆",
    text: [
      "The last of the day went gold, then pink, then the soft blue of twilight, and you climbed to the top of Hush Hill and stopped.",
      "Below you, to the north, the Whispering Woods lay like a dark green blanket — vast, gloomy, and extremely patient.",
      "And far, far beyond it — so far that it was really just an idea of a mountain — stood Mount Moonwell.",
      "It should have been shining. On every night of your whole life its summit had been the brightest thing in the sky, a white crown above the world.",
      "Tonight it was black. Not one spark.",
      "“Oh,” said Pipkin, very quietly. “Oh, that's why the stream stopped.”"
    ],
    choices: [
      { t: "🌙 Sleep here. Start fresh at dawn.", to: "c1_sleep", trait: "clever" },
      { t: "🦁 Keep going. The dark doesn't scare you.", to: "c1_press", trait: "brave" }
    ]
  },

  c1_sleep: {
    art: "✨",
    give: { cosmetics: ["mane_meadow"] },
    text: [
      "You curled up in the heather with Pipkin tucked against your chest like a small warm pinecone.",
      "The stars came out one at a time, the way they do when they think nobody is counting. You counted them anyway and lost your place at forty-one.",
      "Somewhere in the night, wildflowers grew up through your mane while you slept — which is a thing that happens to unicorns who sleep on kind ground, and is considered a compliment.",
      "You woke at dawn feeling radiant, and full of a quiet courage you could not explain to anybody, including yourself."
    ],
    choices: [{ t: "Go north", to: "c1_end" }]
  },

  c1_press: {
    art: "🌌",
    give: { cosmetics: ["aura_stars"] },
    text: [
      "You walked on into the twilight, and Pipkin — who was terrified, and came anyway, which is the truest kind of courage there is — trotted at your heels.",
      "The dark was not empty. It was full of small sounds that all stopped when you passed and started again behind you.",
      "You did not run. You did not hurry. You just kept putting one hoof in front of the other, and after a while you noticed that the stars had come down low to walk beside you, hanging around your shoulders like they were curious about you.",
      "It turns out the night likes company too."
    ],
    choices: [{ t: "Keep going", to: "c1_end" }]
  },

  c1_end: {
    art: "🌲",
    endsChapter: "ch1",
    give: { cosmetics: ["head_flower"] },
    text: [
      "By the time the woods rose up in front of you, the silver feather in your pack had stopped pointing north.",
      "It was pointing straight at the trees.",
      "Somewhere in there, something had taken the light out of the water. And somewhere past that, on a black mountain, the Moonwell had gone out.",
      "You were seven years old, your horn had been glowing for exactly one day, and you had absolutely no idea what you were doing. You went anyway, determined and slightly terrified, which is how most important things get started.",
      "You went in anyway.",
      "<strong>— End of Chapter One —</strong>"
    ],
    choices: [{ t: "🌲 Begin Chapter Two", to: "c2_edge" }]
  }

  }
},

/* ============================================================
   CHAPTER TWO — THE WHISPERING WOODS
   ============================================================ */
{
  id: "ch2",
  emoji: "🌲",
  title: "The Whispering Woods",
  subtitle: "Where the trees ask questions",
  requires: "ch1",
  startNode: "c2_edge",
  nodes: {

  c2_edge: {
    art: "🌲",
    text: [
      "The Whispering Woods did not look dangerous. That was the first clue.",
      "The trees stood far apart with soft moss between them, and light came down in dazzling green stripes, and it was all so pleasant that Pipkin stopped being cautious and relaxed, which he later described as “my biggest mistake of the week.”",
      "Then the whispering started. It came from everywhere and nowhere, a dry murmur like leaves rubbing together, and it was asking you something.",
      "<em>“Whyyyy are you heeere...”</em>",
      "You remembered the lark. <em>Answer with truth and the path stays wide.</em>"
    ],
    choices: [
      { t: "🦁 “To bring the light back.”", to: "c2_answer", trait: "brave", set: { answer: "light" } },
      { t: "👀 “Honestly? I don't know yet.”", to: "c2_answer", trait: "curious", set: { answer: "unsure" } },
      { t: "💗 “Because my friend was frightened.”", to: "c2_answer", trait: "kind", set: { answer: "friend" } },
      { t: "🧠 “Because nobody else was going to.”", to: "c2_answer", trait: "clever", set: { answer: "nobody" } }
    ]
  },

  c2_answer: {
    art: "🍃",
    text: [
      "You said it out loud, and you meant it.",
      "The whispering stopped so suddenly that your ears rang.",
      "Then, ahead of you, the trees leaned apart — actually leaned, roots creaking, moss tearing — and made a path where a moment ago there had only been a thicket of brambles.",
      "“Well,” said Pipkin, from somewhere underneath a fern. “Well. All right then.”"
    ],
    choices: [{ t: "Walk the path the woods made", to: "c2_bramblewick" }]
  },

  c2_bramblewick: {
    art: "🦡",
    text: [
      "Halfway along the path sat a badger on a mushroom the size of a footstool. He had a pencil behind one ear, ink on both paws, an elaborate waistcoat with far too many buttons, and the deepest scowl you have ever seen on a face with stripes.",
      "He did not look up.",
      "<em>“A hoof, a horn, a hopeful heart —<br>they always come and spoil my art.<br>Go round, go back, go anywhere,<br>but do not stop, and do not stare.”</em>",
      "He turned a page and wrote one word, very slowly, and then crossed it out.",
      "“That,” whispered Pipkin, “must be the nightmare badger.”"
    ],
    choices: [
      { t: "🧠 Answer him in rhyme", to: "c2_rhyme", trait: "clever" },
      { t: "💗 “That was beautiful. What are you writing?”", to: "c2_poem", trait: "kind" },
      { t: "👀 Peer over his shoulder at the page", to: "c2_peek", trait: "curious" },
      { t: "🦁 Walk right past him without a word", to: "c2_past", trait: "brave" }
    ]
  },

  c2_rhyme: {
    art: "📜",
    give: { treasures: ["t_poem"], flags: { bramblewickFriend: true } },
    text: [
      "You took a breath and said:",
      "<em>“A badger, a book, a bitter frown —<br>the only sad thing in this town.<br>I'll go, I'll leave, I'll disappear —<br>but wasn't it nice to be heard, my dear?”</em>",
      "Bramblewick's pencil stopped. For one moment he looked entirely crestfallen, and then entirely delighted, and he could not decide which to be.",
      "He looked up at you for a long, solemn moment. Then he tore a page out of his book and held it out, dignified as a duke.",
      "“Nine lines,” he said. “Eight of them rhyme. The ninth has haunted me for eleven years. Take it. Perhaps it will haunt you instead.”"
    ],
    choices: [{ t: "Take the poem", to: "c2_bramble_help" }]
  },

  c2_poem: {
    art: "📖",
    give: { treasures: ["t_poem"], flags: { bramblewickFriend: true } },
    text: [
      "“That was beautiful,” you said. “What are you writing?”",
      "The scowl fell right off his face, the way a hat falls off a peg.",
      "“Nobody,” said Bramblewick, “has ever asked me that.” He turned the book around. It was full — hundreds of pages, thousands of lines, all of them careful and small and full of crossings-out.",
      "“Forty years,” he said. “Nobody reads badger poetry.”",
      "“I would,” you said, and it was the most sincere thing you had said all day.",
      "He tore out a page and pressed it into your hoof like it was the last one in the world."
    ],
    choices: [{ t: "Tuck it away safely", to: "c2_bramble_help", trait: "kind" }]
  },

  c2_peek: {
    art: "👀",
    text: [
      "You leaned over and read the page upside down, which is a skill, and which Bramblewick noticed immediately.",
      "“<em>Excuse</em> me,” he said.",
      "“Sorry! Sorry. It's just — the last line doesn't rhyme.”",
      "There was a long, stubborn silence you could have parked a wagon in.",
      "“I <em>know</em> the last line doesn't rhyme,” said Bramblewick, in the voice of a badger who has known this for eleven years and has thought about it every single night."
    ],
    choices: [
      { t: "💗 “Maybe it isn't supposed to.”", to: "c2_bramble_help", trait: "kind", set: { bramblewickFriend: true } },
      { t: "🧠 Suggest a word that rhymes", to: "c2_rhyme", trait: "clever" }
    ]
  },

  c2_past: {
    art: "🚶",
    text: [
      "You walked past. He did not look up, and you did not slow down, and for about nine steps that felt like the right decision.",
      "Then Bramblewick said, to nobody in particular, “The forked path ahead. One way is bright and one way is dark. Everyone picks the bright one.”",
      "You stopped.",
      "“Everyone,” he added, licking his pencil, “is usually wrong. But do carry on ignoring me. I'm quite used to it.”"
    ],
    choices: [
      { t: "💗 Go back and say sorry", to: "c2_poem", trait: "kind" },
      { t: "🦁 Keep walking. He's just grumpy.", to: "c2_fork", trait: "brave" }
    ]
  },

  c2_bramble_help: {
    art: "🗝️",
    text: [
      "Bramblewick climbed down off his mushroom, which took a while, and pointed his pencil deeper into the woods.",
      "“The path forks. The bright way is the Lantern Path — mushrooms, glowworms, very charming, terribly slow. The dark way is the Bramble Tangle. Thorns. Unpleasant. Faster.”",
      "“Which should I take?”",
      "“How should I know? I'm a poet, not a map.” He sniffed. “Although. Whichever you take, you'll want the old star key. It's in the Tangle. It has been for a hundred years, because nobody with any sense goes into the Tangle.”",
      "He climbed back up. “Do try not to die. I've only just started liking you.”"
    ],
    choices: [{ t: "Head for the fork", to: "c2_fork" }]
  },

  c2_fork: {
    art: "🍄",
    text: [
      "The path split around an old stump.",
      "To the left, the Lantern Path glowed — hundreds of pale mushrooms lighting the way like little lamps on a runway. It looked like something out of a bedtime story.",
      "To the right, the Bramble Tangle. Jagged thorns as long as your ear. No light at all. A faint, unwelcoming rustle from somewhere gloomy inside.",
      "Pipkin was eager about the left path and extremely reluctant about the right one. He looked at you with enormous, pleading eyes.",
      "“Left,” he said. “Left left left left left.”"
    ],
    choices: [
      { t: "🍄 Take the Lantern Path (safe and beautiful)", to: "c2_lantern" },
      { t: "🌹 Take the Bramble Tangle (dark and fast)", to: "c2_tangle", trait: "brave" }
    ]
  },

  c2_lantern: {
    art: "🍄",
    give: { treasures: ["t_mushroom"], cosmetics: ["aura_fire"] },
    text: [
      "The Lantern Path was every bit as lovely as it looked.",
      "The mushrooms brightened as you approached — dazzling for a moment, then dimming politely behind you as though embarrassed. Glowworms hung from the branches in loops and swags, like someone had decorated for a party and then forgotten to have it.",
      "One mushroom, smaller than the rest, unscrewed itself from the ground and hopped into your pack.",
      "“It does that,” said a glowworm, upside down, in no hurry at all. “Don't linger. Things linger here and then they live here. It's a whole process.” “It gets brighter when you're frightened. Handy. Slightly nosy.”"
    ],
    choices: [
      { t: "👀 “Do you know about a star key?”", to: "c2_glowworm", trait: "curious" },
      { t: "Keep walking", to: "c2_bridge" }
    ]
  },

  c2_glowworm: {
    art: "🐛",
    give: { treasures: ["t_key"], flags: { hasKey: true } },
    text: [
      "The glowworm went a shade brighter, which is how glowworms gossip.",
      "“The star key! Everyone <em>asks</em>. Nobody ever <em>looks</em>. It's in the Tangle, obviously — but there's a magpie who's been carrying it around for years because she likes the shine, and she drops it about once a fortnight, and she dropped it—”",
      "He scurried — as much as a glowworm can scurry — toward a fern. “—there. Under that. I've been staring at it for six days waiting for someone with hands. Or hooves. Hooves would do.”",
      "You nosed the fern aside. There it was: a small rusted key, shaped like a star, warm to the touch."
    ],
    choices: [{ t: "Thank the glowworm properly", to: "c2_bridge", trait: "kind" }]
  },

  c2_tangle: {
    art: "🌹",
    give: { treasures: ["t_thorn", "t_key"], cosmetics: ["neck_moss"], flags: { hasKey: true, wentDark: true } },
    text: [
      "You went right, into the dark, and Pipkin came with you, and neither of you said anything for a long time.",
      "The thorns were not friendly. They were jagged and treacherous, and they caught at your mane and left thin white lines along your shoulder that stung and then stopped stinging. Twice you had to back out and try another way.",
      "And then, in the very middle, where the tangle was thickest and no light had reached in a hundred years, you found a clearing the size of a bathtub.",
      "In it: a fallen thorn made of glass. A cloak of woven moss, folded as though someone had left it for whoever came next.",
      "And a small rusted key, shaped like a star.",
      "“Everyone picks the bright one,” you said out loud, and somewhere behind you a badger did not say <em>I told you so</em>, but only because he wasn't there."
    ],
    choices: [{ t: "Take all three and get out", to: "c2_bridge", trait: "brave" }]
  },

  c2_bridge: {
    art: "🌉",
    text: [
      "Both paths came out at the same place: a gorge with a cascade thundering down into a cavern far below, a rickety bridge across it, and a troll.",
      "She was about the size of a wheelbarrow and twice as solid, with a grim jaw and a colossal pair of hands, and she was knitting.",
      "“Toll,” said the troll, without looking up.",
      "“How much?”",
      "“The toll for a pony is three shiny things.” <em>Click, click</em> went the needles. “You are a unicorn, so it's double. But you said <em>how much</em> instead of <em>get out of my way</em>, and I like manners, so take one off.”",
      "She finally looked up. Her eyes were the colour of wet stone.",
      "“Well? How many shiny things do you owe me?”"
    ],
    puzzle: {
      q: "Three shiny things for a pony.<br>Double it, because you're a unicorn.<br>Then take one away for being polite.<br><br>How many do you owe?",
      options: ["4", "5", "6", "7"],
      answer: 1,
      hint: "Double three first. Three and three more. Then take one away from that.",
      right: "The troll's needles stopped. “Huh,” she said. “Most of them guess six.”",
      wrong: "“Nope,” said the troll, and went back to knitting. “Take your time. Bridge isn't going anywhere.”",
      to: "c2_troll",
      math: true
    }
  },

  c2_troll: {
    art: "🪙",
    give: { treasures: ["t_coin"], badges: ["b_math"] },
    text: [
      "You counted out five shiny things: a button, two river stones, a scrap of foil, and — with a small pang — one strand of your own mane, which came away glittering.",
      "The troll examined each one with tremendous seriousness and put them in a jar with about four hundred others. It was, she said, a fair bargain, and she was not in the habit of being generous.",
      "“Grunda,” she said. “That's my name. Nobody asks.”",
      "She flipped you a coin off the pile. “Troll coin. One side's a face. Other side's also a face. It's a rubbish coin for deciding things and an excellent coin for annoying people.”",
      "Then she stood aside, and the bridge creaked, and you crossed it one careful hoof at a time while Pipkin rode on your back with his eyes shut."
    ],
    choices: [{ t: "Cross the gorge", to: "c2_grove" }]
  },

  c2_grove: {
    art: "🫐",
    text: [
      "On the far side, the woods opened into a grove of low silver bushes, abundant and silent, and every bush was heavy with berries that glowed faintly blue.",
      "“Moonberries,” said Pipkin reverently. “My gran told me about these. They only grow where Moonwell light has fallen. If these are still glowing...”",
      "“...then the light hasn't been gone long,” you finished.",
      "There was an old wooden sign hammered into the ground, and on it, in careful painted letters:",
      "<em>“TAKE AN EVEN NUMBER. MORE THAN FOUR. LESS THAN EIGHT. THE GROVE IS WATCHING.”</em>"
    ],
    puzzle: {
      q: "How many moonberries should you pick?<br><br>An <strong>even</strong> number.<br><strong>More</strong> than four.<br><strong>Less</strong> than eight.",
      options: ["5", "6", "7", "8"],
      answer: 1,
      hint: "Only two numbers sit between four and eight without touching them: five, six and seven. Which one can be split into two equal halves?",
      right: "You picked six. Somewhere in the grove, something that had been holding its breath let it out.",
      wrong: "The bushes rustled. Not angry. Just... waiting. Have another think.",
      to: "c2_berries",
      math: true
    }
  },

  c2_berries: {
    art: "🌟",
    give: { treasures: ["t_moonberry"], cosmetics: ["horn_moon"] },
    text: [
      "You picked six moonberries and a ripple went through the whole grove, which sighed and settled the way a cat settles when it decides you're allowed to stay.",
      "You ate one. It tasted exactly like the smell of rain on hot stone, which is a taste you did not know could exist.",
      "And your horn — already glowing — flared bright as a lantern and stayed that way, radiant and marvelous, moonsilver from tip to root.",
      "“Whoa,” said Pipkin.",
      "“Whoa,” you agreed."
    ],
    choices: [{ t: "Go on, toward the light", to: "c2_door" }]
  },

  c2_door: {
    art: "🚪",
    text: [
      "Past the grove, the trees ended at an immense wall of stone that ran left and right further than you could see.",
      "Set into it was a door. Not a cave, not a gate — a proper door, carved with a five-pointed star and worn smooth in the middle where a hundred years of hands had pushed at it.",
      "There was a keyhole shaped like a star.",
      "And there was, twenty steps to the left, a very old, very dead tree leaning against the wall with branches like a ladder, beckoning in the wind."
    ],
    choices: [
      { t: "🗝️ Use the star key", to: "c2_door_open", req: { flag: "hasKey" } },
      { t: "🦁 Climb the dead tree instead", to: "c2_climb", trait: "brave" },
      { t: "👀 Search the ground for a key", to: "c2_search", req: { notFlag: "hasKey" }, trait: "curious" }
    ]
  },

  c2_search: {
    art: "🔎",
    give: { treasures: ["t_key"], flags: { hasKey: true } },
    text: [
      "You put your nose down and went along the wall slowly, breathing in the smell of cold stone and old moss.",
      "Bramblewick had said the key was in the Tangle. But a magpie had been carrying it around for years, and magpies drop things, and magpies are lazy, and the shiniest thing near a door is usually near the door.",
      "It took you four minutes. It was in a crack at the base of the wall, peculiarly well hidden under a hundred years of leaves.",
      "A small rusted key. Shaped like a star.",
      "“You are very good at this,” said Pipkin, who had been searching the same spot for four minutes and found a beetle."
    ],
    choices: [{ t: "Put it in the lock", to: "c2_door_open", trait: "clever" }]
  },

  c2_climb: {
    art: "🌳",
    give: { cosmetics: ["hoof_flame"] },
    text: [
      "The tree was dead, hollow, and about as sturdy as a stack of biscuits, and you climbed it anyway.",
      "Twice a branch cracked under you and you clambered on up out of pure momentum, refusing to plummet, which is a technique, though not a good one. Pipkin travelled inside your mane with his eyes shut and his opinions loud.",
      "You came over the top of the wall with your legs shaking and your heart going like a drum, and you looked down at what was on the other side, and you forgot completely about your legs.",
      "Your hooves, you noticed later, had gone warm as coals. That happens sometimes, to unicorns who climb things they shouldn't."
    ],
    choices: [{ t: "Look at what's on the other side", to: "c2_end" }]
  },

  c2_door_open: {
    art: "⭐",
    give: { cosmetics: ["wings_feather"] },
    text: [
      "The key went in like it had been waiting.",
      "You turned it, and one hundred years of rust gave up all at once, and the door swung inward onto a hush so large you felt it in your chest.",
      "Something soft brushed your shoulders as you stepped through — feathers, pale and warm, folding themselves against your sides as though they had always been there and had merely been away.",
      "“Um,” said Pipkin. “Um. You have wings.”",
      "“I know,” you said, in a voice about half your normal size.",
      "“Since <em>when</em>?”",
      "“Since about four seconds ago!” And that, you decided, was the single most extraordinary sentence you had ever said out loud."
    ],
    choices: [{ t: "Step through", to: "c2_end" }]
  },

  c2_end: {
    art: "🎈",
    endsChapter: "ch2",
    text: [
      "On the other side of the wall, the ground simply stopped.",
      "You were standing on the lip of the world — a cliff going down into a veil of white fog so thick and so still that it looked like you could walk on it.",
      "And rising out of that fog, held up by nothing at all, was a city.",
      "Not a big one. Perhaps forty buildings, crooked and colourful and stitched together with rope bridges, floating in the sky the way a leaf floats on a pond.",
      "Lanterns. Music. The distant, splendid, unmistakable racket of a market arguing with itself.",
      "Tied to a post at the cliff edge, bobbing gently, was an enormous dandelion seed with a basket underneath.",
      "A hand-painted sign read: <em>CLOUD MARKET — PULL ROPE, HOLD ON, GOOD LUCK.</em>",
      "<strong>— End of Chapter Two —</strong>"
    ],
    choices: [{ t: "☁️ Begin Chapter Three", to: "c3_arrive" }]
  }

  }
},

/* ============================================================
   CHAPTER THREE — THE CLOUD MARKET
   This chapter uses the hidden trait system: how she has been
   playing decides which paths open up.
   ============================================================ */
{
  id: "ch3",
  emoji: "☁️",
  title: "The Cloud Market",
  subtitle: "Forty crooked buildings, held up by nothing",
  requires: "ch2",
  startNode: "c3_arrive",
  nodes: {

  c3_arrive: {
    art: "🎈",
    text: [
      "You pulled the rope.",
      "The dandelion seed did not lift gently. It went <em>up</em> — straight up, fast, the way a cork comes out of a bottle. There was one horrible moment where you were certain you would plummet instead, and then you were soaring — and the cliff dropped away underneath you and the fog swallowed everything and for four whole seconds you were nowhere at all.",
      "Then you came out the top of the cloud into gold evening light, and the market was <em>right there</em>, and you laughed out loud because there was nothing else you could possibly do.",
      "The basket bumped a wooden platform. Someone in a striped apron caught the rope without looking and said, “Mind the gap, mind the gap, mind the gap,” in the bored voice of somebody who has said it nine thousand times."
    ],
    choices: [{ t: "Step off into the market", to: "c3_market" }]
  },

  c3_market: {
    art: "🏮",
    text: [
      "The Cloud Market was the loudest, brightest, most bustling place you had ever stood in.",
      "Rope bridges swung between crooked towers. Lanterns hung on wires in long bright chains. A brass band made entirely of frogs played something enthusiastic and slightly wrong. There were stalls selling weather, stalls selling echoes, one stall selling <em>tuesdays</em>, which you did not have time to ask about. Every merchant had an elaborate hat, and every hat was somehow taller than the last.",
      "Everything smelled like sugar and rain.",
      "Pipkin looked around at approximately four hundred things that could go wrong, and — to his own visible astonishment — grinned."
    ],
    choices: [{ t: "Wander in", to: "c3_magpie", trait: "curious" }]
  },

  c3_magpie: {
    art: "🐦‍⬛",
    text: [
      "You had taken perhaps nine steps when something black and white came out of the lanterns like a thrown knife.",
      "There was a snatch, a flurry, one indignant squawk from Pipkin — and the magpie, nimble as a thrown knife and twice as pleased with herself, was already twenty feet up, banking hard between two towers, with your Hush Bell glittering in her beak.",
      "The market did not stop. Nobody even looked up. Apparently this happened a lot.",
      "“That,” said the frog on the tuba, “was Vex. Sorry. She's got a whole hoard up in the clocktower. Nobody gets it back.”",
      "You looked up at the clocktower. It was very tall, very crooked, and leaning over a drop with no bottom."
    ],
    choices: [
      { t: "🦁 Climb after her across the rooftops", to: "c3_brave", req: { trait: "brave", min: 3 }, showLocked: true, lockedNote: "Only a truly brave unicorn would try this", trait: "brave" },
      { t: "🧠 Set a trap with something shinier", to: "c3_clever", req: { trait: "clever", min: 3 }, showLocked: true, lockedNote: "You'd need a sharper plan than that", trait: "clever" },
      { t: "💗 Go up and gently ask her why", to: "c3_kind", req: { trait: "kind", min: 3 }, showLocked: true, lockedNote: "Only a very kind heart would think to ask", trait: "kind" },
      { t: "🙋 Ask the market keeper for help", to: "c3_help" }
    ]
  },

  c3_brave: {
    art: "🏃",
    give: { cosmetics: ["wings_dusk", "hoof_gold"], treasures: ["t_marble"], badges: ["b_brave3"] },
    text: [
      "You went up the outside of the tower.",
      "Not the stairs — there weren't any. You went up crates, then a shutter, then a washing line that held for exactly long enough, and then you were on the rooftops of a city floating in the sky with nothing underneath you but weather.",
      "You did not look down. You had a strong feeling that looking down was a thing you could do later, on the ground, at length, possibly while lying flat. Courage, you were learning, is mostly about deciding what to look at.",
      "Vex saw you coming and her eyes went wide. Nobody had ever come after her. She dropped the Hush Bell in pure surprise and you caught it out of the air with your teeth, and skidded, and stopped, with two hooves over the edge, clutching it in your teeth and your heart going like a bird.",
      "In the gutter beside you sat a small glass marble with a storm inside it. You took that too. You had earned it."
    ],
    choices: [{ t: "Climb down very, very carefully", to: "c3_recovered" }]
  },

  c3_clever: {
    art: "🪤",
    give: { cosmetics: ["horn_crystal", "aura_bubble"], treasures: ["t_lens"], badges: ["b_clever3"] },
    text: [
      "You didn't chase her. Chasing a magpie is a game <em>she</em> wins.",
      "Instead you bought a cracked mirror from a stall for one troll coin, propped it in the middle of the square where the lantern light hit it, and laid your silver feather in front of it so that it flashed every time the wind moved.",
      "Then you sat down. Pipkin sat down. You both looked in completely the other direction.",
      "It took eleven seconds.",
      "Vex came down like a stone, grabbed the feather, saw herself in the mirror, and had the single most confusing moment of her entire life. While she was busy being outraged at her own reflection, you picked the Hush Bell out of the pile she'd dropped.",
      "“That,” said the tuba frog, “was the best thing I have seen all year.” You permitted yourself one small, triumphant grin. It was, after all, an excellent piece of mischief."
    ],
    choices: [{ t: "Take a small bow", to: "c3_recovered" }]
  },

  c3_kind: {
    art: "🪺",
    give: { cosmetics: ["neck_pearl", "aura_petal", "mane_star"], treasures: ["t_charm", "t_marble"], badges: ["b_kind3", "b_allpaths"] },
    text: [
      "You climbed the tower stairs slowly, so she could hear you coming, and stopped a long way back.",
      "“I'm not here to take anything,” you said. “I just wanted to ask why.”",
      "Vex went very still.",
      "The clocktower nest was not a hoard. It was a <em>nest</em> — packed with a hundred bright, useless, shining things, all of them arranged in a careful ring around three small, fragile, speckled eggs.",
      "“It's cold up here,” said the magpie. Her voice was rougher than you expected. “Shiny things hold the lantern light. Keeps them warm till they hatch. I know it's stealing. I know. I'll bring it all back after. Nobody ever believes that.”",
      "You looked at the eggs. You looked at the Hush Bell, silver and bright and warm in the lantern glow, right at the centre of the ring.",
      "“Keep it,” you said. “Till they hatch.”",
      "Vex did not say anything for a long moment. Then she pushed something across the floor to you with her beak: a small ring, worn smooth, older than the tower.",
      "“Not stolen,” she said. “Given. There's a difference and I know it.” There was so much gratitude in her rough little voice, and so much of it was sincere, that you had to look at the floor for a second."
    ],
    choices: [{ t: "Go back down the stairs", to: "c3_recovered" }]
  },

  c3_help: {
    art: "🧵",
    give: { cosmetics: ["neck_scarf"], treasures: ["t_cloudpuff"] },
    text: [
      "You found the market keeper — the one in the striped apron — and told her what had happened.",
      "She sighed the sigh of a woman who has had this conversation many times, went slightly flustered looking for her glasses, and then produced a long pole with a net on the end.",
      "“Vex,” she bellowed at the clocktower, in a voice that rattled the lanterns. “<em>Vex.</em> You give that back or I am telling your mother.”",
      "There was a pause. Then something small and silver came sailing down out of the tower and landed neatly in the net, followed by a squawk that was almost certainly a rude word in Magpie.",
      "“There you go, duck,” said the keeper, handing back your Hush Bell along with a bottled cloud and a knitted scarf. “Cold up here at night. Take the scarf. And don't leave anything shiny in your pockets.”"
    ],
    choices: [{ t: "Thank her", to: "c3_recovered", trait: "kind" }]
  },

  c3_recovered: {
    art: "🔔",
    text: [
      "You got the Hush Bell back — one way or another — and the market went on being loud and bright around you as though nothing had happened at all.",
      "Pipkin, who had spent the whole event hiding inside your mane, emerged and announced that he had been “supervising.”",
      "Now that your heart had stopped hammering, you could linger a moment — smell the food, hear the frogs, and see the stalls properly.",
      "You had a little time. And you had, in your pack, a small pile of extremely strange things that a market might be interested in."
    ],
    choices: [
      { t: "🎀 Visit the Skyweaver's stall", to: "c3_ribbon", req: { notFlag: "sawRibbon" } },
      { t: "🔍 Visit the stall with the crooked glass", to: "c3_glass", req: { notFlag: "sawGlass" } },
      { t: "🐢 Talk to the enormous turtle by the edge", to: "c3_turtle" }
    ]
  },

  c3_ribbon: {
    art: "🎀",
    text: [
      "The Skyweaver's stall had no cloth on it. It had <em>wind</em> on it — long ribbons of moving air, woven so tight you could pick them up, in every colour a sky has ever been.",
      "The weaver was a tall, willowy merchant with very long fingers and a distracted expression, and she did not look like somebody who enjoyed being made to haggle.",
      "“Twelve buttons for two,” she said, without looking up. “I only sell in pairs. It's a whole thing.”",
      "You had enough for one.",
      "“So how much is <em>one</em>?” you asked.",
      "She looked up, then, and smiled a small, sharp, interested smile. “You tell me, and I'll sell you one.”"
    ],
    puzzle: {
      q: "Two ribbons cost <strong>12 buttons</strong>.<br>Both ribbons cost the same.<br><br>How much is <strong>one</strong> ribbon?",
      options: ["4 buttons", "6 buttons", "8 buttons", "10 buttons"],
      answer: 1,
      hint: "Split 12 into two equal piles. How many in each pile?",
      right: "“Six,” said the Skyweaver. “Well done. Most people say ten and hope I'm bad at sums.”",
      wrong: "The Skyweaver went back to her weaving, entirely unbothered. “Have another go, love.”",
      to: "c3_ribbon_got",
      math: true
    }
  },

  c3_ribbon_got: {
    art: "🌈",
    give: { treasures: ["t_ribbon"], cosmetics: ["mane_rainbow"], flags: { sawRibbon: true } },
    text: [
      "She cut you a length of sky and tied it into your mane herself, humming. It was, both of you agreed, a very good bargain.",
      "“Woven from real wind,” she said. “It gets bored. If you leave it alone too long it ties itself into bows. Nothing you can do about it.”",
      "And as she tied it, every colour in the ribbon ran down through your mane like water finding a slope, and stayed there.",
      "You looked at your reflection in the brass of the frog's tuba, which is not a good mirror but is an honest one.",
      "You had a rainbow now. That seemed correct."
    ],
    choices: [{ t: "Back to the market", to: "c3_recovered" }]
  },

  c3_glass: {
    art: "🔍",
    text: [
      "This stall sold one thing: small round lenses in wire frames, each one hanging from a string, each one very slightly purple.",
      "The stallholder was a mole in sunglasses, which raised several questions.",
      "“Truthglass,” he said. “Hold it up and it will reveal a lie in about a second. Look through it and the lie goes purple. Very useful in a market. Very unpopular in a market. I've been moved on four times.”",
      "“How much?”",
      "“No money. I trade for riddles, and I've heard them all, so it'll have to be one I can't do.” He grinned. “But first — mine. If you get mine, you get one free.”"
    ],
    puzzle: {
      q: "“The more you take away from me,<br>the <strong>bigger</strong> I get.<br><br>What am I?”",
      options: ["A shadow", "A hole", "A secret", "A mountain"],
      answer: 1,
      hint: "Think about digging. What happens to it every time you take a shovelful away?",
      right: "The mole pondered you for a long moment, then took off his sunglasses. He had, it turned out, very kind eyes and no idea where to look with them.",
      wrong: "“Nope,” said the mole, delighted. “Take your time. I've got all evening and no customers.”",
      to: "c3_glass_got"
    }
  },

  c3_glass_got: {
    art: "🟣",
    give: { treasures: ["t_lens", "t_map"], cosmetics: ["head_star"], badges: ["b_riddle"], flags: { sawGlass: true } },
    text: [
      "“Forty years,” said the mole, handing you a truthglass on a string, “and a <em>foal</em> gets it in one.”",
      "He rummaged and pushed something else across the counter: half a map, torn straight down the middle, showing a mountain and a well and a road that ran off the ripped edge into nothing.",
      "“Take this too. Came off a fellow last winter who was in a hurry. The important half's missing, obviously. It always is.”",
      "You looked at the mountain drawn on it.",
      "Mount Moonwell.",
      "Then you held the truthglass up and looked at the map through it, and nothing went purple at all. Every word on it was true."
    ],
    choices: [{ t: "Back to the market", to: "c3_recovered" }]
  },

  c3_turtle: {
    art: "🐢",
    give: { treasures: ["t_compass"], flags: { knowsMoonstone: true } },
    text: [
      "At the edge of the market, where the boards ran out and the sky began, sat a turtle the size of a garden shed.",
      "She was not selling anything. She was simply sitting, ancient and unhurried and just a little wistful, facing the dark shape of Mount Moonwell on the horizon, the way people sit facing the sea.",
      "“You've come about the light,” she said.",
      "“How did you—”",
      "“Everyone who comes to the edge has come about the light.” She blinked, very slowly, with about four hundred years of wisdom behind it. “The Moonwell didn't go out, little one. Wells don't go out. Somebody took the <em>Moonstone</em>. And when the stone came out, the light stopped running downhill — out of the well, into the rivers, into the grass, into you.”",
      "She turned her enormous head. “Your horn woke up the same morning it stopped, didn't it.”",
      "You had not thought about that. Now you couldn't stop thinking about it.",
      "“That,” said the turtle, “is not a coincidence. That is an <em>appointment</em>.”"
    ],
    choices: [
      { t: "👀 “Who took it?”", to: "c3_who", trait: "curious" },
      { t: "🦁 “Then I'll put it back.”", to: "c3_who", trait: "brave" }
    ]
  },

  c3_who: {
    art: "🧭",
    text: [
      "The turtle didn't answer straight away. The turtle was wary of the question, and seldom answered it. Then she reached under her own shell — which took some doing — and brought out a small brass compass, green with age.",
      "“Nobody knows who,” she said. “But this knows <em>where</em>. It's a Wandering Compass. It doesn't point north. It points at whatever you miss most.”",
      "She set it down. The needle spun, wobbled, and swung round to point at the black mountain.",
      "“Well now,” said the turtle. “Isn't that something. You've never even been there.”",
      "“I've never even been there,” you agreed.",
      "“And you miss it anyway.” She settled back down. “Go on, then, appointment. Don't be late.”"
    ],
    choices: [{ t: "Look at the mountain", to: "c3_end" }]
  },

  c3_end: {
    art: "🌑",
    endsChapter: "ch3",
    text: [
      "You stood at the edge of a city in the sky with a hedgehog on your shoulder, and you looked north.",
      "The lanterns behind you were warm and gold, and beyond them the sky was vast and going purple at the edges. The frogs had started something with a drum in it. Somebody was laughing two bridges over.",
      "And then every lantern in the market dimmed at once.",
      "Not blown out. <em>Dimmed</em> — all four hundred of them, together, like a held breath.",
      "Something enormous went across the face of the moon. It had no shape you could name. It made no sound at all. It was travelling north, toward the mountain, faster than anything that size has any right to move.",
      "The frogs stopped playing. Four hundred lanterns quivered, and the whole grim shape of the evening changed.",
      "In the silence, small and clear and quite close by, your Hush Bell rang — and a Hush Bell has no clapper, and a Hush Bell cannot ring, and every single creature in the Cloud Market turned to look at you.",
      "<strong>— End of Chapter Three —</strong>"
    ],
    choices: [{ t: "🌙 What happens next...", to: "c3_tobecontinued" }]
  },

  c3_tobecontinued: {
    art: "🦄",
    text: [
      "<strong>To be continued.</strong>",
      "Chapter Four — <em>The Long Road North</em> — is still being written.",
      "In the meantime: you can visit the <strong>Stable</strong> to dress up your unicorn with everything you've earned, check your <strong>Treasures</strong>, count your <strong>Word Chest</strong>, and look at your <strong>Badges</strong>.",
      "And if you want to know what would have happened if you'd chosen differently — you can go back and find out. There are paths in these three chapters that you haven't seen yet.",
      "There's a whole different way through the Whispering Woods. And there are three ways to deal with a magpie."
    ],
    choices: [
      { t: "🎠 Go to the Stable", to: "c3_tobecontinued", goStable: true },
      { t: "🗺️ Back to the chapter map", to: "c3_tobecontinued", goMap: true }
    ]
  }

  }
}

  ]
};
