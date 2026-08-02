'use client'
import React from 'react'
import CartItems from './items'
import CheckoutForm from './form'
import { Banknote, CreditCard, ShoppingCart } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { useCheckout } from './hooks'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { Container } from '@/components/ui/container'

const Cart = () => {
  const { global, checkout } = useTrans()
  const { payType, setPayType, isEmpty } = useCheckout()

  return (
    <section>
      <Banner
        title={global.checkout}
        crumbs={[{ label: global.home, href: '/' }, { label: global.checkout }]}
      />

      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-4 py-28'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-muted'>
            <ShoppingCart className='h-7 w-7 text-muted-foreground' />
          </div>
          <p className='text-muted-foreground'>{global['Your cart is empty']}</p>
          <Link href={`/${Routes.MENU}`} className='btn-brand mt-2'>
            {global.menu}
          </Link>
        </div>
      ) : (
        <Container className='section-y'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]'>
            {/* Left: payment method + delivery form */}
            <div className='space-y-5'>
              <div className='grid grid-cols-2 gap-3'>
                <button
                  onClick={() => setPayType('cash')}
                  className={`flex items-center justify-center gap-2 border px-4 py-3 text-sm font-medium transition-colors ${
                    payType === 'cash'
                      ? 'border-brand bg-brand text-white'
                      : 'border-border text-muted-foreground hover:border-brand hover:text-brand'
                  }`}
                >
                  <Banknote className='h-4 w-4' />
                  {checkout.cashOnDelivery}
                </button>
                <button
                  onClick={() => setPayType('card')}
                  className={`flex items-center justify-center gap-2 border px-4 py-3 text-sm font-medium transition-colors ${
                    payType === 'card'
                      ? 'border-brand bg-brand text-white'
                      : 'border-border text-muted-foreground hover:border-brand hover:text-brand'
                  }`}
                >
                  <CreditCard className='h-4 w-4' />
                  {checkout.payWithCard}
                </button>
              </div>

              <CheckoutForm payType={payType} />
            </div>

            {/* Right: order summary */}
            <aside>
              <h2 className='mb-4 text-lg font-bold text-foreground'>{global.cart}</h2>
              <CartItems />
            </aside>
          </div>
        </Container>
      )}

      <PartnersStrip />
    </section>
  )
}

export default Cart
