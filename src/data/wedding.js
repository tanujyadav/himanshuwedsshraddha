/* ============================================================================
   EVERY piece of text on the invitation lives in THIS FILE.
   Nothing is hard-coded in the components — edit only here.
   ========================================================================== */

export const couple = {
  // First names only — these render in the large gold script.
  groom: {
    name: 'Himanshu',
    parents: 'Son of Mr. Jitendra Singh & Mrs. Sanil Yadav',
  },
  bride: {
    name: 'Shraddha',
    // "Late" honours her father, who has passed away. Phrased to match the
    // groom's line above.
    parents: 'Daughter of Late I.K. Bishen & Mrs. Shila Bishen',
  },

  // Initials pressed into the envelope's wax seal.
  initials: { left: 'H', right: 'S' },

  hashtag: '#HimanshuWedsShraddha',
}

/* The moment the countdown counts down to — the wedding itself.
   Format: 'YYYY-MM-DDTHH:mm:ss' in local time. */
export const weddingDate = '2026-11-26T19:00:00'

export const invitation = {
  eyebrow: 'Together with our families',
  // The invitation slide needs its own line — reusing `eyebrow` there
  // repeats the hero's label a screen later.
  formalEyebrow: 'The Invitation',
  lead: 'We joyfully invite you to celebrate the wedding of',
  blessing:
    'Your presence is the greatest blessing we could ask for, and we would ' +
    'be honoured to have you beside us as we begin this new chapter.',
  city: 'Deoria, Uttar Pradesh',
}

/* ---- The two celebrations, in date order ------------------------------- */
export const events = [
  {
    id: 'wedding',
    label: 'The Sacred Vows',
    heading: 'The Wedding',
    headingColor: '#4a0f20',
    description:
      'The ceremony where two families become one. Join us for the ' +
      'rituals, the vows and the blessings.',
    date: 'Thursday, 26 November 2026',
    time: 'Dinner 7:00 PM onwards',
    venue: 'Deoria',
    address: 'Deoria, Uttar Pradesh',
    mapsUrl: 'https://maps.google.com/?q=Deoria+Uttar+Pradesh',
    photo: 'wedding',
  },
  {
    id: 'reception',
    label: 'An Evening of Celebration',
    heading: 'The Reception',
    headingColor: '#6b1e38',
    description:
      'An evening of music, dinner and celebration as both families ' +
      'come together once more.',
    date: 'Sunday, 29 November 2026',
    time: 'Dinner 7:00 PM onwards',
    venue: 'Green Land',
    address: 'Near Suresh Sharma Nagar, Bareilly, Uttar Pradesh',
    // Exact pin supplied by the family.
    mapsUrl: 'https://maps.google.com/?q=28.37615602428128,79.45425833921657',
    photo: 'reception',
  },
]

/* ---- Photo gallery strip -----------------------------------------------
   The first entry is the large lead frame, the next two sit side by side,
   and anything flagged `wide` renders as a full-width landscape band. */
export const gallery = [
  { key: 'gallery-lead', src: 'gallery-lead', caption: 'Together' },
  { key: 'gallery-bride', src: 'gallery-bride', caption: 'The Bride' },
  { key: 'gallery-groom', src: 'gallery-groom', caption: 'The Groom' },
  { key: 'gallery-hands', src: 'gallery-hands', caption: 'The Details', wide: true },
]

export const closing = {
  line1: 'We cannot wait',
  line2: 'to celebrate with you',
  note: 'With love and excitement,',
}

/* Background music — a soft melody, started only after the guest taps the
   envelope open (browsers block autoplay before a real interaction).
   Drop your track at public/music.mp3. If the file is absent the player
   stays hidden and nothing breaks. */
export const music = {
  enabled: true,
  src: '/music.mp3',
  volume: 0.28,
}
