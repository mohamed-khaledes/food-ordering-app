import { CartItem } from './slice'
import { selectCartItems, clearCart } from './slice'
import { FormEvent, useState } from 'react'
import { TCreateOrder } from './type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Toast from '@/components/ui/toast'

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

export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TCreateOrder>()
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()

  const handleCreate = async (order: TCreateOrder) => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      const data = await res?.json()
      if (!data?.success) {
        Object.keys(data?.errors)?.map(err => {
          Toast(`${err} is required`, 'error')
        })
        return
      }
      if (data?.success) {
        dispatch(clearCart())
        Toast(`order success`, 'success')
      }
      return data?.data
    } catch (e) {
      console.log(e)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev: any) => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const products = cart?.map((item: any) => {
      return {
        productId: item?.id,
        quantity: item?.quantity,
        sizeId: item?.size?.id,
        basePrice: +item?.basePrice,
        deliveryFee,
        extras: item?.extras?.map((e: any) => e?.id)
      }
    })
    const order = {
      ...data,
      deliveryFee,
      products: products
    }
    handleCreate(order as any)
  }

  return { handleCreate, loading, handleChange, handleSubmit, cart, data }
}
