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

/* Om (ॐ) — set in a Devanagari face rather than hand-drawn. The glyph is a
   precise, community-recognised symbol; approximating it in SVG risks
   getting the form subtly wrong. Sat via .devanagari (index.css) which loads
   Noto Sans Devanagari for exactly this. */
export function Om({ size = 22, color = 'var(--gold)' }) {
  return (
    <span
      aria-hidden="true"
      className="devanagari"
      style={{ display: 'inline-block', fontSize: size, color, lineHeight: 1 }}
    >
      ॐ
    </span>
  )
}

/* Ganesha — the elephant-headed deity invoked at the start of an undertaking,
   printed traditionally at the top of Indian wedding invitations as a
   blessing. A seated silhouette (crown, big fan ears, a properly tapered
   trunk curling to one side, one hand raised in blessing, the other holding
   a modak, a bell-shaped seated form) built from filled shapes rather than
   thin single-width outlines — solid fills read as a carved or foil-stamped
   idol at small sizes; a thin stroke sketch (the first pass at this) reads
   as a diagram instead. Single flat colour throughout, in the same
   abstracted spirit as this file's other motifs — this is not attempting
   realism, only to be unmistakably recognisable as Ganesha. */
export function Ganesha({ size = 64, color = 'var(--royal)' }) {
  // `size` is the WIDTH; height follows the viewBox's own 100:116 aspect
  // (the seated body makes it taller than it is wide) so it's never
  // stretched or squashed by a caller passing a single square size.
  return (
    <svg
      width={size}
      height={(size * 116) / 100}
      viewBox="0 0 100 116"
      fill="none"
      aria-hidden="true"
    >
      <g fill={color}>
        {/* seated body, bell-shaped — folded legs read as a single draped form */}
        <path d="M29 112 Q25 82 50 78 Q75 82 71 112 Q71 115 67 115 L33 115 Q29 115 29 112 Z" />
        {/* belly */}
        <circle cx="50" cy="79" r="14" />
        {/* left arm, raised in blessing (abhaya mudra) */}
        <ellipse cx="24" cy="62" rx="6.5" ry="15" transform="rotate(-30 24 62)" />
        <circle cx="16" cy="46" r="6.5" />
        {/* right arm, resting with the modak */}
        <ellipse cx="72" cy="82" rx="6.5" ry="13" transform="rotate(25 72 82)" />
        <circle cx="80" cy="92" r="7" />
        {/* fan-shaped ears */}
        <path d="M20 28 Q2 26 2 44 Q2 60 20 60 Q30 58 28 44 Q30 32 20 28 Z" />
        <path d="M80 28 Q98 26 98 44 Q98 60 80 60 Q70 58 72 44 Q70 32 80 28 Z" />
        {/* head */}
        <circle cx="50" cy="42" r="22" />
        {/* crown */}
        <path d="M30 24 Q50 2 70 24 Q70 29 63 29 L37 29 Q30 29 30 24 Z" />
        <circle cx="50" cy="4" r="3.4" />
        {/* tusk */}
        <path d="M37 52 L31 60 L36 61 Z" />
      </g>

      {/* trunk — a proper taper, not a constant-width line: two curves
          closed into one filled shape, wide at the face, narrowing to a
          small curl at the tip. */}
      <path
        d="M42 56
           C36 68 34 80 42 90
           C46 95 54 96 58 91
           C54 93 49 91 47 87
           C43 80 45 70 50 62
           C53 58 53 54 49 53
           C46 52 43 53 42 56 Z"
        fill={color}
      />

      {/* eyes, a shade lighter so they read as detail rather than holes */}
      <circle cx="42" cy="39" r="2.3" fill={color} opacity="0.45" />
      <circle cx="58" cy="39" r="2.3" fill={color} opacity="0.45" />
    </svg>
  )
}
