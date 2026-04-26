import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { orderSchema } from '@/features/cart/validations'
import { OrderProduct } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    const result = orderSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors, success: false },
        { status: 400 }
      )
    }

    const data: any = result.data

    // Fetch all products in one query
    const productIds = data.products.map((p: any) => p.productId)
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      include: { sizes: true, extras: true }
    })

    const productMap = new Map(products.map(p => [p.id, p]))
    let subTotal = 0

    for (const item of data.products) {
      const product = productMap.get(item.productId)

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      let itemPrice = product.basePrice

      if (item.sizeId) {
        const size = product.sizes.find(s => s.id === item.sizeId)
        if (!size) {
          return NextResponse.json({ error: 'Invalid size selected' }, { status: 400 })
        }
        itemPrice += size.price
      }

      if (item.extras?.length) {
        for (const extraId of item.extras) {
          const extra = product.extras.find(e => e.id === extraId)
          if (!extra) {
            return NextResponse.json({ error: 'Invalid extra selected' }, { status: 400 })
          }
          itemPrice += extra.price
        }
      }

      subTotal += itemPrice * item.quantity
    }

    const totalPrice = +subTotal + +data.deliveryFee

    const order = await db.order.create({
      data: {
        // Session email is always the source of truth
        userEmail: session?.user?.email ?? data.userEmail ?? null,
        phone: data.phone,
        streetAddress: data.streetAddress,
        postalCode: data.postalCode ?? null,
        city: data.city,
        country: data.country,
        subTotal,
        deliveryFee: data.deliveryFee,
        totalPrice,
        paid: false,
        status: 'PENDING',
        currency: 'EGP',
        products: {
          create: data.products.map((item: any) => ({
            quantity: item.quantity,
            userId: session?.user?.id ?? null,
            productId: item.productId,
            sizeId: item.sizeId ?? null,
            extras: {
              create: item.extras?.map((extraId: string) => ({ extraId })) ?? []
            }
          }))
        }
      },
      include: {
        products: {
          include: {
            Product: true,
            size: true,
            extras: { include: { extra: true } }
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: order }, { status: 200 })
  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, error: error.message ?? 'Something went wrong' },
      { status: 500 }
    )
  }
}
