import { getTrans } from '@/lib/translations/server'
import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Routes, Pages, UserRole } from '@/constants/enums'
import { formatCurrency } from '@/lib/helpers'
import { OrderStatus } from '@prisma/client'
import { Package, ShoppingBag } from 'lucide-react'
import Link from '@/components/link'
import { getUserOrders } from '@/features/orders/_actions/orders'
import Banner from '@/components/layouts/banner'

const STEPS: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PAID,
  OrderStatus.PREPARING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED
]

const STEP_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered'
}

const STEP_ICONS: Record<string, string> = {
  PENDING: '🕐',
  PAID: '✅',
  PREPARING: '👨‍🍳',
  OUT_FOR_DELIVERY: '🚴',
  DELIVERED: '🎉'
}

async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
  }

  // Redirect admins and delivery men to their own pages
  if (session.user.role === UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.ORDERS}`)
  }

  if (session.user.role === UserRole.DELIVERY) {
    redirect(`/${locale}/dashboard/orders`)
  }

  const orders = await getUserOrders(session.user.email!)
  return (
    <div className='bg-background'>
      <Banner
        eyebrow={`${orders.length} orders`}
        title='My Orders'
        description='Track all your orders in real time.'
      />
      <div className='container'>
        {/* Header */}
        <div className='mb-10'>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          <h1 className='text-4xl font-bold'>My Orders</h1>
          <p className='text-muted-foreground mt-1'>Track all your orders in real time</p>
        </div>

        {orders.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 gap-4'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <ShoppingBag className='w-7 h-7 text-muted-foreground' />
            </div>
            <p className='text-muted-foreground'>You have no orders yet</p>
            <Link
              href={`/${Routes.MENU}`}
              className='px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-all'
            >
              Browse menu
            </Link>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order: any) => {
              const currentStep = STEPS.indexOf(order.status as OrderStatus)
              const isCancelled = order.status === OrderStatus.CANCELLED

              return (
                <div
                  key={order.id}
                  className='bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors'
                >
                  {/* Order header */}
                  <div className='px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-9 h-9 rounded-xl bg-muted flex items-center justify-center'>
                        <Package className='w-4 h-4 text-muted-foreground' />
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-foreground'>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {new Date(order.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-sm font-bold text-foreground'>
                        {formatCurrency(order.totalPrice)}
                      </span>
                      {order.paid && (
                        <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider'>
                          Paid
                        </span>
                      )}
                      {isCancelled && (
                        <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 uppercase tracking-wider'>
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stepper */}
                  {!isCancelled && (
                    <div className='px-6 py-5 border-b border-border'>
                      <div className='flex items-center gap-0'>
                        {STEPS.map((step, index) => {
                          const isCompleted = index <= currentStep
                          const isActive = index === currentStep
                          const isLast = index === STEPS.length - 1

                          return (
                            <div key={step} className='flex items-center flex-1 last:flex-none'>
                              {/* Step circle */}
                              <div className='flex flex-col items-center gap-1.5'>
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all
                                  ${isActive ? 'bg-primary shadow-sm ring-4 ring-primary/20' : ''}
                                  ${isCompleted && !isActive ? 'bg-primary/20' : ''}
                                  ${!isCompleted ? 'bg-muted' : ''}
                                `}
                                >
                                  {STEP_ICONS[step]}
                                </div>
                                <span
                                  className={`text-[10px] font-medium text-center whitespace-nowrap
                                  ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                                `}
                                >
                                  {STEP_LABELS[step]}
                                </span>
                              </div>

                              {/* Connector line */}
                              {!isLast && (
                                <div
                                  className={`flex-1 h-0.5 mx-1 mb-5 rounded-full transition-all
                                  ${index < currentStep ? 'bg-primary' : 'bg-border'}
                                `}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <div className='px-6 py-4 border-b border-border'>
                    <div className='flex flex-wrap gap-2'>
                      {order.products.map((op: any) => (
                        <div
                          key={op.id}
                          className='flex items-center gap-2 px-3 py-2 bg-muted/40 rounded-xl'
                        >
                          {op.Product?.image && (
                            <img
                              src={op.Product.image}
                              alt={op.Product.name}
                              className='w-7 h-7 rounded-lg object-cover'
                            />
                          )}
                          <span className='text-xs font-medium text-foreground capitalize'>
                            {op.Product?.name}
                          </span>
                          <span className='text-xs text-muted-foreground'>×{op.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery info + delivery man */}
                  <div className='px-6 py-4 flex items-center justify-between flex-wrap gap-3'>
                    <div>
                      <p className='text-xs text-muted-foreground'>
                        {order.streetAddress}, {order.city}, {order.country}
                      </p>
                      <p className='text-xs text-muted-foreground mt-0.5'>{order.phone}</p>
                    </div>
                    {order.deliveryMan && (
                      <div className='flex items-center gap-2'>
                        <div className='w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center'>
                          <span className='text-xs font-bold'>
                            {order.deliveryMan.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className='text-xs font-medium text-foreground'>
                            {order.deliveryMan.name}
                          </p>
                          <p className='text-[10px] text-muted-foreground'>Delivery man</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
