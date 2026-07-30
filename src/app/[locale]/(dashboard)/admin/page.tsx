import { getTrans } from '@/lib/translations/server'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { getUsers } from '@/server/db/users'
import { getProducts } from '@/server/db/products'
import { getOrders } from '@/features/admin/orders/_actions/orders'
import { getCategories } from '@/server/db/categories'
import { formatCurrency } from '@/lib/helpers'
import { Clock, ShoppingBag, TrendingUp, Users, UtensilsCrossed } from 'lucide-react'
import { Order, OrderStatus } from '@prisma/client'
import EditUserForm from '@/features/profile/form'
import DashboardHeader from '@/features/admin/page-header'
import { Panel, PanelHeader, StatCard, StatusChip } from '@/features/admin/ui'
import { statusLabel, statusTone, STATUS_ORDER } from '@/features/admin/order-status'

async function AdminPage() {
  const translations = await getTrans()
  const session = await getServerSession(authOptions)
  const [users, products, orders, categories] = await Promise.all([
    getUsers(),
    getProducts(),
    getOrders(),
    getCategories()
  ])

  const ui = translations.adminUi
  const totalRevenue = orders
    .filter((o: Order) => o.paid)
    .reduce((sum: number, o: Order) => sum + o.totalPrice, 0)

  const pendingOrders = orders.filter((o: Order) => o.status === OrderStatus.PENDING).length
  const paidOrders = orders.filter((o: Order) => o.paid).length

  const stats = [
    {
      label: ui.totalRevenue,
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      sub: `${paidOrders} ${ui.paidOrders}`,
      tone: 'accent' as const
    },
    {
      label: ui.totalOrders,
      value: orders.length,
      icon: ShoppingBag,
      sub: `${pendingOrders} ${ui.pending}`
    },
    { label: ui.totalUsers, value: users.length, icon: Users, sub: ui.registeredAccounts },
    {
      label: ui.menuItemsCount,
      value: products.length,
      icon: UtensilsCrossed,
      sub: `${categories.length} ${translations.admin.tabs.categories}`
    }
  ]

  const recentOrders = [...orders]
    .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  /**
   * Share of the pipeline per state. A stacked bar makes the mix readable
   * without pulling in a chart library, and each segment keeps the same
   * semantic colour its chip uses.
   */
  const pipeline = STATUS_ORDER.map(status => ({
    status,
    count: orders.filter((o: Order) => o.status === status).length
  })).filter(entry => entry.count > 0)

  return (
    <div>
      <DashboardHeader
        title={ui.dashboard}
        description={`${ui.welcomeBack}, ${session?.user?.name ?? ''}`}
      />

      <div className='mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {pipeline.length > 0 && (
        <Panel className='mb-5 px-5 py-4'>
          <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
            <span className='text-muted-foreground text-[11px] font-medium tracking-widest uppercase'>
              {ui.breakdown}
            </span>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              {pipeline.map(({ status, count }) => (
                <span key={status} className='flex items-center gap-1.5'>
                  <StatusChip status={status} label={statusLabel(status, translations)} />
                  <span className='text-xs font-bold tabular-nums'>{count}</span>
                </span>
              ))}
            </div>
          </div>
          <div aria-hidden className='bg-haze flex h-2 overflow-hidden rounded-full'>
            {pipeline.map(({ status, count }) => (
              <span
                key={status}
                className={statusTone(status).dot}
                style={{ width: `${(count / orders.length) * 100}%` }}
              />
            ))}
          </div>
        </Panel>
      )}

      <div className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
        <Panel className='xl:col-span-2'>
          <PanelHeader
            title={ui.recentOrders}
            meta={
              <span className='flex items-center gap-1.5'>
                <Clock className='h-3 w-3' />
                {ui.latestFive}
              </span>
            }
          />
          <div className='divide-border/70 divide-y'>
            {recentOrders.length > 0 ? (
              recentOrders.map((order: Order) => (
                <div
                  key={order.id}
                  className='flex flex-wrap items-center justify-between gap-3 px-5 py-3.5'
                >
                  <div className='flex min-w-0 items-center gap-3'>
                    <span className='bg-brand-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-full'>
                      <ShoppingBag className='text-brand h-3.5 w-3.5' />
                    </span>
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-semibold'>{order.userEmail ?? ui.guest}</p>
                      <p className='text-muted-foreground truncate text-xs'>
                        {[order.city, order.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className='flex shrink-0 items-center gap-3'>
                    <StatusChip
                      status={order.status as OrderStatus}
                      label={statusLabel(order.status as OrderStatus, translations)}
                    />
                    <span className='text-sm font-bold tabular-nums'>
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-muted-foreground py-10 text-center text-sm'>{ui.noOrders}</p>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={ui.myProfile} />
          <div className='p-5'>
            <EditUserForm user={session?.user as any} translations={translations} />
          </div>
        </Panel>
      </div>
    </div>
  )
}

export default AdminPage
