import { motion } from 'framer-motion'
import { EASE, inView } from '../animations'

/* Gold hairline divider with a centre diamond. The rules draw outward from
   the middle and the diamond settles in — used to separate every section. */
export default function Ornament({ width = 150, color = 'var(--gold)', delay = 0 }) {
  const rule = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE, delay } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width,
        margin: '0 auto',
      }}
    >
      <motion.span
        variants={rule}
        style={{ flex: 1, height: 1, background: color, transformOrigin: 'right center', opacity: 0.55 }}
      />
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: -45, opacity: 0 },
          visible: {
            scale: 1, rotate: 45, opacity: 1,
            transition: { duration: 0.7, ease: EASE, delay: delay + 0.25 },
          },
        }}
        style={{ width: 5, height: 5, background: color, display: 'block' }}
      />
      <motion.span
        variants={rule}
        style={{ flex: 1, height: 1, background: color, transformOrigin: 'left center', opacity: 0.55 }}
      />
    </motion.div>
  )
}
