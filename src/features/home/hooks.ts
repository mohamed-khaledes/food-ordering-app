'use client'

import { useEffect, useState } from 'react'

/** Ends at the next midnight, so the countdown always has something to count. */
const nextMidnight = () => {
  const end = new Date()
  end.setHours(24, 0, 0, 0)
  return end.getTime()
}

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0')

/**
 * Ticking countdown for the hot-deals banner.
 *
 * The clock only starts on the client — rendering a time on the server would
 * hydrate against a different second and warn. Until then `started` is false
 * and the caller shows placeholders.
 */
export function useCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const target = nextMidnight()
    const tick = () => setRemaining(target - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const total = Math.max(0, remaining ?? 0)

  return {
    started: remaining !== null,
    days: pad(Math.floor(total / 86_400_000)),
    hours: pad(Math.floor(total / 3_600_000) % 24),
    minutes: pad(Math.floor(total / 60_000) % 60),
    seconds: pad(Math.floor(total / 1000) % 60)
  }
}
