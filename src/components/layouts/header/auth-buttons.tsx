'use client'

import { Translations } from '@/types/translations'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import { Session } from 'next-auth'
import { useClientSession } from '@/hooks/useClientSession'
import { UserPlus } from 'lucide-react'

function AuthButtons({
  initialSession,
  translations
}: {
  initialSession: Session | null
  translations: Translations
}) {
  const session = useClientSession(initialSession)
  const router = useRouter()
  const { locale } = useParams()

  if (session.data?.user) return null

  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
        className='text-[15px] text-foreground/80 transition-colors hover:text-brand'
      >
        {translations.navbar.login}
      </button>
      <button
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)}
        className='flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark'
        aria-label={translations.navbar.register}
      >
        <UserPlus className='h-[18px] w-[18px]' />
      </button>
    </div>
  )
}

export default AuthButtons
