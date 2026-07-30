import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { db } from '@/lib/prisma'
import { formatCurrency } from '@/lib/helpers'
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from 'lucide-react'
import { Routes } from '@/constants/enums'
import ClearCart from './clear-cart'

import type { Metadata } from 'next'
import { privateMetadata } from '@/constants/seo'

// Not for the index — see `privateMetadata`.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return privateMetadata({ locale, path: '/payment-success', title: 'Payment Successful' })
}

async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams
  const { global, payment } = await getTrans()

  const order = orderId
    ? await db.order.findUnique({
        where: { id: orderId },
        include: { products: { include: { Product: true } } }
      })
    : null

  return (
    <div className='flex min-h-screen items-center justify-center bg-haze px-4 py-20'>
      <ClearCart />

      <div className='relative z-10 w-full max-w-md'>
        {/* Success icon */}
        <div className='mb-8 flex flex-col items-center'>
          <div className='relative mb-4'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft'>
              <CheckCircle2 className='h-10 w-10 text-brand' strokeWidth={1.5} />
            </div>
            <div className='absolute inset-0 animate-ping rounded-full bg-brand/10' />
          </div>
          <h1 className='text-2xl font-bold text-foreground'>{payment.successTitle}</h1>
          <p className='text-muted-foreground text-sm mt-1 text-center'>
            {payment.successSubtitle}
          </p>
        </div>

        {/* Order card */}
        {order && (
          <div className='border border-border bg-background overflow-hidden mb-4'>
            {/* Order header */}
            <div className='px-6 py-4 border-b border-border flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <ShoppingBag className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium text-foreground'>{payment.orderDetails}</span>
              </div>
              <span className='text-xs font-mono text-muted-foreground'>
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>

            {/* Products */}
            <div className='divide-y divide-border'>
              {order.products.map(op => (
                <div key={op.id} className='px-6 py-3 flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-muted flex items-center justify-center flex-shrink-0'>
                      {op.Product?.image ? (
                        <img
                          src={op.Product.image}
                          alt={op.Product.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <ShoppingBag className='w-3.5 h-3.5 text-muted-foreground' />
                      )}
                    </div>
                    <div>
                      <p className='text-sm font-medium text-foreground capitalize'>
                        {op.Product?.name}
                      </p>
                      <p className='text-xs text-muted-foreground'>x{op.quantity}</p>
                    </div>
                  </div>
                  <span className='text-sm font-medium text-foreground'>
                    {formatCurrency((op.Product?.basePrice ?? 0) * op.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className='px-6 py-4 bg-muted/30 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>{global.subtotal}</span>
                <span className='text-foreground font-medium'>
                  {formatCurrency(order.subTotal)}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>{global.delivery}</span>
                <span className='text-foreground font-medium'>
                  {formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className='h-px bg-border' />
              <div className='flex justify-between'>
                <span className='font-bold text-foreground'>{global.total}</span>
                <span className='font-bold text-foreground'>
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className='px-6 py-4 border-t border-border space-y-1.5'>
              <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2'>
                {payment.deliveryTo}
              </p>
              <p className='text-sm text-foreground'>{order.streetAddress}</p>
              <p className='text-sm text-muted-foreground'>
                {order.city}
                {order.postalCode ? `, ${order.postalCode}` : ''}, {order.country}
              </p>
              <p className='text-sm text-muted-foreground'>{order.phone}</p>
            </div>

            {/* Status badge */}
            <div className='px-6 py-3 border-t border-border flex items-center justify-between'>
              <span className='text-xs text-muted-foreground'>{payment.paymentStatus}</span>
              <div className='flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-brand animate-pulse' />
                <span className='text-xs font-medium text-foreground uppercase tracking-widest'>
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* No order fallback */}
        {!order && (
          <div className='border border-border bg-background p-6 mb-4 text-center'>
            <p className='text-sm text-muted-foreground'>
              {payment.noOrderFallback}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className='flex flex-col gap-3'>
          <Link href={`/${Routes.MENU}`} className='btn-brand w-full'>
            {global.menu}
            <ArrowRight className='h-4 w-4 rtl:rotate-180' />
          </Link>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand'
          >
            <Home className='h-4 w-4' />
            {global.home}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
