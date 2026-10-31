import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { Filigree } from './Festive'
import { EASE, blurIn, fadeUp, inView } from '../animations'
import { couple, letter } from '../data/wedding'

/* The couple's letter, set on a sheet of parchment resting on deep maroon
   velvet — the one dark page between the formal wording and the
   countdown, so the invitation has a change of key halfway through.

   The sheet is sealed with wax at the top, the way a hand-delivered letter
   would be, and each paragraph settles in as it scrolls into view. */
export default function LetterSlide() {
  return (
    <section
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        padding: '78px calc(var(--page-padding-x) - 6px) 72px',
        background:
          'radial-gradient(120% 70% at 50% 30%, #5d1528 0%, #3a0d1a 55%, #240710 100%)',
      }}
    >
      <div aria-hidden="true" className="texture texture-dark" />

      <Reveal>
        <div className="label" style={{ textAlign: 'center', color: 'var(--gold-light)', marginBottom: 14 }}>
          {letter.eyebrow}
        </div>
      </Reveal>
      <div style={{ marginBottom: 40 }}>
        <Filigree width={180} color="var(--gold-light)" />
      </div>

      {/* ---- The sheet ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1.2, ease: EASE }}
        className="parchment"
        style={{
          position: 'relative',
          padding: '58px 26px 40px',
          textAlign: 'center',
        }}
      >
        <WaxSeal />

        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="script"
          style={{ fontSize: 27, color: 'var(--royal)', lineHeight: 1.4, marginBottom: 20 }}
        >
          {letter.opening}
        </motion.div>

        {letter.paragraphs.map((text, i) => (
          <Reveal key={i} variants={fadeUp} delay={0.05}>
            <p
              className="body-text"
              style={{
                margin: '0 0 16px',
                fontSize: 15,
                lineHeight: 1.8,
                color: '#4a2a1c',
                ...(i === 0 ? { textAlign: 'left' } : {}),
              }}
            >
              {i === 0 ? <DropCap text={text} /> : text}
            </p>
          </Reveal>
        ))}

        <Reveal variants={fadeUp} delay={0.1}>
          <p
            className="body-text"
            style={{
              margin: '22px 0 0',
              fontSize: 16,
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--royal)',
            }}
          >
            {letter.closingLine}
          </p>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.2}>
          <div style={{ marginTop: 30 }}>
            <div className="body-text" style={{ fontSize: 14, fontStyle: 'italic', color: '#6b4a3a' }}>
              {letter.signoff}
            </div>
            <div className="script shimmer" style={{ fontSize: 38, marginTop: 2 }}>
              {letter.signature}
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}

/* First letter of the letter set large in gold script, like an illuminated
   manuscript. */
function DropCap({ text }) {
  return (
    <>
      <span
        className="script"
        aria-hidden="true"
        style={{
          float: 'left',
          fontSize: 58,
          lineHeight: 0.9,
          color: 'var(--gold)',
          margin: '4px 8px 0 0',
        }}
      >
        {text[0]}
      </span>
      <span className="sr-only">{text[0]}</span>
      {text.slice(1)}
    </>
  )
}

/* Maroon wax seal with the couple's initials, pressed over the sheet's top
   edge. It lands with a small press-and-settle. */
function WaxSeal() {
  return (
    <motion.div
      initial={{ scale: 1.6, opacity: 0, rotate: -25 }}
      whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: -30,
        left: '50%',
        width: 64,
        height: 64,
        marginLeft: -32,
        borderRadius: '47% 53% 50% 50% / 52% 48% 52% 48%',
        background: 'radial-gradient(circle at 34% 30%, #9a2a48 0%, #6b1530 55%, #3d0c18 100%)',
        boxShadow:
          '0 6px 14px rgba(0,0,0,0.45), inset 0 2px 5px rgba(255,210,170,0.3), inset 0 -3px 6px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '1px solid rgba(242,221,171,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="script" style={{ fontSize: 19, color: 'var(--gold-light)', lineHeight: 1, paddingBottom: 2 }}>
          {couple.initials.left}
          <span style={{ fontSize: 12, opacity: 0.85 }}>&amp;</span>
          {couple.initials.right}
        </span>
      </div>
    </motion.div>
  )
}
