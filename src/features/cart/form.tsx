'use client'

import { getTotalAmount, useCreateOrder } from './hooks'
import { formatCurrency } from '@/lib/helpers'
import { useTrans } from '@/lib/translations/client'
import { Loading } from '@/components/ui/loading'
import { useSession } from 'next-auth/react'
import { Banknote, CreditCard, Loader2, Lock, MapPin, Phone, Mail } from 'lucide-react'
import Link from '@/components/link'
import { Routes, Pages } from '@/constants/enums'
import { useParams } from 'next/navigation'

function CheckoutForm({ payType }: { payType: 'card' | 'cash' }) {
  const { status } = useSession()
  const { global } = useTrans()
  const { locale } = useParams()
  const { loading, handleChange, handleSubmit, handlePaymobPayment, cart, data, paymobLoading } =
    useCreateOrder()
  const totalAmount = getTotalAmount(cart)

  if (!cart || cart.length === 0) return null

  return (
    <div className='bg-background rounded-2xl border border-border overflow-hidden'>
      {/* Header */}
      <div className='px-6 py-5 border-b border-border'>
        <div className='flex items-center gap-2'>
          {payType === 'cash' ? (
            <Banknote className='w-4 h-4 text-muted-foreground' />
          ) : (
            <CreditCard className='w-4 h-4 text-muted-foreground' />
          )}
          <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
            {payType === 'cash' ? 'Delivery details' : 'Card payment'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='p-6 space-y-5 relative'>
        {loading && <Loading />}

        {/* Contact */}
        <div>
          <p className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5'>
            <Phone className='w-3 h-3' /> Contact
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <Field
              label={global.phone}
              id='phone'
              type='tel'
              name='phone'
              value={data?.phone ?? ''}
              onChange={e => handleChange(e, 'phone')}
              placeholder={global['enter your phone number']}
            />
            <Field
              label={global.email}
              id='email'
              type='email'
              name='userEmail'
              value={data?.userEmail ?? ''}
              onChange={e => handleChange(e, 'userEmail')}
              placeholder={global.email}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <p className='text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5'>
            <MapPin className='w-3 h-3' /> Delivery address
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <Field
              label={global.country}
              id='country'
              type='text'
              name='country'
              value={data?.country ?? ''}
              onChange={e => handleChange(e, 'country')}
              placeholder='Egypt'
            />
            <Field
              label={global.city}
              id='city'
              type='text'
              name='city'
              value={data?.city ?? ''}
              onChange={e => handleChange(e, 'city')}
              placeholder={global.city}
            />
            <Field
              label={global.postalCode}
              id='postalCode'
              type='text'
              name='postalCode'
              value={data?.postalCode ?? ''}
              onChange={e => handleChange(e, 'postalCode')}
              placeholder={global.postalCode}
            />
            <Field
              label={global['street address']}
              id='address'
              type='text'
              name='streetAddress'
              value={data?.streetAddress ?? ''}
              onChange={e => handleChange(e, 'streetAddress')}
              placeholder={global['street address']}
            />
          </div>
        </div>

        {/* Divider + total */}
        <div className='flex items-center justify-between py-3 px-4 bg-muted/40 rounded-xl'>
          <span className='text-sm text-muted-foreground'>{global.total}</span>
          <span className='text-base font-bold text-foreground'>{formatCurrency(totalAmount)}</span>
        </div>

        {/* Auth warning */}
        {status === 'unauthenticated' && (
          <div className='flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-xl'>
            <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
            <p className='text-xs text-destructive'>
              Please{' '}
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className='underline font-medium'
              >
                sign in
              </Link>{' '}
              to place an order
            </p>
          </div>
        )}

        {/* CTA buttons */}
        <div className='space-y-3 pt-1'>
          {payType === 'cash' && (
            <button
              type='submit'
              disabled={loading || status === 'unauthenticated'}
              className='w-full flex items-center justify-center gap-2 py-3.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <>
                  <Banknote className='w-4 h-4' />
                  {global.confirm} — {formatCurrency(totalAmount)}
                </>
              )}
            </button>
          )}

          {payType === 'card' && (
            <button
              type='button'
              disabled={paymobLoading || status === 'unauthenticated'}
              onClick={() => handlePaymobPayment(data)}
              className='w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-foreground rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {paymobLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <>
                  <Lock className='w-4 h-4' />
                  Pay securely — {formatCurrency(totalAmount)}
                </>
              )}
            </button>
          )}

          {payType === 'card' && (
            <div className='flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
              <Lock className='w-3 h-3' />
              Secured by Paymob · 256-bit SSL encryption
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm

// ─── Reusable field ───────────────────────────────────────
const Field = ({
  label,
  id,
  ...props
}: {
  label: string
  id: string
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className='flex flex-col gap-1.5'>
    <label
      htmlFor={id}
      className='text-xs font-medium text-muted-foreground uppercase tracking-widest'
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className='w-full px-3 py-2.5 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm'
    />
  </div>
)
