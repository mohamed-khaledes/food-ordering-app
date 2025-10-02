import Menu from '@/components/menu'
import MainHead from '@/components/ui/main-head'
import { db } from '@/lib/prisma'

async function BestSellers() {
  const products = await db.product.findMany()

  const bestSellers = [
    {
      id: crypto.randomUUID(),
      name: 'pizza',
      description: "Craving pizza? We've got you covered with fresh ingredients, endless flavors",
      basePrice: 12,
      image: '/assets/images/pizza.png',
      sizes: [
        { id: crypto.randomUUID(), name: 'small', price: 20 },
        { id: crypto.randomUUID(), name: 'medium', price: 40 },
        { id: crypto.randomUUID(), name: 'large', price: 50 }
      ],
      extras: [
        { id: crypto.randomUUID(), name: 'tomato', price: 20 },
        { id: crypto.randomUUID(), name: 'union', price: 40 },
        { id: crypto.randomUUID(), name: 'veg', price: 50 }
      ]
    },
    {
      id: crypto.randomUUID(),
      name: 'pizza',
      description: "Craving pizza? We've got you covered with fresh ingredients, endless flavors",
      basePrice: 12,
      image: '/assets/images/pizza.png',
      sizes: [
        { id: crypto.randomUUID(), name: 'small', price: 20 },
        { id: crypto.randomUUID(), name: 'medium', price: 40 },
        { id: crypto.randomUUID(), name: 'large', price: 50 }
      ],
      extras: [
        { id: crypto.randomUUID(), name: 'tomato', price: 20 },
        { id: crypto.randomUUID(), name: 'union', price: 40 },
        { id: crypto.randomUUID(), name: 'veg', price: 50 }
      ]
    },
    {
      id: crypto.randomUUID(),
      name: 'pizza',
      description: "Craving pizza? We've got you covered with fresh ingredients, endless flavors",
      basePrice: 12,
      image: '/assets/images/pizza.png',
      sizes: [
        { id: crypto.randomUUID(), name: 'small', price: 20 },
        { id: crypto.randomUUID(), name: 'medium', price: 40 },
        { id: crypto.randomUUID(), name: 'large', price: 50 }
      ],
      extras: [
        { id: crypto.randomUUID(), name: 'tomato', price: 20 },
        { id: crypto.randomUUID(), name: 'union', price: 40 },
        { id: crypto.randomUUID(), name: 'veg', price: 50 }
      ]
    }
  ]

  return (
    <section className='section-gap'>
      <div className='container'>
        <div className='text-center mb-4'>
          <MainHead subTitle={'checkOut'} title={'Our Best Sellers'} />
        </div>
        <Menu items={products} />
      </div>
    </section>
  )
}

export default BestSellers
