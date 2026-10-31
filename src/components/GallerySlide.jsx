import { motion } from 'framer-motion'
import Photo from './Photo'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { fadeUp, scaleIn, stagger, inView } from '../animations'
import { gallery, galleryIntro } from '../data/wedding'
import { Texture, Filigree } from './Festive'

/* Portrait frames are 2/3 — the same aspect as the files — so `cover` has
   nothing to crop and no one gets clipped. These focal points therefore do
   almost nothing today; they only matter if a frame ratio changes or a
   replacement photo has a different aspect. */
const FOCAL = {
  'gallery-bride': '50% 45%',
  'gallery-groom': '50% 48%',
  'gallery-lead': '50% 50%',
  'gallery-hands': '50% 50%',
  'gallery-gesture': '50% 50%',
  'gallery-rings': '50% 50%',
  'gallery-mehendi': '50% 50%',
  'gallery-lawn': '50% 50%',
  'gallery-flower': '50% 50%',
}

/* A photo interlude between the ceremonies and the closing note.

   Layout comes from the data, not from hard-coded slots: the first entry is
   the large lead frame, the next two portraits sit side by side, and anything
   flagged `wide` becomes a full-width landscape band. Enough variety that it
   reads as composed rather than a uniform grid. */
export default function GallerySlide() {
  const portraits = gallery.filter((g) => !g.wide)
  const [lead, ...restPortraits] = portraits
  const pairs = []
  for (let i = 0; i < restPortraits.length; i += 2) pairs.push(restPortraits.slice(i, i + 2))
  const bands = gallery.filter((g) => g.wide)

  return (
    <section
      style={{
        // A soft spotlight on the warm ivory, like prints laid out on a table.
        background:
          'radial-gradient(90% 50% at 50% 35%, #fcf3e6 0%, var(--cream-warm) 70%, #f1e0cb 100%)',
        padding: '62px calc(var(--page-padding-x) + 4px) 72px',
        overflow: 'hidden',
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      <Texture />
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Reveal>
          <div className="label">A Few Moments</div>
        </Reveal>
        <SplitText
          tag="div"
          text="Before the Vows"
          by="letter"
          stagger={0.045}
          className="script shimmer"
          style={{ fontSize: 40, margin: '8px 0 16px' }}
        />
        <Filigree width={180} />
        {galleryIntro ? (
          <SplitText
            tag="p"
            text={galleryIntro}
            by="word"
            stagger={0.03}
            className="body-text"
            style={{ margin: '20px auto 0', maxWidth: 300, fontStyle: 'italic', fontSize: 15 }}
          />
        ) : null}
      </div>

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={inView}>
        {lead ? <Frame item={lead} ratio="2 / 3" tilt={-1.6} /> : null}

        {/* Pairs alternate which side leans out, so the stack reads as
            prints scattered by hand rather than a grid. */}
        {pairs.map((pair, row) => (
          <motion.div
            key={pair[0].key}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            style={{
              display: 'grid',
              gridTemplateColumns: pair.length === 1 ? '1fr' : '1fr 1fr',
              gap: 14,
              marginTop: 22,
            }}
          >
            {/* An odd one out at the end gets the full width, like the lead. */}
            {pair.map((item, i) => (
              <Frame
                key={item.key}
                item={item}
                ratio="2 / 3"
                tilt={pair.length === 1 ? 1.4 : (i + row) % 2 ? 3 : -2.5}
                small={pair.length > 1}
              />
            ))}
          </motion.div>
        ))}

        {bands.map((item) => (
          <div key={item.key} style={{ marginTop: 22 }}>
            <Frame item={item} ratio="3 / 2" tilt={1.2} />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

/* A tilted polaroid held on with a strip of gold washi tape. The whole print
   rotates, so the photo inside is never cropped by the tilt. A tap or hover
   straightens it. */
function Frame({ item, ratio, tilt = 0, small = false }) {
  const pad = small ? 7 : 11
  return (
    <motion.figure
      variants={scaleIn}
      whileHover={{ rotate: 0, scale: 1.02 }}
      whileTap={{ rotate: 0, scale: 1.02 }}
      style={{
        margin: 0,
        rotate: tilt,
        position: 'relative',
        background: '#fffdf9',
        padding: `${pad}px ${pad}px 0`,
        boxShadow: '0 14px 30px rgba(74,15,32,0.18), 0 2px 6px rgba(74,15,32,0.1)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -9,
          left: '50%',
          width: small ? 52 : 78,
          height: 20,
          marginLeft: small ? -26 : -39,
          transform: `rotate(${-tilt * 1.8}deg)`,
          background:
            'repeating-linear-gradient(45deg, rgba(242,221,171,0.85) 0 6px, rgba(201,148,42,0.55) 6px 8px)',
          boxShadow: '0 1px 3px rgba(74,15,32,0.15)',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden' }}>
        <Photo
          name={item.src}
          alt={item.caption}
          objectPosition={FOCAL[item.src] ?? 'center 40%'}
        />
      </div>
      <Reveal variants={fadeUp} delay={0.1}>
        <figcaption
          className="script"
          style={{
            textAlign: 'center',
            fontSize: small ? 22 : 30,
            color: 'var(--royal-soft)',
            padding: small ? '2px 0 4px' : '4px 0 8px',
          }}
        >
          {item.caption}
        </figcaption>
      </Reveal>
    </motion.figure>
  )
}
