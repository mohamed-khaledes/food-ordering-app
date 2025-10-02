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
import { Checkbox } from '../ui/checkbox'
import { useState } from 'react'

export default function AddToCart({ item }: { item: any }) {
  const [selectedSize, setSelectedSize] = useState<any>(2)
  const [selectedExtras, setSelectedExtras] = useState<any[]>([1, 1])

  let totalPrice = item.basePrice
  if (selectedSize) {
    totalPrice += selectedSize.price
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' size='lg' className='mt-4 text-white rounded-full !px-8'>
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:w-[425px] md:w-[500px] max-h-[80vh] overflow-y-auto no-scrollbar'>
        <DialogHeader className='flex items-center'>
          <Image
            src={item.image || '/assets/images/pizza.png'}
            alt={item.name}
            width={200}
            height={200}
          />
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
            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            // onClick={handleAddToCart}
            className='w-full h-10'
          >
            Add to cart {formatCurrency(totalPrice)}
          </Button>
          {/* {quantity === 0 ? (
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )} */}
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
  sizes: any[]
  selectedSize: any
  item: any
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
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            onClick={() => setSelectedSize(size)}
            id={size.id}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

function Extras({
  extras,
  selectedExtras,
  setSelectedExtras
}: {
  extras: any[]
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
