import { createOrder } from './_actions/orders'
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
import { TCreateOrder } from './type'

export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const handleCreate = async (order: TCreateOrder) => {
    setLoading(true)
    try {
      const data = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      if (data) console.log(data)
      return data
    } catch (e) {
      console.log(e)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return { handleCreate, loading }
}
