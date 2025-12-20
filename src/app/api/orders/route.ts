import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { orderSchema } from '@/features/cart/validations'
import { OrderProduct } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = orderSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors, success: false, status: 400 },
        { status: 400 }
      )
    }
    const data: any = result.data
    // 1️⃣ Fetch all products in one query
    const productIds = data.products.map((p: OrderProduct) => p.productId)
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      include: {
        sizes: true,
        extras: true
      }
    })

    // Convert to map for O(1) access
    const productMap = new Map(products.map(p => [p.id, p]))
    let subTotal = 0

    for (const item of data.products) {
      const product = productMap.get(item.productId)

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      let itemPrice = product.basePrice

      // size price
      if (item.sizeId) {
        const size = product.sizes.find(s => s.id === item.sizeId)
        if (!size) {
          return NextResponse.json({ error: 'Invalid size selected' }, { status: 400 })
        }
        itemPrice += size.price
      }

      // extras price
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

    const totalPrice: number = +subTotal + +data.deliveryFee
    // 2️⃣ Transaction (IMPORTANT)
    // const order = await db.$transaction(async tx => {})
    const order = await db.order.create({
      data: {
        userEmail: data.userEmail,
        phone: data.phone,
        streetAddress: data.streetAddress,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        subTotal: subTotal,
        deliveryFee: data.deliveryFee,
        totalPrice: totalPrice,
        products: {
          create: data.products.map((item: any) => ({
            quantity: item.quantity,
            userId: data.userId,
            productId: item.productId,
            sizeId: item.sizeId,
            extras: {
              create: item.extras?.map((extraId: string) => ({ extraId }))
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

    return NextResponse.json({ success: true, status: 200, data: order }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { success: false, status: 500, error: error.message ?? 'Something went wrong' },
      { status: 500 }
    )
  }
}
