import Toast from '@/components/ui/toast'
import { Pages, Routes } from '@/constants/enums'
import useFormFields from '@/hooks/useFormFields'
import { toast } from '@/hooks/useToast'
import { useTrans } from '@/lib/translations/client'
import { signIn } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export const useSigninForm = () => {
  const router = useRouter()
  const { locale } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const translations = useTrans()
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError
        setError(validationError)
        const responseError = JSON.parse(res?.error).responseError
        if (responseError) {
          Toast(responseError, 'error')
        }
      }
      if (res?.ok) {
        toast({
          title: translations.messages.loginSuccessful,
          className: 'text-green-400'
        })
        router.replace(`/${locale}/${Routes.PROFILE}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { translations, onSubmit, error, isLoading, getFormFields, formRef }
}
