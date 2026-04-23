'use client'
import { InputTypes, Routes } from '@/constants/enums'
import useFormFields from '@/hooks/useFormFields'
import { IFormField } from '@/types/app'
import { Translations } from '@/types/translations'
import { Session } from 'next-auth'
import Image from 'next/image'
import { UserRole } from '@prisma/client'
import { useActionState, useEffect, useState } from 'react'
import { CameraIcon, Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import FormFields from '@/components/fields/form-fields'
import Loader from '@/components/ui/loader'
import { Checkbox } from '@/components/ui/checkbox'
import Toast from '@/components/ui/toast'
import { updateProfile } from './_actions/profile'

function EditUserForm({
  translations,
  user
}: {
  translations: Translations
  user: Session['user']
}) {
  const session = useSession()
  const formData = new FormData()

  Object.entries(user || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== 'image') {
      formData.append(key, value.toString())
    }
  })

  const initialState: {
    message?: string
    error?: any
    status?: number | null
    formData?: FormData | null
  } = { message: '', error: {}, status: null, formData }

  const [selectedImage, setSelectedImage] = useState(user?.image ?? '')
  const [isAdmin, setIsAdmin] = useState(user?.role === UserRole.ADMIN)
  const [state, action, pending] = useActionState(
    updateProfile.bind(null, isAdmin) as any,
    initialState
  )
  const { getFormFields } = useFormFields({ slug: Routes.PROFILE, translations })

  useEffect(() => {
    if (state.message && state.status && !pending) {
      Toast(state.message, state.status === 200 ? 'success' : 'error')
    }
  }, [pending, state.message, state.status])

  useEffect(() => {
    setSelectedImage(user?.image as string)
  }, [user?.image])

  return (
    <form action={action} className='space-y-6'>
      {/* Avatar upload */}
      <div className='flex items-center gap-5'>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
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
                  ? 'bg-primary/15 text-foreground border border-primary/30'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {user.role === UserRole.ADMIN && <span className='w-1 h-1 rounded-full bg-primary' />}
              {user.role}
            </span>
          )}
        </div>
      </div>

      <div className='h-px bg-border' />

      {/* Fields */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {getFormFields().map((field: IFormField) => {
          const fieldValue = state?.formData?.get(field.name) ?? formData.get(field.name)
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
                      Read only
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
      {session?.data?.user.role === UserRole.ADMIN && (
        <div className='flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-muted/30'>
          <div>
            <p className='text-sm font-medium text-foreground'>Admin access</p>
            <p className='text-xs text-muted-foreground'>
              Grant full admin privileges to this user
            </p>
          </div>
          <Checkbox
            name='admin'
            checked={isAdmin}
            onClick={() => setIsAdmin(!isAdmin)}
            className='w-5 h-5'
          />
        </div>
      )}

      {/* Error */}
      {state?.error?.message && (
        <div className='flex items-center gap-2 px-3 py-2.5 bg-destructive/10 border border-destructive/20 rounded-xl'>
          <span className='w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0' />
          <p className='text-xs text-destructive'>{state.error.message}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={pending}
        className='flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50'
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
  selectedImage,
  setSelectedImage,
  name
}: {
  selectedImage: string
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>
  name?: string | null
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setSelectedImage(URL.createObjectURL(file))
  }

  return (
    <div className='relative group flex-shrink-0'>
      <div className='w-16 h-16 rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center'>
        {selectedImage ? (
          <Image
            src={selectedImage}
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
        className='absolute inset-0 rounded-2xl flex items-center justify-center bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
      >
        <CameraIcon className='w-5 h-5 text-white' />
      </label>

      <input
        type='file'
        accept='image/*'
        className='hidden'
        id='profile-image-upload'
        onChange={handleImageChange}
        name='image'
      />
    </div>
  )
}
