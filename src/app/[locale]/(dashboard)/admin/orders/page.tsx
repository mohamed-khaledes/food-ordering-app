import { formatCurrency } from '@/lib/helpers'
import { OrderStatus } from '@prisma/client'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import StatusSelect from '@/features/admin/orders/status-select'
import AssignDelivery from '@/features/admin/orders/assign-delivery'
import { getOrders } from '@/features/admin/orders/_actions/orders'
import { getDeliveryMen } from '@/features/orders/_actions/orders'
import DashboardHeader from '@/features/admin/page-header'
import { getTrans } from '@/lib/translations/server'
import { EmptyState, Panel, StatusChip } from '@/features/admin/ui'
import { statusLabel, STATUS_ORDER } from '@/features/admin/order-status'

async function OrdersPage() {
  const [orders, deliveryMen, t] = await Promise.all([getOrders(), getDeliveryMen(), getTrans()])
  const ui = t.adminUi

  const totalRevenue = orders
    .filter((o: any) => o.paid)
    .reduce((sum: number, o: any) => sum + o.totalPrice, 0)

  // Counts per state, so the operator sees the shape of the queue at a glance.
  const byStatus = STATUS_ORDER.map(status => ({
    status,
    count: orders.filter((o: any) => o.status === status).length
  })).filter(entry => entry.count > 0)

  return (
    <div>
      <DashboardHeader
        title={t.admin.tabs.orders}
        description={`${orders.length} ${ui.ordersTotal}`}
        action={
          <div className='bg-deep rounded-xl px-5 py-3 text-end text-white'>
            <p className='text-[10px] tracking-widest text-white/50 uppercase'>{ui.totalRevenue}</p>
            <p className='text-brand text-2xl leading-tight font-bold tabular-nums'>
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        }
      />

      {orders.length > 0 ? (
        <div className='space-y-4'>
          {byStatus.length > 0 && (
            <Panel className='flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4'>
              <span className='text-muted-foreground text-[11px] font-medium tracking-widest uppercase'>
                {ui.breakdown}
              </span>
              {byStatus.map(({ status, count }) => (
                <span key={status} className='flex items-center gap-2'>
                  <StatusChip status={status} label={statusLabel(status, t)} />
                  <span className='text-sm font-bold tabular-nums'>{count}</span>
                </span>
              ))}
            </Panel>
          )}

          <Panel className='overflow-hidden'>
            {/* Column headings are desktop-only — each row labels itself on mobile. */}
            <div className='bg-haze/70 text-muted-foreground border-border/70 hidden border-b px-5 py-3 text-[11px] font-medium tracking-widest uppercase lg:grid lg:grid-cols-12 lg:gap-4'>
              <div className='lg:col-span-3'>{ui.table.customer}</div>
              <div className='lg:col-span-2'>{ui.table.date}</div>
              <div className='lg:col-span-2'>{ui.table.status}</div>
              <div className='lg:col-span-3'>{ui.table.deliveryMan}</div>
              <div className='text-end lg:col-span-2'>{ui.table.total}</div>
            </div>

            <ul className='divide-border/70 divide-y'>
              {orders.map((order: any) => (
                <li
                  key={order.id}
                  className='hover:bg-haze/50 px-5 py-4 transition-colors lg:grid lg:grid-cols-12 lg:items-center lg:gap-4'
                >
                  {/* Customer + reference */}
                  <div className='flex min-w-0 items-start gap-3 lg:col-span-3'>
                    <span className='bg-brand-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-full'>
                      <ShoppingBag className='text-brand h-4 w-4' />
                    </span>
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-semibold'>{order.userEmail ?? ui.guest}</p>
                      <p className='text-muted-foreground font-mono text-xs'>
                        #{order.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>

                  <div className='text-muted-foreground mt-3 text-xs lg:col-span-2 lg:mt-0'>
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>

                  <div className='mt-3 lg:col-span-2 lg:mt-0'>
                    <StatusSelect orderId={order.id} currentStatus={order.status as OrderStatus} />
                  </div>

                  <div className='mt-3 lg:col-span-3 lg:mt-0'>
                    <AssignDelivery
                      orderId={order.id}
                      deliveryMen={deliveryMen}
                      currentDeliveryManId={order.deliveryManId}
                    />
                  </div>

                  {/* Total. On mobile it becomes a labelled footer row. */}
                  <div className='border-border/70 mt-3 flex items-center justify-between border-t pt-3 lg:col-span-2 lg:mt-0 lg:block lg:border-0 lg:pt-0 lg:text-end'>
                    <span className='text-muted-foreground text-[11px] tracking-widest uppercase lg:hidden'>
                      {ui.table.total}
                    </span>
                    <span className='flex items-center gap-2'>
                      <p className='text-[15px] font-bold tabular-nums'>
                        {formatCurrency(order.totalPrice)}
                      </p>
                      {order.paid && (
                        <span className='text-state-paid inline-flex items-center gap-1 text-[11px] font-medium lg:hidden'>
                          <CheckCircle2 className='h-3 w-3' />
                          {ui.paidTag}
                        </span>
                      )}
                    </span>
                    {order.paid && (
                      <p className='text-state-paid mt-0.5 hidden items-center justify-end gap-1 text-[11px] font-medium lg:flex'>
                        <CheckCircle2 className='h-3 w-3' />
                        {ui.paidTag}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      ) : (
        <EmptyState icon={ShoppingBag} message={ui.noOrders} />
      )}
    </div>
  )
}

export default OrdersPage
