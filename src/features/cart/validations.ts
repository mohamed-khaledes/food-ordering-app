import z from 'zod'

export const orderSchema = z.object({
  paid: z.boolean().optional().default(false),
  userEmail: z.string().email().optional().nullable(),
  phone: z.string().min(5),
  streetAddress: z.string().min(3),
  postalCode: z.string().optional().nullable(),
  city: z.string().min(2),
  country: z.string().min(2),
  deliveryFee: z.number().min(0),
  products: z.array(
    z.object({
      productId: z.string(),
      sizeId: z.string().optional().nullable(),
      extras: z.array(z.string()).optional().default([]),
      quantity: z.number().min(1),
      basePrice: z.number().min(0),
      deliveryFee: z.number().min(0)
    })
  )
})
