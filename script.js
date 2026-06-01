const form = document.querySelector("#generator-form");
const copyButtons = document.querySelectorAll(".copy-button[data-copy]");

const resultElements = {
  caption: document.querySelector("#caption"),
  prayer: document.querySelector("#prayer"),
  devotional: document.querySelector("#devotional"),
  imagePrompt: document.querySelector("#imagePrompt"),
  hashtags: document.querySelector("#hashtags"),
};

const platformSizes = {
  "Facebook feed 1080x1350": "Facebook feed, vertical 4:5, 1080x1350",
  "Square 1080x1080": "square post, 1:1, 1080x1080",
  "Reels 1080x1920": "vertical Reels/Stories format, 9:16, 1080x1920",
  "Pinterest 1000x1500": "Pinterest pin, 2:3, 1000x1500",
};

const topicDetails = {
  anxiety: {
    caption: "When my mind starts racing, I let prayer take the wheel.",
    prayerFocus: "quiet every racing thought and steady every anxious breath",
    devotional: "Anxiety can make a normal day feel heavier than it really is, but peace does not have to wait until everything is solved.",
    scene: "a peaceful devotional moment with soft morning light, a Bible, tea, flowers, and a calm comforting mood",
    tags: ["AnxietyPrayer", "PeaceInJesus"],
  },
  grief: {
    caption: "Some days healing looks like whispering, 'Lord, carry this part too.'",
    prayerFocus: "comfort the places that still ache and bring tender reminders of Your nearness",
    devotional: "Grief moves at its own pace, and God is not impatient with the heart that needs time.",
    scene: "a tender quiet scene with roses, a journal, warm window light, and a peaceful remembrance feeling",
    tags: ["GriefSupport", "GodComforts"],
  },
  hope: {
    caption: "Hope is still allowed to bloom here.",
    prayerFocus: "renew hope where disappointment has been loud",
    devotional: "Hope is not pretending life is easy; it is trusting that God is still writing goodness into the story.",
    scene: "pink roses blooming after rain with golden light and an uplifting faith-filled atmosphere",
    tags: ["HopeInGod", "FaithOverFear"],
  },
  motherhood: {
    caption: "Motherhood: running on grace, prayer, and one reheated cup of coffee.",
    prayerFocus: "strengthen tired mothers with patience, wisdom, and holy joy",
    devotional: "Motherhood asks for a lot, but grace meets women in both the beautiful moments and the messy ones.",
    scene: "a cozy kitchen table with coffee, wildflowers, children's drawings, and soft morning light",
    tags: ["MotherhoodPrayer", "GraceForMoms"],
  },
  healing: {
    caption: "Healing is still holy, even when it is slow.",
    prayerFocus: "restore what has been wounded and make room for peace again",
    devotional: "Healing often begins quietly, with one honest prayer and one brave step toward wholeness.",
    scene: "hands holding flowers, a peaceful garden path, warm sunlight, and a gentle restoration feeling",
    tags: ["HealingPrayer", "Restoration"],
  },
  "morning prayer": {
    caption: "Starting the day with Jesus before the group chat gets loud.",
    prayerFocus: "cover this morning with clarity, favor, and a peaceful spirit",
    devotional: "A morning prayer can set the tone before the world starts making demands.",
    scene: "a bright sunlit devotional desk with an open Bible, soft pink flowers, and fresh morning light",
    tags: ["MorningPrayer", "StartWithGod"],
  },
  "good night prayer": {
    caption: "Tonight, I am clocking out and letting God be God.",
    prayerFocus: "bring restful sleep and release every burden from today",
    devotional: "Night is a sacred invitation to stop carrying what was never meant to stay in your hands.",
    scene: "a peaceful nightstand with candle glow, closed journal, moonlight, and restful pastel tones",
    tags: ["GoodNightPrayer", "RestInGod"],
  },
  emotions: {
    caption: "Big feelings, bigger God.",
    prayerFocus: "help every feeling find its way back to truth and peace",
    devotional: "Emotions are signals, not shame. God can meet you in every honest feeling and guide it gently.",
    scene: "soft watercolor hearts, expressive faith artwork, gentle roses, lavender, and warm cream textures",
    tags: ["EmotionalWellness", "FaithAndFeelings"],
  },
  "life situations": {
    caption: "This season may be confusing, but God is not.",
    prayerFocus: "give wisdom for this situation and courage for the next right step",
    devotional: "Life can shift quickly, but God's character stays steady when circumstances do not.",
    scene: "an open road with wildflowers, sunrise sky, and a hopeful next-step feeling",
    tags: ["LifeWithGod", "DailyPrayer"],
  },
  seasons: {
    caption: "New season, same faithful God.",
    prayerFocus: "help this season produce growth, peace, and trust",
    devotional: "Every season has something to teach, even the ones you would not have chosen.",
    scene: "seasonal flowers, soft natural light, and a fresh faith-filled transition mood",
    tags: ["NewSeason", "FaithJourney"],
  },
  humor: {
    caption: "Me: I have a plan. God: That is adorable.",
    prayerFocus: "keep joy alive while teaching me to surrender my plans",
    devotional: "Holy joy has a way of softening the hard edges of real life without denying the truth of it.",
    scene: "playful pastel sticky notes, coffee, a Bible, and a cheerful relatable Christian humor mood",
    tags: ["ChristianHumor", "FaithLaughs"],
  },
  "spiritual growth": {
    caption: "Growth is not always glamorous, but it is always worth it.",
    prayerFocus: "deepen my faith, mature my heart, and teach me Your ways",
    devotional: "Spiritual growth often happens in hidden places where obedience becomes stronger than comfort.",
    scene: "a seedling growing beside an open Bible, soft garden light, and refined faith-based beauty",
    tags: ["SpiritualGrowth", "GrowInFaith"],
  },
  "women's struggles": {
    caption: "She is tired, healing, praying, and still becoming.",
    prayerFocus: "strengthen women who feel unseen, stretched thin, or emotionally worn down",
    devotional: "God sees the private battles women carry and meets them with dignity, courage, and care.",
    scene: "a woman journaling by a window with roses, warm tea, and a dignified encouraging atmosphere",
    tags: ["WomenOfFaith", "EncouragementForWomen"],
  },
  encouragement: {
    caption: "You are not behind. You are being held.",
    prayerFocus: "lift discouraged hearts and remind them they are not alone",
    devotional: "Encouragement can be a small light, but small lights still help people find their way.",
    scene: "a handwritten note beside pink flowers, warm cream background, and a comforting Pinterest-ready feeling",
    tags: ["Encouragement", "ChristianEncouragement"],
  },
  "viral relatable topics": {
    caption: "Trying to be peaceful, productive, hydrated, healed, and holy all before noon.",
    prayerFocus: "bring grace into the everyday moments that feel overwhelming or funny",
    devotional: "Relatable moments can become little doorways into truth when they remind people they are not alone.",
    scene: "a modern pastel faith lifestyle scene with coffee, phone, Bible, and funny relatable energy",
    tags: ["RelatableFaith", "ViralChristianContent"],
  },
};

const captionIdeas = {
  anxiety: [
    "letting prayer lead when my thoughts get loud",
    "choosing peace before panic gets the microphone",
    "handing the racing thoughts back to Jesus",
    "taking one holy breath at a time",
    "remembering calm is still possible here",
    "letting God be bigger than the spiral",
  ],
  grief: [
    "letting God hold the part that still hurts",
    "healing softly without rushing the ache",
    "missing them and trusting God in the same breath",
    "finding comfort in small mercies",
    "letting tears become prayers",
    "being carried through the tender places",
  ],
  hope: [
    "watching hope bloom again",
    "believing this story still has light",
    "trusting God with the next chapter",
    "letting faith rise after disappointment",
    "looking for grace in the middle",
    "holding onto holy possibility",
  ],
  motherhood: [
    "running on grace and reheated coffee",
    "mothering with prayer in the messy middle",
    "finding Jesus between snacks and laundry",
    "needing patience, wisdom, and a quiet minute",
    "being held while holding everyone else",
    "letting grace cover the unfinished list",
  ],
  healing: [
    "letting healing be slow and sacred",
    "becoming whole one prayer at a time",
    "trusting God with the tender work",
    "making peace with progress that takes time",
    "letting restoration start quietly",
    "choosing softness after survival",
  ],
  "morning prayer": [
    "starting the day with Jesus first",
    "giving God the morning before the noise",
    "covering the day in prayer and grace",
    "choosing peace before the calendar starts",
    "asking for wisdom before the coffee cools",
    "letting the first thought be faith",
  ],
  "good night prayer": [
    "letting God carry what I cannot fix tonight",
    "closing the day with peace instead of pressure",
    "resting because God is still awake",
    "putting the worries down before bed",
    "ending the day in grace",
    "sleeping under mercy, not overthinking",
  ],
  emotions: [
    "bringing the big feelings to a bigger God",
    "letting emotions meet truth gently",
    "feeling deeply without losing faith",
    "making room for honesty and peace",
    "letting God sort the heart noise",
    "giving every feeling somewhere holy to land",
  ],
  "life situations": [
    "trusting God in the part I did not plan",
    "taking the next right step with grace",
    "letting faith steady the unknown",
    "remembering God is not confused by this",
    "finding peace in the middle of real life",
    "choosing wisdom over worry",
  ],
  seasons: [
    "entering a new season with the same faithful God",
    "letting this season grow something good",
    "trusting the timing of what is blooming",
    "learning grace in the season I am in",
    "making peace with change",
    "believing every season can still be holy",
  ],
  humor: [
    "making plans while God lovingly supervises",
    "trying to be holy before the coffee works",
    "praying first because my attitude has notes",
    "letting Jesus handle the plot twist",
    "being sanctified one minor inconvenience at a time",
    "choosing grace with a side of dramatic sigh",
  ],
  "spiritual growth": [
    "growing even when it is not glamorous",
    "letting God mature what comfort cannot",
    "choosing obedience over old patterns",
    "becoming rooted instead of rushed",
    "learning faith in hidden places",
    "letting growth be quiet but real",
  ],
  "women's struggles": [
    "being tired, healing, praying, and still becoming",
    "letting God see what everyone else misses",
    "carrying less shame and more grace",
    "standing strong with a soft heart",
    "being held through the private battles",
    "finding courage in the unseen places",
  ],
  encouragement: [
    "remembering I am not behind, I am being held",
    "taking heart because God is still near",
    "letting one small truth light the way",
    "choosing courage for the next step",
    "receiving grace for this exact day",
    "believing there is still good ahead",
  ],
  "viral relatable topics": [
    "trying to be peaceful, hydrated, healed, and holy",
    "needing grace before noon",
    "balancing faith, feelings, and fifty tabs open",
    "being a work in progress with a full schedule",
    "praying through the plot twists",
    "trying to act delivered in public",
  ],
};

const toneLines = {
  sweet: "gentle, tender, warm, and comforting",
  funny: "lighthearted, witty, warm, and relatable",
  inspirational: "uplifting, polished, hope-filled, and emotionally moving",
  "sassy but Godly": "bold, witty, expressive, faith-filled, and never harsh",
};

const toneCaptionFormats = {
  sweet: [
    (idea) => `Today I am ${idea}.`,
    (idea) => `A gentle reminder: there is grace for ${idea}.`,
    (idea) => `Soft hearts can still be strong while they are ${idea}.`,
    (idea) => `God is near while I am ${idea}.`,
  ],
  funny: [
    (idea) => `Me, currently ${idea}, but making it prayerful.`,
    (idea) => `Today's agenda: ${idea}, preferably with coffee.`,
    (idea) => `Trying my best at ${idea}, and yes, Jesus is invited.`,
    (idea) => `If you see me ${idea}, mind your business and pray for me.`,
  ],
  inspirational: [
    (idea) => `This is your reminder: ${idea} is still a holy step forward.`,
    (idea) => `Keep going. God can meet you while you are ${idea}.`,
    (idea) => `Faith grows in moments like this: ${idea}.`,
    (idea) => `Do not give up. There is purpose in ${idea}.`,
  ],
  "sassy but Godly": [
    (idea) => `I am ${idea}, and the enemy can take several seats.`,
    (idea) => `Plot twist: ${idea}, but God still gets the final word.`,
    (idea) => `Currently ${idea}, but doing it covered in grace.`,
    (idea) => `I said what I said: ${idea}, with prayer and boundaries.`,
  ],
};

const usedCaptionsByTopicTone = {};

const brandRules = {
  "Rosy Minds": `Create a soft, attractive animated/illustrated woman named Grace. She is approximately 45 years old, warm and encouraging, attractive but modest, and always wearing a visible cross necklace. Give Grace a fresh pose, expression, outfit, and setting. The artwork should feel comforting, feminine, faith-centered, and professionally illustrated.`,
  "Rosy Revelation": `Create an elderly Holy Grandma character. She is attractive, comical, expressive, stylish but slightly frumpy, wise, sassy, and Godly. Use an animated/illustrated style with a fresh pose, facial expression, outfit, and seasonal background. Avoid making her look nearly identical to previous Holy Grandma images.`,
  "Rosy Faith Chatter": `Create a complete discussion-style faith image. Use beautiful scenery or a faith-inspired setting such as a lake, mountain, sunrise, sunset, church, nature scene, cross, or peaceful outdoor place. Include the main caption, a short commentary section, and a heartfelt engaging question that encourages comments and discussion.`,
  "Rosy's Blank Canvas": `Create artwork that looks painted directly on canvas. Use thick painted brush strokes, textured canvas backgrounds, artistic paint effects, hand-painted typography, and creative paint textures. The finished image should feel like original Christian wall art transformed into a social post.`,
};

const sharedHashtags = [
  "RosyMinds",
  "PrayerPost",
  "FaithBasedContent",
  "PinterestInspiration",
  "FacebookPrayer",
  "ChristianWomen",
  "DailyDevotional",
  "GodIsNear",
];

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildHashtags(topic, details) {
  const cleanedTopic = topic.replace(/[^a-zA-Z0-9 ]/g, "");
  const topicTag = titleCase(cleanedTopic).replace(/\s/g, "");
  const allTags = [...details.tags, topicTag, ...sharedHashtags];
  return allTags.slice(0, 10).map((tag) => `#${tag}`).join(" ");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildCaptionCandidates(topic, tone) {
  const ideas = captionIdeas[topic] || [topicDetails[topic].caption];
  const formats = toneCaptionFormats[tone] || toneCaptionFormats.sweet;

  return ideas.flatMap((idea) => formats.map((format) => format(idea)));
}

function getUniqueCaption(topic, tone) {
  const key = `${topic}-${tone}`;
  const candidates = buildCaptionCandidates(topic, tone);
  const used = usedCaptionsByTopicTone[key] || [];
  let available = candidates.filter((caption) => !used.includes(caption));

  if (available.length === 0) {
    const lastCaption = used[used.length - 1];
    usedCaptionsByTopicTone[key] = lastCaption ? [lastCaption] : [];
    available = candidates.filter((caption) => caption !== lastCaption);
  }

  const caption = shuffle(available)[0] || shuffle(candidates)[0];
  usedCaptionsByTopicTone[key] = [...(usedCaptionsByTopicTone[key] || []), caption];

  return caption;
}

function getSeasonInfo(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 12) return "Christmas / winter season";
  if (month === 2 && day <= 16) return "Valentine season";
  if (month === 5 && day <= 15) return "Mother's Day season";
  if (month === 5 && day >= 24) return "late spring / Memorial Day weekend season";
  if (month >= 3 && month <= 5) return "spring season";
  if (month >= 6 && month <= 8) return "summer season";
  if (month >= 9 && month <= 11) return month === 11 ? "fall / Thanksgiving season" : "fall season";
  return "winter season";
}

function buildChatGptImagePrompt({ topic, tone, brand, platformSize, caption }) {
  const details = topicDetails[topic];
  const season = getSeasonInfo();
  const size = platformSizes[platformSize];

  return `Create one polished, finished social media image.

Platform and size:
- ${size}

Brand:
- ${brand}

Topic:
- ${topic}

Tone:
- ${toneLines[tone]}

Main caption to place on the image:
"${caption}"

Caption uniqueness instruction:
- This caption was selected as a fresh variation for the chosen topic and tone.
- If ChatGPT rewrites or improves the wording, create a completely new caption with different wording, angle, emotional hook, and tone.
- Do not reuse the same caption structure from a previous image.

Visual direction:
- ${details.scene}
- Make the artwork seasonal and holiday-aware for ${season}.
- Use soft pink, cream, lavender, and tasteful gold accents unless the chosen season calls for a slightly different coordinated palette.
- Vary the composition, background, camera angle, pose, clothing, season, holiday details, and color palette so the image does not look repetitive.

Brand image rules:
${brandRules[brand]}

Caption typography rules:
- Put the main caption directly on the image.
- Use playful hand lettering, mixed font hierarchy, bold colorful keywords, swooping underline accents, and dimensional lettering integrated into the artwork.
- The words should look professionally designed, not like plain text placed on top.
- Keep the caption readable on mobile.
- Do not cover important faces or important artwork details.

Watermark rules:
- Add the watermark text "${brand}" tastefully near the bottom of the image.
- The watermark must use a script font.
- Make it visible but subtle.

Quality rules:
- High-quality ChatGPT image style.
- Beautiful finished social media graphic.
- Feminine Christian aesthetic.
- Warm, modest, encouraging, and shareable.
- No extra misspelled text.
- Do not include any text except the main caption, any required discussion text for Rosy Faith Chatter, and the "${brand}" watermark.`;
}

function generateContent(topic, tone, brand, platformSize) {
  const details = topicDetails[topic];
  const toneDescription = toneLines[tone];
  const caption = getUniqueCaption(topic, tone);

  return {
    caption,
    prayer: `Lord, today I bring You every heart walking through ${topic}. Please ${details.prayerFocus}. Let Your peace be louder than fear, Your love be stronger than weariness, and Your wisdom be clear in the next small step. Bless the person reading this with comfort, courage, and a reminder that they are deeply seen by You. Amen.`,
    devotional: `${details.devotional} In a ${toneDescription} voice, ${brand} reminds us that faith can be practical, honest, and deeply gentle. Today, take one breath, say one prayer, and let God meet you in the real place you are standing.`,
    imagePrompt: buildChatGptImagePrompt({ topic, tone, brand, platformSize, caption }),
    hashtags: buildHashtags(topic, details),
  };
}

function updateResults(content) {
  Object.entries(content).forEach(([key, value]) => {
    resultElements[key].textContent = value;
  });
}

function setCopiedState(button) {
  const originalText = button.textContent;
  button.textContent = "Copied";
  button.classList.add("copied");

  window.setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("copied");
  }, 1400);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const topic = formData.get("topic");
  const tone = formData.get("tone");
  const brand = formData.get("brand");
  const platformSize = formData.get("platformSize");

  updateResults(generateContent(topic, tone, brand, platformSize));
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = button.dataset.copy;
    const text = resultElements[target].textContent;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(button);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      setCopiedState(button);
    }
  });
});
