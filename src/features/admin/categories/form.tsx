'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import { Translations } from '@/types/translations'
import { useAddCategoryForm } from './hooks'

function CategoryForm({ translations }: { translations: Translations }) {
  const { state, action, pending } = useAddCategoryForm()

  return (
    <form action={action} className='space-y-4'>
      <div className='space-y-1.5'>
        <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
          {translations.admin.categories.form.name.label}
        </label>
        <Input
          type='text'
          name='name'
          id='name'
          placeholder={translations.admin.categories.form.name.placeholder}
          className='rounded-sm bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
        />
        {state.error?.name && (
          <div className='flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-sm'>
            <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
            <p className='text-xs text-destructive'>{state.error.name}</p>
          </div>
        )}
      </div>

      {/* Optional — blank falls back to the English name on Arabic pages. */}
      <div className='space-y-1.5'>
        <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
          {translations.admin.categories.form.nameAr.label}
        </label>
        <Input
          type='text'
          name='nameAr'
          id='nameAr'
          dir='rtl'
          placeholder={translations.admin.categories.form.nameAr.placeholder}
          className='rounded-sm bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
        />
        <p className='text-xs text-muted-foreground'>
          {translations.admin.categories.form.nameAr.hint}
        </p>
      </div>

      <Button
        type='submit'
        disabled={pending}
        className='w-full rounded-sm bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all'
      >
        {pending ? <Loader /> : translations.create}
      </Button>
    </form>
  )
}

export default CategoryForm
