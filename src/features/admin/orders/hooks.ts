'use client'

import { assignDeliveryMan, updateOrderStatus } from '@/features/orders/_actions/orders'
import { useMutation } from '@/hooks/useMutation'
import { useTrans } from '@/lib/translations/client'
import { OrderStatus } from '@prisma/client'
import { useState } from 'react'
import { STATUS_ORDER, statusLabel, statusTone } from '../order-status'

/**
 * Inline status editor on an order row.
 *
 * The chip is held in local state so it updates the moment the call resolves,
 * without waiting for the page to revalidate.
 */
export function useOrderStatus(orderId: string, currentStatus: OrderStatus) {
  const t = useTrans()
  const [status, setStatus] = useState(currentStatus)

  const { run, pending } = useMutation(updateOrderStatus, {
    success: t.adminUi.statusUpdated,
    error: t.adminUi.statusUpdateFailed
  })

  const change = async (newStatus: OrderStatus) => {
    const result = await run(orderId, newStatus)
    if (result) setStatus(newStatus)
  }

  return {
    status,
    change,
    pending,
    tone: statusTone(status),
    label: statusLabel(status, t),
    options: STATUS_ORDER.map(option => ({ value: option, label: statusLabel(option, t) }))
  }
}

/** Assigns a delivery man to an order from the admin orders table. */
export function useAssignDelivery(orderId: string, currentDeliveryManId?: string | null) {
  const t = useTrans()
  const [selected, setSelected] = useState(currentDeliveryManId ?? '')

  const { run, pending } = useMutation(assignDeliveryMan, {
    success: t.adminUi.deliveryAssigned,
    error: t.adminUi.deliveryAssignFailed
  })

  const assign = async (deliveryManId: string) => {
    const result = await run(orderId, deliveryManId)
    if (result) setSelected(deliveryManId)
  }

  return { selected, assign, pending }
}
