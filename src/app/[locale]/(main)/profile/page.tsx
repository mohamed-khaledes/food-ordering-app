import { Pages, Routes } from '@/constants/enums'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import EditUserForm from '@/features/profile/form'
import { Locale } from '@/i18n.config'
import { getTrans } from '@/lib/translations/server'
import { authOptions } from '@/server/auth'
import { UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import type { Metadata } from 'next'
import { privateMetadata } from '@/constants/seo'

// Not for the index — see `privateMetadata`.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return privateMetadata({ locale, path: '/profile', title: 'Your Profile' })
}

async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions)
  const { locale } = await params
  const translations = await getTrans()

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
  }
  if (session && session?.user?.role === UserRole?.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}`)
  }
  return (
    <>
      <Banner
        title={translations.profile.title}
        crumbs={[
          { label: translations.global.home, href: '/' },
          { label: translations.global.profile }
        ]}
      />
      <section className='container section-y'>
        <div className='mx-auto w-full max-w-2xl border border-border bg-background p-8 md:p-10'>
          <EditUserForm user={session?.user} translations={translations} />
        </div>
      </section>
      <PartnersStrip />
    </>
  )
}

export default ProfilePage
