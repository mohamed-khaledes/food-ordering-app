'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Languages } from '@/constants/enums'
import { Translations } from '@/types/translations'
import { Category } from '@prisma/client'
import { EditIcon } from 'lucide-react'
import { ValidationError } from 'next/dist/compiled/amphtml-validator'
import { useParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import Loader from '@/components/ui/loader'
import { updateCategory } from './_actions/category'
import Toast from '@/components/ui/toast'

type InitialStateType = {
  message?: string
  error?: ValidationError
  status?: number | null
}
const initialState: InitialStateType = {
  message: '',
  error: {},
  status: null
}

function EditCategory({
  translations,
  category
}: {
  translations: Translations
  category: Category
}) {
  const { locale } = useParams()
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  )

  useEffect(() => {
    if (state.message) {
      Toast(state.message, state.status === 201 ? 'success' : 'error')
    }
  }, [state.message, state.status])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>
          <EditIcon className='hover:bg-brand' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className={locale === Languages.ARABIC ? '!text-right' : '!text-left'}>
            {translations.admin.categories.form.editName}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className='space-y-4 pt-4'>
          <div className='space-y-1.5'>
            <Label htmlFor='categoryName'>{translations.admin.categories.form.name.label}</Label>
            <Input
              type='text'
              id='categoryName'
              name='categoryName'
              defaultValue={category.name}
              placeholder={translations.admin.categories.form.name.placeholder}
            />
            {state.error?.categoryName && (
              <p className='text-sm text-destructive'>{state.error?.categoryName}</p>
            )}
          </div>

          {/* Optional — blank falls back to the English name on Arabic pages. */}
          <div className='space-y-1.5'>
            <Label htmlFor='categoryNameAr'>
              {translations.admin.categories.form.nameAr.label}
            </Label>
            <Input
              type='text'
              id='categoryNameAr'
              name='categoryNameAr'
              dir='rtl'
              defaultValue={category.nameAr ?? ''}
              placeholder={translations.admin.categories.form.nameAr.placeholder}
            />
            <p className='text-xs text-muted-foreground'>
              {translations.admin.categories.form.nameAr.hint}
            </p>
          </div>

          <DialogFooter className='mt-6'>
            <Button type='submit' disabled={pending}>
              {pending ? <Loader /> : translations.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory
