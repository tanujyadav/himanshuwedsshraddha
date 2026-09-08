import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import { EASE, blurIn } from '../animations'
import { couple, weddingDate, invitation } from '../data/wedding'

/* Opening screen: full-bleed portrait, names in gold foil on a frosted panel.

   public/img/hero.jpg is deliberately pre-cropped to a tall 1:2 portrait
   rather than the 2:3 the camera shot. The phone column is ~430x975, an
   aspect near 0.44, so `cover` on the original crops horizontally only and
   renders the photo's FULL height — which on that frame is 43% empty ceiling
   above their heads. No objectPosition can fix that; the crop has to happen
   in the file. Faces now land around 20-35% of the frame, well clear of the
   names panel. Re-crop to a similar aspect if you swap the photo. */
export default function HeroSlide() {
  const d = new Date(weddingDate)
  const dateLine = `${String(d.getDate()).padStart(2, '0')} . ${String(
    d.getMonth() + 1
  ).padStart(2, '0')} . ${d.getFullYear()}`

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden' }}>
      <Photo name="hero" alt="" priority kenburns objectPosition="50% 25%" />

      {/* legibility scrims: light at the top for the label, deep at the base */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(36,7,16,0.55) 0%, rgba(36,7,16,0.12) 26%, rgba(36,7,16,0.05) 48%, rgba(36,7,16,0.62) 82%, rgba(36,7,16,0.86) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* ---- TOP ---- */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          style={{ padding: '38px 24px 0', textAlign: 'center' }}
        >
          <div className="label" style={{ color: 'var(--gold-light)' }}>
            {invitation.eyebrow}
          </div>
          <div style={{ marginTop: 14 }}>
            <Ornament width={92} color="var(--gold-light)" />
          </div>
        </motion.div>

        {/* faces sit in this gap — keep it breathing */}
        <div style={{ flex: 1, minHeight: 120 }} />

        {/* ---- BOTTOM ---- */}
        <div style={{ padding: '0 12px 26px' }}>
          <motion.div
            className="frost"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.65 }}
            style={{ padding: '22px 20px 24px', textAlign: 'center' }}
          >
            <motion.div
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.95 }}
              className="script shimmer-light"
              style={{ fontSize: 42, lineHeight: 1.06 }}
            >
              {couple.groom.name}
            </motion.div>

            <div
              className="serif-caps"
              style={{
                fontSize: 11,
                color: 'var(--gold-light)',
                opacity: 0.9,
                margin: '4px 0 2px',
              }}
            >
              and
            </div>

            <motion.div
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.15 }}
              className="script shimmer-light"
              style={{ fontSize: 42, lineHeight: 1.06 }}
            >
              {couple.bride.name}
            </motion.div>

            <div style={{ margin: '16px 0 14px' }}>
              <Ornament width={110} color="var(--gold-light)" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div
                className="serif-caps"
                style={{ fontSize: 14, color: '#fdf8f0', letterSpacing: '0.26em' }}
              >
                {dateLine}
              </div>
              <div
                className="label"
                style={{ marginTop: 9, color: 'var(--gold-light)', opacity: 0.85 }}
              >
                {invitation.city}
              </div>
            </motion.div>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}
          >
            <motion.div
              animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <span className="label" style={{ fontSize: 8.5, color: 'var(--gold-light)' }}>
                Scroll
              </span>
              <span
                aria-hidden="true"
                style={{ width: 1, height: 22, background: 'var(--gold-light)', opacity: 0.7 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
