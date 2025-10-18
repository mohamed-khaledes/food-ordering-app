'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/redux/hooks'
import { getTotalAmount } from './hooks'
import { selectCartItems } from './slice'
import { formatCurrency } from '@/lib/helpers'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTrans } from '@/lib/translations/client'

function CheckoutForm() {
  const cart = useAppSelector(selectCartItems)
  const totalAmount = getTotalAmount(cart)
  const { global } = useTrans()
  if (!cart || cart.length === 0) return null

  return (
    <div className='max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200'>
      <h2 className='text-3xl font-bold text-primary text-center mb-6'>{global.checkout}</h2>

      <form className='space-y-6'>
        {/* Phone */}
        <div className='grid gap-2'>
          <Label htmlFor='phone' className='text-gray-700'>
            {global.phone}
          </Label>
          <Input
            id='phone'
            placeholder={global['enter your phone number']}
            type='tel'
            name='phone'
            className='focus:ring-2 focus:ring-accent'
          />
        </div>

        {/* Address */}
        <div className='grid gap-2'>
          <Label htmlFor='address' className='text-gray-700'>
            {global['street address']}
          </Label>
          <Textarea
            id='address'
            placeholder={global['street address']}
            name='address'
            className='resize-none focus:ring-2 focus:ring-accent'
          />
        </div>

        {/* Location */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='postal-code' className='text-gray-700'>
              {global['postal code']}
            </Label>
            <Input
              type='text'
              id='postal-code'
              placeholder={global['postal code']}
              name='postal-code'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='city' className='text-gray-700'>
              {global.city}
            </Label>
            <Input
              type='text'
              id='city'
              placeholder={global.city}
              name='city'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='country' className='text-gray-700'>
              {global.country}
            </Label>
            <Input
              type='text'
              id='country'
              placeholder={global.country}
              name='country'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
        </div>

        {/* Total + Pay */}
        <div className='flex items-center justify-between border-t pt-6'>
          <span className='text-lg font-semibold text-gray-900'>
            {global.total}: {formatCurrency(totalAmount)}
          </span>
          <Button className='h-11 px-6 text-white bg-accent hover:bg-accent/90 rounded-xl shadow-md'>
            {global['pay now']}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
