import { Locale } from '@/i18n.config'
import { Order } from '@prisma/client'
import { getOrders } from '@/features/admin/orders/_actions/orders'

async function OrdersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const orders = await getOrders()
  return (
    <main>
      <section className='section-gap'>
        <div className='container'>
          <ul className='flex flex-col gap-4'>
            {orders?.map((order: Order) => (
              <li
                key={order.id}
                className='flex justify-between items-center gap-4 p-4 rounded-md bg-gray-100'
              >
                <div className='md:flex justify-between flex-1'>
                  <h3 className='text-black font-medium text-sm flex-1'>{order.userEmail}</h3>
                  <p className='text-accent font-medium text-sm flex-1'>{order.country}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default OrdersPage
