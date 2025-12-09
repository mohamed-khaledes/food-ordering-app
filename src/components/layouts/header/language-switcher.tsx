'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Languages } from '@/constants/enums'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()

  const switchLanguage = (newLocale: string) => {
    const path = pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`
    router.push(path)
  }

  return (
    <div className='flex'>
      {locale === Languages.ARABIC ? (
        <Button
          size='lg'
          className='rounded-full cursor-pointer'
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          <Globe /> EN
        </Button>
      ) : (
        <Button
          size='lg'
          className='rounded-full cursor-pointer'
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          <Globe /> AR
        </Button>
      )}
    </div>
  )
}

export default LanguageSwitcher
