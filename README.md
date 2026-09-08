# Himanshu & Shraddha — Wedding Invitation

A mobile-first animated wedding invitation. React + Vite + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
```

---

## 1. Still to fill in

**All invitation text lives in one file: [`src/data/wedding.js`](src/data/wedding.js).**
Nothing is hard-coded in the components. Two placeholders are still in there,
left deliberately obvious so they can't ship unnoticed:

| In `src/data/wedding.js` | Currently | Replace with |
|---|---|---|
| `closing.rsvpName` | `Your Name` | who guests should RSVP to |
| `closing.rsvpPhone` | `''` (empty) | optional phone — becomes a tap-to-call link |

Everything else — names, both sets of parents, both dates, both venues, the
Bareilly map pin, times, the hashtag — is already set from what
you sent.

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

Nine photos, chosen from the 1,680-image FotoOwl gallery (the couple sessions
sit at positions 1200-1385 and 1557-1679). Each is resized from a ~12 MB
4672x7008 original down to ~1000px wide, ~200 KB. All nine together are about
1.6 MB, which matters because most guests will open this on mobile data.

| File in `public/img/` | Gallery position | Where it appears |
|---|---|---|
| `hero.jpg` | 1346 | opening screen |
| `countdown.jpg` | 1635 | countdown background |
| `wedding.jpg` | 1266 | The Wedding |
| `reception.jpg` | 1591 | The Reception |
| `gallery-lead.jpg` | 1353 | photo strip - "Together" |
| `gallery-bride.jpg` | 917 | photo strip - "The Bride" |
| `gallery-groom.jpg` | 815 | photo strip - "The Groom" |
| `gallery-hands.jpg` | 1620 | photo strip - "The Details" (wide band) |
| `closing.jpg` | 1662 | closing screen |

### The rule: crop in the file, never in CSS

`hero.jpg`, `wedding.jpg` and `reception.jpg` are all **1000x1280 (25/32)**,
and their blocks are set to `aspectRatio: '25 / 32'` so `cover` has nothing to
crop. That is the whole trick, and it is worth understanding before swapping a
photo.

`objectFit: cover` always crops whichever dimension doesn't fit, and the crop
is centred by default. On a ~430px-wide phone column that repeatedly sliced the
tops of their heads off, because in almost every frame of this shoot the couple
sit high in the tall dimension. `objectPosition` cannot fix it - it only slides
the crop window, it never removes the crop.

So each file is shortened to 25/32 **deliberately**, trimming whichever edge is
expendable, and the container then matches it exactly:

```powershell
# hero + wedding: heads near the top -> trim the hem at the bottom
./tools-crop.ps1 -Src ORIGINAL.JPG -Out public/img/hero.jpg `
  -X0 0.0 -X1 1.0 -Y0 0.0 -Y1 0.8533 -OutWidth 1000 -Quality 82

# reception: gown train runs to the bottom edge -> trim the ceiling instead
./tools-crop.ps1 -Src ORIGINAL.JPG -Out public/img/reception.jpg `
  -X0 0.0 -X1 1.0 -Y0 0.147 -Y1 1.0 -OutWidth 1000 -Quality 82

# gallery-hands: a wide band from the middle of a portrait frame
./tools-crop.ps1 -Src ORIGINAL.JPG -Out public/img/gallery-hands.jpg `
  -X0 0.0 -X1 1.0 -Y0 0.18 -Y1 0.62 -OutWidth 1300 -Quality 80

# closing: landscape frame, couple at x 47-78% -> drop the empty left stairs
./tools-crop.ps1 -Src ORIGINAL.JPG -Out public/img/closing.jpg `
  -X0 0.40 -X1 0.86 -Y0 0.0 -Y1 1.0 -OutWidth 1150 -Quality 82
```

`X0/X1/Y0/Y1` are the crop window as fractions of the original. From a
4672x7008 original, 25/32 is 85.33% of the height - so pick which 14.67% to
lose. **Look at the photo first and decide, then crop from that edge.**

Note that `hero.jpg` is the exception with no dark overlay or text on it at
all; the wording sits below the arch on ivory. Same for the event slides. An
overlay panel always landed on the couple, so the type moved off the photos
entirely.

### The gallery frames crop nothing

Portrait gallery frames are `2 / 3` and the wide band is `3 / 2`, matching the
files, so `cover` has nothing to trim there either. `gallery-lead.jpg` is a
full uncropped frame on purpose - it is a wide garden scene where the couple
are deliberately small, and cropping in would lose the composition.

### Swapping a photo

Re-check its focal point. `objectFit: cover` on a narrow phone crops hard and
the default centre crop cuts faces off in several of these frames. Focal points
live in the `objectPosition` values in `HeroSlide.jsx`, `CountdownSlide.jsx`
and `FinalSlide.jsx`, and in the `FOCAL` maps at the top of `EventSlide.jsx`
and `GallerySlide.jsx`.

Then regenerate that photo's blur-up placeholder in `src/data/lqip.js` - it is
a 20px inline JPEG per image. Deleting an entry is safe: that photo just fades
in from transparent instead.

### Adding or reordering gallery photos

The strip's layout comes from the `gallery` array in `wedding.js`, not from
hard-coded slots: the first entry is the large lead frame, the next two sit
side by side, and any entry flagged `wide: true` renders as a full-width
landscape band.

## 5. Mobile

Checked in real headless Chrome with touch emulation at 360x640, 390x844,
412x915 and 430x932: no horizontal scroll, no tap target under 44px, no
console errors, and both names above the fold on all four.

Two mobile-specific details worth knowing if you edit layout:

- **The hero arch is height-capped** (`min(50svh, 470px)`) inside a flex row,
  so on a short phone it shrinks instead of pushing the names below the fold.
  Because `aspectRatio` still holds, shrinking never crops the photo.
- **Percentage padding resolves against WIDTH, not height.** The countdown's
  heading offset is in `svh` for exactly this reason - a percentage there
  drifted wildly between phone sizes. Watch for this if you nudge any vertical
  offset.

Tall full-bleed sections use `svh`, not `vh`, so mobile browser chrome doesn't
cause a jump, and they are floored in px (`max(96svh, 620px)`) so a landscape
phone can't squeeze two blocks of type together.

## 6. How it's put together

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

## 7. Saving your work

```bash
git add . && git commit -m "save"   # before every round of changes
git restore .                        # undo everything since the last commit
```
