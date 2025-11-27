import { Pages, Routes } from '@/constants/enums'
import useFormFields from '@/hooks/useFormFields'
import { toast } from '@/hooks/useToast'
import { useTrans } from '@/lib/translations/client'
import { signup } from '@/server/_actions/auth'
import { ValidationErrors } from '@/validations/auth'
import { useParams, useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
const initialState: {
  message?: string
  error?: ValidationErrors
  status?: number | null
  formData?: FormData | null
} = {
  message: '',
  error: {},
  status: null,
  formData: null
}
export const useSignupForm = () => {
  const { locale } = useParams()
  const translations = useTrans()
  const router = useRouter()
  const [state, action, pending] = useActionState(signup as any, initialState)
  const { getFormFields } = useFormFields({
    slug: Pages.Register,
    translations
  })

  useEffect(() => {
    if (state.status && state.message) {
      toast({
        title: state.message,
        className: state.status === 201 ? 'text-green-400' : 'text-destructive'
      })
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }
  }, [locale, router, state.message, state.status])

  return { action, pending, getFormFields, translations, state }
}
