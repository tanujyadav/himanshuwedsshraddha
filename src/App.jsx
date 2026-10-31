import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

import EnvelopeIntro from './components/EnvelopeIntro'
import HeroSlide from './components/HeroSlide'
import InvitationSlide from './components/InvitationSlide'
import LetterSlide from './components/LetterSlide'
import CountdownSlide from './components/CountdownSlide'
import EventSlide from './components/EventSlide'
import GallerySlide from './components/GallerySlide'
import FinalSlide from './components/FinalSlide'
import { PetalShower } from './components/Festive'

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
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  // Lock the page behind the envelope.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  /* Start the music off the envelope tap, fading in over a few seconds rather
     than cutting in. Browsers block autoplay until a real gesture: a guest
     returning this session skips the envelope, so for them play() is refused
     and the music instead starts on their first tap anywhere. If
     public/music.mp3 is missing, the control simply never appears.

     Phones keep page audio playing in the background — after switching apps,
     locking the screen, or closing WhatsApp's in-app browser — so the music
     pauses whenever the page is hidden or unloaded, and picks up again when
     the guest comes back (unless they paused it themselves). */
  useEffect(() => {
    if (!opened || !music.enabled || audioRef.current) return

    const target = music.volume ?? 0.3
    const audio = new Audio(music.src)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    let fade = null

    const start = () => {
      if (document.hidden) return
      audio.play().then(
        () => {
          clearInterval(fade)
          fade = setInterval(() => {
            audio.volume = Math.min(target, audio.volume + target / 40)
            if (audio.volume >= target) clearInterval(fade)
          }, 100)
        },
        () => {}
      )
    }
    const retry = () => {
      if (audio.paused && !userPaused.current) start()
    }
    const stop = () => {
      clearInterval(fade)
      audio.pause()
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else retry()
    }
    // The button follows what the audio is really doing, whoever caused it.
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onReady = () => setAudioReady(true)
    const onError = () => setAudioReady(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('loadedmetadata', onReady)
    audio.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', stop)
    window.addEventListener('pointerdown', retry, { once: true })
    start()

    return () => {
      stop()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('loadedmetadata', onReady)
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', stop)
      window.removeEventListener('pointerdown', retry)
      audio.removeAttribute('src')
      audio.load()
      // Cleared so React's dev-mode remount re-creates and restarts it.
      audioRef.current = null
    }
  }, [opened])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      userPaused.current = false
      audio.volume = music.volume ?? 0.3
      audio.play().catch(() => {})
    } else {
      userPaused.current = true
      audio.pause()
    }
  }, [])

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

      {/* Play/pause — only rendered once we know the track exists */}
      {opened && audioReady ? (
        <motion.button
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          aria-label={playing ? 'Pause music' : 'Play music'}
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
          {playing ? <SoundIcon /> : <MutedIcon />}
        </motion.button>
      ) : null}

      {opened ? <PetalShower /> : null}

      {!opened ? <EnvelopeIntro onComplete={() => setOpened(true)} /> : null}

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSlide />
        <InvitationSlide />
        <LetterSlide />
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
