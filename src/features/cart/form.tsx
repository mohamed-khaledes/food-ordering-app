'use client'

import { getTotalAmount, useCreateOrder } from './hooks'
import { formatCurrency } from '@/lib/helpers'
import { useTrans } from '@/lib/translations/client'
import { Loading } from '@/components/ui/loading'
import { useSession } from 'next-auth/react'
import { Banknote, CreditCard, Loader2, Lock, MapPin, Phone } from 'lucide-react'
import Link from '@/components/link'
import { Routes, Pages } from '@/constants/enums'
import { useParams } from 'next/navigation'

function CheckoutForm({ payType }: { payType: 'card' | 'cash' }) {
  const { status, data: session } = useSession()
  const { global, checkout } = useTrans()
  const { locale } = useParams()
  const { loading, handleChange, handleSubmit, handlePaymobPayment, cart, data, paymobLoading } =
    useCreateOrder()
  const totalAmount = getTotalAmount(cart)

  if (!cart || cart.length === 0) return null

  return (
    <div className='bg-haze'>
      {/* Header */}
      <div className='border-b border-border px-6 py-5 md:px-8'>
        <div className='flex items-center gap-2'>
          {payType === 'cash' ? (
            <Banknote className='h-4 w-4 text-brand' />
          ) : (
            <CreditCard className='h-4 w-4 text-brand' />
          )}
          <h2 className='text-lg font-bold text-foreground'>
            {payType === 'cash' ? checkout.deliveryDetails : checkout.cardPayment}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='relative space-y-8 p-6 md:p-8'>
        {loading && <Loading />}

        {/* Contact */}
        <div>
          <p className='mb-2 flex items-center gap-1.5 text-sm font-bold text-foreground'>
            <Phone className='h-3.5 w-3.5 text-brand' /> {checkout.contactInformation}
          </p>
          <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-2'>
            <Field
              label={global.phone}
              id='phone'
              type='tel'
              name='phone'
              value={data?.phone ?? ''}
              onChange={e => handleChange(e, 'phone')}
              placeholder={global['enter your phone number']}
            />
            {/* Email pre-filled from session — read only */}
            <div className='flex flex-col'>
              <input
                type='email'
                value={session?.user?.email ?? ''}
                readOnly
                aria-label={global.email}
                className='field-underline cursor-not-allowed text-muted-foreground'
              />
              <span className='pt-1 text-[11px] text-muted-foreground'>{checkout.fromYourAccount}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <p className='mb-2 flex items-center gap-1.5 text-sm font-bold text-foreground'>
            <MapPin className='h-3.5 w-3.5 text-brand' /> {checkout.shippingAddress}
          </p>
          <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-2'>
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

        {/* Total */}
        <div className='flex items-center justify-between border-t border-border pt-5'>
          <span className='text-sm text-muted-foreground'>{global.total}</span>
          <span className='text-lg font-bold text-brand'>{formatCurrency(totalAmount)}</span>
        </div>

        {/* Auth warning */}
        {status === 'unauthenticated' && (
          <div className='flex items-center gap-2 border border-destructive/20 bg-destructive/10 px-3 py-2.5'>
            <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-destructive' />
            <p className='text-xs text-destructive'>
              {checkout.signInPrompt}{' '}
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                className='underline font-medium'
              >
                {checkout.signInLink}
              </Link>{' '}
              {checkout.signInSuffix}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className='space-y-3'>
          {payType === 'cash' && (
            <button
              type='submit'
              disabled={loading || status === 'unauthenticated'}
              className='btn-brand w-full py-3.5 disabled:cursor-not-allowed'
            >
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <>
                  <Banknote className='h-4 w-4' />
                  {global.confirm} — {formatCurrency(totalAmount)}
                </>
              )}
            </button>
          )}

          {payType === 'card' && (
            <>
              <button
                type='button'
                disabled={paymobLoading || status === 'unauthenticated'}
                onClick={() => handlePaymobPayment(data)}
                className='btn-brand w-full py-3.5 disabled:cursor-not-allowed'
              >
                {paymobLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <>
                    <Lock className='h-4 w-4' />
                    {checkout.paySecurely} — {formatCurrency(totalAmount)}
                  </>
                )}
              </button>
              <div className='flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
                <Lock className='h-3 w-3' />
                {checkout.securedBy}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm

/** Underlined input from the design's checkout form — the label is the placeholder. */
const Field = ({
  label,
  id,
  ...props
}: {
  label: string
  id: string
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className='flex flex-col'>
    <label htmlFor={id} className='sr-only'>
      {label}
    </label>
    <input id={id} placeholder={label} {...props} className='field-underline' />
  </div>
)
