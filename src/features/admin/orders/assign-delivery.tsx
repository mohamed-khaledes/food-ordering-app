'use client'
import { useState } from 'react'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { assignDeliveryMan } from '@/features/orders/_actions/orders'

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
  const [selected, setSelected] = useState(currentDeliveryManId ?? '')
  const [loading, setLoading] = useState(false)

  const handleAssign = async (deliveryManId: string) => {
    setLoading(true)
    try {
      await assignDeliveryMan(orderId, deliveryManId)
      setSelected(deliveryManId)
      Toast('Delivery man assigned', 'success')
    } catch {
      Toast('Failed to assign', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (deliveryMen.length === 0) {
    return <span className='text-xs text-muted-foreground'>No delivery men</span>
  }

  return (
    <div className='flex items-center gap-2'>
      {loading && <Loader />}
      <select
        value={selected}
        onChange={e => handleAssign(e.target.value)}
        disabled={loading}
        className='text-xs px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground outline-none cursor-pointer focus:border-primary/40 transition-colors'
      >
        <option value=''>Assign delivery</option>
        {deliveryMen.map(dm => (
          <option key={dm.id} value={dm.id}>
            {dm.name}
          </option>
        ))}
      </select>
    </div>
  )
}
