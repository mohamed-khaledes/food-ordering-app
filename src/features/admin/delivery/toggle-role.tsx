'use client'
import { UserRole } from '@prisma/client'
import Loader from '@/components/ui/loader'
import { Truck, X } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { useToggleDeliveryRole } from './hooks'

export default function ToggleDeliveryRole({
  userId,
  currentRole
}: {
  userId: string
  currentRole: UserRole
}) {
  const t = useTrans()
  const { isDelivery, pending, toggle } = useToggleDeliveryRole(userId, currentRole)

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-all active:scale-[0.97] disabled:opacity-50
        ${
          isDelivery
            ? 'border border-destructive/30 text-destructive hover:bg-destructive/10'
            : 'bg-foreground text-background hover:bg-foreground/90'
        }`}
    >
      {pending ? (
        <Loader />
      ) : isDelivery ? (
        <>
          <X className='w-3 h-3' /> {t.adminUi.removeRole}
        </>
      ) : (
        <>
          <Truck className='w-3 h-3' /> {t.adminUi.assignRole}
        </>
      )}
    </button>
  )
}
