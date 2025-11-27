'use client'

import { Button } from '@/components/ui/button'

import { IFormField } from './type'
import { useSigninForm } from './hooks'
import FormFields from '@/components/fields/form-fields'
import Loader from '@/components/ui/loader'

function SigninForm() {
  const { getFormFields, onSubmit, error, isLoading, translations, formRef } = useSigninForm()
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className='mb-3'>
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  )
}

export default SigninForm
