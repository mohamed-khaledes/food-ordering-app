'use client'
import React from 'react'
import { Routes } from '@/constants/enums'
import { ShoppingCartIcon } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'
import Link from '@/components/link'
import { getCartQuantity } from '@/features/cart/hooks'
import { selectCartItems } from '@/features/cart/slice'

const CartButton = () => {
  const cart = useAppSelector(selectCartItems)
  const cartQuantity = getCartQuantity(cart)
  return (
    <Link href={`/${Routes.CART}`} className='block relative group'>
      <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center'>
        {cartQuantity}
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  )
}

export default CartButton
