import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

import EnvelopeIntro from './components/EnvelopeIntro'
import HeroSlide from './components/HeroSlide'
import InvitationSlide from './components/InvitationSlide'
import CountdownSlide from './components/CountdownSlide'
import EventSlide from './components/EventSlide'
import GallerySlide from './components/GallerySlide'
import FinalSlide from './components/FinalSlide'

import { events, music } from './data/wedding'

export default function App() {
  /* Read sessionStorage during initialisation rather than in an effect, so a
     guest who already opened the envelope this session never sees it flash. */
  const [opened, setOpened] = useState(() => {
    try {
      return sessionStorage.getItem('invite-opened') === '1'
    } catch {
      return false
    }
  })

  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  // Lock the page behind the envelope.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  /* Start the music off the envelope tap. Browsers block autoplay until a
     real gesture, so this is the only moment it can begin. If public/music.mp3
     is missing, play() rejects and the control simply never appears. */
  useEffect(() => {
    if (!opened || !music.enabled || audioRef.current) return

    const audio = new Audio(music.src)
    audio.loop = true
    audio.volume = music.volume ?? 0.3
    const onError = () => setAudioReady(false)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    audio.play().then(
      () => setAudioReady(true),
      () => setAudioReady(false)
    )

    return () => {
      audio.removeEventListener('error', onError)
      audio.pause()
      // Cleared so React's dev-mode remount re-creates and restarts it.
      audioRef.current = null
    }
  }, [opened])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const next = !muted
    audio.muted = next
    setMuted(next)
  }, [muted])

  return (
    <>
      <div className="grain" />

      {/* Gold scroll progress rail on the right edge */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: 3,
          height: '100vh',
          background: 'linear-gradient(180deg, var(--gold), var(--gold-light))',
          transformOrigin: 'top',
          scaleY,
          zIndex: 60,
          opacity: opened ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Mute toggle — only rendered once we know the track actually plays */}
      {opened && audioReady ? (
        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'fixed',
            top: 16,
            right: 14,
            zIndex: 70,
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'rgba(43,8,18,0.42)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(242,221,171,0.4)',
            color: 'var(--gold-light)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </motion.button>
      ) : null}

      {!opened ? <EnvelopeIntro onComplete={() => setOpened(true)} /> : null}

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSlide />
        <InvitationSlide />
        <CountdownSlide />
        {events.map((event, i) => (
          <EventSlide key={event.id} event={event} index={i} />
        ))}
        <GallerySlide />
        <FinalSlide />
      </main>
    </>
  )
}

function SoundIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h3.5L13 19V5L7.5 9H4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h3.5L13 19V5L7.5 9H4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M17 9.5l4 5M21 9.5l-4 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
