import { getTrans } from '@/lib/translations/server'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { getUsers } from '@/server/db/users'
import { getProducts } from '@/server/db/products'
import { getOrders } from '@/features/admin/orders/_actions/orders'
import { getCategories } from '@/server/db/categories'
import { formatCurrency } from '@/lib/helpers'
import { ShoppingBag, Users, UtensilsCrossed, Tag, TrendingUp, Clock } from 'lucide-react'
import { Order, OrderStatus } from '@prisma/client'
import EditUserForm from '@/features/profile/form'

async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const translations = await getTrans()
  const session = await getServerSession(authOptions)
  const [users, products, orders, categories] = await Promise.all([
    getUsers(),
    getProducts(),
    getOrders(),
    getCategories()
  ])

  const totalRevenue = orders
    .filter((o: Order) => o.paid)
    .reduce((sum: number, o: Order) => sum + o.totalPrice, 0)

  const pendingOrders = orders.filter((o: Order) => o.status === OrderStatus.PENDING).length
  const paidOrders = orders.filter((o: Order) => o.paid).length

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      sub: `${paidOrders} paid orders`,
      accent: true
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      sub: `${pendingOrders} pending`
    },
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      sub: 'Registered accounts'
    },
    {
      label: 'Menu Items',
      value: products.length,
      icon: UtensilsCrossed,
      sub: `${categories.length} categories`
    }
  ]

  const recentOrders = [...orders]
    .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    PAID: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    PREPARING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    DELIVERED: 'bg-primary/15 text-foreground',
    CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }

  return (
    <div className='space-y-8'>
      {/* Page header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Overview
          </span>
        </div>
        <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
        <p className='text-muted-foreground mt-1'>
          Welcome back,{' '}
          <strong className='text-foreground font-medium'>{session?.user?.name}</strong>
        </p>
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5
              ${
                stat.accent
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background border-border hover:border-primary/30'
              }`}
          >
            <div className='flex items-start justify-between mb-4'>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${stat.accent ? 'bg-primary/20' : 'bg-muted'}`}
              >
                <stat.icon
                  className={`w-5 h-5 ${stat.accent ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </div>
              <span
                className={`text-xs uppercase tracking-widest ${stat.accent ? 'text-background/50' : 'text-muted-foreground'}`}
              >
                {stat.label}
              </span>
            </div>
            <div
              className={`text-3xl font-bold mb-1 ${stat.accent ? 'text-primary' : 'text-foreground'}`}
            >
              {stat.value}
            </div>
            <div
              className={`text-xs ${stat.accent ? 'text-background/50' : 'text-muted-foreground'}`}
            >
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* Recent orders */}
        <div className='xl:col-span-2 bg-background rounded-2xl border border-border p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-base font-bold'>Recent Orders</h2>
            <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
              <Clock className='w-3 h-3' />
              Latest 5
            </div>
          </div>
          <div className='space-y-3'>
            {recentOrders.length > 0 ? (
              recentOrders.map((order: Order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center'>
                      <ShoppingBag className='w-3.5 h-3.5 text-muted-foreground' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-foreground truncate max-w-[160px]'>
                        {order.userEmail ?? 'Guest'}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {order.city}, {order.country}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span
                      className={`text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider ${statusColors[order.status]}`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <span className='text-sm font-semibold text-foreground'>
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-sm text-muted-foreground text-center py-8'>No orders yet</p>
            )}
          </div>
        </div>

        {/* Profile card */}
        <div className='bg-background rounded-2xl border border-border p-6'>
          <h2 className='text-base font-bold mb-6'>My Profile</h2>
          <EditUserForm user={session?.user as any} translations={translations} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
