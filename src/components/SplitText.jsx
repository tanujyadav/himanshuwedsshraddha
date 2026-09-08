import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { wordVariant, letterVariant, inView } from '../animations'

/* Animates text in one unit at a time as it scrolls into view.
   `by="word"` rises each word out of an overflow mask; `by="letter"` fades
   letters up without a mask (masking single letters clips their descenders).

   The full string is exposed once via aria-label and the pieces are hidden
   from assistive tech, so a screen reader reads "The Wedding", not "T h e". */
export default function SplitText({
  text,
  by = 'word',
  stagger,
  delay = 0,
  className = '',
  style = {},
  tag = 'span',
}) {
  const Tag = motion[tag] ?? motion.span
  const masked = by === 'word'
  const units = masked ? String(text).split(' ') : Array.from(String(text))
  const variant = masked ? wordVariant : letterVariant
  const step = stagger ?? (masked ? 0.075 : 0.035)

  return (
    <Tag
      className={className}
      style={style}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {units.map((unit, i) => (
        <Fragment key={`${unit}-${i}`}>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              // Descenders (g, y, p) would be shaved off by the mask otherwise.
              ...(masked
                ? { overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }
                : {}),
            }}
          >
            <motion.span variants={variant} style={{ display: 'inline-block' }}>
              {unit === ' ' ? ' ' : unit}
            </motion.span>
          </span>
          {/* The inter-word space MUST sit outside the inline-block above — a
              trailing space inside one is collapsed away, which silently runs
              every word together. It also has to be a real space, not an nbsp,
              so paragraphs still wrap. */}
          {masked && i < units.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
