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
  return (
    <div>
      {!session.data?.user && (
        <div className='flex items-center gap-2'>
          <Button
            className='!px-4 !rounded-full'
            variant={
              pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                ? 'outline'
                : 'default'
            }
            size='lg'
            onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
          >
            {translations.navbar.login}
          </Button>
          <Button
            className='!px-4 !rounded-full'
            size='lg'
            onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)}
          >
            {translations.navbar.register}
          </Button>
        </div>
      )}
    </div>
  )
}

export default AuthButtons
