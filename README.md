# Himanshu & Shraddha — Wedding Invitation

A mobile-first animated wedding invitation. React + Vite + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
```

---

## 1. All the text lives in one file

**Every word on the invitation is in [`src/data/wedding.js`](src/data/wedding.js).**
Nothing is hard-coded in the components — names, both sets of parents, both
dates, both venues, the Bareilly map pin, times, the hashtag. There is no
RSVP block; the closing screen ends on the couple's names and the hashtag.

Clear `couple.hashtag` and that line simply doesn't render.

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

## 3. Deployed

**Live at https://himanshuwedsshraddha.vercel.app** — the Vercel project is
`himanshuwedsshraddha` under the `tanujyadav` account, deployment protection
(SSO) disabled so guests can open it without a Vercel login.

To push a change live:

```bash
npm run build            # sanity-check it compiles
npx vercel --prod --yes
```

`index.html`'s `og:image`/`og:url` tags already point at the live domain, so
WhatsApp/iMessage link previews work with no further edits — only touch them
if the domain ever changes.

## 4. Photos

Nine photos, chosen from the 1,680-image FotoOwl gallery (the couple sessions
sit at positions 1200-1385 and 1557-1679). Each is resized from a ~12 MB
4672x7008 original down to ~1000px wide, ~200 KB. All nine together are about
1.6 MB, which matters because most guests will open this on mobile data.

| File in `public/img/` | Gallery position | Where it appears |
|---|---|---|
| `hero.jpg` | 1266 | opening screen |
| `countdown.jpg` | 1635 | countdown background |
| `wedding.jpg` | 1324 | The Wedding |
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

## 5. The envelope front

Before a guest can tap the envelope open, it shows its FRONT first — the
traditional invocation printed at the top of a Hindu wedding card ("shree
Ganeshaya namah", Om, Ganesha, "shubh vivah") — then turns over on its own to
the plain envelope back, which is what actually responds to a tap. This lives
in `EnvelopeFrontFace.jsx` and the flip timing in `EnvelopeIntro.jsx`.

**`public/img/ganesha.png`** is a real illustrated Ganesha (gold line-art,
transparent background), not a hand-drawn SVG — a flat vector attempt at this
specific subject didn't read as convincingly as an actual illustration at
this size. Sourced from a Pinterest pin the family chose
(`pinterest.com/pin/930556341745106118`, credited there to Krishnan
Srividhya); the original was a JPEG with a plain white background, keyed to
transparent with `tools-keyout.ps1` so it sits on the ivory card without a
white box around it:

```powershell
./tools-keyout.ps1 -Src ORIGINAL.jpg -Out public/img/ganesha.png
```

If you swap in a different Ganesha image, keep it roughly square (the card
sizes it to 64x64) and either source a transparent PNG directly or run it
through the same script if it comes with a white background.

## 6. Mobile

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

## 7. How it's put together

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
    FinalSlide.jsx      closing screen
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

## 8. Saving your work

```bash
git add . && git commit -m "save"   # before every round of changes
git restore .                        # undo everything since the last commit
```
