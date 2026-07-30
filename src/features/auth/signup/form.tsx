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
            <FormFields {...field} error={state.error} defaultValue={fieldValue} />
          </div>
        )
      })}

      {/* Global error */}
      {state.error?.message && (
        <div className='flex items-center gap-2 border border-destructive/20 bg-destructive/10 px-3 py-2.5'>
          <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-destructive' />
          <p className='text-xs text-destructive'>{state.error.message}</p>
        </div>
      )}

      {/* Submit */}
      <Button type='submit' disabled={pending} className='btn-brand mt-2 w-full py-3.5'>
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  )
}

export default SignupForm
