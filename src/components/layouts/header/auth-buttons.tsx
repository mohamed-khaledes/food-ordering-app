'use client'

import { Translations } from '@/types/translations'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import { Session } from 'next-auth'
import { useClientSession } from '@/hooks/useClientSession'
import { LogIn, UserPlus } from 'lucide-react'

function AuthButtons({
  initialSession,
  translations,
  mobileBar = false
}: {
  initialSession: Session | null
  translations: Translations
  mobileBar?: boolean
}) {
  const session = useClientSession(initialSession)
  const router = useRouter()
  const { locale } = useParams()

  if (session.data?.user) return null

  if (mobileBar) {
    return (
      <>
        {/* Mobile bar — icon + label tabs, same style as MobileNav */}
        <button
          onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
          className='flex flex-col items-center gap-0.5 px-2 py-1 min-w-[44px]'
        >
          <div className='w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-all duration-200'>
            <LogIn className='w-4 h-4 text-muted-foreground' />
          </div>
          <span className='text-[10px] font-medium text-muted-foreground'>
            {translations.navbar.login}
          </span>
        </button>

        <button
          onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)}
          className='flex flex-col items-center gap-0.5 px-2 py-1 min-w-[44px]'
        >
          <div className='w-8 h-8 flex items-center justify-center rounded-xl bg-primary transition-all duration-200'>
            <UserPlus className='w-4 h-4 text-foreground' />
          </div>
          <span className='text-[10px] font-medium text-foreground'>
            {translations.navbar.register}
          </span>
        </button>
      </>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
        className='rounded-xl px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all'
      >
        {translations.navbar.login}
      </button>
      <button
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)}
        className='rounded-xl px-4 py-1.5 text-sm font-medium text-foreground bg-primary hover:bg-primary/80 active:scale-[0.97] transition-all'
      >
        {translations.navbar.register}
      </button>
    </div>
  )
}

export default AuthButtons
