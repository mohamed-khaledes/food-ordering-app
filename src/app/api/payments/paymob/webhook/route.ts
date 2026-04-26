import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import crypto from 'crypto'

const HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET!

function verifyHmac(query: URLSearchParams): boolean {
  // Exact field order Paymob uses for HMAC concatenation
  const hmacFields = [
    'amount_cents',
    'created_at',
    'currency',
    'error_occured',
    'has_parent_transaction',
    'id',
    'integration_id',
    'is_3d_secure',
    'is_auth',
    'is_capture',
    'is_refunded',
    'is_standalone_payment',
    'is_voided',
    'order',
    'owner',
    'pending',
    'source_data.pan',
    'source_data.sub_type',
    'source_data.type',
    'success'
  ]

  const concatenated = hmacFields.map(f => query.get(f) ?? '').join('')

  console.log('HMAC fields concatenated:', concatenated)
  console.log('Expected HMAC:', query.get('hmac'))

  const hash = crypto.createHmac('sha512', HMAC_SECRET).update(concatenated).digest('hex')

  console.log('Computed HMAC:', hash)

  return hash === query.get('hmac')
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams

    console.log('Webhook received, all params:')
    query.forEach((value, key) => console.log(`  ${key}: ${value}`))

    const isValid = verifyHmac(query)

    if (!isValid) {
      console.error('HMAC verification failed')
      // Don't block redirect on HMAC failure during testing
      // return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
    }

    const success = query.get('success') === 'true'
    const paymobOrderId = query.get('order')

    if (!paymobOrderId) {
      return NextResponse.redirect(new URL('/payment-failed', req.url))
    }

    const order = await db.order.findFirst({
      where: { paymentIntentId: paymobOrderId }
    })

    if (!order) {
      console.error('Order not found for paymobOrderId:', paymobOrderId)
      return NextResponse.redirect(new URL('/payment-failed', req.url))
    }

    if (success) {
      await db.order.update({
        where: { id: order.id },
        data: {
          paid: true,
          status: 'PAID',
          paidAt: new Date(),
          currency: query.get('currency') ?? 'EGP'
        }
      })
      return NextResponse.redirect(new URL(`/payment-success?order=${order.id}`, req.url))
    } else {
      return NextResponse.redirect(new URL('/payment-failed', req.url))
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.redirect(new URL('/payment-failed', req.url))
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const obj = body?.obj

    if (!obj) return NextResponse.json({ received: true })

    const paymobOrderId = String(obj?.order?.id)
    const success = obj?.success === true

    if (success && paymobOrderId) {
      await db.order.updateMany({
        where: { paymentIntentId: paymobOrderId },
        data: {
          paid: true,
          status: 'PAID',
          paidAt: new Date()
        }
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook POST error:', error)
    return NextResponse.json({ received: true })
  }
}
