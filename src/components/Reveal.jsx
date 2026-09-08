import { motion } from 'framer-motion'
import { fadeUp, inView } from '../animations'

/* Thin wrapper so slides don't repeat the same four scroll-reveal props. */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = '',
  style = {},
  viewport = inView,
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
