import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getPublishedBlogs = cache(
  async (limit?: number) => {
    try {
      return await db.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: limit
      })
    } catch (err) {
      console.error('Failed to fetch blogs', err)
      return []
    }
  },
  ['published-blogs'],
  { revalidate: 3600 }
)

/** Admin listing — includes drafts, so it is intentionally uncached. */
export const getAllBlogs = async () => {
  try {
    return await db.blog.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (err) {
    console.error('Failed to fetch blogs', err)
    return []
  }
}

export const getBlogBySlug = async (slug: string) => {
  try {
    return await db.blog.findUnique({ where: { slug } })
  } catch (err) {
    console.error('Failed to fetch the blog', err)
    return null
  }
}

export const getBlogById = async (id: string) => {
  try {
    return await db.blog.findUnique({ where: { id } })
  } catch (err) {
    console.error('Failed to fetch the blog', err)
    return null
  }
}
