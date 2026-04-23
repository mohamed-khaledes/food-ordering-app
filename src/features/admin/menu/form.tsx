'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/types/app'
import { Translations } from '@/types/translations'
import { CameraIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react'
import SelectCategory from './select-category'
import { Category, Extras, Sizes } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from '@/components/link'
import { useParams } from 'next/navigation'
import { addProduct, deleteProduct, updateProduct } from './_actions/product'
import Loader from '@/components/ui/loader'
import Toast from '@/components/ui/toast'
import ItemOptions, { ItemOptionsKeys } from './item-options'
import { ProductWithRelations } from '@/features/home/featured/type'
import FormFields from '@/components/fields/form-fields'

function MenuForm({
  translations,
  categories,
  product
}: {
  translations: Translations
  categories: Category[]
  product?: ProductWithRelations
}) {
  const [selectedImage, setSelectedImage] = useState(product ? product.image : '')
  const [categoryId, setCategoryId] = useState(product ? product.categoryId : categories[0].id)
  const [sizes, setSizes] = useState<Partial<Sizes>[]>(product ? product.sizes : [])
  const [extras, setExtras] = useState<Partial<Extras>[]>(product ? product.extras : [])
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations
  })

  const formData = new FormData()
  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== 'image') {
      formData.append(key, value.toString())
    }
  })

  const initialState: {
    message?: string
    error?: {
      image?: string[]
      name?: string[]
      description?: string[]
      basePrice?: string[]
      categoryId?: string[]
    }
    status?: number | null
    formData?: FormData | null
  } = {
    message: '',
    error: {},
    status: null,
    formData: null
  }
  const [state, action, pending] = useActionState(
    product
      ? (updateProduct.bind(null, {
          productId: product.id,
          options: { sizes, extras }
        }) as any)
      : (addProduct.bind(null, {
          categoryId,
          options: { sizes, extras }
        }) as any),
    initialState
  )

  useEffect(() => {
    if (state.message && state.status && !pending) {
      Toast(state.message, state.status === 201 || state.status === 200 ? 'success' : 'error')
    }
  }, [pending, state.message, state.status])

  return (
    <div className='space-y-6'>
      {/* Page header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            {product ? 'Edit Item' : 'New Item'}
          </span>
        </div>
        <h1 className='text-3xl font-bold'>
          {product ? product.name : translations.admin['menu'].createNewMenuItem}
        </h1>
      </div>

      <form action={action}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left: image */}
          <div className='bg-background rounded-2xl border border-border p-6 flex flex-col items-center gap-4'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground self-start'>
              Product Image
            </h2>
            <UploadImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            {state?.error?.image && (
              <div className='flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-xl w-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
                <p className='text-xs text-destructive'>{state.error?.image}</p>
              </div>
            )}
          </div>

          {/* Right: fields */}
          <div className='lg:col-span-2 space-y-4'>
            <div className='bg-background rounded-2xl border border-border p-6 space-y-4'>
              <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
                Product Details
              </h2>
              {getFormFields().map((field: IFormField) => {
                const fieldValue = state.formData?.get(field.name) ?? formData.get(field.name)
                return (
                  <div key={field.name} className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                      {field.label}
                    </label>
                    <FormFields
                      {...field}
                      error={state?.error}
                      defaultValue={fieldValue as string}
                    />
                  </div>
                )
              })}
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  Category
                </label>
                <SelectCategory
                  categoryId={categoryId}
                  categories={categories}
                  setCategoryId={setCategoryId}
                  translations={translations}
                />
              </div>
            </div>

            {/* Options */}
            <div className='bg-background rounded-2xl border border-border overflow-hidden'>
              <Accordion type='single' collapsible>
                <AccordionItem value='sizes' className='border-b border-border px-6'>
                  <AccordionTrigger className='text-sm font-medium hover:no-underline py-4'>
                    {translations.sizes}
                    {sizes.length > 0 && (
                      <span className='ml-2 text-xs bg-primary/15 text-foreground px-2 py-0.5 rounded-full'>
                        {sizes.length}
                      </span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className='pb-4'>
                    <ItemOptions
                      optionKey={ItemOptionsKeys.SIZES}
                      state={sizes}
                      setState={setSizes}
                      translations={translations}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='extras' className='px-6 border-none'>
                  <AccordionTrigger className='text-sm font-medium hover:no-underline py-4'>
                    {translations.extrasIngredients}
                    {extras.length > 0 && (
                      <span className='ml-2 text-xs bg-primary/15 text-foreground px-2 py-0.5 rounded-full'>
                        {extras.length}
                      </span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className='pb-4'>
                    <ItemOptions
                      state={extras}
                      optionKey={ItemOptionsKeys.EXTRAS}
                      setState={setExtras}
                      translations={translations}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Actions */}
            <FormActions translations={translations} pending={pending} product={product} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MenuForm

// ─── Upload Image ─────────────────────────────────────────
const UploadImage = ({
  selectedImage,
  setSelectedImage
}: {
  selectedImage: string
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage(url)
    }
  }

  return (
    <div className='relative group'>
      <div className='w-40 h-40 rounded-2xl overflow-hidden border-2 border-dashed border-border group-hover:border-primary/40 transition-colors bg-muted/30 flex items-center justify-center'>
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt='Product image'
            width={160}
            height={160}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex flex-col items-center gap-2 text-muted-foreground'>
            <CameraIcon className='w-8 h-8' />
            <span className='text-xs'>Upload image</span>
          </div>
        )}
      </div>

      <input
        type='file'
        accept='image/*'
        className='hidden'
        id='image-upload'
        onChange={handleImageChange}
        name='image'
      />
      <label
        htmlFor='image-upload'
        className='absolute inset-0 cursor-pointer rounded-2xl flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/20'
      >
        <span className='text-xs text-white font-medium bg-foreground/60 px-3 py-1 rounded-full'>
          Change
        </span>
      </label>
    </div>
  )
}

// ─── Form Actions ─────────────────────────────────────────
const FormActions = ({
  translations,
  pending,
  product
}: {
  translations: Translations
  pending: boolean
  product?: ProductWithRelations
}) => {
  const { locale } = useParams()
  const [deleteState, setDeleteState] = useState({
    pending: false,
    status: null as null | number,
    message: ''
  })

  const handleDelete = async (id: string) => {
    try {
      setDeleteState(prev => ({ ...prev, pending: true }))
      const res = await deleteProduct(id)
      setDeleteState(prev => ({ ...prev, status: res.status, message: res.message }))
    } catch (error) {
      console.log(error)
    } finally {
      setDeleteState(prev => ({ ...prev, pending: false }))
    }
  }

  useEffect(() => {
    if (deleteState.message && deleteState.status) {
      Toast(deleteState.message, deleteState.status === 200 ? 'success' : 'error')
    }
  }, [deleteState.message, deleteState.status])

  return (
    <div className='bg-background rounded-2xl border border-border p-6 flex flex-wrap gap-3'>
      <Button
        type='submit'
        disabled={pending}
        className='flex-1 rounded-xl bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all'
      >
        {pending ? <Loader /> : product ? translations.save : translations.create}
      </Button>

      {product && (
        <button
          type='button'
          disabled={deleteState.pending}
          onClick={() => handleDelete(product.id)}
          className='flex items-center gap-2 px-4 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all text-sm font-medium disabled:opacity-50'
        >
          {deleteState.pending ? (
            <Loader />
          ) : (
            <>
              <Trash2 className='w-4 h-4' /> {translations.delete}
            </>
          )}
        </button>
      )}

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className='flex-1 flex items-center justify-center px-4 py-2 rounded-xl border border-border hover:bg-muted/50 transition-all text-sm font-medium'
      >
        {translations.cancel}
      </Link>
    </div>
  )
}
