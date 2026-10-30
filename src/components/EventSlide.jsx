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

  /* Built as a list rather than four fixed rows, so the closing hairline
     always lands on whichever row is genuinely last. Hard-coding `last` on one
     Row leaves a stray border the moment a field is dropped. Any field left
     empty in wedding.js simply omits its row. */
  const rows = [
    { label: 'Date', value: event.date },
    { label: 'Time', value: event.time },
    {
      label: 'Venue',
      value: event.venue ? (
        <>
          <span style={{ display: 'block', fontWeight: 500 }}>{event.venue}</span>
          {event.address ? (
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
          ) : null}
        </>
      ) : null,
    },
    { label: 'Dress Code', value: event.dressCode },
  ].filter((row) => row.value)

  // "Thursday, 26 November 2026" -> medallion pieces. Any other format just
  // skips the medallion.
  const [, weekday, day, month] =
    /^(\w+),\s*(\d{1,2})\s+(\w+)/.exec(event.date ?? '')?.map((s, i) => (i === 3 ? s.slice(0, 3) : s)) ?? []

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

      {/* ---- Date medallion, straddling the photo's bottom edge ---- */}
      {day ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          style={{
            position: 'relative',
            zIndex: 2,
            width: 96,
            height: 96,
            margin: '-48px auto 0',
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #9a3a5c 0%, ${event.headingColor} 60%, var(--royal-deep) 100%)`,
            border: '2px solid var(--gold-light)',
            boxShadow:
              '0 0 0 4px var(--cream), 0 0 0 5px rgba(201,148,42,0.55), 0 12px 26px rgba(43,8,18,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-light)',
          }}
        >
          <span className="label" style={{ fontSize: 7.5, color: 'var(--gold-light)', opacity: 0.85, letterSpacing: '0.24em' }}>
            {weekday}
          </span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 36, lineHeight: 1, fontWeight: 500, margin: '2px 0 1px' }}>
            {day}
          </span>
          <span className="label" style={{ fontSize: 7.5, color: 'var(--gold-light)', letterSpacing: '0.24em' }}>
            {month}
          </span>
        </motion.div>
      ) : null}

      {/* ---- Wording + details ---- */}
      <div style={{ padding: `${day ? 18 : 28}px var(--page-padding-x) 58px`, textAlign: 'center' }}>
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
          style={{ fontSize: 47, color: event.headingColor, marginTop: 8 }}
        >
          {event.heading}
        </motion.div>

        <div style={{ margin: '12px 0 20px' }}>
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

        {/* ---- Ticket: details above the perforation, map link on the stub.
            The two side notches are cut with a mask, so the drop shadow sits
            on a wrapper (a mask would cut the shadow off too). ---- */}
        <Reveal variants={fadeUp}>
          <div style={{ filter: 'drop-shadow(0 10px 22px rgba(74,15,32,0.13))' }}>
            <div
              style={{
                background: 'linear-gradient(170deg, #fffdf8 0%, #fbf1df 100%)',
                borderRadius: 14,
                WebkitMask: TICKET_MASK,
                mask: TICKET_MASK,
                position: 'relative',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 6,
                  border: '1px solid rgba(201,148,42,0.35)',
                  borderRadius: 10,
                  pointerEvents: 'none',
                }}
              />
              <motion.dl
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                style={{ margin: 0, textAlign: 'left', padding: '10px 22px 14px' }}
              >
                {rows.map((row, i) => (
                  <Row
                    key={row.label}
                    variants={slideIn}
                    label={row.label}
                    value={row.value}
                    accent={event.headingColor}
                    last={i === rows.length - 1}
                  />
                ))}
              </motion.dl>

              {/* perforation */}
              <div
                aria-hidden="true"
                style={{ margin: '0 22px', borderTop: '2px dashed rgba(201,148,42,0.4)' }}
              />

              <div style={{ height: STUB_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 22px' }}>
                <motion.a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label"
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    width: '100%',
                    padding: '13px 18px',
                    background: `linear-gradient(135deg, ${event.headingColor} 0%, var(--royal-deep) 100%)`,
                    color: 'var(--gold-light)',
                    textDecoration: 'none',
                    borderRadius: 999,
                    fontSize: 9.5,
                    boxShadow: 'inset 0 0 0 1px rgba(242,221,171,0.4)',
                  }}
                >
                  <PinIcon />
                  Open in Google Maps
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Half-circle notches either side of the perforation, STUB_HEIGHT above the
   bottom. Each gradient covers one half of the ticket, so they need no
   mask compositing. */
const STUB_HEIGHT = 78
const TICKET_MASK =
  `radial-gradient(circle at 0 calc(100% - ${STUB_HEIGHT}px), #0000 11px, #000 11.5px) left / 51% 100% no-repeat, ` +
  `radial-gradient(circle at 100% calc(100% - ${STUB_HEIGHT}px), #0000 11px, #000 11.5px) right / 51% 100% no-repeat`

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
