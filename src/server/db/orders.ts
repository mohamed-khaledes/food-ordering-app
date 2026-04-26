import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getOrders = cache(
  async () => {
    return db.order.findMany({
      include: {
        products: { include: { Product: true } },
        deliveryMan: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  },
  ['orders'],
  { revalidate: 3600 }
)

export const getOrder = cache(
  async (orderId: string) => {
    return db.order.findUnique({
      where: { id: orderId },
      include: {
        products: { include: { Product: true } },
        deliveryMan: { select: { id: true, name: true } }
      }
    })
  },
  ['order'],
  { revalidate: 3600 }
)
