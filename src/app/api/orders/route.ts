// src/app/api/orders/route.ts

import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { orderSchema } from '@/features/cart/validations'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate data
    const data = orderSchema.parse(body)

    // Auto calculations
    const subTotal = data.products.reduce((sum, p) => sum + p.price * p.quantity, 0)

    const deliveryFee = 20
    const totalPrice = subTotal + deliveryFee

    // const order = await db.order.create({
    //   data: {
    //     paid: data.paid ?? false,
    //     phone: data.phone,
    //     streetAddress: data.streetAddress,
    //     city: data.city,
    //     country: data.country,
    //     subTotal,
    //     deliveryFee,
    //     totalPrice,

    //     products: {
    //       create: data.products.map(item => ({
    //         quantity: item.quantity,
    //         price: item.price,
    //         Product: {
    //           connect: { id: item.productId }
    //         },
    //         size: item.sizeId ? { connect: { id: item.sizeId } } : undefined,

    //         extras: item.extras?.length
    //           ? {
    //               create: item.extras.map(extraId => ({
    //                 extra: { connect: { id: extraId } }
    //               }))
    //             }
    //           : undefined
    //       }))
    //     }
    //   },
    //   include: {
    //     products: {
    //       include: {
    //         Product: true,
    //         size: true,
    //         extras: { include: { extra: true } }
    //       }
    //     }
    //   }
    // })

    // return NextResponse.json(order)
    return
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
