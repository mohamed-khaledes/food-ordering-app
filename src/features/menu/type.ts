import { Extras, Product, Sizes } from '@/generated/prisma'

export type ProductWithRelations = Product & {
  sizes: Sizes[]
  extras: Extras[]
}
