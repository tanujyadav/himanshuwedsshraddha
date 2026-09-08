import { motion, AnimatePresence } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { EASE, fadeUp, scaleIn, inView } from '../animations'
import { useCountdown } from '../hooks/useCountdown'
import { weddingDate } from '../data/wedding'

/* Live countdown over the wide chandelier frame — that photograph has a lot
   of empty warm space, which is exactly what overlaid type needs. */
export default function CountdownSlide() {
  const { days, hours, minutes, seconds, done } = useCountdown(weddingDate)

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Photo name="countdown" alt="" objectPosition="50% 45%" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(36,7,16,0.7) 0%, rgba(36,7,16,0.4) 38%, rgba(36,7,16,0.76) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '54px 22px',
          textAlign: 'center',
        }}
      >
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
          style={{ fontSize: 52, margin: '10px 0 6px' }}
        />

        <div style={{ margin: '18px 0 30px' }}>
          <Ornament width={120} color="var(--gold-light)" />
        </div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="frost"
          style={{ display: 'flex', alignItems: 'center', padding: '20px 6px' }}
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
              color: 'rgba(253,248,240,0.82)',
              fontSize: 14,
              marginTop: 26,
              fontStyle: 'italic',
            }}
          >
            {done
              ? 'The celebration begins today.'
              : 'until two families become one'}
          </p>
        </Reveal>
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
