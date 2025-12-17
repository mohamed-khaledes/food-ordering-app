export type TCreateOrder = {
  userId?: string
  userEmail?: string
  phone: string
  streetAddress: string
  postalCode?: string
  city: string
  country: string
  deliveryFee: number
  products: {
    productId: string
    quantity: number
    sizeId?: string
    extras?: string[] // extraIds
  }[]
}
