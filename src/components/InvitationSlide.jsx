import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Ornament from './Ornament'
import Reveal from './Reveal'
import { Mandala } from './Motifs'
import { Diya } from './Festive'
import { blurIn, fadeUp, inView } from '../animations'
import { couple, invitation } from '../data/wedding'

/* The formal wording, set on ivory. This is the quiet page between two
   photographs, so the type does all the work. */
export default function InvitationSlide() {
  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: '52px calc(var(--page-padding-x) - 10px) 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint mandalas peeking in from two corners. */}
      <div aria-hidden="true" className="spin-slow" style={{ position: 'absolute', top: -120, right: -120 }}>
        <Mandala size={260} opacity={0.09} />
      </div>
      <div aria-hidden="true" className="spin-slow" style={{ position: 'absolute', bottom: -120, left: -120 }}>
        <Mandala size={260} opacity={0.09} />
      </div>

      {/* Jharokha: an arched window frame, double gold rule, holding the
          whole formal wording like a printed card. */}
      <div
        style={{
          position: 'relative',
          border: '1px solid rgba(201,148,42,0.55)',
          borderRadius: '170px 170px 14px 14px',
          boxShadow:
            '0 0 0 5px var(--cream), 0 0 0 6px rgba(201,148,42,0.3), 0 18px 40px rgba(74,15,32,0.08)',
          background:
            'radial-gradient(100% 50% at 50% 0%, rgba(242,221,171,0.28) 0%, rgba(253,248,240,0) 70%)',
          padding: '44px 18px 40px',
        }}
      >
      {/* Same Ganesha + invocation printed on the envelope front and the
          hero arch, repeated here since this is the first formal page a
          guest reads. */}
      <Reveal>
        <img
          src="/img/ganesha.png"
          alt=""
          style={{
            width: 44,
            height: 44,
            objectFit: 'contain',
            margin: '0 auto 10px',
            display: 'block',
            filter: 'drop-shadow(0 1px 2px rgba(74,15,32,0.25))',
          }}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="devanagari"
          style={{ fontSize: 13, fontWeight: 500, color: 'var(--gold-deep)', marginBottom: 14 }}
        >
          ॥ श्री गणेशाय नमः ॥
        </div>
      </Reveal>

      <Reveal delay={0.2}>
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
      {couple.groom.Grandparents ? (
        <Reveal variants={fadeUp} delay={0.18}>
          <p
            className="body-text"
            style={{ fontSize: 11.5, margin: '3px 0 0', color: 'var(--text-soft)', opacity: 0.8 }}
          >
            {couple.groom.Grandparents}
          </p>
        </Reveal>
      ) : null}

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
      {couple.bride.Grandparents ? (
        <Reveal variants={fadeUp} delay={0.18}>
          <p
            className="body-text"
            style={{ fontSize: 11.5, margin: '3px 0 0', color: 'var(--text-soft)', opacity: 0.8 }}
          >
            {couple.bride.Grandparents}
          </p>
        </Reveal>
      ) : null}

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

      <Reveal variants={fadeUp} delay={0.15}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 14,
            marginTop: 28,
          }}
        >
          <Diya size={38} />
          {couple.hashtag ? (
            <div
              className="label"
              style={{ color: 'var(--gold)', letterSpacing: '0.16em', paddingBottom: 8 }}
            >
              {couple.hashtag}
            </div>
          ) : null}
          <Diya size={38} delay={0.7} />
        </div>
      </Reveal>
      </div>
    </section>
  )
}
