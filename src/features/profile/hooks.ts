'use client'

import { Routes } from '@/constants/enums'
import { toFormData, useActionToast } from '@/hooks/useActionToast'
import useFormFields from '@/hooks/useFormFields'
import { useImagePreview } from '@/hooks/useImagePreview'
import { Translations } from '@/types/translations'
import { UserRole } from '@prisma/client'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { updateProfile } from './_actions/profile'

/**
 * The profile form, reused by the account page and the admin user editor.
 *
 * The admin toggle isn't a plain form value — it's bound into the action,
 * because only an admin viewing a profile may hand out the role.
 */
export function useProfileForm(user: Session['user'], translations: Translations) {
  const session = useSession()
  const image = useImagePreview(user?.image)
  const [isAdmin, setIsAdmin] = useState(user?.role === UserRole.ADMIN)

  const defaults = toFormData(user as unknown as Record<string, unknown>)

  // `error` here carries both per-field arrays and a top-level `message`, which
  // no single type covers — the form reads both, as it did before.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state, action, pending } = useActionToast<any>(updateProfile.bind(null, isAdmin), {
    message: '',
    error: {},
    status: null,
    formData: defaults
  })

  const { getFormFields } = useFormFields({ slug: Routes.PROFILE, translations })

  return {
    image,
    isAdmin,
    toggleAdmin: () => setIsAdmin(current => !current),
    canEditRole: session?.data?.user.role === UserRole.ADMIN,
    getFormFields,
    defaults,
    state,
    action,
    pending
  }
}
