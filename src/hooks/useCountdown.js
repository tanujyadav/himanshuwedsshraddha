import { useState, useEffect } from 'react'

const compute = (target) => {
  const diff = new Date(target).getTime() - Date.now()
  if (!Number.isFinite(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  // Clamp at zero so the day of the wedding never shows negative numbers.
  const d = Math.max(diff, 0)
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
    done: diff <= 0,
  }
}

/* Live countdown to `targetDate`.

   State is seeded from `compute` rather than an empty object, so the slide
   never paints a frame of blank or NaN digits before the first tick lands. */
export function useCountdown(targetDate) {
  const [time, setTime] = useState(() => compute(targetDate))
  const [seenTarget, setSeenTarget] = useState(targetDate)

  // Recompute during render if the target changed — React's supported pattern
  // for resetting derived state, and it avoids a stale second on screen.
  if (seenTarget !== targetDate) {
    setSeenTarget(targetDate)
    setTime(compute(targetDate))
  }

  useEffect(() => {
    const id = setInterval(() => setTime(compute(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return time
}
