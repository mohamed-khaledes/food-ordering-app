'use client'

import { Translations } from '@/types/translations'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import { Session } from 'next-auth'
import { Button } from '@/components/ui/button'
import { useClientSession } from '@/hooks/useClientSession'

function AuthButtons({
  initialSession,
  translations
}: {
  initialSession: Session | null
  translations: Translations
}) {
  const session = useClientSession(initialSession)
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()

  if (session.data?.user) return null

  const isLoginPage = pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)

  return (
    <div className='flex items-center gap-2'>
      <Button
        size='sm'
        variant='ghost'
        className='rounded-xl px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60'
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
      >
        {translations.navbar.login}
      </Button>
      <Button
        size='sm'
        className='rounded-xl px-4 text-sm font-medium text-foreground bg-primary hover:bg-primary/80 active:scale-[0.97] transition-all'
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)}
      >
        {translations.navbar.register}
      </Button>
    </div>
  )
}

export default AuthButtons
