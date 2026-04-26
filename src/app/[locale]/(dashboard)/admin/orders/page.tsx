import { formatCurrency } from '@/lib/helpers'
import { Order, OrderStatus } from '@prisma/client'
import { ShoppingBag } from 'lucide-react'
import StatusSelect from '@/features/admin/orders/status-select'
import AssignDelivery from '@/features/admin/orders/assign-delivery'
import { getOrders } from '@/features/admin/orders/_actions/orders'
import { getDeliveryMen } from '@/features/orders/_actions/orders'

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  PAID: 'bg-green-100 text-green-700',
  PREPARING: 'bg-blue-100 text-blue-700',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-primary/15 text-foreground',
  CANCELLED: 'bg-red-100 text-red-700'
}

async function OrdersPage() {
  const [orders, deliveryMen] = await Promise.all([getOrders(), getDeliveryMen()])

  const totalRevenue = orders
    .filter((o: any) => o.paid)
    .reduce((sum: number, o: any) => sum + o.totalPrice, 0)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              Manage
            </span>
          </div>
          <h1 className='text-3xl font-bold'>Orders</h1>
          <p className='text-muted-foreground mt-1'>{orders.length} orders total</p>
        </div>
        <div className='bg-foreground text-background rounded-2xl px-6 py-4 text-right'>
          <p className='text-xs text-background/50 uppercase tracking-widest mb-1'>Total Revenue</p>
          <p className='text-2xl font-bold text-primary'>{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className='bg-background rounded-2xl border border-border overflow-hidden'>
          {/* Table header */}
          <div className='grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/30'>
            <div className='col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              Customer
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:block'>
              Date
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              Status
            </div>
            <div className='col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              Delivery man
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-right'>
              Total
            </div>
          </div>

          {/* Rows */}
          <ul className='divide-y divide-border'>
            {orders.map((order: any) => (
              <li
                key={order.id}
                className='grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors'
              >
                {/* Customer */}
                <div className='col-span-3 flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0'>
                    <ShoppingBag className='w-3.5 h-3.5 text-muted-foreground' />
                  </div>
                  <div>
                    <p className='text-sm font-medium truncate max-w-[120px]'>
                      {order.userEmail ?? 'Guest'}
                    </p>
                    <p className='text-xs text-muted-foreground font-mono'>
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className='col-span-2 hidden md:block'>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Status select */}
                <div className='col-span-2'>
                  <StatusSelect orderId={order.id} currentStatus={order.status as OrderStatus} />
                </div>

                {/* Assign delivery */}
                <div className='col-span-3'>
                  <AssignDelivery
                    orderId={order.id}
                    deliveryMen={deliveryMen}
                    currentDeliveryManId={order.deliveryManId}
                  />
                </div>

                {/* Total */}
                <div className='col-span-2 text-right'>
                  <p className='text-sm font-semibold'>{formatCurrency(order.totalPrice)}</p>
                  {order.paid && <p className='text-[10px] text-green-600'>Paid</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 gap-3 bg-background rounded-2xl border border-border'>
          <div className='w-12 h-12 rounded-2xl bg-muted flex items-center justify-center'>
            <ShoppingBag className='w-5 h-5 text-muted-foreground' />
          </div>
          <p className='text-sm text-muted-foreground'>No orders yet</p>
        </div>
      )}
    </div>
  )
}

export default OrdersPage
