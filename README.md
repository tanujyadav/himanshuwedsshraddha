# Himanshu & Shraddha — Wedding Invitation

A mobile-first animated wedding invitation. React + Vite + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
```

---

## 1. Still to fill in

**All invitation text lives in one file: [`src/data/wedding.js`](src/data/wedding.js).**
Nothing is hard-coded in the components. Four placeholders are still in there,
left deliberately obvious so they can't ship unnoticed:

| In `src/data/wedding.js` | Currently | Replace with |
|---|---|---|
| `couple.groom.parents` | `Son of Mr. & Mrs. Surname` | Himanshu's parents' names |
| `couple.bride.parents` | `Daughter of Mr. & Mrs. Surname` | Shraddha's parents' names |
| `closing.rsvpName` | `Your Name` | who guests should RSVP to |
| `closing.rsvpPhone` | `''` (empty) | optional phone — becomes a tap-to-call link |

Everything else — names, both dates, both venues, the Bareilly map pin, times,
dress codes, the hashtag — is already set from what you sent.

If you clear `closing.rsvpPhone` or `closing.rsvpName`, that block simply
doesn't render. Same for `couple.hashtag`.

## 2. Background music

The player is built and switched on, but **there is no track yet.** Drop one in:

```bash
cp ~/Downloads/your-song.mp3 public/music.mp3
```

Then reload. Behaviour:

- Music starts **when the guest taps the envelope open** — never before.
  Browsers block autoplay until a real tap, so that gesture is the only moment
  it can legally begin.
- A mute button appears top-right, and it only appears if the track actually
  loaded. **With no `public/music.mp3` the button stays hidden and nothing
  breaks** — the invite just runs silent.
- Volume is 28%, set by `music.volume` in `src/data/wedding.js`.

Use a track you have the rights to. Free options: the YouTube Audio Library,
Pixabay Music, or Free Music Archive. A soft instrumental — piano, sitar,
strings — suits this better than anything with vocals.

## 3. Deploy to Vercel

```bash
npm run build            # sanity-check it compiles
npm install -g vercel
vercel login             # opens your browser / emails a link — click it
vercel --prod            # press Enter for every question
```

### Then do this one follow-up

WhatsApp link previews need **absolute** URLs. Once you have your real domain,
open [`index.html`](index.html) and replace both `https://your-app.vercel.app`
values in the `og:image` and `og:url` tags with it, then run `vercel --prod`
again. Skip this and the invite still works — the WhatsApp thumbnail just
won't show.

## 4. Photos

Eight photos, picked from the ten in the shoot and resized from the ~12 MB
originals down to about 1000×1500 at ~150 KB each. All eight together are
~1.3 MB, which matters because most guests will open this on mobile data.

| File in `public/img/` | Where it appears |
|---|---|
| `hero.jpg` | opening screen |
| `countdown.jpg` | countdown background |
| `wedding.jpg` | The Wedding |
| `sangeet.jpg` | The Reception |
| `gallery-1/2/3.jpg` | photo strip |
| `closing.jpg` | closing screen |

**If you swap a photo,** re-crop its focal point too. `objectFit: cover` on a
narrow phone crops hard, and the default centre crop cuts faces off in several
of these frames. The focal points are the `objectPosition` values in
`HeroSlide.jsx`, `CountdownSlide.jsx`, `FinalSlide.jsx`, and the `FOCAL` maps
at the top of `EventSlide.jsx` and `GallerySlide.jsx`.

The blur-up placeholders in `src/data/lqip.js` are generated from the photos —
regenerate them if you replace images, or just delete the entry and that photo
will fade in from transparent instead.

## 5. How it's put together

```
src/
  data/wedding.js       ← all text, dates, venues (edit this)
  data/lqip.js          ← generated blur placeholders
  animations.js         ← shared Framer variants; timing lives here
  hooks/useCountdown.js
  components/
    EnvelopeIntro.jsx   tap-to-open envelope (pure CSS/SVG, no image)
    HeroSlide.jsx       photo + names
    InvitationSlide.jsx formal wording
    CountdownSlide.jsx  live countdown
    EventSlide.jsx      one component, both ceremonies
    GallerySlide.jsx    photo strip
    FinalSlide.jsx      closing + RSVP
    Photo.jsx           blur-up image loader
    SplitText.jsx       per-word / per-letter text animation
    Reveal.jsx          scroll-reveal wrapper
    Ornament.jsx        gold divider
```

**Animations.** Scroll reveals all use `once: true` — without it, sections
re-animate every time they scroll back into view, which reads as broken.
Text animates per word or per letter via `SplitText`. Photos have a slow Ken
Burns drift and the event photos parallax against the scroll. The gold sheen on
the names is a CSS gradient sweep. `prefers-reduced-motion` is respected.

Per-word/letter animation uses transform and opacity only — deliberately no
`blur()` filter, which drops frames badly on mid-range Android when it runs
across dozens of spans at once.

## 6. Saving your work

```bash
git add . && git commit -m "save"   # before every round of changes
git restore .                        # undo everything since the last commit
```
