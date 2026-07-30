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
    <Link
      href={`/${Routes.CART}`}
      className='group relative flex h-10 w-10 items-center justify-center rounded-full bg-haze transition-colors hover:bg-brand-soft'
    >
      <ShoppingCartIcon className='h-[18px] w-[18px] text-foreground/70 transition-colors group-hover:text-brand' />
      {cartQuantity > 0 && (
        <span className='absolute -end-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white'>
          {cartQuantity}
        </span>
      )}
    </Link>
  )
}

export default CartButton
