import { motion } from 'framer-motion'
import { EASE } from '../animations'

/* Decorative gold motifs. All inline SVG — no image assets, and they scale
   cleanly on any screen. Every one is aria-hidden: they carry no meaning. */

/* Small crest that sits at the apex of the photograph's arch. A vertical
   diamond with two side scrolls, the way a printed card would set it. */
export function Crest({ size = 44, color = 'var(--gold)' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, y: -10, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
    >
      {/* centre diamond */}
      <path d="M22 6 L28 16 L22 26 L16 16 Z" fill={color} opacity="0.9" />
      {/* dot above */}
      <circle cx="22" cy="3" r="1.6" fill={color} />
      {/* side scrolls */}
      <path
        d="M15 17 C9 17 5 20 3 24 C7 23 11 22 14 20"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M29 17 C35 17 39 20 41 24 C37 23 33 22 30 20"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* stem */}
      <path d="M22 27 L22 36" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <circle cx="22" cy="38.5" r="1.8" stroke={color} strokeWidth="1" />
    </motion.svg>
  )
}

/* Large, very faint mandala set behind the wording so the ivory has depth
   instead of reading as blank paper. Petals are generated rather than drawn
   by hand so the ring stays perfectly even. */
export function Mandala({ size = 330, color = 'var(--gold)', opacity = 0.07 }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="0.9" fill="none">
        <circle cx="100" cy="100" r="94" />
        <circle cx="100" cy="100" r="74" />
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="12" />
        {petals.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <ellipse cx="100" cy="57" rx="9" ry="17" />
            <path d="M100 40 L100 26" strokeLinecap="round" />
          </g>
        ))}
        {petals.map((deg) => (
          <g key={`i${deg}`} transform={`rotate(${deg + 11.25} 100 100)`}>
            <path d="M100 88 C94 76 94 68 100 60 C106 68 106 76 100 88 Z" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* Thin gold brackets at the four corners — the printed-card frame. */
export function CornerBrackets({ inset = 11, len = 26, color = 'var(--gold)' }) {
  const corners = [
    { top: inset, left: inset, rotate: 0 },
    { top: inset, right: inset, rotate: 90 },
    { bottom: inset, right: inset, rotate: 180 },
    { bottom: inset, left: inset, rotate: 270 },
  ]
  return (
    <>
      {corners.map((c, i) => {
        const { rotate, ...pos } = c
        return (
          <motion.svg
            key={i}
            width={len}
            height={len}
            viewBox="0 0 26 26"
            fill="none"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.6 }}
            style={{ position: 'absolute', ...pos, transform: `rotate(${rotate}deg)`, zIndex: 3 }}
          >
            <path
              d="M0.5 26 L0.5 4 C0.5 2 2 0.5 4 0.5 L26 0.5"
              stroke={color}
              strokeWidth="1"
              opacity="0.55"
            />
            <path d="M4.5 26 L4.5 8 C4.5 6.3 6.3 4.5 8 4.5 L26 4.5" stroke={color} strokeWidth="0.7" opacity="0.3" />
          </motion.svg>
        )
      })}
    </>
  )
}

/* "and" flanked by short gold rules that draw outward. */
export function AndRule({ color = 'var(--gold)', text = 'and' }) {
  const rule = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 0.6, transition: { duration: 0.8, ease: EASE, delay: 0.9 } },
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        margin: '4px 0 2px',
      }}
    >
      <motion.span
        variants={rule}
        initial="hidden"
        animate="visible"
        style={{ width: 32, height: 1, background: color, transformOrigin: 'right center' }}
      />
      <span
        className="serif-caps"
        style={{ fontSize: 11, color: 'var(--gold-deep)', letterSpacing: '0.22em' }}
      >
        {text}
      </span>
      <motion.span
        variants={rule}
        initial="hidden"
        animate="visible"
        style={{ width: 32, height: 1, background: color, transformOrigin: 'left center' }}
      />
    </div>
  )
}
