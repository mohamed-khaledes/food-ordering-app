'use client'
import Loader from '@/components/ui/loader'
import { useTrans } from '@/lib/translations/client'
import { useAssignDelivery } from './hooks'

type DeliveryMan = { id: string; name: string; email: string }

export default function AssignDelivery({
  orderId,
  deliveryMen,
  currentDeliveryManId
}: {
  orderId: string
  deliveryMen: DeliveryMan[]
  currentDeliveryManId?: string | null
}) {
  const t = useTrans()
  const { selected, assign, pending } = useAssignDelivery(orderId, currentDeliveryManId)

  if (deliveryMen.length === 0) {
    return <span className='text-xs text-muted-foreground'>{t.common.noDeliveryMen}</span>
  }

  return (
    <div className='flex items-center gap-2'>
      {pending && <Loader />}
      <select
        value={selected}
        onChange={e => assign(e.target.value)}
        disabled={pending}
        className='text-xs px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground outline-none cursor-pointer focus:border-brand transition-colors'
      >
        <option value=''>{t.common.assignDelivery}</option>
        {deliveryMen.map(dm => (
          <option key={dm.id} value={dm.id}>
            {dm.name}
          </option>
        ))}
      </select>
    </div>
  )
}
