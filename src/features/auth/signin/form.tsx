'use client'

import { Button } from '@/components/ui/button'
import { IFormField } from './type'
import { useSigninForm } from './hooks'
import FormFields from '@/components/fields/form-fields'
import Loader from '@/components/ui/loader'

function SigninForm() {
  const { getFormFields, onSubmit, error, isLoading, translations, formRef } = useSigninForm()

  return (
    <form onSubmit={onSubmit} ref={formRef} className='flex flex-col gap-4'>
      {/* Fields */}
      {getFormFields()?.map((field: IFormField) => (
        <div key={field.name} className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
            {field.label}
          </label>
          <FormFields {...field} error={error} />
        </div>
      ))}

      {/* Global error */}
      {error && !getFormFields().some((f: IFormField) => f.name === (error?.field as any)) && (
        <div className='flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-xl'>
          <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
          <p className='text-xs text-destructive'>{error.message}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type='submit'
        disabled={isLoading}
        className='w-full py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all font-medium mt-2'
      >
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  )
}

export default SigninForm
