import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY!
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID!
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      phone,
      userEmail,
      country,
      city,
      postalCode,
      streetAddress,
      totalAmount,
      deliveryFee,
      products,
      cart
    } = body

    // ── Step 1: Auth token ──────────────────────────────────
    const authRes = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    })
    const authData = await authRes.json()
    const authToken = authData?.token

    if (!authToken) {
      return NextResponse.json({ error: 'Paymob auth failed' }, { status: 500 })
    }

    // ── Step 2: Create order on Paymob ─────────────────────
    const amountCents = Math.round(totalAmount * 100)

    const paymobOrderRes = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: true,
        amount_cents: amountCents,
        currency: 'EGP',
        items: cart.map((item: any) => ({
          name: item.name,
          amount_cents: Math.round(item.basePrice * 100),
          description: item.name,
          quantity: item.quantity
        }))
      })
    })
    const paymobOrderData = await paymobOrderRes.json()
    const paymobOrderId = paymobOrderData?.id

    if (!paymobOrderId) {
      return NextResponse.json({ error: 'Failed to create Paymob order' }, { status: 500 })
    }

    // ── Step 3: Payment key ────────────────────────────────
    const firstName = (userEmail ?? 'Customer').split('@')[0]

    const paymentKeyRes = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
          apartment: 'NA',
          email: userEmail ?? 'NA',
          floor: 'NA',
          first_name: firstName,
          street: streetAddress ?? 'NA',
          building: 'NA',
          phone_number: phone ?? 'NA',
          shipping_method: 'PKG',
          postal_code: postalCode ?? 'NA',
          city: city ?? 'Cairo',
          country: 'EG',
          last_name: 'NA',
          state: city ?? 'Cairo'
        },
        currency: 'EGP',
        integration_id: parseInt(PAYMOB_INTEGRATION_ID),
        lock_order_when_paid: true
      })
    })
    const paymentKeyData = await paymentKeyRes.json()
    const paymentKey = paymentKeyData?.token

    if (!paymentKey) {
      return NextResponse.json({ error: 'Failed to get payment key' }, { status: 500 })
    }

    // ── Step 4: Save pending order in DB ───────────────────
    const subTotal = totalAmount - deliveryFee

    await db.order.create({
      data: {
        paymentIntentId: String(paymobOrderId),
        paid: false,
        status: 'PENDING',
        currency: 'EGP',
        subTotal,
        deliveryFee,
        totalPrice: totalAmount,
        userEmail: userEmail ?? null,
        phone: phone ?? '',
        streetAddress: streetAddress ?? '',
        postalCode: postalCode ?? null,
        city: city ?? '',
        country: country ?? 'Egypt',
        products: {
          create: products.map((p: any) => ({
            productId: p.productId,
            quantity: p.quantity,
            sizeId: p.sizeId ?? null,
            userId: null,
            extras: p.extras?.length
              ? {
                  create: p.extras.map((extraId: string) => ({
                    extraId
                  }))
                }
              : undefined
          }))
        }
      }
    })

    // ── Step 5: Return hosted payment URL ──────────────────
    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`

    return NextResponse.json({ paymentUrl })
  } catch (error) {
    console.error('Paymob error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
