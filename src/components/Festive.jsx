/* Festive decorations borrowed from a real Indian wedding venue: rose petals
   drifting down, lit diyas and brass bells. All inline
   SVG + CSS keyframes (see index.css) — no image assets, and every piece is
   aria-hidden since none of it carries meaning. */

import { motion } from 'framer-motion'
import { EASE, inView } from '../animations'

/* Rose and marigold petals drifting down over the invitation column. */
const PETALS = [
  { l: 6, d: 13, dl: 0, s: 14, c: '#e0607e' },
  { l: 18, d: 17, dl: -6, s: 11, c: '#f28c18' },
  { l: 29, d: 15, dl: -11, s: 13, c: '#c9365a' },
  { l: 41, d: 19, dl: -3, s: 10, c: '#f7b928' },
  { l: 52, d: 14, dl: -9, s: 15, c: '#e0607e' },
  { l: 63, d: 18, dl: -14, s: 11, c: '#c9365a' },
  { l: 74, d: 16, dl: -5, s: 13, c: '#f28c18' },
  { l: 85, d: 20, dl: -12, s: 12, c: '#e0607e' },
  { l: 94, d: 15, dl: -8, s: 10, c: '#f7b928' },
  { l: 35, d: 21, dl: -17, s: 12, c: '#e0607e' },
]

export function PetalShower() {
  return (
    <div className="petal-shower" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal-fall"
          style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }}
        >
          <svg
            className="petal-sway"
            width={p.s}
            height={p.s}
            viewBox="0 0 20 20"
            style={{ animationDuration: `${p.d / 4}s`, animationDelay: `${p.dl}s` }}
          >
            <path d="M10 1 C17 5 17 14 10 19 C3 14 3 5 10 1 Z" fill={p.c} opacity="0.85" />
            <path d="M10 3 L10 16" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          </svg>
        </span>
      ))}
    </div>
  )
}

/* A lit clay diya with a flickering flame and a soft glow. */
export function Diya({ size = 44, delay = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0" stopColor="rgba(255,200,90,0.75)" />
          <stop offset="1" stopColor="rgba(255,200,90,0)" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff7a00" />
          <stop offset="0.55" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#fff6d6" />
        </linearGradient>
        <linearGradient id="diya-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2a646" />
          <stop offset="1" stopColor="#8b4a12" />
        </linearGradient>
      </defs>
      <circle className="diya-glow" cx="30" cy="26" r="22" fill="url(#diya-glow)" style={{ animationDelay: `${delay}s` }} />
      <path
        className="diya-flame"
        d="M30 10 C35 18 35 25 30 30 C25 25 25 18 30 10 Z"
        fill="url(#diya-flame)"
        style={{ animationDelay: `${delay}s` }}
      />
      <path d="M8 34 Q30 30 52 34 Q48 50 30 51 Q12 50 8 34 Z" fill="url(#diya-bowl)" />
      <path d="M8 34 Q30 38 52 34" fill="none" stroke="#f2ddab" strokeWidth="1.2" opacity="0.8" />
      <circle cx="21" cy="43" r="1.6" fill="#f2ddab" opacity="0.7" />
      <circle cx="30" cy="45" r="1.6" fill="#f2ddab" opacity="0.7" />
      <circle cx="39" cy="43" r="1.6" fill="#f2ddab" opacity="0.7" />
    </svg>
  )
}

/* Twinkling gold sparkles scattered over a dark photo. */
export function Sparkles({ items }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {items.map((s, i) => (
        <svg
          key={i}
          className="sparkle"
          width={s.s}
          height={s.s}
          viewBox="0 0 20 20"
          style={{ position: 'absolute', left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.dl}s` }}
        >
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#ffeec2" />
        </svg>
      ))}
    </div>
  )
}

/* Rich paper ground: a faint gold damask lattice over fine linen weave, with
   a warm vignette. Sits behind a section's content — the section needs
   `isolation: isolate` so the negative z-index stays inside it. */
export function Texture() {
  return <div aria-hidden="true" className="texture" />
}

/* Gold filigree divider: scrolling vines either side of a lotus. The vines
   draw themselves outward from the centre, then the lotus blooms. */
const VINE = [
  'M88 15 C78 15 74 6 63 6 C52 6 50 17 39 17 C29 17 27 10 18 10 C12 10 8 14 3 14',
  'M63 6 C60 12 66 16 69 11',
  'M39 17 C42 11 35 7 33 12',
  'M18 10 C19 6 23 5 25 7',
]

export function Filigree({ width = 200, color = 'var(--gold)', delay = 0 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: EASE, delay: delay + 0.15 * i },
    }),
  }
  const vines = (flip) => (
    <g transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
      {VINE.map((d, i) => (
        <motion.path key={i} d={d} custom={i} variants={draw} stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
      ))}
      <motion.circle cx="3" cy="14" r="1.6" fill={color} variants={draw} custom={4} />
    </g>
  )
  return (
    <motion.svg
      width={width}
      height={(width * 26) / 200}
      viewBox="0 0 200 26"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      {vines(false)}
      {vines(true)}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: delay + 0.5 } },
        }}
        style={{ originX: 0.5, originY: 1 }}
        fill={color}
      >
        <path d="M100 2 C104.5 8 104.5 15 100 21 C95.5 15 95.5 8 100 2 Z" />
        <path d="M100 21 C93 19 88.5 13.5 87.5 8 C94 9.5 98 14.5 100 21 Z" opacity="0.75" />
        <path d="M100 21 C107 19 111.5 13.5 112.5 8 C106 9.5 102 14.5 100 21 Z" opacity="0.75" />
        <path d="M89 23 L111 23" stroke={color} strokeWidth="1" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  )
}

/* A brass temple bell on a short chain, swinging gently. */
export function Bell({ chain = 40, delay = 0, style = {} }) {
  return (
    <svg
      className="bell-swing"
      width="24"
      height={chain + 34}
      viewBox={`0 0 24 ${chain + 34}`}
      aria-hidden="true"
      style={{ animationDelay: `${delay}s`, overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id="bell-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8b6210" />
          <stop offset="0.45" stopColor="#f2ddab" />
          <stop offset="1" stopColor="#a8761c" />
        </linearGradient>
      </defs>
      <line x1="12" y1="0" x2="12" y2={chain} stroke="var(--gold-deep)" strokeWidth="1.2" strokeDasharray="2.5 1.5" />
      <g transform={`translate(0 ${chain})`}>
        <circle cx="12" cy="2" r="2.2" fill="none" stroke="var(--gold-deep)" strokeWidth="1.2" />
        <path d="M12 4 C6 4 4 10 4 18 L1.5 23 L22.5 23 L20 18 C20 10 18 4 12 4 Z" fill="url(#bell-brass)" />
        <path d="M2 23 L22 23" stroke="#8b6210" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6 14 L18 14" stroke="#8b6210" strokeWidth="0.7" opacity="0.6" />
        <circle className="bell-clapper" cx="12" cy="27" r="2.4" fill="#a8761c" />
      </g>
    </svg>
  )
}

/* Gold flourishes in the four corners of a photograph, drawn in on scroll. */
export function PhotoCorners({ color = '#fdf3dc', size = 38, inset = 10 }) {
  const corners = [
    { top: inset, left: inset, t: 'none' },
    { top: inset, right: inset, t: 'scaleX(-1)' },
    { bottom: inset, left: inset, t: 'scaleY(-1)' },
    { bottom: inset, right: inset, t: 'scale(-1, -1)' },
  ]
  return corners.map(({ t, ...pos }, i) => (
    <motion.svg
      key={i}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      style={{
        position: 'absolute',
        ...pos,
        transform: t,
        zIndex: 2,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 1px 2px rgba(43,8,18,0.45))',
      }}
    >
      {['M2 38 L2 10 C2 5 5 2 10 2 L38 2', 'M8 30 C8 16 16 8 30 8', 'M10 2 C10 8 14 10 18 8'].map((d, k) => (
        <motion.path
          key={k}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={k ? 1 : 1.4}
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 0.95, transition: { duration: 1.2, ease: EASE, delay: 0.3 + k * 0.2 } },
          }}
        />
      ))}
      <circle cx="30" cy="8" r="1.6" fill={color} />
    </motion.svg>
  ))
}
