import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Ornament from './Ornament'
import Reveal from './Reveal'
import { blurIn, fadeUp, inView } from '../animations'
import { couple, invitation } from '../data/wedding'

/* The formal wording, set on ivory. This is the quiet page between two
   photographs, so the type does all the work. */
export default function InvitationSlide() {
  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: '68px 26px 74px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* The same invocation printed atop the envelope front, repeated here
          since this is the first formal page a guest reads. */}
      <Reveal>
        <div
          className="devanagari"
          style={{ fontSize: 13, fontWeight: 500, color: 'var(--gold-deep)', marginBottom: 14 }}
        >
          ॥ श्री गणेशाय नमः ॥
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="label">{invitation.formalEyebrow}</div>
      </Reveal>

      <div style={{ margin: '20px 0 26px' }}>
        <Ornament width={128} />
      </div>

      <SplitText
        tag="p"
        text={invitation.lead}
        by="word"
        className="body-text"
        style={{ margin: '0 auto 34px', maxWidth: 300, fontStyle: 'italic' }}
      />

      {/* ---- Groom ---- */}
      <motion.div
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="script shimmer"
        style={{ fontSize: 52 }}
      >
        {couple.groom.name}
      </motion.div>
      <Reveal variants={fadeUp} delay={0.15}>
        <p
          className="body-text"
          style={{ fontSize: 13, margin: '8px 0 0', color: 'var(--text-soft)' }}
        >
          {couple.groom.parents}
        </p>
      </Reveal>

      {/* ---- Joiner ---- */}
      <Reveal variants={fadeUp} delay={0.1}>
        <div
          className="script"
          style={{ fontSize: 30, color: 'var(--gold)', margin: '4px 0 0' }}
        >
          and
        </div>
      </Reveal>

      {/* ---- Bride ---- */}
      <motion.div
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="script shimmer"
        style={{ fontSize: 52 }}
      >
        {couple.bride.name}
      </motion.div>
      <Reveal variants={fadeUp} delay={0.15}>
        <p
          className="body-text"
          style={{ fontSize: 13, margin: '8px 0 0', color: 'var(--text-soft)' }}
        >
          {couple.bride.parents}
        </p>
      </Reveal>

      <div style={{ margin: '32px 0 28px' }}>
        <Ornament width={128} />
      </div>

      <SplitText
        tag="p"
        text={invitation.blessing}
        by="word"
        stagger={0.028}
        className="body-text"
        style={{ margin: '0 auto', maxWidth: 312 }}
      />

      {couple.hashtag ? (
        <Reveal variants={fadeUp} delay={0.2}>
          <div
            className="label"
            style={{ marginTop: 34, color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            {couple.hashtag}
          </div>
        </Reveal>
      ) : null}
    </section>
  )
}
