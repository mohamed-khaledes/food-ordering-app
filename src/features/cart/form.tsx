'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getTotalAmount, useCreateOrder } from './hooks'
import { formatCurrency } from '@/lib/helpers'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTrans } from '@/lib/translations/client'
import { Loading } from '@/components/ui/loading'
// import { stripe } from '@/lib/stripe'
import { useSession } from 'next-auth/react'

function CheckoutForm() {
  const { status } = useSession()
  const { global } = useTrans()
  const { loading, handleChange, handleSubmit, cart, data } = useCreateOrder()
  const totalAmount = getTotalAmount(cart)
  const finishOrder = async () => {
    const { clientSecret } = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())

    // await stripe.confirmPayment({
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: `${window.location.origin}/payment-success`
    //   }
    // })
  }

  if (!cart || cart.length === 0) return null
  return (
    <div className='mx-auto bg-white shadow-lg rounded-2xl p-5 border border-gray-200'>
      {/* <Button type='button' onClick={() => finishOrder()}>
        test
      </Button> */}
      <h2 className='text-3xl font-bold text-primary text-center mb-6 capitalize'>
        {global.checkout}
      </h2>
      <form
        className='space-y-6 relative grid grid-cols-1 lg:grid-cols-2 gap-2 p-2'
        onSubmit={handleSubmit}
      >
        {loading && <Loading />}
        <div>
          <Label htmlFor='phone' className='text-gray-700 capitalize'>
            {global.phone}
          </Label>
          <Input
            id='phone'
            placeholder={global['enter your phone number']}
            type='tel'
            name='phone'
            value={data?.phone}
            onChange={e => handleChange(e, 'phone')}
            className='focus:ring-2 focus:ring-accent'
          />
        </div>
        <div>
          <Label htmlFor='email' className='text-gray-700 capitalize'>
            {global.email}
          </Label>
          <Input
            type='email'
            id='email'
            placeholder={global.email}
            name='userEmail'
            value={data?.userEmail}
            onChange={e => handleChange(e, 'userEmail')}
            className='focus:ring-2 focus:ring-accent'
          />
        </div>
        <div>
          <Label htmlFor='country' className='text-gray-700 capitalize'>
            {global.country}
          </Label>
          <Input
            type='text'
            id='country'
            placeholder={global.country}
            name='country'
            value={data?.country}
            onChange={e => handleChange(e, 'country')}
            className='focus:ring-2 focus:ring-accent'
          />
        </div>
        <div>
          <Label htmlFor='postalCode' className='text-gray-700 capitalize'>
            {global.postalCode}
          </Label>
          <Input
            type='text'
            id='postalCode'
            placeholder={global.postalCode}
            name='postalCode'
            value={data?.postalCode}
            onChange={e => handleChange(e, 'postalCode')}
            className='focus:ring-2 focus:ring-accent'
          />
        </div>
        <div>
          <Label htmlFor='city' className='text-gray-700 capitalize'>
            {global.city}
          </Label>
          <Input
            type='text'
            id='city'
            placeholder={global.city}
            name='city'
            value={data?.city}
            onChange={e => handleChange(e, 'city')}
            className='focus:ring-2 focus:ring-accent'
          />
        </div>
        <div className='lg:col-span-2'>
          <Label htmlFor='address' className='text-gray-700 capitalize'>
            {global['street address']}
          </Label>
          <Textarea
            id='address'
            placeholder={global['street address']}
            name='streetAddress'
            value={data?.streetAddress}
            onChange={e => handleChange(e as any, 'streetAddress')}
            className='resize-none focus:ring-2 focus:ring-accent'
          />
        </div>
        {/* Total + Pay */}
        <div className='flex items-center justify-between border-t pt-6 lg:col-span-2'>
          <span className='text-lg font-semibold text-gray-900 capitalize'>
            {global.total}: {formatCurrency(totalAmount)}
          </span>
          <div className='text-center'>
            <Button
              disabled={status == 'unauthenticated'}
              className='h-11 text-white bg-primary hover:bg-accent/90 rounded-lg shadow-md capitalize cursor-pointer'
            >
              {global['confirm']}
            </Button>
            {status == 'unauthenticated' && (
              <span className='block text-[10px] text-red-600 my-2'>please login first</span>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
