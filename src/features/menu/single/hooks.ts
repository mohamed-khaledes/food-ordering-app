'use client'

import { useCarousel } from '@/hooks/useCarousel'
import { useTrans } from '@/lib/translations/client'
import { useState } from 'react'

/** Which panel the product tab strip is showing. */
export const PRODUCT_TABS = ['Description', 'Additional Info', 'Reviews'] as const
export type ProductTab = (typeof PRODUCT_TABS)[number]

/**
 * Thumbnail/arrow navigation for the product gallery. Arrows are only worth
 * rendering once there's more than one shot to step through.
 */
export function useProductGallery(images: string[]) {
  const total = images.length
  const { index, goTo, next, previous } = useCarousel(total)

  return {
    active: index,
    current: images[index],
    goTo,
    next,
    previous,
    hasMultiple: total > 1
  }
}

/**
 * Tab selection plus the English key → translated label mapping. The keys stay
 * English because they're the discriminator the panels switch on.
 */
export function useProductTabs() {
  const { product } = useTrans()
  const [active, setActive] = useState<ProductTab>('Description')

  const labels: Record<ProductTab, string> = {
    Description: product.tabs.description,
    'Additional Info': product.tabs.additional,
    Reviews: product.tabs.reviews
  }

  return { active, setActive, labels, tabs: PRODUCT_TABS }
}
