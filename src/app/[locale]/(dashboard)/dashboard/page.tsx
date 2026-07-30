import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { formatCurrency } from '@/lib/helpers'
import { Order, OrderStatus } from '@prisma/client'
import { ShoppingBag, CheckCircle2, Clock, Bike } from 'lucide-react'
import { getDeliveryOrders } from '@/features/orders/_actions/orders'
import DashboardHeader from '@/features/admin/page-header'
import { getTrans } from '@/lib/translations/server'

async function DeliveryOverviewPage() {
  const session = await getServerSession(authOptions)
  const [orders, t] = await Promise.all([getDeliveryOrders(session!.user.id), getTrans()])
  const ui = t.adminUi

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
    <div>
      <DashboardHeader
title={`${ui.welcomeBack}, ${session?.user?.name ?? ''}`}
description={t.adminUi.deliveryPanel}
      />

      {/* Stats */}
      <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`border p-6 transition-colors
              ${
                stat.accent
                  ? 'border-forest bg-forest text-white'
                  : 'border-border bg-background hover:border-brand'
              }`}
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full
              ${stat.accent ? 'bg-white/10' : 'bg-brand-soft'}`}
            >
              <stat.icon className='h-5 w-5 text-brand' />
            </div>
            <div
              className={`mb-1 text-3xl font-bold ${stat.accent ? 'text-white' : 'text-foreground'}`}
            >
              {stat.value}
            </div>
            <div className={`text-xs ${stat.accent ? 'text-white/50' : 'text-muted-foreground'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryOverviewPage
