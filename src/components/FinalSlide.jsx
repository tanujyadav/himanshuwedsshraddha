import { motion } from 'framer-motion'
import Photo from './Photo'
import Ornament from './Ornament'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { blurIn, fadeUp, inView } from '../animations'
import { closing, couple, invitation } from '../data/wedding'

/* Closing screen over the overhead staircase frame — the moodiest photograph
   of the set, which suits a dark sign-off. */
export default function FinalSlide() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '96svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Photo name="closing" alt="" objectPosition="50% 42%" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(29,6,13,0.8) 0%, rgba(29,6,13,0.5) 45%, rgba(29,6,13,0.87) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '60px 26px',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <div className="label" style={{ color: 'var(--gold-light)' }}>
            {invitation.city}
          </div>
        </Reveal>

        <div style={{ margin: '22px 0 24px' }}>
          <Ornament width={120} color="var(--gold-light)" />
        </div>

        <SplitText
          tag="div"
          text={closing.line1}
          by="word"
          className="script shimmer-light"
          style={{ fontSize: 42, lineHeight: 1.15 }}
        />
        <SplitText
          tag="div"
          text={closing.line2}
          by="word"
          delay={0.3}
          className="script shimmer-light"
          style={{ fontSize: 42, lineHeight: 1.15 }}
        />

        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          style={{ marginTop: 40 }}
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
              style={{ marginTop: 38, padding: '18px 20px', display: 'inline-block' }}
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
              style={{ marginTop: 40, color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              {couple.hashtag}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
