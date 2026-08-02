'use client'
import { InputTypes } from '@/constants/enums'
import { IFormField } from '@/types/app'
import { Translations } from '@/types/translations'
import { Session } from 'next-auth'
import Image from 'next/image'
import { UserRole } from '@prisma/client'
import { CameraIcon, Save } from 'lucide-react'
import FormFields from '@/components/fields/form-fields'
import Loader from '@/components/ui/loader'
import { Checkbox } from '@/components/ui/checkbox'
import { useProfileForm } from './hooks'

function EditUserForm({
  translations,
  user
}: {
  translations: Translations
  user: Session['user']
}) {
  const {
    image,
    isAdmin,
    toggleAdmin,
    canEditRole,
    getFormFields,
    defaults,
    state,
    action,
    pending
  } = useProfileForm(user, translations)

  return (
    <form action={action} className='space-y-6'>
      {/* Avatar upload */}
      <div className='flex items-center gap-5'>
        <UploadImage
          preview={image.preview}
          onFileChange={image.onFileChange}
          name={user?.name}
        />
        <div>
          <p className='text-sm font-semibold text-foreground'>{user?.name ?? 'User'}</p>
          <p className='text-xs text-muted-foreground'>{user?.email}</p>
          {user?.role && (
            <span
              className={`inline-flex items-center gap-1 mt-2 text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-widest
              ${
                user.role === UserRole.ADMIN
                  ? 'bg-brand-soft text-foreground border border-brand/40'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {user.role === UserRole.ADMIN && <span className='w-1 h-1 rounded-full bg-brand' />}
              {user.role}
            </span>
          )}
        </div>
      </div>

      <div className='h-px bg-border' />

      {/* Fields */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {getFormFields().map((field: IFormField) => {
          const fieldValue = state?.formData?.get(field.name) ?? defaults.get(field.name)
          const isEmail = field.type === InputTypes.EMAIL
          return (
            <div
              key={field.name}
              className={
                field.name === 'name' || field.name === 'email'
                  ? 'sm:col-span-1'
                  : 'sm:col-span-2 lg:col-span-1'
              }
            >
              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  {field.label}
                  {isEmail && (
                    <span className='ml-2 text-[10px] normal-case bg-muted px-1.5 py-0.5 rounded text-muted-foreground'>
                      {translations.common.readOnly}
                    </span>
                  )}
                </label>
                <FormFields
                  {...field}
                  defaultValue={fieldValue as string}
                  error={state?.error}
                  readOnly={isEmail}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Admin toggle */}
      {canEditRole && (
        <div className='flex items-center justify-between px-4 py-3 rounded-sm border border-border bg-muted/30'>
          <div>
            <p className='text-sm font-medium text-foreground'>{translations.common.adminAccess}</p>
            <p className='text-xs text-muted-foreground'>{translations.common.adminAccessHint}</p>
          </div>
          <Checkbox name='admin' checked={isAdmin} onClick={toggleAdmin} className='w-5 h-5' />
        </div>
      )}

      {/* Error */}
      {state?.error?.message && (
        <div className='flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-sm'>
          <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
          <p className='text-xs text-destructive'>{state.error.message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={pending}
        className='flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-sm text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50'
      >
        {pending ? (
          <Loader />
        ) : (
          <>
            <Save className='w-4 h-4' /> {translations.save}
          </>
        )}
      </button>
    </form>
  )
}

export default EditUserForm

// ─── Upload Image ─────────────────────────────────────────
const UploadImage = ({
  preview,
  onFileChange,
  name
}: {
  preview: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string | null
}) => (
  <div className='relative group flex-shrink-0'>
    <div className='w-16 h-16 rounded-none overflow-hidden border border-border bg-muted flex items-center justify-center'>
      {preview ? (
        <Image
          src={preview}
          alt={name ?? 'avatar'}
          width={64}
          height={64}
          className='w-full h-full object-cover'
        />
      ) : (
        <span className='text-xl font-bold text-muted-foreground'>
          {(name ?? 'U').charAt(0).toUpperCase()}
        </span>
      )}
    </div>

    {/* Hover overlay */}
    <label
      htmlFor='profile-image-upload'
      className='absolute inset-0 rounded-none flex items-center justify-center bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
    >
      <CameraIcon className='w-5 h-5 text-white' />
    </label>

    <input
      type='file'
      accept='image/*'
      className='hidden'
      id='profile-image-upload'
      onChange={onFileChange}
      name='image'
    />
  </div>
)
