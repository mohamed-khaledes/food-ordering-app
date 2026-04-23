'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import { Translations } from '@/types/translations'
import { useActionState, useEffect } from 'react'
import { addCategory } from './_actions/category'
import Toast from '@/components/ui/toast'

type InitialStateType = {
  message?: string
  error?: any
  status?: number | null
}

const initialState: InitialStateType = {
  message: '',
  error: {},
  status: null
}

function CategoryForm({ translations }: { translations: Translations }) {
  const [state, action, pending] = useActionState(addCategory, initialState)

  useEffect(() => {
    if (state.message) {
      Toast(state.message, state.status === 201 ? 'success' : 'error')
    }
  }, [state.message, state.status])

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
          className='rounded-xl bg-muted border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
        />
        {state.error?.name && (
          <div className='flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-xl'>
            <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
            <p className='text-xs text-destructive'>{state.error.name}</p>
          </div>
        )}
      </div>
      <Button
        type='submit'
        disabled={pending}
        className='w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all'
      >
        {pending ? <Loader /> : translations.create}
      </Button>
    </form>
  )
}

export default CategoryForm
