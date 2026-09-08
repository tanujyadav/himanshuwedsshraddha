import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { fadeUp, scaleIn, stagger, inView } from '../animations'
import { gallery } from '../data/wedding'

const FOCAL = {
  'gallery-1': '50% 38%',
  'gallery-2': '50% 50%',
  'gallery-3': '50% 44%',
}

/* A short photo interlude between the ceremonies and the closing note.
   One full-width frame, then two half-width frames — enough variety to feel
   composed rather than a uniform grid. */
export default function GallerySlide() {
  const [lead, ...rest] = gallery

  return (
    <section style={{ background: 'var(--cream-warm)', padding: '62px 20px 66px' }}>
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
        <Ornament width={110} />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        {lead ? <Frame item={lead} ratio="3 / 4" /> : null}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 12,
          }}
        >
          {rest.map((item) => (
            <Frame key={item.key} item={item} ratio="3 / 4" />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Frame({ item, ratio }) {
  return (
    <motion.figure variants={scaleIn} style={{ margin: 0 }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: ratio,
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid rgba(201,148,42,0.28)',
        }}
      >
        <Photo
          name={item.src}
          alt={item.caption}
          objectPosition={FOCAL[item.src] ?? 'center 40%'}
        />
      </div>
      <Reveal variants={fadeUp} delay={0.1}>
        <figcaption
          className="label"
          style={{ textAlign: 'center', marginTop: 10, fontSize: 8.5 }}
        >
          {item.caption}
        </figcaption>
      </Reveal>
    </motion.figure>
  )
}
