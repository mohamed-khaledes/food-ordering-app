import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getUsers = cache(
  async () => {
    try {
      const users = db.user.findMany()
      return users
    } catch (err) {
      console.error('Failed to fetch users', err)
      return []
    }
  },
  ['users'],
  { revalidate: 3600 }
)
export const getUser = cache(
  async (userId: string) => {
    try {
      const user = db.user.findUnique({ where: { id: userId } })
      return user
    } catch (err) {
      console.error('Failed to fetch the user', err)
      return []
    }
  },
  [`user-${crypto.randomUUID()}`],
  { revalidate: 3600 }
)
