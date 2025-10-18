import React from 'react'
import CartItems from './items'
import CheckoutForm from './form'
import { getTrans } from '@/lib/translations/server'

const Cart = async () => {
  const { global } = await getTrans()
  return (
    <section className='section-gap'>
      <div className='container'>
        <h1 className='text-primary text-start font-bold text-4xl italic mb-10'>{global.cart}</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <CartItems />
          <CheckoutForm />
        </div>
      </div>
    </section>
  )
}

export default Cart
