import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { formatCurrency } from '@/lib/helpers'
import { Order, OrderStatus } from '@prisma/client'
import { ShoppingBag, CheckCircle2, Clock, Bike } from 'lucide-react'
import { getDeliveryOrders } from '@/features/orders/_actions/orders'

async function DeliveryOverviewPage() {
  const session = await getServerSession(authOptions)
  const orders = await getDeliveryOrders(session!.user.id)

  const myOrders = orders.filter((o: any) => o.deliveryManId === session!.user.id)
  const delivered = myOrders.filter((o: any) => o.status === OrderStatus.DELIVERED)
  const inProgress = myOrders.filter((o: any) => o.status === OrderStatus.OUT_FOR_DELIVERY)
  const available = orders.filter(
    (o: any) => o.status === OrderStatus.PREPARING && !o.deliveryManId
  )

  const stats = [
    { label: 'Delivered', value: delivered.length, icon: CheckCircle2, accent: true },
    { label: 'In progress', value: inProgress.length, icon: Bike },
    { label: 'Available', value: available.length, icon: Clock },
    {
      label: 'Total earned',
      value: formatCurrency(delivered.reduce((s: number, o: any) => s + o.deliveryFee, 0)),
      icon: ShoppingBag
    }
  ]

  return (
    <div className='space-y-8'>
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Overview
          </span>
        </div>
        <h1 className='text-3xl font-bold'>Welcome, {session?.user?.name} 👋</h1>
        <p className='text-muted-foreground mt-1'>Here's your delivery summary</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl border transition-all hover:-translate-y-0.5
              ${
                stat.accent
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background border-border hover:border-primary/30'
              }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
              ${stat.accent ? 'bg-primary/20' : 'bg-muted'}`}
            >
              <stat.icon
                className={`w-5 h-5 ${stat.accent ? 'text-primary' : 'text-muted-foreground'}`}
              />
            </div>
            <div
              className={`text-3xl font-bold mb-1 ${stat.accent ? 'text-primary' : 'text-foreground'}`}
            >
              {stat.value}
            </div>
            <div
              className={`text-xs ${stat.accent ? 'text-background/50' : 'text-muted-foreground'}`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryOverviewPage
