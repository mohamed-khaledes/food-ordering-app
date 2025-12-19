import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getOrders = cache(
  () => {
    const users = db.order.findMany()
    return users
  },
  ['orders'],
  { revalidate: 3600 }
)
export const getOrder = cache(
  (userId: string) => {
    const user = db.order.findUnique({ where: { id: userId } })
    return user
  },
  [`order-${crypto.randomUUID()}`],
  { revalidate: 3600 }
)
