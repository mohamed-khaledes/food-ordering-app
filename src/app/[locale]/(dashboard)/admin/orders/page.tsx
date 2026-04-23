import { getOrders } from '@/features/admin/orders/_actions/orders'
import { formatCurrency } from '@/lib/helpers'
import { Order, OrderStatus } from '@prisma/client'
import { ShoppingBag } from 'lucide-react'

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  PAID: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  PREPARING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  DELIVERED: 'bg-primary/15 text-foreground',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

async function OrdersPage() {
  const orders = await getOrders()

  const totalRevenue = orders
    .filter((o: Order) => o.paid)
    .reduce((sum: number, o: Order) => sum + o.totalPrice, 0)

  return (
    <div className='space-y-6'>
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
            <div className='col-span-4 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              Customer
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:block'>
              Location
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden sm:block'>
              Date
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              Status
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-right'>
              Total
            </div>
          </div>

          {/* Rows */}
          <ul className='divide-y divide-border'>
            {orders.map((order: Order) => (
              <li
                key={order.id}
                className='grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors'
              >
                <div className='col-span-4 flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0'>
                    <ShoppingBag className='w-3.5 h-3.5 text-muted-foreground' />
                  </div>
                  <div>
                    <p className='text-sm font-medium truncate max-w-[140px]'>
                      {order.userEmail ?? 'Guest'}
                    </p>
                    <p className='text-xs text-muted-foreground font-mono truncate max-w-[100px]'>
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                <div className='col-span-2 hidden md:block'>
                  <p className='text-sm text-muted-foreground'>{order.city}</p>
                  <p className='text-xs text-muted-foreground'>{order.country}</p>
                </div>

                <div className='col-span-2 hidden sm:block'>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className='col-span-2'>
                  <span
                    className={`text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider ${statusColors[order.status]}`}
                  >
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className='col-span-2 text-right'>
                  <p className='text-sm font-semibold'>{formatCurrency(order.totalPrice)}</p>
                  {order.paid && (
                    <p className='text-[10px] text-green-600 dark:text-green-400'>Paid</p>
                  )}
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
