'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/redux/hooks'
import { getTotalAmount, useCreateOrder } from './hooks'
import { selectCartItems } from './slice'
import { formatCurrency } from '@/lib/helpers'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTrans } from '@/lib/translations/client'
import { FormEvent, useState } from 'react'
import { Loading } from '@/components/ui/loading'
import { TCreateOrder } from './type'

function CheckoutForm() {
  const cart = useAppSelector(selectCartItems)
  const totalAmount = getTotalAmount(cart)
  const { global } = useTrans()
  const { handleCreate, loading } = useCreateOrder()
  const [data, setData] = useState<TCreateOrder>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev: any) => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const products = cart?.map((item: any) => {
      return {
        productId: item?.id,
        quantity: item?.quantity,
        sizeId: item?.size?.id,
        extras: item?.extras?.map((e: any) => e?.id)
      }
    })
    const order = {
      ...data,
      products: products
    }
    handleCreate(order as any)
  }
  const dd = {
    userId: 'user-id-123',
    userEmail: 'test@mail.com',
    phone: '0100000000',
    streetAddress: 'Street 12',
    city: 'Cairo',
    country: 'Egypt',
    deliveryFee: 30,
    products: [
      {
        productId: 'product-id-1',
        quantity: 2,
        sizeId: 'size-id-medium',
        extras: ['extra-id-cheese', 'extra-id-bacon']
      }
    ]
  }
  if (!cart || cart.length === 0) return null

  return (
    <div className='mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200'>
      <h2 className='text-3xl font-bold text-primary text-center mb-6'>{global.checkout}</h2>

      <form className='space-y-6 relative' onSubmit={handleSubmit}>
        {loading && <Loading />}
        {/* Phone */}
        <div className='grid gap-2'>
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
        <div className='grid gap-2'>
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
        <div className='grid gap-2'>
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
        <div className='grid gap-2'>
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
        {/* Address */}
        <div className='grid gap-2'>
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
        <div className='flex items-center justify-between border-t pt-6'>
          <span className='text-lg font-semibold text-gray-900 capitalize'>
            {global.total}: {formatCurrency(totalAmount)}
          </span>
          <Button className='h-11 px-6 text-white bg-accent hover:bg-accent/90 rounded-xl shadow-md capitalize cursor-pointer'>
            {global['confirm']}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
