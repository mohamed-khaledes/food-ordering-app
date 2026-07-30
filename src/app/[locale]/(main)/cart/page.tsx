import Cart from '@/features/cart'

import type { Metadata } from 'next'
import { privateMetadata } from '@/constants/seo'

// Not for the index — see `privateMetadata`.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return privateMetadata({ locale, path: '/cart', title: 'Your Cart' })
}

function CartPage() {
  return <Cart />
}

export default CartPage
