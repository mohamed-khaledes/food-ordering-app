import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent

    // Prevent duplicate orders
    const existingOrder = await db.order.findUnique({
      where: { paymentIntentId: intent.id }
    })

    if (existingOrder) {
      return NextResponse.json({ received: true })
    }

    const payload = JSON.parse(intent.metadata.orderPayload)

    await db.$transaction(async tx => {
      await tx.order.create({
        data: {
          paymentIntentId: intent.id,
          paid: true,
          paidAt: new Date(),
          status: 'PAID',
          currency: intent.currency,

          userEmail: payload.userEmail,
          phone: payload.phone,
          streetAddress: payload.streetAddress,
          postalCode: payload.postalCode,
          city: payload.city,
          country: payload.country,

          subTotal: intent.amount_received / 100 - payload.deliveryFee,
          deliveryFee: payload.deliveryFee,
          totalPrice: intent.amount_received / 100,

          products: {
            create: payload.products.map((p: any) => ({
              productId: p.productId,
              quantity: p.quantity,
              sizeId: p.sizeId,
              extras: {
                create: p.extras?.map((extraId: string) => ({ extraId }))
              }
            }))
          }
        }
      })
    })
  }

  return NextResponse.json({ received: true })
}
