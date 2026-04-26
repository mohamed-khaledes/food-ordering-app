'use client'
import { OrderStatus } from '@prisma/client'
import { useState } from 'react'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { updateOrderStatus } from '../orders/_actions/orders'

export default function DeliveryStatusSelect({
  orderId,
  currentStatus,
  pickUp
}: {
  orderId: string
  currentStatus: OrderStatus
  pickUp?: boolean
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handlePickUp = async () => {
    setLoading(true)
    try {
      await updateOrderStatus(orderId, OrderStatus.OUT_FOR_DELIVERY)
      setStatus(OrderStatus.OUT_FOR_DELIVERY)
      Toast('Order picked up!', 'success')
    } catch {
      Toast('Failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeliver = async () => {
    setLoading(true)
    try {
      await updateOrderStatus(orderId, OrderStatus.DELIVERED)
      setStatus(OrderStatus.DELIVERED)
      Toast('Order delivered!', 'success')
    } catch {
      Toast('Failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  if (pickUp) {
    return (
      <button
        onClick={handlePickUp}
        className='flex items-center gap-1.5 px-3 py-1.5 bg-primary text-foreground rounded-xl text-xs font-medium hover:bg-primary/80 active:scale-[0.97] transition-all'
      >
        🚴 Pick up
      </button>
    )
  }

  if (status === OrderStatus.OUT_FOR_DELIVERY) {
    return (
      <button
        onClick={handleDeliver}
        className='flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-xl text-xs font-medium hover:bg-foreground/90 active:scale-[0.97] transition-all'
      >
        ✅ Mark delivered
      </button>
    )
  }

  if (status === OrderStatus.DELIVERED) {
    return (
      <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-primary/15 text-foreground uppercase tracking-wider'>
        Delivered ✓
      </span>
    )
  }

  return null
}
