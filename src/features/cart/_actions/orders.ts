import { PrismaClient } from '@prisma/client'
import { TCreateOrder } from '../type'

const prisma = new PrismaClient()

export async function createOrder(data: TCreateOrder) {
  // 1️⃣ Calculate subtotal
  let subTotal = 0

  for (const item of data.products) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: {
        sizes: true,
        extras: true
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    let itemPrice = product.basePrice

    // add size price
    if (item.sizeId) {
      const size = product.sizes.find(s => s.id === item.sizeId)
      if (!size) throw new Error('Invalid size')
      itemPrice += size.price
    }

    // add extras price
    if (item.extras?.length) {
      const extras = product.extras.filter(e => item.extras?.includes(e.id))
      extras.forEach(e => {
        itemPrice += e.price
      })
    }

    subTotal += itemPrice * item.quantity
  }

  const totalPrice = subTotal + data.deliveryFee

  // 2️⃣ Create order with nested products & extras
  const order = await prisma.order.create({
    data: {
      userEmail: data.userEmail,
      phone: data.phone,
      streetAddress: data.streetAddress,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      subTotal,
      deliveryFee: data.deliveryFee,
      totalPrice,
      products: {
        create: data.products.map(item => ({
          quantity: item.quantity,
          userId: data.userId,
          productId: item.productId,
          sizeId: item.sizeId,
          extras: {
            create: item.extras?.map(extraId => ({
              extraId
            }))
          }
        }))
      }
    },
    include: {
      products: {
        include: {
          Product: true,
          size: true,
          extras: {
            include: {
              extra: true
            }
          }
        }
      }
    }
  })

  return order
}
