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
      className='relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted/60 transition-colors group'
    >
      <ShoppingCartIcon className='w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors' />
      {cartQuantity > 0 && (
        <span className='absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-primary text-foreground rounded-full flex items-center justify-center leading-none'>
          {cartQuantity}
        </span>
      )}
    </Link>
  )
}

export default CartButton
