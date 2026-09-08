/* Shared Framer Motion variants. Imported by every slide so the whole
   invitation moves with one consistent rhythm. */

export const EASE = [0.22, 1, 0.36, 1]
export const EASE_SOFT = [0.16, 1, 0.3, 1]

/* Standard scroll-reveal viewport config. `once: true` matters — without it
   slides re-animate every time they scroll back in, which reads as jittery. */
export const inView = { once: true, amount: 0.25 }
export const inViewEarly = { once: true, margin: '-60px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

/* Soft focus-pull: text arrives slightly out of focus and settles. */
export const blurIn = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

/* Per-word / per-letter pieces used by <SplitText>.
   Transform + opacity only — no CSS filters. These run on dozens of spans at
   once and blur() on each one drops frames badly on mid-range phones. */
export const wordVariant = {
  hidden: { opacity: 0, y: '0.55em' },
  visible: {
    opacity: 1, y: '0em',
    transition: { duration: 0.75, ease: EASE },
  },
}

export const letterVariant = {
  hidden: { opacity: 0, y: '0.45em' },
  visible: {
    opacity: 1, y: '0em',
    transition: { duration: 0.6, ease: EASE },
  },
}

/* Gold hairline that draws itself outward from the centre. */
export const drawLine = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 1.1, ease: EASE },
  },
}
