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
            style={{ display: 'flex', alignItems: 'center', padding: '18px 6px' }}
          >
            <Unit value={days} label="Days" />
            <Divider />
            <Unit value={hours} label="Hours" />
            <Divider />
            <Unit value={minutes} label="Minutes" />
            <Divider />
            <Unit value={seconds} label="Seconds" />
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

/* One countdown unit. Each new value slides up as the old one leaves, so the
   seconds tick over instead of snapping. */
function Unit({ value, label }) {
  const shown = String(value ?? 0).padStart(2, '0')

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ position: 'relative', height: 42, overflow: 'hidden' }}>
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
              fontSize: 33,
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
      <div
        className="label"
        style={{ fontSize: 7.5, color: '#fdf8f0', opacity: 0.72, marginTop: 4 }}
      >
        {label}
      </div>
    </div>
  )
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 1,
        height: 34,
        background: 'rgba(242,221,171,0.3)',
        flex: '0 0 1px',
      }}
    />
  )
}
