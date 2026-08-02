'use client'
import { CartItem, selectCartItems, clearCart, addCartItem, removeCartItem, removeItemFromCart } from './slice'
import { FormEvent, useEffect, useState } from 'react'
import { TCreateOrder } from './type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Toast from '@/components/ui/toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const deliveryFee = 5

export const getCartQuantity = (cart: CartItem[]) =>
  cart?.reduce((quantity, item) => item.quantity! + quantity, 0)

export const getItemQuantity = (id: string, cart: CartItem[]) =>
  cart?.find(item => item.id === id)?.quantity || 0

export const getSubTotal = (cart: CartItem[]) =>
  cart.reduce((total, cartItem) => {
    const extrasTotal = cartItem.extras?.reduce((sum, extra) => sum + (extra.price || 0), 0)
    const itemTotal = cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0)
    return total + itemTotal * cartItem.quantity!
  }, 0)

export const getTotalAmount = (cart: CartItem[]) => getSubTotal(cart) + deliveryFee

/**
 * The order summary list: contents, running totals, and the quantity controls.
 *
 * The cart is mirrored into `localStorage` on every change so a reload doesn't
 * lose it — the Redux store itself is memory-only.
 */
export function useCartItems() {
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const subTotal = getSubTotal(cart)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }, [cart])

  return {
    cart,
    subTotal,
    deliveryFee,
    total: subTotal + deliveryFee,
    /** Adding an identical line bumps its quantity rather than duplicating it. */
    increase: (item: CartItem) =>
      dispatch(
        addCartItem({
          basePrice: item.basePrice,
          id: item.id,
          image: item.image,
          name: item.name,
          extras: item.extras,
          size: item.size
        })
      ),
    decrease: (id: string) => dispatch(removeCartItem({ id })),
    remove: (id: string) => dispatch(removeItemFromCart({ id }))
  }
}

/** Checkout payment method, and whether there's anything to check out. */
export function useCheckout() {
  const [payType, setPayType] = useState<'card' | 'cash'>('cash')
  const cart = useAppSelector(selectCartItems)

  return { payType, setPayType, cart, isEmpty: !cart || cart.length === 0 }
}

export function useCreateOrder() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [paymobLoading, setPaymobLoading] = useState(false)
  const [data, setData] = useState<TCreateOrder>()
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const router = useRouter()

  // Pre-fill email from session
  useEffect(() => {
    if (session?.user?.email) {
      setData((prev: any) => ({
        ...prev,
        userEmail: session.user.email
      }))
    }
  }, [session])

  const buildProducts = () =>
    cart?.map((item: any) => ({
      productId: item?.id,
      quantity: item?.quantity,
      sizeId: item?.size?.id ?? null,
      basePrice: +item?.basePrice,
      extras: item?.extras?.map((e: any) => e?.id) ?? []
    }))
  const handleCreate = async (order: TCreateOrder) => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      const data = await res.json()
      if (!data?.success) {
        Object.keys(data?.errors ?? {}).forEach(err => Toast(`${err} is required`, 'error'))
        return
      }
      dispatch(clearCart())
      Toast('Order placed successfully!', 'success')
      router.push('/orders')
      return data?.data
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymobPayment = async (formData?: TCreateOrder) => {
    if (!formData?.phone || !formData?.streetAddress || !formData?.city || !formData?.country) {
      Toast('Please fill in all delivery details first', 'error')
      return
    }

    setPaymobLoading(true)
    try {
      const totalAmount = getTotalAmount(cart)
      const products = buildProducts()

      const res = await fetch('/api/payments/paymob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userEmail: session?.user?.email ?? formData?.userEmail,
          totalAmount,
          deliveryFee,
          products,
          cart
        })
      })

      const result = await res.json()

      if (!result?.paymentUrl) {
        Toast(result?.error ?? 'Payment initialization failed', 'error')
        return
      }

      window.location.href = result.paymentUrl
    } catch (e) {
      console.log(e)
      Toast('Something went wrong', 'error')
    } finally {
      setPaymobLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev: any) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const order = {
      ...data,
      // Always use session email as source of truth
      userEmail: session?.user?.email ?? data?.userEmail,
      deliveryFee,
      products: buildProducts()
    }
    handleCreate(order as any)
  }

  return {
    handleCreate,
    loading,
    paymobLoading,
    handleChange,
    handleSubmit,
    handlePaymobPayment,
    cart,
    data
  }
}
