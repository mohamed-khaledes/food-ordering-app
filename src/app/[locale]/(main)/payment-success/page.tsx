import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { db } from '@/lib/prisma'
import { formatCurrency } from '@/lib/helpers'
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from 'lucide-react'
import { Routes } from '@/constants/enums'
import ClearCart from './clear-cart'

async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams
  const { global } = await getTrans()

  const order = orderId
    ? await db.order.findUnique({
        where: { id: orderId },
        include: { products: { include: { Product: true } } }
      })
    : null

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4 py-20'>
      <ClearCart />
      {/* Background blobs */}
      <div className='fixed -top-20 left-1/3 w-[360px] h-[360px] rounded-full bg-primary/8 blur-3xl pointer-events-none' />
      <div className='fixed bottom-0 -right-20 w-[260px] h-[260px] rounded-full bg-primary/5 blur-3xl pointer-events-none' />

      <div className='w-full max-w-md relative z-10'>
        {/* Success icon */}
        <div className='flex flex-col items-center mb-8'>
          <div className='relative mb-4'>
            <div className='w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center'>
              <CheckCircle2 className='w-10 h-10 text-primary' strokeWidth={1.5} />
            </div>
            <div className='absolute inset-0 rounded-full bg-primary/10 animate-ping' />
          </div>
          <h1 className='text-2xl font-bold text-foreground'>Payment successful!</h1>
          <p className='text-muted-foreground text-sm mt-1 text-center'>
            Your order has been confirmed and is being prepared
          </p>
        </div>

        {/* Order card */}
        {order && (
          <div className='bg-background border border-border rounded-2xl overflow-hidden mb-4'>
            {/* Order header */}
            <div className='px-6 py-4 border-b border-border flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <ShoppingBag className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm font-medium text-foreground'>Order details</span>
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
                    <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0'>
                      {op.Product?.image ? (
                        <img
                          src={op.Product.image}
                          alt={op.Product.name}
                          className='w-full h-full object-cover rounded-lg'
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
                <span className='text-muted-foreground'>Subtotal</span>
                <span className='text-foreground font-medium'>
                  {formatCurrency(order.subTotal)}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>Delivery</span>
                <span className='text-foreground font-medium'>
                  {formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className='h-px bg-border' />
              <div className='flex justify-between'>
                <span className='font-bold text-foreground'>Total</span>
                <span className='font-bold text-foreground'>
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className='px-6 py-4 border-t border-border space-y-1.5'>
              <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2'>
                Delivery to
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
              <span className='text-xs text-muted-foreground'>Payment status</span>
              <div className='flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
                <span className='text-xs font-medium text-foreground uppercase tracking-widest'>
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* No order fallback */}
        {!order && (
          <div className='bg-background border border-border rounded-2xl p-6 mb-4 text-center'>
            <p className='text-sm text-muted-foreground'>
              Your payment was received. Check your email for order details.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className='flex flex-col gap-3'>
          <Link
            href={`/${Routes.MENU}`}
            className='flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all'
          >
            Order more
            <ArrowRight className='w-4 h-4' />
          </Link>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all'
          >
            <Home className='w-4 h-4' />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
