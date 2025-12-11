import { CartItem } from './slice'

export const deliveryFee = 5

export const getCartQuantity = (cart: CartItem[]) => {
  return cart?.reduce((quantity, item) => item.quantity! + quantity, 0)
}

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart?.find(item => item.id === id)?.quantity || 0
}

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    // item.basePrice + item.size.price + extra prices
    const extrasTotal = cartItem.extras?.reduce((sum, extra) => sum + (extra.price || 0), 0)

    const itemTotal = cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0)

    return total + itemTotal * cartItem.quantity!
  }, 0)
}

export const getTotalAmount = (cart: CartItem[]) => {
  return getSubTotal(cart) + deliveryFee
}

// src/hooks/useCreateOrder.ts

import { useState } from 'react'

export function useCreateOrder() {
  const [loading, setLoading] = useState(false)

  const createOrder = async (order: any) => {
    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to create order')

      return data
    } finally {
      setLoading(false)
    }
  }

  return { createOrder, loading }
}
