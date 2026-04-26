'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { clearCart } from '@/features/cart/slice'

export default function ClearCart() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(clearCart())
    localStorage.removeItem('cartItems')
  }, [dispatch])
  return null
}
