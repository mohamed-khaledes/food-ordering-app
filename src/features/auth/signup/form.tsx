'use client'

import FormFields from '@/components/fields/form-fields'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { IFormField } from '@/types/app'
import { useSignupForm } from './hooks'

function SignupForm() {
  const { action, pending, getFormFields, translations, state } = useSignupForm()

  return (
    <form action={action} className='flex flex-col gap-4'>
      {/* Fields */}
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string
        return (
          <div key={field.name} className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              {field.label}
            </label>
            <FormFields {...field} error={state.error} defaultValue={fieldValue} />
          </div>
        )
      })}

      {/* Global error */}
      {state.error?.message && (
        <div className='flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-xl'>
          <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
          <p className='text-xs text-destructive'>{state.error.message}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type='submit'
        disabled={pending}
        className='w-full py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all font-medium mt-2'
      >
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  )
}

export default SignupForm
