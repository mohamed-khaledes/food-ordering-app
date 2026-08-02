'use client'

import { Pages, Routes } from '@/constants/enums'
import { ProductWithRelations } from '@/features/home/featured/type'
import { ActionState, toFormData, useActionToast } from '@/hooks/useActionToast'
import useFormFields from '@/hooks/useFormFields'
import { useImagePreview } from '@/hooks/useImagePreview'
import { useMutation } from '@/hooks/useMutation'
import { Translations } from '@/types/translations'
import { Category, ExtraIngredients, Extras, ProductSizes, Sizes } from '@prisma/client'
import { useState } from 'react'
import { addProduct, deleteProduct, updateProduct } from './_actions/product'

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS
}

export const SIZE_NAMES = [ProductSizes.SMALL, ProductSizes.MEDIUM, ProductSizes.LARGE]

export const EXTRA_NAMES = [
  ExtraIngredients.CHEESE,
  ExtraIngredients.BACON,
  ExtraIngredients.ONION,
  ExtraIngredients.PEPPER,
  ExtraIngredients.TOMATO
]

const initialState: ActionState = {
  message: '',
  error: {},
  status: null,
  formData: null
}

/**
 * The create/edit menu item form.
 *
 * Sizes and extras aren't form inputs — they're a nested list edited in React
 * state — so they're bound into the action rather than read off `FormData`.
 * Editing binds the product id and keeps the existing category; creating sends
 * the category the user picked.
 */
export function useMenuItemForm({
  translations,
  categories,
  product
}: {
  translations: Translations
  categories: Category[]
  product?: ProductWithRelations
}) {
  const image = useImagePreview(product?.image)
  const [categoryId, setCategoryId] = useState(product ? product.categoryId : categories[0].id)
  const [sizes, setSizes] = useState<Partial<Sizes>[]>(product ? product.sizes : [])
  const [extras, setExtras] = useState<Partial<Extras>[]>(product ? product.extras : [])

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations
  })

  const boundAction = product
    ? updateProduct.bind(null, { productId: product.id, options: { sizes, extras } })
    : addProduct.bind(null, { categoryId, options: { sizes, extras } })

  const { state, action, pending } = useActionToast(boundAction, initialState)

  return {
    image,
    categoryId,
    setCategoryId,
    sizes,
    setSizes,
    extras,
    setExtras,
    getFormFields,
    /** Values the user last submitted, falling back to the saved product. */
    defaults: toFormData(product as Record<string, unknown> | undefined),
    state,
    action,
    pending,
    isEdit: Boolean(product)
  }
}

/** Delete button on the edit form. The action supplies its own message. */
export function useDeleteProduct() {
  const { run, pending } = useMutation(deleteProduct)
  return { deleteProduct: run, pending }
}

/**
 * Add / edit / remove rows in the sizes or extras list.
 *
 * Both lists are `{ name, price }` pairs drawn from a fixed enum, so a name can
 * only be used once and the "add" button hides when they're all taken.
 */
export function useItemOptions(
  optionKey: ItemOptionsKeys,
  state: Partial<Sizes>[] | Partial<Extras>[],
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Sizes>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extras>[]>>
) {
  const allNames = optionKey === ItemOptionsKeys.SIZES ? SIZE_NAMES : EXTRA_NAMES

  const addOption = () => {
    setState((prev: any) => [...prev, { name: '', price: 0 }])
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
    const newValue = e.target.value
    setState((prev: any) => {
      const next = [...prev]
      next[index] = { ...next[index], [fieldName]: newValue }
      return next
    })
  }

  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => prev.filter((_: any, index: number) => index !== indexToRemove))
  }

  /** Names not already spoken for, so the same size can't be added twice. */
  const availableNames = (currentName?: string | null) =>
    allNames.filter(name => name === currentName || !state.some(item => item.name === name))

  return {
    addOption,
    onChange,
    removeOption,
    availableNames,
    hasAvailableOptions: allNames.length > state.length
  }
}
