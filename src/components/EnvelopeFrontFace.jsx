import { motion } from 'framer-motion'
import { EASE } from '../animations'
import { Om } from './Motifs'

// A real illustrated Ganesha (gold line-art on transparent PNG) rather than
// a hand-drawn SVG — a flat vector approximation never read as convincingly
// as an actual illustration at this size. See public/img/ganesha.png.
const GANESHA_SRC = '/img/ganesha.png'

/* The card's front — what a guest sees before anything moves.

   Traditional Indian invitations print an invocation to Ganesha (remover of
   obstacles, invoked at the start of any undertaking) at the top, often paired
   with the Om symbol. This mirrors that convention rather than reusing the
   envelope's plain paper — it needed its own design, not a relabelled back. */
export default function EnvelopeFrontFace() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #fdf7ea 0%, #f6e9cd 55%, #eeddb8 100%)',
        // Double gold rule, inset from the paper edge like a printed card.
        boxShadow:
          '0 0 0 5px #fdf7ea, 0 0 0 6.5px rgba(201,148,42,0.4), 0 20px 40px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: '5% 10%',
      }}
    >
      <FloralCorner corner="tl" />
      <FloralCorner corner="tr" />
      <FloralCorner corner="bl" />
      <FloralCorner corner="br" />

      {/* The customary opening line printed above Ganesha on a Hindu
          invitation: "|| Shree Ganeshaya Namah ||" — salutations to Ganesha.
          Sized down from the first pass to make room for the couple photo
          below — this landscape box is tight on height. */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="devanagari"
        style={{
          fontSize: 10.5,
          fontWeight: 500,
          color: 'var(--gold-deep)',
          letterSpacing: '0.02em',
        }}
      >
        ॥ श्री गणेशाय नमः ॥
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
      >
        <Om size={14} color="var(--gold-deep)" />
      </motion.div>

      <motion.img
        src={GANESHA_SRC}
        alt=""
        loading="eager"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.46 }}
        style={{
          width: 44,
          height: 44,
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 3px rgba(74,15,32,0.28))',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.68 }}
        className="devanagari"
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: 'var(--royal)',
          marginTop: 1,
        }}
      >
        शुभ विवाह
      </motion.div>

      {/* The couple, a real photo rather than an illustration — same reasoning
          as Ganesha above: an actual photograph reads far better at this size
          than a drawn approximation. Reuses public/img/hero.jpg (already
          cropped so their faces sit in its upper third) rather than a
          separate asset. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          overflow: 'hidden',
          marginTop: 2,
          border: '2px solid var(--gold)',
          boxShadow: '0 0 0 3px #fdf7ea, 0 3px 6px rgba(74,15,32,0.35)',
        }}
      >
        <img
          src="/img/hero.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // Their faces sit around 45-60% down this frame, not near the
            // top — the tall stone arch behind them fills the upper half.
            objectPosition: '50% 58%',
          }}
        />
      </motion.div>
    </div>
  )
}

/* One small gold corner paisley, mirrored per corner via CSS transforms
   rather than four hand-drawn variants. */
function FloralCorner({ corner }) {
  const pos = {
    tl: { top: 8, left: 8 },
    tr: { top: 8, right: 8, transform: 'scaleX(-1)' },
    bl: { bottom: 8, left: 8, transform: 'scaleY(-1)' },
    br: { bottom: 8, right: 8, transform: 'scale(-1, -1)' },
  }[corner]

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute', opacity: 0.5, ...pos }}
    >
      <path
        d="M2 2 C10 2 10 10 18 10 C14 10 14 14 18 18"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="1.6" fill="var(--gold)" />
    </svg>
  )
}
