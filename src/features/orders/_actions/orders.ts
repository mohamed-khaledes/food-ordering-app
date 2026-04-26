'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { OrderStatus, UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error('Unauthorized')

  const isAdmin = session.user.role === UserRole.ADMIN
  const isDelivery = session.user.role === UserRole.DELIVERY

  if (isDelivery && status !== OrderStatus.OUT_FOR_DELIVERY && status !== OrderStatus.DELIVERED) {
    throw new Error('Unauthorized status change')
  }

  if (!isAdmin && !isDelivery) throw new Error('Unauthorized')

  await db.order.update({
    where: { id: orderId },
    data: { status }
  })

  revalidatePath('/admin/orders')
  revalidatePath('/dashboard')
  revalidatePath('/orders')
  return { success: true }
}

export async function assignDeliveryMan(orderId: string, deliveryManId: string) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== UserRole.ADMIN) throw new Error('Unauthorized')

  await db.order.update({
    where: { id: orderId },
    data: { deliveryManId }
  })

  revalidatePath('/admin/orders')
  return { success: true }
}

export async function getDeliveryOrders(deliveryManId: string) {
  return db.order.findMany({
    where: {
      OR: [{ deliveryManId }, { status: OrderStatus.PREPARING }]
    },
    include: {
      products: { include: { Product: true } },
      deliveryMan: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getUserOrders(email: string) {
  return db.order.findMany({
    where: { userEmail: email },
    include: {
      products: { include: { Product: true } },
      deliveryMan: { select: { name: true, phone: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getDeliveryMen() {
  return db.user.findMany({
    where: { role: UserRole.DELIVERY },
    select: { id: true, name: true, email: true, phone: true }
  })
}
