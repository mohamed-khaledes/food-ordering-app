'use client'

import { updateOrderStatus } from '@/features/orders/_actions/orders'
import { useMutation } from '@/hooks/useMutation'
import { useTrans } from '@/lib/translations/client'
import { Translations } from '@/types/translations'
import { OrderStatus } from '@prisma/client'
import { LayoutDashboard, ShoppingBag, User } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, href: 'dashboard' },
  { id: 'orders', icon: ShoppingBag, href: 'dashboard/orders' },
  { id: 'profile', icon: User, href: 'dashboard/profile' }
] as const

/** Courier sidebar — same shape as the admin one, three routes instead of seven. */
export function useDeliverySidebar(translations: Translations) {
  const pathname = usePathname()
  const { locale } = useParams()
  const [open, setOpen] = useState(false)
  const ui = translations.adminUi

  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    title: ui.deliveryNav[item.id],
    active: pathname === `/${locale}/${item.href}` || pathname.startsWith(`/${locale}/${item.href}/`)
  }))

  return { navItems, open, setOpen, close: () => setOpen(false) }
}

/**
 * The two moves a courier can make on an order: pick it up, then deliver it.
 *
 * Status is held locally so the button swaps as soon as the call lands. The
 * server rejects any other transition for a delivery account.
 */
export function useDeliveryHandoff(orderId: string, currentStatus: OrderStatus) {
  const t = useTrans()
  const [status, setStatus] = useState(currentStatus)

  const pickUpCall = useMutation(updateOrderStatus, {
    success: t.adminUi.orderPickedUp,
    error: t.adminUi.statusUpdateFailed,
    onSuccess: () => setStatus(OrderStatus.OUT_FOR_DELIVERY)
  })

  const deliverCall = useMutation(updateOrderStatus, {
    success: t.adminUi.orderDelivered,
    error: t.adminUi.statusUpdateFailed,
    onSuccess: () => setStatus(OrderStatus.DELIVERED)
  })

  return {
    status,
    pending: pickUpCall.pending || deliverCall.pending,
    pickUp: () => pickUpCall.run(orderId, OrderStatus.OUT_FOR_DELIVERY),
    deliver: () => deliverCall.run(orderId, OrderStatus.DELIVERED)
  }
}
