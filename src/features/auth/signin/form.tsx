'use client'

import { IFormField } from './type'
import { useSigninForm } from './hooks'
import FormFields from '@/components/fields/form-fields'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

function SigninForm() {
  const { getFormFields, onSubmit, error, isLoading, translations, formRef } = useSigninForm()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [appleLoading, setAppleLoading] = useState(false)

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/' })
    setGoogleLoading(false)
  }

  const handleApple = async () => {
    setAppleLoading(true)
    await signIn('apple', { callbackUrl: '/' })
    setAppleLoading(false)
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Social sign in */}
      <div className='flex flex-col gap-3'>
        {/* Google */}
        <button
          type='button'
          onClick={handleGoogle}
          disabled={googleLoading}
          className='w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:bg-muted/50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {googleLoading ? (
            <Loader2 className='w-4 h-4 animate-spin text-muted-foreground' />
          ) : (
            <svg className='w-4 h-4' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
          )}
          <span className='text-sm font-medium text-foreground'>Continue with Google</span>
        </button>

        {/* Apple */}
        {/* <button
          type='button'
          onClick={handleApple}
          disabled={appleLoading}
          className='w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:bg-muted/50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {appleLoading ? (
            <Loader2 className='w-4 h-4 animate-spin text-muted-foreground' />
          ) : (
            <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
            </svg>
          )}
          <span className='text-sm font-medium text-foreground'>Continue with Apple</span>
        </button> */}
      </div>

      {/* Divider */}
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-border' />
        <span className='text-xs text-muted-foreground uppercase tracking-widest'>or</span>
        <div className='flex-1 h-px bg-border' />
      </div>

      {/* Credentials form */}
      <form onSubmit={onSubmit} ref={formRef} className='flex flex-col gap-4'>
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
        <button
          type='submit'
          disabled={isLoading}
          className='w-full flex items-center justify-center py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all font-medium mt-1 disabled:opacity-50'
        >
          {isLoading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            translations.auth.login.submit
          )}
        </button>
      </form>
    </div>
  )
}

export default SigninForm
