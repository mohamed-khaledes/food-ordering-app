'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Languages } from '@/constants/enums'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()

  const switchLanguage = (newLocale: string) => {
    const path = pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`
    router.push(path)
  }

  const isArabic = locale === Languages.ARABIC
  return
  return (
    <button
      onClick={() => switchLanguage(isArabic ? Languages.ENGLISH : Languages.ARABIC)}
      className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200'
    >
      <Globe className='w-3.5 h-3.5' />
      {isArabic ? 'EN' : 'AR'}
    </button>
  )
}

export default LanguageSwitcher
