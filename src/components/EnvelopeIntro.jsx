import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE, EASE_SOFT } from '../animations'
import { couple } from '../data/wedding'

/* Tap-to-open envelope.

   Drawn entirely with CSS and SVG — no image asset to design or ship. The
   sequence is: the wax seal breaks, the flap swings back, the card rises out,
   then the whole scene fades and hands control to the invitation.

   The tap is also what unlocks audio: browsers refuse to autoplay sound until
   a real gesture, so App starts the music off this same interaction. */
export default function EnvelopeIntro({ onComplete }) {
  const [stage, setStage] = useState('idle') // idle -> opening -> flapBack
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleTap = useCallback(() => {
    if (stage !== 'idle') return // ignore repeat taps mid-animation
    setStage('opening')
    const after = (ms, fn) => timers.current.push(setTimeout(fn, ms))
    // Once the flap passes vertical it should paint behind the envelope.
    after(900, () => setStage('flapBack'))
    after(2600, () => {
      try {
        sessionStorage.setItem('invite-opened', '1')
      } catch {
        /* private browsing — the guest just sees the envelope again on reload */
      }
      onComplete()
    })
  }, [stage, onComplete])

  const opening = stage !== 'idle'

  const paper = 'linear-gradient(150deg, #faf0dd 0%, #f0dfc0 55%, #e6d0aa 100%)'
  const paperDark = 'linear-gradient(150deg, #f0dfc0 0%, #e4cca4 60%, #d8bc8e 100%)'
  // The flap must not share the front's gradient — same fill on both and the
  // envelope flattens into a plain cream rectangle.
  const paperFlap = 'linear-gradient(168deg, #fdf7ea 0%, #f5e7cd 58%, #ecdab6 100%)'

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Tap to open your invitation"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleTap()
        }
      }}
      initial={{ opacity: 1 }}
      animate={opening ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: opening ? 1.9 : 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        background:
          'radial-gradient(120% 90% at 50% 38%, #5d1528 0%, #3a0d1a 45%, #240710 100%)',
      }}
    >
      <FloatingMotes />

      {/* ---- Monogram above the envelope ---- */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: opening ? 0 : 0.3 }}
        style={{ textAlign: 'center', marginBottom: 34, position: 'relative', zIndex: 2 }}
      >
        <div className="label" style={{ color: 'var(--gold-light)', opacity: 0.75 }}>
          The Wedding Of
        </div>
        <div className="script shimmer" style={{ fontSize: 34, marginTop: 6 }}>
          {couple.groom.name} &amp; {couple.bride.name}
        </div>
      </motion.div>

      {/* ---- Envelope ---- */}
      <div
        style={{
          position: 'relative',
          width: 'min(310px, 80vw)',
          aspectRatio: '3 / 2',
          perspective: 1400,
          zIndex: 2,
        }}
      >
        {/* back panel */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: paper,
            borderRadius: 4,
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}
        />

        {/* the card, tucked inside, rising out */}
        <motion.div
          initial={{ y: 0 }}
          animate={opening ? { y: '-58%' } : { y: 0 }}
          transition={{ duration: 1.1, ease: EASE_SOFT, delay: 1.0 }}
          style={{
            position: 'absolute',
            left: '5%',
            width: '90%',
            height: '92%',
            bottom: '5%',
            background: 'linear-gradient(165deg, #fffaf2 0%, #fdf4e6 100%)',
            border: '1px solid rgba(201,148,42,0.45)',
            borderRadius: 3,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '11%',
            boxShadow: '0 -6px 22px rgba(74,15,32,0.14)',
          }}
        >
          <div className="label" style={{ fontSize: 8.5, color: 'var(--gold-deep)' }}>
            You Are Invited
          </div>
          <div className="script" style={{ fontSize: 25, color: 'var(--royal)', marginTop: 7 }}>
            {couple.initials.left} &amp; {couple.initials.right}
          </div>
        </motion.div>

        {/* Front face. Deliberately a full rectangle: clipping it into a V
            leaves the card showing through as two bright wings on either side
            of the flap. A real envelope is a flat front with the flap laid
            over it — the flap's own edges supply the V. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: paperDark,
            zIndex: 3,
            borderRadius: 4,
          }}
        />

        {/* top flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={opening ? { rotateX: -172 } : { rotateX: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.34 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '64%',
            background: paperFlap,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: stage === 'flapBack' ? 1 : 5,
            filter: 'drop-shadow(0 4px 5px rgba(74,15,32,0.34))',
          }}
        >
          <svg
            viewBox="0 0 300 128"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <path
              d="M0 0 L150 128 L300 0"
              fill="none"
              stroke="rgba(201,148,42,0.6)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>

        {/* wax seal, pressed onto the flap's point */}
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={opening ? { scale: 1.45, opacity: 0, rotate: 14 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: 'absolute',
            top: '62%',
            left: '50%',
            width: 58,
            height: 58,
            marginLeft: -29,
            marginTop: -29,
            borderRadius: '50%',
            zIndex: 6,
            background:
              'radial-gradient(circle at 34% 30%, #8c2440 0%, #5d1528 55%, #3d0c18 100%)',
            border: '1.5px solid rgba(242,221,171,0.65)',
            boxShadow:
              '0 6px 16px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,220,160,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="script"
            style={{
              fontSize: 20,
              color: 'var(--gold-light)',
              lineHeight: 1,
              paddingBottom: 2,
            }}
          >
            {couple.initials.left}
            <span style={{ fontSize: 13, opacity: 0.85 }}>&amp;</span>
            {couple.initials.right}
          </span>
        </motion.div>
      </div>

      {/* ---- Tap prompt ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: opening ? 0 : 1.1 }}
        style={{ marginTop: 40, textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        <motion.div
          animate={{ opacity: [0.45, 1, 0.45], y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="label"
          style={{ color: 'var(--gold-light)', fontSize: 10.5 }}
        >
          Tap to open
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* Slow drifting gold specks — gives the dark ground some depth. */
function FloatingMotes() {
  const motes = [
    { l: 12, t: 22, s: 3, d: 11, dl: 0 },
    { l: 84, t: 18, s: 2, d: 14, dl: 1.5 },
    { l: 22, t: 74, s: 2, d: 13, dl: 3 },
    { l: 74, t: 68, s: 3, d: 12, dl: 0.8 },
    { l: 48, t: 12, s: 2, d: 15, dl: 2.2 },
    { l: 62, t: 86, s: 2, d: 12, dl: 4 },
    { l: 8, t: 50, s: 2, d: 16, dl: 1.1 },
    { l: 92, t: 46, s: 3, d: 13, dl: 2.8 },
  ]
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    >
      {motes.map((m, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -26, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: m.d, repeat: Infinity, delay: m.dl, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${m.l}%`,
            top: `${m.t}%`,
            width: m.s,
            height: m.s,
            borderRadius: '50%',
            background: 'var(--gold-light)',
            boxShadow: '0 0 6px 1px rgba(242,221,171,0.6)',
          }}
        />
      ))}
    </div>
  )
}
