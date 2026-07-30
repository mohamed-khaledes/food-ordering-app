'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { Languages } from '@/constants/enums'
import { useTrans } from '@/lib/translations/client'
import { Globe } from 'lucide-react'

const LanguageSwitcher = ({
  variant = 'row',
  onNavigate
}: {
  variant?: 'row' | 'topbar'
  /** Lets a containing sheet/menu close itself once the locale swap is issued. */
  onNavigate?: () => void
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()
  const { navbar } = useTrans()

  const switchLanguage = (newLocale: string) => {
    const path = pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`
    onNavigate?.()
    router.push(path)
  }

  const isArabic = locale === Languages.ARABIC
  const next = isArabic ? Languages.ENGLISH : Languages.ARABIC

  if (variant === 'topbar') {
    return (
      <button
        onClick={() => switchLanguage(next)}
        className='flex items-center gap-1.5 text-[13px] transition-colors hover:text-brand'
      >
        <Globe className='h-3.5 w-3.5' />
        {isArabic ? 'EN' : 'AR'}
      </button>
    )
  }

  /* Full-width settings row, for the mobile action sheet. */
  return (
    <button
      onClick={() => switchLanguage(next)}
      className='flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors active:bg-muted'
    >
      <Globe className='h-4 w-4 text-muted-foreground' />
      <span className='flex-1 text-start'>{navbar.language}</span>
      <span className='text-brand text-xs font-semibold'>{isArabic ? 'EN' : 'AR'}</span>
    </button>
  )
}

export default LanguageSwitcher
