/* ============================================================
   THE WORD CHEST
   Every word listed here becomes tappable anywhere it appears
   in the story. Tapping shows the kid-friendly definition.
   Words are collected automatically as she reads them.

   TO ADD A WORD: copy a line and change it. That's it.
   ============================================================ */

const WORDS = {
  "ancient":      "So old it was around long, long before anyone alive today.",
  "anxious":      "Worried and jumpy about something that might happen.",
  "bargain":      "A deal where two people trade and both feel happy.",
  "bewildered":   "So confused you don't know which way to look.",
  "brambles":     "Thick, thorny bushes that grab at you when you pass.",
  "brilliant":    "So bright it almost hurts to look at. Or: very, very smart.",
  "bustling":     "Busy and noisy, with people hurrying everywhere.",
  "cascade":      "Water tumbling down in a rush, like a small waterfall.",
  "cautious":     "Careful, because something might go wrong.",
  "cavern":       "A huge cave, big enough to shout inside.",
  "clamber":      "To climb with your hands and feet, a bit clumsily.",
  "colossal":     "Gigantic. Bigger than big.",
  "courage":      "Doing the brave thing even while your heart is pounding.",
  "crestfallen":  "Sad and droopy because something you hoped for didn't happen.",
  "curious":      "Wanting very badly to find out.",
  "dazzling":     "So sparkly and bright it makes you blink.",
  "delicate":     "So fine and thin it might break if you're not gentle.",
  "determined":   "Deciding to do something and refusing to quit.",
  "dignified":    "Calm and proud, in a way people respect.",
  "drowsy":       "Sleepy. Eyes-getting-heavy sleepy.",
  "eager":        "Excited and ready, right now, please.",
  "echo":         "A sound that bounces back to you from far away.",
  "elaborate":    "Fancy and full of tiny details.",
  "enormous":     "Very, very big.",
  "extraordinary":"Not ordinary at all. Amazing and rare.",
  "fragile":      "Easy to break. Handle it softly.",
  "furious":      "Extremely angry.",
  "generous":     "Happy to share, even when you don't have to.",
  "glimpse":      "A quick peek, gone before you're ready.",
  "gloomy":       "Dark and a little sad.",
  "gnarled":      "Twisted and lumpy, like the old branch of a tree.",
  "gratitude":    "The warm feeling of being thankful.",
  "haggle":       "To argue politely about a price until you agree.",
  "hesitate":     "To pause because you're not sure yet.",
  "hollow":       "Empty inside. Or: a low, sheltered dip in the land.",
  "jagged":       "Sharp and uneven, like a broken piece of rock.",
  "luminous":     "Glowing with its own soft light.",
  "magnificent":  "So grand and beautiful you stop and stare.",
  "marvelous":    "Wonderful in a way that surprises you.",
  "meadow":       "A wide field of grass and wildflowers.",
  "merchant":     "Someone whose job is buying and selling things.",
  "mischief":     "Playful trouble. Not mean — just cheeky.",
  "murmur":       "To talk in a low, soft rumble.",
  "mysterious":   "Full of secrets nobody has figured out yet.",
  "nimble":       "Quick and light on your feet.",
  "ordinary":     "Normal. Nothing special about it.",
  "peculiar":     "Odd in a way you can't quite explain.",
  "peer":         "To look hard at something that's difficult to see.",
  "plummet":      "To fall very fast, straight down.",
  "precious":     "So valuable you'd never want to lose it.",
  "quiver":       "To shake in tiny, fast little shivers.",
  "reluctant":    "Doing something even though you'd rather not.",
  "reveal":       "To show something that was hidden.",
  "rickety":      "Wobbly and creaky, like it might fall apart.",
  "ripple":       "A tiny wave spreading out in a circle.",
  "scowl":        "A frowning, grumpy face.",
  "sincere":      "Honest, and really meaning what you say.",
  "shimmering":   "Shining with a light that wiggles and moves.",
  "soaring":      "Flying high without flapping, riding the wind.",
  "splendid":     "Excellent and beautiful at the same time.",
  "stubborn":     "Refusing to change your mind, no matter what.",
  "sturdy":       "Strong and solid. It won't tip over.",
  "summit":       "The very top of a mountain.",
  "tangle":       "A messy knot of things twisted together.",
  "thicket":      "A crowd of bushes and small trees growing close.",
  "timid":        "Shy and easily scared.",
  "treacherous":  "Dangerous in a sneaky way that hides the danger.",
  "tremble":      "To shake, usually because you're cold or scared.",
  "triumphant":   "Full of joy because you finally did it.",
  "twilight":     "The soft blue time after sunset, before real dark.",
  "vanish":       "To disappear completely, all at once.",
  "veil":         "A thin cloth or mist that covers and softens things.",
  "wander":       "To walk with no particular place to be.",
  "weary":        "Tired all the way down to your bones.",
  "wisdom":       "Knowing not just facts, but what to do with them.",
  "wistful":      "A gentle kind of sad, wishing for something lovely.",
  "woven":        "Made by crossing threads over and under each other.",
  "grim":         "Serious and unsmiling, like bad news is coming.",
  "hoard":        "A secret pile of treasure someone is guarding.",
  "flustered":    "Rattled and mixed up, so you fumble your words.",
  "ponder":       "To think about something slowly and carefully.",
  "radiant":      "Glowing with happiness or light.",
  "solemn":       "Very serious, in a quiet and important way.",
  "tremendous":   "Huge, and impressive because of it.",
  "vast":         "So wide you can't see the far side of it.",
  "willowy":      "Tall, thin, and bending gracefully.",
  "abundant":     "There's plenty. More than enough.",
  "beckon":       "To wave someone toward you without speaking.",
  "clutch":       "To hold onto something very tightly.",
  "drifted":      "Floated slowly along, going wherever the wind went.",
  "gleaming":     "Polished and shining.",
  "immense":      "Enormous beyond measuring.",
  "linger":       "To stay a little longer than you have to.",
  "peculiarly":   "In a strange, hard-to-explain way.",
  "scurry":       "To run in quick little steps, like a mouse.",
  "seldom":       "Almost never.",
  "wary":         "Watchful, because you don't quite trust it yet."
};

/* ------------------------------------------------------------
   Matches word endings, so "vanished", "vanishing" and "vanishes"
   all count as the word "vanish". Returns the chest word, or null.
   ------------------------------------------------------------ */
function wordKey(raw) {
  const w = String(raw).toLowerCase();
  if (WORDS[w]) return w;
  const t = [];
  if (w.endsWith("ies"))  t.push(w.slice(0, -3) + "y");
  if (w.endsWith("es"))   t.push(w.slice(0, -2));
  if (w.endsWith("s"))    t.push(w.slice(0, -1));
  if (w.endsWith("ed"))   { t.push(w.slice(0, -2), w.slice(0, -1)); if (/(.)\1ed$/.test(w)) t.push(w.slice(0, -3)); }
  if (w.endsWith("ied"))  t.push(w.slice(0, -3) + "y");
  if (w.endsWith("ing"))  { t.push(w.slice(0, -3), w.slice(0, -3) + "e"); if (/(.)\1ing$/.test(w)) t.push(w.slice(0, -4)); }
  if (w.endsWith("ily"))  t.push(w.slice(0, -3) + "y");
  if (w.endsWith("ly"))   t.push(w.slice(0, -2));
  if (w.endsWith("er"))   { t.push(w.slice(0, -2), w.slice(0, -1)); }
  for (let i = 0; i < t.length; i++) if (WORDS[t[i]]) return t[i];
  return null;
}
