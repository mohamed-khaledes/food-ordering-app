'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { removeItemFromCart, selectCartItems } from './slice'
import { formatCurrency } from '@/lib/helpers'
import { deliveryFee, getSubTotal } from './hooks'

function CartItems() {
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const subTotal = getSubTotal(cart)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }, [cart])

  if (!cart || cart.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>
          🛒 Your cart is empty. Start adding some delicious items!
        </p>
      </div>
    )
  }
  console.log(cart)
  return (
    <div className='space-y-6'>
      <ul className='space-y-4'>
        {cart.map(item => (
          <li
            key={item.id}
            className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200'
          >
            {/* Image + Info */}
            <div className='flex items-start gap-4'>
              <div className='relative w-24 h-24 shrink-0'>
                <Image
                  src={item.image}
                  className='object-contain rounded-md'
                  alt={item.name}
                  fill
                />
              </div>
              <div>
                <h4 className='font-semibold text-lg text-gray-900'>{item.name}</h4>

                {item.size && <p className='text-sm text-accent'>Size: {item.size.name}</p>}

                {item.extras && item.extras.length > 0 && (
                  <div className='mt-1'>
                    <span className='text-sm font-medium text-gray-700'>Extras: </span>
                    <ul className='list-disc list-inside text-sm text-accent'>
                      {item.extras.map(extra => (
                        <li key={extra.id}>
                          {extra.name} ({formatCurrency(extra.price)})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <span className='inline-block mt-2 text-sm font-medium text-gray-600'>
                  Quantity: <strong className='text-black'>x{item.quantity}</strong>
                </span>
              </div>
            </div>

            {/* Price + Remove */}
            <div className='flex items-center gap-4 w-full md:w-auto justify-between md:justify-end'>
              <span className='text-lg font-semibold text-gray-900'>
                {formatCurrency(item.basePrice)}
              </span>
              <Button
                onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
                variant='secondary'
                className='border rounded-full p-2 hover:bg-red-50 hover:text-red-500 transition'
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className='bg-gray-50 border border-gray-200 rounded-xl p-6 text-start space-y-2'>
        <p className='text-gray-600'>
          Subtotal: <span className='font-semibold text-gray-900'>{formatCurrency(subTotal)}</span>
        </p>
        <p className='text-gray-600'>
          Delivery:{' '}
          <span className='font-semibold text-gray-900'>{formatCurrency(deliveryFee)}</span>
        </p>
        <p className='text-lg font-bold text-gray-900'>
          Total: <span className='text-accent'>{formatCurrency(subTotal + deliveryFee)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartItems
