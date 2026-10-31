/* ============================================================================
   EVERY piece of text on the invitation lives in THIS FILE.
   Nothing is hard-coded in the components — edit only here.
   ========================================================================== */

export const couple = {
  // First names only — these render in the large gold script.
  groom: {
    name: "Himanshu",
    parents: "Son of Mr. Jitendra Singh & Mrs. Sanil Yadav",
    Grandparents: "Grandson of Late Manohar Singh & Late Sukhrani Devi",
  },
  bride: {
    name: "Shraddha",
    // "Late" honours her father, who has passed away. Phrased to match the
    // groom's line above.
    parents: "Daughter of Late Indra Kishore Singh & Mrs. Shila Singh",
    Grandparents:
      "Granddaughter of Shri Shyam Bahadur Singh & Smt. Indrawati Singh",
  },

  // Initials pressed into the envelope's wax seal.
  initials: { left: "H", right: "S" },

  hashtag: "#HimanshuWedsShraddha",
};

/* The moment the countdown counts down to — the wedding itself.
   Format: 'YYYY-MM-DDTHH:mm:ss' in local time. */
export const weddingDate = "2026-11-26T19:00:00";

export const invitation = {
  eyebrow: "Together with our families",
  // The invitation slide needs its own line — reusing `eyebrow` there
  // repeats the hero's label a screen later.
  formalEyebrow: "The Invitation",
  lead: "We joyfully invite you to celebrate the wedding of",
  blessing:
    "Your presence is the greatest blessing we could ask for, and we would " +
    "be honoured to have you beside us as we begin this new chapter.",
  city: "Deoria, Uttar Pradesh",
};

/* ---- The two celebrations, in date order ------------------------------- */
export const events = [
  {
    id: "wedding",
    label: "The Sacred Vows",
    heading: "The Wedding",
    headingColor: "#4a0f20",
    description:
      "The ceremony where two families become one. Join us for the " +
      "rituals, the vows and the blessings.",
    date: "Thursday, 26 November 2026",
    time: "Dinner 7:00 PM onwards",
    venue: "Meera Lawn",
    address: "Deoria, Uttar Pradesh",
    mapsUrl: "https://maps.app.goo.gl/cSeHZYWBj6pNyn6W8",
    // For "Add to Calendar" — local IST times, start and end.
    calendar: { start: "2026-11-26T19:00", end: "2026-11-26T23:30" },
    photo: "wedding",
  },
  {
    id: "reception",
    label: "An Evening of Celebration",
    heading: "The Reception",
    headingColor: "#6b1e38",
    description:
      "An evening of music, dinner and celebration as both families " +
      "come together once more.",
    date: "Sunday, 29 November 2026",
    time: "Dinner 7:00 PM onwards",
    venue: "Green Land",
    address: "Near Suresh Sharma Nagar, Bareilly, Uttar Pradesh",
    // Exact pin supplied by the family.
    mapsUrl: "https://maps.google.com/?q=28.37615602428128,79.45425833921657",
    calendar: { start: "2026-11-29T19:00", end: "2026-11-29T23:30" },
    photo: "reception",
  },
];

/* ---- Photo gallery strip -----------------------------------------------
   The first entry is the large lead frame, the rest sit side by side in
   pairs, and anything flagged `wide` renders as a full-width landscape band.
   Every portrait file is 2:3 (1000x1500). */
export const gallery = [
  // Each photo appears once across the whole invitation — the hero, event
  // and closing frames are not repeated here.
  { key: "gallery-gesture", src: "gallery-gesture", caption: "Little Gestures" },
  { key: "gallery-bride", src: "gallery-bride", caption: "The Bride" },
  { key: "gallery-groom", src: "gallery-groom", caption: "The Groom" },
  { key: "gallery-rings", src: "gallery-rings", caption: "The Rings" },
  { key: "gallery-mehendi", src: "gallery-mehendi", caption: "The Details" },
  { key: "gallery-lawn", src: "gallery-lawn", caption: "Hand in Hand" },
  { key: "gallery-flower", src: "gallery-flower", caption: "In Bloom" },
  { key: "gallery-lead", src: "gallery-lead", caption: "Together, Always" },
  // {
  //   key: "gallery-hands",
  //   src: "gallery-hands",
  //   caption: "The Details",
  //   wide: true,
  // },
];

/* The couple's own letter to their guests, from their earlier invitation.
   `opening` sets in script; each `paragraphs` entry is its own paragraph. */
export const letter = {
  eyebrow: "A Letter From Our Hearts",
  opening: "To the ones who have been part of our story…",
  paragraphs: [
    "Some of you have known us since the very beginning. You’ve watched us " +
      "grow, shared in our laughter, stood by us through life’s many " +
      "chapters, and witnessed a love that has grown over the years.",
    "And now, as we begin the most beautiful chapter of our lives, it " +
      "wouldn’t feel complete without you.",
    "You’ve been a part of our story all along, and we would love nothing " +
      "more than to have you standing beside us as we take our seven pheras " +
      "and promise each other forever.",
    "Because some moments are made even more special by the people who have " +
      "been there from the start.",
  ],
  closingLine:
    "From the beginning of our story to the beginning of our forever — " +
    "we want you there.",
  signoff: "With love,",
  signature: "Shraddha & Himanshu",
};

/* Short intro above the photo strip, also in the couple's words. */
export const galleryIntro =
  "From the days that brought us together to the memories that made us who " +
  "we are, every chapter has led to this one.";

export const closing = {
  line1: "We cannot wait",
  line2: "to celebrate with you",
  note: "With love and excitement,",
};

/* Background music — a soft melody, started only after the guest taps the
   envelope open (browsers block autoplay before a real interaction).
   Drop your track at public/music.mp3. If the file is absent the player
   stays hidden and nothing breaks. */
export const music = {
  enabled: true,
  src: "/music.mp3",
  volume: 0.28,
};
