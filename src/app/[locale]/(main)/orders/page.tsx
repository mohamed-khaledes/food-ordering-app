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

import type { Metadata } from 'next'
import { privateMetadata } from '@/constants/seo'

// Not for the index — see `privateMetadata`.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return privateMetadata({ locale, path: '/orders', title: 'Your Orders' })
}

const STEPS: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PAID,
  OrderStatus.PREPARING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED
]

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

  const userOrders = await getUserOrders(session.user.email!)
  const { global, orders: t } = await getTrans()

  return (
    <div className='bg-background'>
      <Banner
        title={t.title}
        description={t.subtitle}
        crumbs={[{ label: global.home, href: '/' }, { label: t.title }]}
      />
      <div className='container section-y'>
        {userOrders.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 py-24'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-muted'>
              <ShoppingBag className='h-7 w-7 text-muted-foreground' />
            </div>
            <p className='text-muted-foreground'>{t.none}</p>
            <Link href={`/${Routes.MENU}`} className='btn-brand mt-2'>
              {global.menu}
            </Link>
          </div>
        ) : (
          <div className='space-y-4'>
            {userOrders.map((order: any) => {
              const currentStep = STEPS.indexOf(order.status as OrderStatus)
              const isCancelled = order.status === OrderStatus.CANCELLED

              return (
                <div
                  key={order.id}
                  className='overflow-hidden border border-border bg-background transition-colors hover:border-brand'
                >
                  {/* Order header */}
                  <div className='flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft'>
                        <Package className='h-4 w-4 text-brand' />
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
                        <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-state-paid-tint text-state-paid uppercase tracking-wider'>
                          {t.paid}
                        </span>
                      )}
                      {isCancelled && (
                        <span className='text-[10px] font-medium px-2.5 py-1 rounded-full bg-state-void-tint text-state-void uppercase tracking-wider'>
                          {t.cancelled}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stepper — scrolls horizontally on narrow screens */}
                  {!isCancelled && (
                    <div className='overflow-x-auto border-b border-border px-4 py-5 sm:px-6'>
                      <div className='no-scrollbar flex min-w-[520px] items-center gap-0 sm:min-w-0'>
                        {STEPS.map((step, index) => {
                          const isCompleted = index <= currentStep
                          const isActive = index === currentStep
                          const isLast = index === STEPS.length - 1

                          return (
                            <div key={step} className='flex items-center flex-1 last:flex-none'>
                              {/* Step circle */}
                              <div className='flex flex-col items-center gap-1.5'>
                                <div
                                  className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition-all
                                  ${isActive ? 'bg-brand ring-4 ring-brand/20' : ''}
                                  ${isCompleted && !isActive ? 'bg-brand-soft' : ''}
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
                                  {t.steps[step as keyof typeof t.steps]}
                                </span>
                              </div>

                              {/* Connector line */}
                              {!isLast && (
                                <div
                                  className={`mx-1 mb-5 h-0.5 flex-1 rounded-full transition-all
                                  ${index < currentStep ? 'bg-brand' : 'bg-border'}
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
                  <div className='border-b border-border px-4 py-4 sm:px-6'>
                    <div className='flex flex-wrap gap-2'>
                      {order.products.map((op: any) => (
                        <div key={op.id} className='flex items-center gap-2 bg-haze px-3 py-2'>
                          {op.Product?.image && (
                            <img
                              src={op.Product.image}
                              alt={op.Product.name}
                              className='h-7 w-7 object-cover'
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
                  <div className='flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6'>
                    <div>
                      <p className='text-xs text-muted-foreground'>
                        {order.streetAddress}, {order.city}, {order.country}
                      </p>
                      <p className='text-xs text-muted-foreground mt-0.5'>{order.phone}</p>
                    </div>
                    {order.deliveryMan && (
                      <div className='flex items-center gap-2'>
                        <div className='flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft'>
                          <span className='text-xs font-bold text-brand'>
                            {order.deliveryMan.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className='text-xs font-medium text-foreground'>
                            {order.deliveryMan.name}
                          </p>
                          <p className='text-[10px] text-muted-foreground'>{t.deliveryMan}</p>
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
