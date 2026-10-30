/* Festive decorations borrowed from a real Indian wedding venue: the marigold
   toran over the doorway, rose petals drifting down, and lit diyas. All inline
   SVG + CSS keyframes (see index.css) — no image assets, and every piece is
   aria-hidden since none of it carries meaning. */

const SAG = 22
const MARIGOLD = ['#f28c18', '#f7b928', '#e8640c']

/* Points along a quadratic swag from (x0, y) to (x1, y), sagging by `sag`. */
function swagPoints(x0, x1, y, sag, count) {
  const cx = (x0 + x1) / 2
  const cy = y + sag * 2
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count
    const u = 1 - t
    return {
      x: u * u * x0 + 2 * u * t * cx + t * t * x1,
      y: u * u * y + 2 * u * t * cy + t * t * y,
    }
  })
}

function Marigold({ x, y, r = 5.4, color }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle cx={x} cy={y} r={r * 0.62} fill="none" stroke="rgba(150,50,0,0.35)" strokeWidth="0.8" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.28} fill="rgba(255,240,190,0.55)" />
    </g>
  )
}

/* Marigold garland strung across the top of a section: three swags, with a
   hanging strand of flowers and a bell at each join. The strands sway. */
export function Toran({ height = 70 }) {
  const W = 400
  const joins = [0, 133, 267, 400]
  const swags = joins.slice(0, -1).flatMap((x0, i) =>
    swagPoints(x0, joins[i + 1], 6, SAG, 16).map((p, j) => ({ ...p, c: MARIGOLD[(i + j) % 3] }))
  )
  const leaves = Array.from({ length: 21 }, (_, i) => 10 + i * 19)

  return (
    <svg
      viewBox={`0 0 ${W} 90`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4f7a28" />
          <stop offset="1" stopColor="#2f5a17" />
        </linearGradient>
      </defs>

      {/* mango leaves along the top cord */}
      {leaves.map((x, i) => (
        <path
          key={x}
          d={`M${x} 2 Q${x + 6} 12 ${x} 22 Q${x - 6} 12 ${x} 2 Z`}
          fill="url(#leaf)"
          transform={`rotate(${i % 2 ? 9 : -9} ${x} 2)`}
        />
      ))}
      <line x1="0" y1="2" x2={W} y2="2" stroke="var(--gold-deep)" strokeWidth="1.2" />

      {swags.map((p, i) => (
        <Marigold key={i} x={p.x} y={p.y} color={p.c} />
      ))}

      {/* hanging strands at the inner joins and the centre of each swag */}
      {[133, 267, 66, 200, 334].map((x, i) => {
        const len = i < 2 ? 5 : 3
        const top = i < 2 ? 8 : 6 + SAG
        return (
          <g key={x} className="toran-strand" style={{ transformOrigin: `${x}px ${top}px`, animationDelay: `${i * -1.3}s` }}>
            {Array.from({ length: len }, (_, k) => (
              <Marigold key={k} x={x} y={top + 6 + k * 9.5} r={4.8} color={MARIGOLD[(k + i) % 3]} />
            ))}
            <path
              d={`M${x - 4} ${top + 6 + len * 9.5} L${x + 4} ${top + 6 + len * 9.5} L${x} ${top + 16 + len * 9.5} Z`}
              fill="var(--gold)"
            />
          </g>
        )
      })}
    </svg>
  )
}

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
