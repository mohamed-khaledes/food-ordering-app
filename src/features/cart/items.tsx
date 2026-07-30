'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from './slice'
import { formatCurrency } from '@/lib/helpers'
import { deliveryFee, getSubTotal } from './hooks'
import { useTrans } from '@/lib/translations/client'

function CartItems() {
  const cart = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const subTotal = getSubTotal(cart)
  const { global } = useTrans()

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart))
  }, [cart])

  return (
    <div className='space-y-6'>
      {/* Items */}
      <ul className='divide-y divide-border border-y border-border'>
        {cart.map(item => (
          <li key={item.id} className='flex gap-4 py-4'>
            {/* Image */}
            <div className='relative h-20 w-20 shrink-0 overflow-hidden bg-cream'>
              <Image src={item.image} className='object-cover' alt={item.name} fill />
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between gap-2'>
                <h4 className='font-semibold text-sm text-foreground truncate'>{item.name}</h4>
                <span className='text-sm font-bold text-foreground flex-shrink-0'>
                  {formatCurrency(item.basePrice)}
                </span>
              </div>

              {/* Size */}
              {item.size && (
                <span className='mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground'>
                  {global.size}: <strong className='text-foreground'>{item.size.name}</strong>
                </span>
              )}

              {/* Extras */}
              {item.extras && item.extras.length > 0 && (
                <div className='mt-1 flex flex-wrap gap-1'>
                  {item.extras.map(extra => (
                    <span
                      key={extra.id}
                      className='bg-brand-soft px-2 py-0.5 text-[11px] text-accent-foreground'
                    >
                      +{extra.name} ({formatCurrency(extra.price)})
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity controls */}
              <div className='mt-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => dispatch(removeCartItem({ id: item.id }))}
                    className='flex h-7 w-7 items-center justify-center border border-border transition-colors hover:border-brand hover:text-brand'
                  >
                    <Minus className='h-3 w-3' />
                  </button>
                  <span className='w-5 text-center text-sm font-semibold'>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        addCartItem({
                          basePrice: item.basePrice,
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          extras: item.extras,
                          size: item.size
                        })
                      )
                    }
                    className='flex h-7 w-7 items-center justify-center border border-border transition-colors hover:border-brand hover:text-brand'
                  >
                    <Plus className='h-3 w-3' />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
                  className='flex h-7 w-7 items-center justify-center border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10'
                >
                  <Trash2 className='h-3 w-3' />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className='space-y-3 bg-haze p-6'>
        <div className='flex items-center justify-between border-b border-border pb-3 text-sm'>
          <span className='text-muted-foreground'>{global.subtotal}</span>
          <span className='font-medium text-foreground'>{formatCurrency(subTotal)}</span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3 text-sm'>
          <span className='text-muted-foreground'>{global.delivery}</span>
          <span className='font-medium text-foreground'>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className='flex items-center justify-between pt-1'>
          <span className='font-bold text-foreground'>{global.total}</span>
          <span className='text-lg font-bold text-brand'>
            {formatCurrency(subTotal + deliveryFee)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItems
