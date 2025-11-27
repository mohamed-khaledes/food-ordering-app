'use client'

import FormFields from '@/components/fields/form-fields'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { IFormField } from '@/types/app'
import { useSignupForm } from './hooks'

function SignupForm() {
  const { action, pending, getFormFields, translations, state } = useSignupForm()
  return (
    <form action={action}>
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string
        return (
          <div key={field.name} className='mb-3'>
            <FormFields {...field} error={state.error} defaultValue={fieldValue} />
          </div>
        )
      })}
      <Button type='submit' disabled={pending} className='w-full'>
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  )
}

export default SignupForm
