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
    <div className='space-y-4'>
      {/* Items */}
      <ul className='space-y-3'>
        {cart.map(item => (
          <li
            key={item.id}
            className='flex gap-4 p-4 bg-background rounded-2xl border border-border hover:border-primary/20 transition-colors'
          >
            {/* Image */}
            <div className='relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-muted'>
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
                <span className='inline-flex items-center gap-1 mt-1 text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-md'>
                  {global.size}: <strong className='text-foreground'>{item.size.name}</strong>
                </span>
              )}

              {/* Extras */}
              {item.extras && item.extras.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-1'>
                  {item.extras.map(extra => (
                    <span
                      key={extra.id}
                      className='text-[11px] bg-primary/10 text-foreground px-2 py-0.5 rounded-md'
                    >
                      +{extra.name} ({formatCurrency(extra.price)})
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity controls */}
              <div className='flex items-center justify-between mt-3'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => dispatch(removeCartItem({ id: item.id }))}
                    className='w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-primary/30 hover:bg-muted transition-all'
                  >
                    <Minus className='w-3 h-3' />
                  </button>
                  <span className='text-sm font-semibold w-5 text-center'>{item.quantity}</span>
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
                    className='w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-primary/30 hover:bg-muted transition-all'
                  >
                    <Plus className='w-3 h-3' />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
                  className='w-7 h-7 flex items-center justify-center rounded-lg border border-destructive/20 text-destructive hover:bg-destructive/10 transition-all'
                >
                  <Trash2 className='w-3 h-3' />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className='bg-background rounded-2xl border border-border p-5 space-y-3'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>{global.subtotal}</span>
          <span className='font-medium text-foreground'>{formatCurrency(subTotal)}</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>{global.delivery}</span>
          <span className='font-medium text-foreground'>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className='h-px bg-border' />
        <div className='flex items-center justify-between'>
          <span className='font-bold text-foreground'>{global.total}</span>
          <span className='text-lg font-bold text-foreground'>
            {formatCurrency(subTotal + deliveryFee)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItems
