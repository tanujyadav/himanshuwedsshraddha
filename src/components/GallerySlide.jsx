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

/* A tilted polaroid pinned to the board with a push pin. The whole print
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
      <Pin size={small ? 14 : 18} />
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

/* A glossy maroon push pin with a gold rim, pressed into the top border of
   a print. It drops in and settles as the print scrolls into view, and casts
   a small shadow down-right onto the paper. */
function Pin({ size }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scale: 1.8, y: -10, opacity: 0 }}
      whileInView={{ scale: 1, y: 0, opacity: 1 }}
      viewport={inView}
      transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.35 }}
      style={{
        position: 'absolute',
        top: -size * 0.35,
        left: '50%',
        width: size,
        height: size,
        marginLeft: -size / 2,
        borderRadius: '50%',
        zIndex: 2,
        background:
          'radial-gradient(circle at 35% 30%, #ffd9e2 0%, #c23a5e 22%, #7a1534 62%, #3d0a1a 100%)',
        boxShadow:
          '0 0 0 1.5px #d4a64a, 0 0 0 2.5px rgba(139,98,16,0.5), 3px 5px 5px rgba(43,8,18,0.35)',
      }}
    />
  )
}
