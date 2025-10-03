'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/redux/hooks'
import { getTotalAmount } from './hooks'
import { selectCartItems } from './slice'
import { formatCurrency } from '@/lib/helpers'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function CheckoutForm() {
  const cart = useAppSelector(selectCartItems)
  const totalAmount = getTotalAmount(cart)

  if (!cart || cart.length === 0) return null

  return (
    <div className='max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200'>
      <h2 className='text-3xl font-bold text-primary text-center mb-6'>Checkout</h2>

      <form className='space-y-6'>
        {/* Phone */}
        <div className='grid gap-2'>
          <Label htmlFor='phone' className='text-gray-700'>
            Phone
          </Label>
          <Input
            id='phone'
            placeholder='Enter your phone number'
            type='tel'
            name='phone'
            className='focus:ring-2 focus:ring-accent'
          />
        </div>

        {/* Address */}
        <div className='grid gap-2'>
          <Label htmlFor='address' className='text-gray-700'>
            Street address
          </Label>
          <Textarea
            id='address'
            placeholder='Enter your full address'
            name='address'
            className='resize-none focus:ring-2 focus:ring-accent'
          />
        </div>

        {/* Location */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='postal-code' className='text-gray-700'>
              Postal code
            </Label>
            <Input
              type='text'
              id='postal-code'
              placeholder='Postal code'
              name='postal-code'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='city' className='text-gray-700'>
              City
            </Label>
            <Input
              type='text'
              id='city'
              placeholder='City'
              name='city'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='country' className='text-gray-700'>
              Country
            </Label>
            <Input
              type='text'
              id='country'
              placeholder='Country'
              name='country'
              className='focus:ring-2 focus:ring-accent'
            />
          </div>
        </div>

        {/* Total + Pay */}
        <div className='flex items-center justify-between border-t pt-6'>
          <span className='text-lg font-semibold text-gray-900'>
            Total: {formatCurrency(totalAmount)}
          </span>
          <Button className='h-11 px-6 text-white bg-accent hover:bg-accent/90 rounded-xl shadow-md'>
            Pay Now
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
