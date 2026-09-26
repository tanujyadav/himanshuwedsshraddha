import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import { Mandala, CornerBrackets, AndRule } from './Motifs'
import { EASE, blurIn } from '../animations'
import { couple, weddingDate, invitation } from '../data/wedding'

/* Opening screen, built like a printed invitation card.

   A gold crest sits above an arched photograph set inside a double rule, and
   the wording runs below on ivory over a faint mandala. Nothing
   is overlaid on the photo itself — an overlay panel always lands on the
   couple, because they occupy the middle of every frame in this shoot and
   `cover` gives no way to move them.

   The photo block's aspect ratio matches public/img/hero.jpg exactly (25/32),
   so `cover` has nothing to crop and the frame is never clipped. Shortening
   was done in the file instead — trimmed from the bottom of the gown, which
   is expendable, rather than letting CSS shave the tops of their heads. */
export default function HeroSlide() {
  const d = new Date(weddingDate)
  const dateLine = `${String(d.getDate()).padStart(2, '0')} . ${String(
    d.getMonth() + 1
  ).padStart(2, '0')} . ${d.getFullYear()}`

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Warm glow rather than flat paper.
        background:
          'radial-gradient(120% 65% at 50% 8%, #fffdf8 0%, var(--cream) 42%, var(--cream-warm) 100%)',
        paddingBottom: 30,
      }}
    >
      <CornerBrackets />

      {/* ---- Ganesha, then the arched photograph ----
          The same illustrated image used on the envelope front
          (public/img/ganesha.png), small, in place of the abstract diamond
          crest this spot used to hold. */}
      <div style={{ padding: '14px 26px 0', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
        >
          <img
            src="/img/ganesha.png"
            alt=""
            style={{
              width: 40,
              height: 40,
              objectFit: 'contain',
              filter: 'drop-shadow(0 1px 2px rgba(74,15,32,0.25))',
            }}
          />
        </motion.div>

        {/* Flex row so the arch can size from its height: on a short phone the
            height cap wins and the arch simply gets smaller, keeping the names
            above the fold. It never crops — aspectRatio holds, so the frame
            shrinks rather than being clipped. */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE }}
          style={{
            position: 'relative',
            aspectRatio: '25 / 32',
            height: 'min(50svh, 470px)',
            maxWidth: '100%',
            // Dome top, barely-rounded base — the mandap arch.
            borderRadius: '48% 48% 6px 6px / 31% 31% 1% 1%',
            overflow: 'hidden',
            border: '1px solid rgba(201,148,42,0.55)',
            // Double rule: cream gap, then a second finer gold line outside it.
            boxShadow:
              '0 0 0 5px var(--cream), 0 0 0 6px rgba(201,148,42,0.32), 0 20px 44px rgba(74,15,32,0.18)',
          }}
        >
          <Photo name="hero" alt="" priority kenburns objectPosition="50% 50%" />
        </motion.div>
        </div>
      </div>

      {/* ---- Wording ---- */}
      <div style={{ position: 'relative', padding: '30px 26px 0', textAlign: 'center' }}>
        {/* mandala watermark behind the names */}
        <div
          style={{
            position: 'absolute',
            top: 26,
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <Mandala size={300} opacity={0.055} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            <div className="label">{invitation.eyebrow}</div>
          </motion.div>

          <div style={{ margin: '13px 0 10px' }}>
            <Ornament width={104} delay={0.5} />
          </div>

          <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.65 }}
            className="script shimmer"
            style={{ fontSize: 50 }}
          >
            {couple.groom.name}
          </motion.div>

          <AndRule />

          <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85 }}
            className="script shimmer"
            style={{ fontSize: 50 }}
          >
            {couple.bride.name}
          </motion.div>

          <div style={{ margin: '14px 0 16px' }}>
            <Ornament width={132} delay={1} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div
              className="serif-caps"
              style={{ fontSize: 15, color: 'var(--text-dark)', letterSpacing: '0.28em' }}
            >
              {dateLine}
            </div>
            <div className="label" style={{ marginTop: 11, color: 'var(--text-soft)' }}>
              {invitation.city}
            </div>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}
          >
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <span className="label" style={{ fontSize: 8.5, color: 'var(--gold)' }}>
                Scroll
              </span>
              <span
                aria-hidden="true"
                style={{ width: 1, height: 20, background: 'var(--gold)', opacity: 0.65 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
