import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { Order, OrderStatus } from '@prisma/client'
import { formatCurrency } from '@/lib/helpers'
import { ShoppingBag } from 'lucide-react'
import DeliveryStatusSelect from '@/features/delivery/status-select'
import { getDeliveryOrders } from '@/features/orders/_actions/orders'
import { getTrans } from '@/lib/translations/server'

async function DeliveryOrdersPage() {
  const session = await getServerSession(authOptions)
  const [orders, t] = await Promise.all([getDeliveryOrders(session!.user.id), getTrans()])

  const available = orders.filter(
    (o: any) => o.status === OrderStatus.PREPARING && !o.deliveryManId
  )
  const mine = orders.filter((o: any) => o.deliveryManId === session!.user.id)

  return (
    <div className='space-y-8'>
      <div>
        <div className='inline-flex items-center gap-2 bg-brand-soft border border-brand/40 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-brand' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Manage
          </span>
        </div>
        <h1 className='text-3xl font-bold'>{t.admin.tabs.orders}</h1>
      </div>

      {/* Available orders to pick up */}
      <div className='space-y-3'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-amber-400' />
          Available to pick up ({available.length})
        </h2>
        {available.length === 0 ? (
          <div className='flex items-center justify-center py-10 bg-background rounded-none border border-border'>
            <p className='text-sm text-muted-foreground'>{t.common.noAvailableOrders}</p>
          </div>
        ) : (
          <div className='bg-background rounded-none border border-border divide-y divide-border overflow-hidden'>
            {available.map((order: any) => (
              <OrderRow key={order.id} order={order} isDelivery />
            ))}
          </div>
        )}
      </div>

      {/* My orders */}
      <div className='space-y-3'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-brand' />
          My orders ({mine.length})
        </h2>
        {mine.length === 0 ? (
          <div className='flex items-center justify-center py-10 bg-background rounded-none border border-border'>
            <p className='text-sm text-muted-foreground'>{t.common.noPickedOrders}</p>
          </div>
        ) : (
          <div className='bg-background rounded-none border border-border divide-y divide-border overflow-hidden'>
            {mine.map((order: any) => (
              <OrderRow key={order.id} order={order} isDelivery showStatus />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveryOrdersPage

function OrderRow({
  order,
  isDelivery,
  showStatus
}: {
  order: any
  isDelivery?: boolean
  showStatus?: boolean
}) {
  return (
    <div className='px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors'>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-sm bg-muted flex items-center justify-center flex-shrink-0'>
          <ShoppingBag className='w-4 h-4 text-muted-foreground' />
        </div>
        <div>
          <p className='text-sm font-medium text-foreground'>
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
          <p className='text-xs text-muted-foreground'>
            {order.streetAddress}, {order.city}
          </p>
          <p className='text-xs text-muted-foreground mt-0.5'>{order.phone}</p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <span className='text-sm font-bold text-foreground'>
          {formatCurrency(order.totalPrice)}
        </span>
        {showStatus && isDelivery && (
          <DeliveryStatusSelect orderId={order.id} currentStatus={order.status} />
        )}
        {!showStatus && isDelivery && (
          <DeliveryStatusSelect orderId={order.id} currentStatus={order.status} pickUp />
        )}
      </div>
    </div>
  )
}
