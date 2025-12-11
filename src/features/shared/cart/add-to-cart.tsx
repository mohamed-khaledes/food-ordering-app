'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/helpers'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '../../../components/ui/checkbox'
import { ProductWithRelations } from '../../home/featured/type'
import { Extras, Sizes } from '@prisma/client'
import { useAppDispatch } from '@/redux/hooks'
import { addCartItem, removeCartItem, removeItemFromCart } from '../../cart/slice'
import { useAddToCart } from './hooks'

export default function AddToCart({ item }: { item: ProductWithRelations }) {
  const {
    handleAddToCart,
    setSelectedExtras,
    setSelectedSize,
    selectedSize,
    selectedExtras,
    quantity,
    totalPrice
  } = useAddToCart(item)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type='button'
          size='lg'
          className='mt-4 text-white rounded-full !px-8 cursor-pointer'
        >
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:w-[425px] md:w-[600px] max-h-[80vh] overflow-y-auto no-scrollbar'>
        <DialogHeader className='flex items-center'>
          <Image src={item.image || ''} alt={item.name} width={200} height={200} loading='lazy' />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className='text-center'>{item.description}</DialogDescription>
        </DialogHeader>
        <div className='space-y-10'>
          <div className='space-y-4 text-center'>
            <Label htmlFor='pick-size'>Pick your size</Label>
            <PickSize
              sizes={item?.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className='space-y-4 text-center'>
            <Label htmlFor='add-extras'>Any extras?</Label>
            <ProductExtras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          <div className='flex flex-col w-full'>
            {quantity == 0 ? null : (
              <ChooseQuantity
                quantity={quantity}
                item={item}
                selectedSize={selectedSize}
                selectedExtras={selectedExtras}
              />
            )}
            <Button type='submit' onClick={handleAddToCart} className='w-full h-10'>
              Add to cart {formatCurrency(totalPrice)}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
    <RadioGroup defaultValue='comfortable'>
      {sizes?.map(size => (
        <div
          key={size.id}
          className='flex items-center space-x-2 border border-gray-100 rounded-md p-4'
        >
          <RadioGroupItem
            value={selectedSize?.name}
            checked={selectedSize?.id === size?.id}
            onClick={() => setSelectedSize(size)}
            id={size?.id}
          />
          <Label htmlFor={size?.id}>
            {size?.name} {formatCurrency(size?.price + item?.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

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
      const filteredSelectedExtras = selectedExtras.filter(item => item.id !== extra.id)
      setSelectedExtras(filteredSelectedExtras)
    } else {
      setSelectedExtras(prev => [...prev, extra])
    }
  }
  return extras?.map(extra => (
    <div
      key={extra.id}
      className='flex items-center space-x-2 border border-gray-100 rounded-md p-4'
    >
      <Checkbox
        id={extra.id}
        onClick={() => handleExtra(extra)}
        checked={Boolean(selectedExtras.find(e => e.id === extra.id))}
      />
      <Label
        htmlFor={extra.id}
        className='text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ))
}

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
    <div className='flex items-center justify-around gap-2 mt-4 p-3 w-full'>
      <div className='flex items-center justify-center gap-2'>
        <Button variant='outline' onClick={() => dispatch(removeCartItem({ id: item.id }))}>
          -
        </Button>
        <div>
          <span className='text-black'>{quantity} in cart</span>
        </div>
        <Button
          variant='outline'
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
        >
          +
        </Button>
      </div>
      <Button size='sm' onClick={() => dispatch(removeItemFromCart({ id: item.id }))}>
        Remove
      </Button>
    </div>
  )
}
