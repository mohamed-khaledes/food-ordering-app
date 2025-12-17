'use client'
import React, { useState } from 'react'
import CartItems from './items'
import CheckoutForm from './form'
import { Button } from '@/components/ui/button'
import { Banknote, CreditCard } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'

const Cart = () => {
  const { global } = useTrans()
  const [payType, setPayType] = useState<'card' | 'cash'>('cash')
  return (
    <section className='section-gap'>
      <div className='container'>
        <h1 className='text-primary text-start font-bold text-4xl italic mb-10 capitalize'>
          {global.cart}
        </h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <CartItems />
          <div>
            <div className='grid grid-cols-2 gap-2 items-center my-2'>
              <Button
                className='w-full'
                variant={payType == 'cash' ? 'default' : 'outline'}
                onClick={() => setPayType('cash')}
              >
                <Banknote />
                Cash
              </Button>
              <Button
                className='w-full'
                variant={payType == 'card' ? 'default' : 'outline'}
                onClick={() => setPayType('card')}
              >
                <CreditCard /> Card
              </Button>
            </div>
            {payType == 'cash' ? <CheckoutForm /> : <div></div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
