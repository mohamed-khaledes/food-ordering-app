'use client'
import React, { useState } from 'react'
import CartItems from './items'
import CheckoutForm from './form'
import { Banknote, CreditCard, ShoppingCart } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { useAppSelector } from '@/redux/hooks'
import { selectCartItems } from './slice'
import { getSubTotal, deliveryFee } from './hooks'
import { formatCurrency } from '@/lib/helpers'

const Cart = () => {
  const { global } = useTrans()
  const [payType, setPayType] = useState<'card' | 'cash'>('cash')
  const cart = useAppSelector(selectCartItems)
  const total = getSubTotal(cart) + deliveryFee

  if (!cart || cart.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-4'>
        <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
          <ShoppingCart className='w-7 h-7 text-muted-foreground' />
        </div>
        <p className='text-muted-foreground'>{global['Your cart is empty']}</p>
      </div>
    )
  }

  return (
    <section className='py-12'>
      <div className='container'>
        {/* Header */}
        <div className='mb-10'>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <h1 className='text-4xl font-bold'>{global.cart}</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* Left: cart items */}
          <CartItems />

          {/* Right: payment */}
          <div className='space-y-4'>
            {/* Payment type selector */}
            <div className='bg-background rounded-2xl border border-border p-2 grid grid-cols-2 gap-2'>
              <button
                onClick={() => setPayType('cash')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    payType === 'cash'
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                <Banknote className='w-4 h-4' />
                Cash on delivery
              </button>
              <button
                onClick={() => setPayType('card')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    payType === 'card'
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                <CreditCard className='w-4 h-4' />
                Pay with card
              </button>
            </div>

            {/* Form */}
            <CheckoutForm payType={payType} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
