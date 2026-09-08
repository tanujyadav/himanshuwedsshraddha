import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { blurIn, fadeUp, fadeLeft, fadeRight, stagger, inView } from '../animations'

/* Focal points per photograph. `cover` on a narrow phone crops hard, and the
   default centre crop clips heads in both of these frames. */
const FOCAL = {
  wedding: '50% 40%',
  sangeet: '46% 32%',
}

/* One ceremony: full-bleed photograph, then the practical details on ivory.
   `index` only alternates which side the detail rows slide in from, so two
   consecutive events don't move identically. */
export default function EventSlide({ event, index = 0 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Photo drifts slower than the page — the classic parallax depth cue.
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  const slideIn = index % 2 === 0 ? fadeLeft : fadeRight

  return (
    <section style={{ background: 'var(--cream)' }}>
      {/* ---- Photograph ---- */}
      <div
        ref={ref}
        style={{ position: 'relative', height: '62svh', minHeight: 390, overflow: 'hidden' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-8% 0',
            y: reduceMotion ? 0 : y,
          }}
        >
          <Photo
            name={event.photo}
            alt=""
            objectPosition={FOCAL[event.photo] ?? 'center 40%'}
          />
        </motion.div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(36,7,16,0.32) 0%, rgba(36,7,16,0.05) 35%, rgba(36,7,16,0.55) 88%, rgba(36,7,16,0.75) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '0 24px 24px',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <SplitText
            tag="div"
            text={event.label}
            by="word"
            className="label"
            style={{ color: 'var(--gold-light)', fontSize: 9.5 }}
          />
        </div>
      </div>

      {/* ---- Details ---- */}
      <div style={{ padding: '34px 26px 58px', textAlign: 'center' }}>
        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="script"
          style={{ fontSize: 47, lineHeight: 1.05, color: event.headingColor }}
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
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-soft)', marginTop: 3 }}>
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
