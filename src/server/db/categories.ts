import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getCategories = cache(
  async () => {
    try {
      const categories = await db.category.findMany({
        orderBy: { order: 'asc' }
      })
      return categories
    } catch (err) {
      console.error('Failed to fetch categories', err)
      return []
    }
  },
  ['categories'],
  { revalidate: 3600 }
)
