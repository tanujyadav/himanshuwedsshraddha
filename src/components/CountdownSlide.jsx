import { motion, AnimatePresence } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { EASE, fadeUp, scaleIn, inView } from '../animations'
import { useCountdown } from '../hooks/useCountdown'
import { weddingDate } from '../data/wedding'

/* Live countdown over the wide chandelier frame.

   The type is split in two on purpose — heading high up on the dark wooden
   beam, digits down on the empty floor — so neither lands on the couple, who
   sit in the middle third.

   Why not just move the photo instead: this frame is taller than a phone
   viewport is narrow, so `cover` crops it horizontally only. There is no
   objectPosition that shifts the couple vertically out of the way, which is
   why the layout has to work around them.

   The heading offset is in `svh`, not `%` — percentage padding resolves
   against the container's WIDTH, so a percentage here would drift wildly
   between phone sizes. */
export default function CountdownSlide() {
  const { days, hours, minutes, seconds, done } = useCountdown(weddingDate)

  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Photo name="countdown" alt="" objectPosition="50% 45%" />

      {/* Deepest where the two blocks of type sit; lightest across the couple. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(36,7,16,0.5) 0%, rgba(36,7,16,0.22) 18%, rgba(36,7,16,0.52) 36%, rgba(36,7,16,0.3) 58%, rgba(36,7,16,0.62) 80%, rgba(36,7,16,0.92) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          // Floored in px so a landscape phone (where this frame crops
          // vertically instead) can't squeeze the two type blocks together.
          minHeight: 'max(96svh, 620px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0 var(--page-padding-x) 42px',
          textAlign: 'center',
        }}
      >
        {/* ---- Heading, up on the beam above the couple ---- */}
        <div style={{ paddingTop: 'max(25svh, 130px)', textShadow: '0 2px 16px rgba(36,7,16,0.6)' }}>
          <Reveal>
            <div className="label" style={{ color: 'var(--gold-light)' }}>
              {done ? 'The day is here' : 'Counting down to'}
            </div>
          </Reveal>

          <SplitText
            tag="div"
            text={done ? 'Today' : 'Forever'}
            by="letter"
            stagger={0.06}
            className="script shimmer-light"
            style={{ fontSize: 48, margin: '8px 0 4px' }}
          />

          <div style={{ marginTop: 14 }}>
            <Ornament width={118} color="var(--gold-light)" />
          </div>
        </div>

        {/* ---- Digits, down on the empty floor below the couple ---- */}
        <div>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="frost"
            style={{ display: 'flex', alignItems: 'center', padding: '16px 4px 14px', gap: 2 }}
          >
            <Unit value={days} label="Days" />
            <Unit value={hours} label="Hours" max={24} />
            <Unit value={minutes} label="Minutes" max={60} />
            <Unit value={seconds} label="Seconds" max={60} />
          </motion.div>

          <Reveal variants={fadeUp} delay={0.2}>
            <p
              className="body-text"
              style={{
                color: 'rgba(253,248,240,0.85)',
                fontSize: 14,
                margin: '20px 0 0',
                fontStyle: 'italic',
                textShadow: '0 2px 12px rgba(36,7,16,0.6)',
              }}
            >
              {done ? 'The celebration begins today.' : 'until two families become one'}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* One countdown unit inside a gold ring that empties as the unit runs down
   (days has no natural maximum, so its ring stays full). Each new value
   slides up as the old one leaves, so the seconds tick over instead of
   snapping. */
const RING_R = 29
const RING_C = 2 * Math.PI * RING_R

function Unit({ value, label, max }) {
  const shown = String(value ?? 0).padStart(2, '0')
  const fraction = max ? (value ?? 0) / max : 1

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 66, height: 66, maxWidth: '100%' }}>
      <svg
        viewBox="0 0 66 66"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
      >
        <circle cx="33" cy="33" r={RING_R} fill="rgba(43,8,18,0.25)" stroke="rgba(242,221,171,0.18)" strokeWidth="2" />
        <circle
          cx="33"
          cy="33"
          r={RING_R}
          fill="none"
          stroke="var(--gold-light)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - fraction)}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '50%' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={shown}
            initial={{ y: '75%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-75%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--serif)',
              fontSize: 27,
              fontWeight: 400,
              color: 'var(--gold-light)',
              // Both values needed: the inline style replaces the global
              // lining-nums, and tabular keeps digits from jittering per tick.
              fontVariantNumeric: 'tabular-nums lining-nums',
            }}
          >
            {shown}
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
      <div
        className="label"
        style={{ fontSize: 7.5, color: '#fdf8f0', opacity: 0.72, marginTop: 8 }}
      >
        {label}
      </div>
    </div>
  )
}
