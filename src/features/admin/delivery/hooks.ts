'use client'

import { useMutation } from '@/hooks/useMutation'
import { useTrans } from '@/lib/translations/client'
import { UserRole } from '@prisma/client'
import { toggleDeliveryRole } from './_actions/delivery'

/**
 * Promotes a user to delivery man or puts them back. The row is revalidated by
 * the action, so the button reads its state straight off `currentRole`.
 */
export function useToggleDeliveryRole(userId: string, currentRole: UserRole) {
  const t = useTrans()
  const isDelivery = currentRole === UserRole.DELIVERY

  const { run, pending } = useMutation(toggleDeliveryRole, {
    success: isDelivery ? t.adminUi.roleRemoved : t.adminUi.roleAssigned,
    error: t.adminUi.roleUpdateFailed
  })

  return {
    isDelivery,
    pending,
    toggle: () => run(userId, isDelivery ? UserRole.USER : UserRole.DELIVERY)
  }
}
