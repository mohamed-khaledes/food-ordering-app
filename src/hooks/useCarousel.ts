'use client'

import { useState } from 'react'

/**
 * Wrapping index for the carousels (testimonials, product gallery).
 *
 * `total` can grow after mount — translations and galleries both arrive with
 * the render — so the index is clamped on read rather than reset in an effect.
 */
export function useCarousel(total: number, start = 0) {
  const [index, setIndex] = useState(start)
  const active = total > 0 ? index % total : 0

  const step = (delta: number) => {
    if (total <= 0) return
    setIndex(current => (current + delta + total) % total)
  }

  return {
    index: active,
    goTo: setIndex,
    step,
    next: () => step(1),
    previous: () => step(-1)
  }
}
