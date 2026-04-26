import { CartItem } from './slice'
import { selectCartItems, clearCart } from './slice'
import { FormEvent, useState } from 'react'
import { TCreateOrder } from './type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Toast from '@/components/ui/toast'

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

export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [paymobLoading, setPaymobLoading] = useState(false)
  const [data, setData] = useState<TCreateOrder>()
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()

  const buildProducts = () =>
    cart?.map((item: any) => ({
      productId: item?.id,
      quantity: item?.quantity,
      sizeId: item?.size?.id,
      basePrice: +item?.basePrice,
      deliveryFee,
      extras: item?.extras?.map((e: any) => e?.id)
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
      return data?.data
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // ── Paymob card payment ──────────────────────────────────
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

      // Redirect to Paymob hosted payment page
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
    const order = { ...data, deliveryFee, products: buildProducts() }
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
