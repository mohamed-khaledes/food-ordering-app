import Landing from '@/features/home'
import { db } from '@/lib/prisma'

export default async function Home() {
  // const extras = await db.product.create({data:{}})
  // const extras = await db.extras.createMany({
  //   data: [
  //     { name: 'BACON', price: 14, productId: 'cmg3u2l0q0000tg94osdkh8im' },
  //     { name: 'PEPPER', price: 12, productId: 'cmg3u2l0q0000tg94osdkh8im' },
  //     { name: 'ONION', price: 10, productId: 'cmg3u2l0q0000tg94osdkh8im' }
  //   ]
  // })
  return (
    <main>
      <Landing />
    </main>
  )
}
