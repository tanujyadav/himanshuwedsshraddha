import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { blurIn, fadeUp, fadeLeft, fadeRight, stagger, inView, EASE } from '../animations'

/* One ceremony: a clean photograph, then the wording and details on ivory.

   Nothing sits on the photo. The block's aspect ratio matches the image files
   exactly (25/32), so `cover` has nothing to crop and a frame is never
   clipped. Each file was shortened to that aspect deliberately — trimming
   whichever edge is expendable (ceiling above, or hem below) rather than
   letting CSS shave the tops of their heads.

   There is deliberately no parallax here. Parallax needs the image to overscan
   its container to have room to travel, and that overscan is itself a crop.
   The entrance animation is a fade and rise instead, which costs no pixels.

   `index` only alternates which side the detail rows slide in from, so two
   consecutive events don't move identically. */
export default function EventSlide({ event, index = 0 }) {
  const slideIn = index % 2 === 0 ? fadeLeft : fadeRight

  return (
    <section style={{ background: 'var(--cream)' }}>
      {/* ---- Photograph, completely clean ---- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1, ease: EASE }}
        style={{
          position: 'relative',
          // Matches the file's aspect — nothing to crop.
          aspectRatio: '25 / 32',
          overflow: 'hidden',
        }}
      >
        <Photo name={event.photo} alt="" objectPosition="50% 50%" />
      </motion.div>

      {/* ---- Wording + details ---- */}
      <div style={{ padding: '28px 26px 58px', textAlign: 'center' }}>
        <SplitText
          tag="div"
          text={event.label}
          by="word"
          className="label"
          style={{ color: 'var(--gold-deep)', fontSize: 9.5 }}
        />

        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="script"
          style={{ fontSize: 47, lineHeight: 1.05, color: event.headingColor, marginTop: 12 }}
        >
          {event.heading}
        </motion.div>

        <div style={{ margin: '18px 0 22px' }}>
          <Ornament width={110} color={event.headingColor} />
        </div>

        <SplitText
          tag="p"
          text={event.description}
          by="word"
          stagger={0.032}
          className="body-text"
          style={{ margin: '0 auto 30px', maxWidth: 300, fontStyle: 'italic' }}
        />

        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          style={{ margin: 0, textAlign: 'left' }}
        >
          <Row variants={slideIn} label="Date" value={event.date} accent={event.headingColor} />
          <Row variants={slideIn} label="Time" value={event.time} accent={event.headingColor} />
          <Row
            variants={slideIn}
            label="Venue"
            value={
              <>
                <span style={{ display: 'block', fontWeight: 500 }}>{event.venue}</span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 13,
                    color: 'var(--text-soft)',
                    marginTop: 3,
                  }}
                >
                  {event.address}
                </span>
              </>
            }
            accent={event.headingColor}
          />
          <Row
            variants={slideIn}
            label="Dress Code"
            value={event.dressCode}
            accent={event.headingColor}
            last
          />
        </motion.dl>

        <Reveal variants={fadeUp} delay={0.15}>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              marginTop: 30,
              padding: '15px 18px',
              border: `1px solid ${event.headingColor}`,
              color: event.headingColor,
              textDecoration: 'none',
              borderRadius: 2,
              fontSize: 9.5,
            }}
          >
            <PinIcon />
            Open in Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, value, accent, variants, last = false }) {
  return (
    <motion.div
      variants={variants}
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        gap: 14,
        alignItems: 'baseline',
        padding: '13px 0',
        borderBottom: last ? 'none' : '1px solid rgba(201,148,42,0.22)',
      }}
    >
      <dt className="label" style={{ fontSize: 8.5, color: accent, opacity: 0.85 }}>
        {label}
      </dt>
      <dd
        style={{
          margin: 0,
          fontFamily: 'var(--serif)',
          fontSize: 15.5,
          color: 'var(--text-dark)',
          lineHeight: 1.5,
        }}
      >
        {value}
      </dd>
    </motion.div>
  )
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
