import { Extras, Product, Sizes } from '@prisma/client'

export type ProductWithRelations = Product & {
  sizes: Sizes[]
  extras: Extras[]
}
