import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/prisma'
import { orderSchema } from '@/features/cart/validations'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = orderSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const data = result.data

  // 🔒 SERVER PRICE CALCULATION (same optimized logic you already have)
  let subTotal = 0

  const products = await db.product.findMany({
    where: { id: { in: data.products.map(p => p.productId) } },
    include: { sizes: true, extras: true }
  })

  const productMap = new Map(products.map(p => [p.id, p]))

  for (const item of data.products) {
    const product = productMap.get(item.productId)
    if (!product) throw new Error('Product not found')

    let price = product.basePrice

    if (item.sizeId) {
      const size = product.sizes.find(s => s.id === item.sizeId)
      if (!size) throw new Error('Invalid size')
      price += size.price
    }

    if (item.extras?.length) {
      for (const extraId of item.extras) {
        const extra = product.extras.find(e => e.id === extraId)
        if (!extra) throw new Error('Invalid extra')
        price += extra.price
      }
    }

    subTotal += price * item.quantity
  }

  const totalPrice = subTotal + data.deliveryFee

  // Stripe uses smallest currency unit (cents)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalPrice * 100),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: {
      orderPayload: JSON.stringify({
        userEmail: data.userEmail,
        phone: data.phone,
        streetAddress: data.streetAddress,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        deliveryFee: data.deliveryFee,
        products: data.products
      })
    }
  })

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret
  })
}
