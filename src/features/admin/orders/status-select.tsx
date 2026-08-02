'use client'
import { OrderStatus } from '@prisma/client'
import Loader from '@/components/ui/loader'
import { useTrans } from '@/lib/translations/client'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useOrderStatus } from './hooks'

/**
 * Inline state editor. It reads as the same chip used elsewhere in the
 * dashboard, with a chevron to signal it's editable.
 */
export default function StatusSelect({
  orderId,
  currentStatus
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const t = useTrans()
  const { status, change, pending, tone, label, options } = useOrderStatus(orderId, currentStatus)

  return (
    <div className='flex items-center gap-2'>
      <span
        className={cn(
          'relative inline-flex items-center gap-1.5 rounded-full py-1 ps-2.5 pe-7 text-[11px] font-semibold',
          tone.chip,
          pending && 'opacity-60'
        )}
      >
        <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', tone.dot)} />
        {label}
        <ChevronDown aria-hidden className='pointer-events-none absolute end-2 h-3 w-3' />
        {/* The real control sits on top, transparent, so the chip stays the visual. */}
        <select
          value={status}
          onChange={e => change(e.target.value as OrderStatus)}
          disabled={pending}
          aria-label={t.adminUi.table.status}
          className='absolute inset-0 cursor-pointer appearance-none bg-transparent opacity-0'
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      {pending && <Loader />}
    </div>
  )
}
