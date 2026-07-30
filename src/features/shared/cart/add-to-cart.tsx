'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'
import { formatCurrency } from '@/lib/helpers'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '../../../components/ui/checkbox'
import { ProductWithRelations } from '../../home/featured/type'
import { Extras, Sizes } from '@prisma/client'
import { useAppDispatch } from '@/redux/hooks'
import { addCartItem, removeCartItem, removeItemFromCart } from '../../cart/slice'
import { useAddToCart } from './hooks'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'

export default function AddToCart({
  item,
  trigger
}: {
  item: ProductWithRelations
  /** Custom dialog trigger — the product card passes its hover icon button. */
  trigger?: React.ReactNode
}) {
  const {
    handleAddToCart,
    setSelectedExtras,
    setSelectedSize,
    selectedSize,
    selectedExtras,
    quantity,
    totalPrice
  } = useAddToCart(item)
  const { product } = useTrans()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button type='button' className='btn-brand w-full'>
            <ShoppingCart className='h-4 w-4' />
            {product.addToCart}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className='w-[calc(100%-2rem)] sm:w-[425px] md:w-[560px] max-h-[85vh] overflow-y-auto no-scrollbar p-0 rounded-none gap-0'>
        {/* Product hero */}
        <div className='relative h-52 w-full bg-muted overflow-hidden rounded-none flex-shrink-0'>
          <Image
            src={item.image || ''}
            alt={item.name}
            fill
            className='object-cover'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 p-5'>
            <DialogTitle className='text-white text-xl font-bold'>{item.name}</DialogTitle>
            <DialogDescription className='text-white/70 text-sm mt-1 line-clamp-2'>
              {item.description}
            </DialogDescription>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Base price */}
          <div className='flex items-center justify-between py-3 px-4 bg-muted/40 rounded-sm'>
            <span className='text-sm text-muted-foreground'>{product.basePrice}</span>
            <span className='text-sm font-semibold text-foreground'>
              {formatCurrency(item.basePrice)}
            </span>
          </div>

          {/* Sizes */}
          {item?.sizes?.length > 0 && (
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-brand' />
                <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  {product.pickSize}
                </p>
              </div>
              <PickSize
                sizes={item.sizes}
                item={item}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
          )}

          {/* Extras */}
          {item?.extras?.length > 0 && (
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-brand' />
                <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  {product.anyExtras}
                </p>
              </div>
              <ProductExtras
                extras={item.extras}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            </div>
          )}

          {/* Quantity controls */}
          {quantity > 0 && (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}

          {/* Add to cart CTA */}
          <button type='submit' onClick={handleAddToCart} className='btn-brand w-full py-3.5'>
            <ShoppingCart className='h-4 w-4' />
            {product.addToCart}
            <span className='ms-1 font-bold'>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Pick Size ────────────────────────────────────────────
function PickSize({
  sizes,
  item,
  selectedSize,
  setSelectedSize
}: {
  sizes: Sizes[]
  selectedSize: any
  item: ProductWithRelations
  setSelectedSize: React.Dispatch<React.SetStateAction<any>>
}) {
  return (
    <RadioGroup className='grid grid-cols-1 gap-2'>
      {sizes?.map(size => {
        const isSelected = selectedSize?.id === size?.id
        return (
          <div
            key={size.id}
            onClick={() => setSelectedSize(size)}
            className={`flex items-center justify-between px-4 py-3 rounded-sm border cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? 'border-brand bg-brand-soft'
                  : 'border-border hover:border-brand/40 hover:bg-muted/30'
              }`}
          >
            <div className='flex items-center gap-3'>
              <RadioGroupItem
                value={size.name}
                checked={isSelected}
                id={size.id}
                className='flex-shrink-0'
              />
              <label htmlFor={size.id} className='text-sm font-medium cursor-pointer capitalize'>
                {size.name.toLowerCase()}
              </label>
            </div>
            <span
              className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {formatCurrency(size.price + item.basePrice)}
            </span>
          </div>
        )
      })}
    </RadioGroup>
  )
}

// ─── Product Extras ───────────────────────────────────────
function ProductExtras({
  extras,
  selectedExtras,
  setSelectedExtras
}: {
  extras: Extras[]
  selectedExtras: any[]
  setSelectedExtras: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const handleExtra = (extra: any) => {
    if (selectedExtras.find(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(item => item.id !== extra.id))
    } else {
      setSelectedExtras(prev => [...prev, extra])
    }
  }

  return (
    <div className='grid grid-cols-1 gap-2'>
      {extras?.map(extra => {
        const isSelected = Boolean(selectedExtras.find(e => e.id === extra.id))
        return (
          <div
            key={extra.id}
            onClick={() => handleExtra(extra)}
            className={`flex items-center justify-between px-4 py-3 rounded-sm border cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? 'border-brand bg-brand-soft'
                  : 'border-border hover:border-brand/40 hover:bg-muted/30'
              }`}
          >
            <div className='flex items-center gap-3'>
              <Checkbox
                id={extra.id}
                checked={isSelected}
                className='flex-shrink-0 pointer-events-none'
              />
              <label htmlFor={extra.id} className='text-sm font-medium cursor-pointer capitalize'>
                {extra.name.toLowerCase()}
              </label>
            </div>
            <span
              className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              +{formatCurrency(extra.price)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Choose Quantity ──────────────────────────────────────
const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize
}: {
  quantity: number
  selectedExtras: Extras[]
  selectedSize: Sizes
  item: ProductWithRelations
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className='flex items-center justify-between gap-3 px-4 py-3 bg-muted/40 rounded-sm'>
      <span className='text-sm text-muted-foreground'>
        <span className='font-semibold text-foreground'>{quantity}</span> in cart
      </span>

      <div className='flex items-center gap-2'>
        {/* Decrement */}
        <button
          type='button'
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
          className='w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-brand/40 hover:bg-muted transition-all'
        >
          <Minus className='w-3 h-3' />
        </button>

        {/* Increment */}
        <button
          type='button'
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize
              })
            )
          }
          className='w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-brand/40 hover:bg-muted transition-all'
        >
          <Plus className='w-3 h-3' />
        </button>

        {/* Remove all */}
        <button
          type='button'
          onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
          className='w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all'
        >
          <Trash2 className='w-3 h-3' />
        </button>
      </div>
    </div>
  )
}
