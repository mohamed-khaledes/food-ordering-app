import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import SignupForm from '@/features/auth/signup/form'
import { getTrans } from '@/lib/translations/server'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'

import type { Metadata } from 'next'
import { privateMetadata } from '@/constants/seo'

// Not for the index — see `privateMetadata`.
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return privateMetadata({ locale, path: '/auth/signup', title: 'Create Account' })
}

async function SignupPage() {
  const translations = await getTrans()
  const { global, auth } = translations

  return (
    <>
      <Banner
        title={auth.register.title}
        crumbs={[{ label: global.home, href: '/' }, { label: global.register }]}
      />

      <div className='container section-y'>
        <div className='mx-auto w-full max-w-md border border-border bg-background p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] md:p-10'>
          <div className='mb-8 text-center'>
            <h2 className='text-2xl font-bold text-foreground'>{auth.register.title}</h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              Create your account and start ordering.
            </p>
          </div>

          <SignupForm />

          <div className='mt-6 flex items-center justify-center gap-1.5 text-sm'>
            <span className='text-muted-foreground'>{auth.register.authPrompt.message}</span>
            <Link
              href={`/${Routes.AUTH}/${Pages.LOGIN}`}
              className='font-medium text-brand underline-offset-4 hover:underline'
            >
              {auth.register.authPrompt.loginLinkText}
            </Link>
          </div>
        </div>
      </div>

      <PartnersStrip />
    </>
  )
}

export default SignupPage
