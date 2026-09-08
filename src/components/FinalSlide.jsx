import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { blurIn, fadeUp, inView } from '../animations'
import { closing, couple, invitation } from '../data/wedding'

/* Closing screen over the overhead staircase frame — the moodiest photograph
   of the set, which suits a dark sign-off.

   public/img/closing.jpg is pre-cropped: the couple stand at x 47-78% of the
   original landscape frame, so a tall full-bleed crop centred by default cut
   the groom straight off. The empty left-hand stairs are trimmed away in the
   file and objectPosition leans left of centre, which keeps both of them in
   view at every phone width.

   They land in the upper third of the frame as a result, so the wording is
   bottom-aligned rather than centred — centred, it sat right on top of them. */
export default function FinalSlide() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'max(96svh, 620px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Photo name="closing" alt="" objectPosition="45% 50%" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(29,6,13,0.55) 0%, rgba(29,6,13,0.34) 26%, rgba(29,6,13,0.68) 52%, rgba(29,6,13,0.92) 78%, rgba(29,6,13,0.96) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '0 26px 46px',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <div className="label" style={{ color: 'var(--gold-light)' }}>
            {invitation.city}
          </div>
        </Reveal>

        <div style={{ margin: '18px 0 20px' }}>
          <Ornament width={120} color="var(--gold-light)" />
        </div>

        {/* Letter mode, not word: word mode wraps each word in an overflow
            mask, and Great Vibes descenders hang far enough below the baseline
            to be shaved off by it. */}
        <SplitText
          tag="div"
          text={closing.line1}
          by="letter"
          stagger={0.03}
          className="script shimmer-light"
          style={{ fontSize: 42 }}
        />
        <SplitText
          tag="div"
          text={closing.line2}
          by="letter"
          stagger={0.03}
          delay={0.4}
          className="script shimmer-light"
          style={{ fontSize: 42 }}
        />

        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          style={{ marginTop: 32 }}
        >
          <p
            className="body-text"
            style={{
              color: 'rgba(253,248,240,0.8)',
              fontSize: 14,
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {closing.note}
          </p>
          <div
            className="script"
            style={{ fontSize: 34, color: 'var(--gold-light)', marginTop: 8 }}
          >
            {couple.groom.name} &amp; {couple.bride.name}
          </div>
        </motion.div>

        {/* ---- RSVP ---- */}
        {closing.rsvpName ? (
          <Reveal variants={fadeUp} delay={0.15}>
            <div
              className="frost"
              style={{ marginTop: 30, padding: '16px 20px', display: 'inline-block' }}
            >
              <div className="label" style={{ color: 'var(--gold-light)', fontSize: 8.5 }}>
                RSVP
              </div>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 16,
                  color: '#fdf8f0',
                  marginTop: 7,
                }}
              >
                {closing.rsvpName}
              </div>
              {closing.rsvpPhone ? (
                <a
                  href={`tel:${closing.rsvpPhone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-block',
                    marginTop: 6,
                    fontFamily: 'var(--serif)',
                    fontSize: 15,
                    color: 'var(--gold-light)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(242,221,171,0.45)',
                    paddingBottom: 1,
                  }}
                >
                  {closing.rsvpPhone}
                </a>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {couple.hashtag ? (
          <Reveal variants={fadeUp} delay={0.2}>
            <div
              className="label"
              style={{ marginTop: 30, color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              {couple.hashtag}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
