'use client'
import { OrderStatus } from '@prisma/client'
import Loader from '@/components/ui/loader'
import { useTrans } from '@/lib/translations/client'
import { useDeliveryHandoff } from './hooks'

export default function DeliveryStatusSelect({
  orderId,
  currentStatus,
  pickUp
}: {
  orderId: string
  currentStatus: OrderStatus
  pickUp?: boolean
}) {
  const t = useTrans()
  const { status, pending, pickUp: handlePickUp, deliver } = useDeliveryHandoff(orderId, currentStatus)

  if (pending) return <Loader />

  if (pickUp) {
    return (
      <button
        onClick={handlePickUp}
        className='flex items-center gap-1.5 px-3 py-1.5 bg-brand text-foreground rounded-sm text-xs font-medium hover:bg-brand/80 active:scale-[0.97] transition-all'
      >
        🚴 {t.adminUi.pickUp}
      </button>
    )
  }

  if (status === OrderStatus.OUT_FOR_DELIVERY) {
    return (
      <button
        onClick={deliver}
        className='flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-sm text-xs font-medium hover:bg-foreground/90 active:scale-[0.97] transition-all'
      >
        ✅ {t.adminUi.markDelivered}
      </button>
    )
  }

  if (status === OrderStatus.DELIVERED) {
    return (
      <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-brand-soft text-foreground uppercase tracking-wider'>
        {t.adminUi.deliveredTag} ✓
      </span>
    )
  }

  return null
}
