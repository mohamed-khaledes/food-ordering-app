import { getItemQuantity } from '@/features/cart/hooks'
import { addCartItem, selectCartItems } from '@/features/cart/slice'
import { ProductWithRelations } from '@/features/home/featured/type'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Extras, ProductSizes, Sizes } from '@prisma/client'
import { useState } from 'react'

export const useAddToCart = (item: ProductWithRelations) => {
  const cart = useAppSelector(selectCartItems)
  const quantity = getItemQuantity(item.id, cart)
  const dispatch = useAppDispatch()
  const defaultSize =
    cart?.find((element: any) => element.id === item.id)?.size ||
    item?.sizes?.find(size => size.name === ProductSizes.SMALL)

  const defaultExtras = cart?.find(element => element.id === item.id)?.extras || []

  const [selectedSize, setSelectedSize] = useState<Sizes>(defaultSize!)
  const [selectedExtras, setSelectedExtras] = useState<Extras[]>(defaultExtras)

  let totalPrice = item.basePrice
  if (selectedSize) {
    totalPrice += selectedSize.price
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras
      })
    )
  }
  return {
    handleAddToCart,
    setSelectedExtras,
    setSelectedSize,
    selectedSize,
    selectedExtras,
    quantity,
    totalPrice
  }
}
