'use client'
import { UserRole } from '@prisma/client'
import { useState } from 'react'
import { toggleDeliveryRole } from './_actions/delivery'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { Truck, X } from 'lucide-react'

export default function ToggleDeliveryRole({
  userId,
  currentRole
}: {
  userId: string
  currentRole: UserRole
}) {
  const [loading, setLoading] = useState(false)
  const isDelivery = currentRole === UserRole.DELIVERY

  const handleToggle = async () => {
    setLoading(true)
    try {
      await toggleDeliveryRole(userId, isDelivery ? UserRole.USER : UserRole.DELIVERY)
      Toast(isDelivery ? 'Role changed to user' : 'Assigned as delivery man', 'success')
    } catch {
      Toast('Failed to update role', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-[0.97] disabled:opacity-50
        ${
          isDelivery
            ? 'border border-destructive/30 text-destructive hover:bg-destructive/10'
            : 'bg-foreground text-background hover:bg-foreground/90'
        }`}
    >
      {loading ? (
        <Loader />
      ) : isDelivery ? (
        <>
          <X className='w-3 h-3' /> Remove
        </>
      ) : (
        <>
          <Truck className='w-3 h-3' /> Assign
        </>
      )}
    </button>
  )
}
