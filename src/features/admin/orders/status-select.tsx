'use client'
import { OrderStatus } from '@prisma/client'
import { useState } from 'react'
// import { updateOrderStatus } from '@/features/orders/_actions/orders'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { updateOrderStatus } from '@/features/orders/_actions/orders'

const STATUS_OPTIONS = [
  { value: OrderStatus.PENDING, label: 'Pending' },
  { value: OrderStatus.PAID, label: 'Paid' },
  { value: OrderStatus.PREPARING, label: 'Preparing' },
  { value: OrderStatus.OUT_FOR_DELIVERY, label: 'Out for delivery' },
  { value: OrderStatus.DELIVERED, label: 'Delivered' },
  { value: OrderStatus.CANCELLED, label: 'Cancelled' }
]

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  PAID: 'bg-green-100 text-green-700',
  PREPARING: 'bg-blue-100 text-blue-700',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-primary/15 text-foreground',
  CANCELLED: 'bg-red-100 text-red-700'
}

export default function StatusSelect({
  orderId,
  currentStatus
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  const handleChange = async (newStatus: OrderStatus) => {
    setLoading(true)
    try {
      await updateOrderStatus(orderId, newStatus)
      setStatus(newStatus)
      Toast('Status updated', 'success')
    } catch {
      Toast('Failed to update status', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative flex items-center gap-2'>
      {loading && <Loader />}
      <select
        value={status}
        onChange={e => handleChange(e.target.value as OrderStatus)}
        disabled={loading}
        className={`text-[10px] font-medium px-2.5 py-1.5 rounded-full uppercase tracking-wider border-none outline-none cursor-pointer appearance-none ${STATUS_COLORS[status]}`}
      >
        {STATUS_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
