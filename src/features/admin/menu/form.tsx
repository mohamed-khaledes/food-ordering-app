'use client'

import { Button } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import { IFormField } from '@/types/app'
import { Translations } from '@/types/translations'
import { useTrans } from '@/lib/translations/client'
import { CameraIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import SelectCategory from './select-category'
import { Category } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from '@/components/link'
import { useParams } from 'next/navigation'
import Loader from '@/components/ui/loader'
import ItemOptions from './item-options'
import { ProductWithRelations } from '@/features/home/featured/type'
import FormFields from '@/components/fields/form-fields'
import { ItemOptionsKeys, useDeleteProduct, useMenuItemForm } from './hooks'

function MenuForm({
  translations,
  categories,
  product
}: {
  translations: Translations
  categories: Category[]
  product?: ProductWithRelations
}) {
  const {
    image,
    categoryId,
    setCategoryId,
    sizes,
    setSizes,
    extras,
    setExtras,
    getFormFields,
    defaults,
    state,
    action,
    pending
  } = useMenuItemForm({ translations, categories, product })

  return (
    <div className='space-y-6'>
      {/* Page header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-brand-soft border border-brand/40 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-brand' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            {product ? translations.adminUi.editItem : translations.adminUi.newItem}
          </span>
        </div>
        <h1 className='text-3xl font-bold'>
          {product ? product.name : translations.admin['menu'].createNewMenuItem}
        </h1>
      </div>

      <form action={action}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left: image */}
          <div className='rounded-2xl border border-border/70 bg-background p-6 flex flex-col items-center gap-4 shadow-[0_1px_2px_rgb(0_0_0/0.04)]'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground self-start'>
              {translations.adminUi.productImage}
            </h2>
            <UploadImage preview={image.preview} onFileChange={image.onFileChange} />
            {state?.error?.image && (
              <div className='flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-sm w-full'>
                <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
                <p className='text-xs text-destructive'>{state.error?.image}</p>
              </div>
            )}
          </div>

          {/* Right: fields */}
          <div className='lg:col-span-2 space-y-4'>
            <div className='rounded-2xl border border-border/70 bg-background p-6 space-y-4 shadow-[0_1px_2px_rgb(0_0_0/0.04)]'>
              <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
                {translations.adminUi.productDetails}
              </h2>
              {getFormFields().map((field: IFormField) => {
                const fieldValue = state.formData?.get(field.name) ?? defaults.get(field.name)
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
                  {translations.category}
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
            <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04)]'>
              <Accordion type='single' collapsible>
                <AccordionItem value='sizes' className='border-b border-border px-6'>
                  <AccordionTrigger className='text-sm font-medium hover:no-underline py-4'>
                    {translations.sizes}
                    {sizes.length > 0 && (
                      <span className='ml-2 text-xs bg-brand-soft text-foreground px-2 py-0.5 rounded-full'>
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
                      <span className='ml-2 text-xs bg-brand-soft text-foreground px-2 py-0.5 rounded-full'>
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
  preview,
  onFileChange
}: {
  preview: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const translations = useTrans()

  return (
    <div className='relative group'>
      <div className='w-40 h-40 rounded-none overflow-hidden border-2 border-dashed border-border group-hover:border-brand transition-colors bg-muted/30 flex items-center justify-center'>
        {preview ? (
          <Image
            src={preview}
            alt='Product image'
            width={160}
            height={160}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex flex-col items-center gap-2 text-muted-foreground'>
            <CameraIcon className='w-8 h-8' />
            <span className='text-xs'>{translations.common.uploadImage}</span>
          </div>
        )}
      </div>

      <input
        type='file'
        accept='image/*'
        className='hidden'
        id='image-upload'
        onChange={onFileChange}
        name='image'
      />
      <label
        htmlFor='image-upload'
        className='absolute inset-0 cursor-pointer rounded-none flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/20'
      >
        <span className='text-xs text-white font-medium bg-foreground/60 px-3 py-1 rounded-full'>
          {translations.adminUi.changeImage}
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
  const { deleteProduct, pending: deleting } = useDeleteProduct()

  return (
    <div className='rounded-2xl border border-border/70 bg-background p-6 flex flex-wrap gap-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]'>
      <Button
        type='submit'
        disabled={pending}
        className='flex-1 rounded-sm bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all'
      >
        {pending ? <Loader /> : product ? translations.save : translations.create}
      </Button>

      {product && (
        <button
          type='button'
          disabled={deleting}
          onClick={() => deleteProduct(product.id)}
          className='flex items-center gap-2 px-4 py-2 rounded-sm border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all text-sm font-medium disabled:opacity-50'
        >
          {deleting ? (
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
        className='flex-1 flex items-center justify-center px-4 py-2 rounded-sm border border-border hover:bg-muted/50 transition-all text-sm font-medium'
      >
        {translations.cancel}
      </Link>
    </div>
  )
}
