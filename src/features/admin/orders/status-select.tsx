'use client'
import { OrderStatus } from '@prisma/client'
import { useState } from 'react'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { updateOrderStatus } from '@/features/orders/_actions/orders'
import { useTrans } from '@/lib/translations/client'
import { statusLabel, statusTone, STATUS_ORDER } from '../order-status'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

/**
 * Inline state editor. It reads as the same chip used elsewhere in the
 * dashboard, with a chevron to signal it's editable. The options and the toast
 * messages were hardcoded English before.
 */
export default function StatusSelect({
  orderId,
  currentStatus
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const t = useTrans()
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const tone = statusTone(status)

  const handleChange = async (newStatus: OrderStatus) => {
    setLoading(true)
    try {
      await updateOrderStatus(orderId, newStatus)
      setStatus(newStatus)
      Toast(t.adminUi.statusUpdated, 'success')
    } catch {
      Toast(t.adminUi.statusUpdateFailed, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <span
        className={cn(
          'relative inline-flex items-center gap-1.5 rounded-full py-1 ps-2.5 pe-7 text-[11px] font-semibold',
          tone.chip,
          loading && 'opacity-60'
        )}
      >
        <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', tone.dot)} />
        {statusLabel(status, t)}
        <ChevronDown aria-hidden className='pointer-events-none absolute end-2 h-3 w-3' />
        {/* The real control sits on top, transparent, so the chip stays the visual. */}
        <select
          value={status}
          onChange={e => handleChange(e.target.value as OrderStatus)}
          disabled={loading}
          aria-label={t.adminUi.table.status}
          className='absolute inset-0 cursor-pointer appearance-none bg-transparent opacity-0'
        >
          {STATUS_ORDER.map(option => (
            <option key={option} value={option}>
              {statusLabel(option, t)}
            </option>
          ))}
        </select>
      </span>
      {loading && <Loader />}
    </div>
  )
}
