'use client'

import { IMAGES } from '@/constants/images'
import { useCarousel } from '@/hooks/useCarousel'
import { useTrans } from '@/lib/translations/client'

/**
 * Testimonial slider.
 *
 * The quotes live in the dictionary and the portraits in `IMAGES`, and the two
 * lists aren't the same length — the photos cycle independently.
 */
export function useTestimonials() {
  const { sections } = useTrans()
  const items = sections.testimonials.items
  const { index, goTo, next, previous } = useCarousel(items.length)

  return {
    copy: sections.testimonials,
    items,
    index,
    active: items[index],
    photo: IMAGES.testimonials[index % IMAGES.testimonials.length],
    goTo,
    next,
    previous
  }
}
