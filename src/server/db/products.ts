import { cache } from '@/lib/cache'
import { db } from '@/lib/prisma'

export const getProductsByCategory = cache(
  async () => {
    try {
      const products = db.category.findMany({
        include: {
          Product: {
            include: {
              sizes: true,
              extras: true
            }
          }
        }
      })
      return products
    } catch (err) {
      console.error('Failed to fetch products', err)
      return []
    }
  },
  ['products-by-category'],
  { revalidate: 3600 }
)

export const getBestSellers = cache(
  async (limit?: number | undefined) => {
    try {
      const bestSellers = db.product.findMany({
        where: {
          orders: {
            some: {}
          }
        },
        orderBy: {
          orders: {
            _count: 'desc'
          }
        },
        include: {
          sizes: true,
          extras: true
        },
        take: limit
      })
      return bestSellers
    } catch (err) {
      console.error('Failed to fetch products', err)
      return []
    }
  },
  ['best-sellers'],
  { revalidate: 3600 }
)

export const getProducts = cache(
  async () => {
    try {
      const products = db.product.findMany({
        orderBy: {
          order: 'asc'
        }
      })
      return products
    } catch (err) {
      console.error('Failed to fetch products', err)
      return []
    }
  },
  ['products'],
  { revalidate: 3600 }
)

export const getProduct = cache(
  async (id: string) => {
    try {
      const product = db.product.findUnique({
        where: {
          id
        },
        include: {
          sizes: true,
          extras: true
        }
      })
      return product
    } catch (err) {
      console.error('Failed to fetch the product', err)
      return []
    }
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
)
