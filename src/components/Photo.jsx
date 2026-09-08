import { useEffect, useRef, useState } from 'react'
import { lqip } from '../data/lqip'

/* Full-bleed photograph with a blur-up placeholder.

   A 20px inline JPEG (see data/lqip.js) is painted and heavily blurred while
   the real file downloads, then cross-fades out. On a slow phone connection
   this shows the photo's actual colours immediately instead of a white gap. */
export default function Photo({
  name,
  alt = '',
  priority = false,
  objectPosition = 'center 20%',
  kenburns = false,
  className = '',
  style = {},
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // A cached image can finish before React attaches onLoad, in which case the
  // event never fires and the blur would sit on top forever.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
    >
      {lqip[name] && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-4%',
            backgroundImage: `url(${lqip[name]})`,
            backgroundSize: 'cover',
            backgroundPosition: objectPosition,
            filter: 'blur(22px) saturate(1.15)',
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}
      <img
        ref={imgRef}
        src={`/img/${name}.jpg`}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={kenburns && loaded ? 'kenburns' : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.1s ease',
        }}
      />
    </div>
  )
}
