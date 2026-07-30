import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import SigninForm from '@/features/auth/signin/form'
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
  return privateMetadata({ locale, path: '/auth/signin', title: 'Sign In' })
}

async function SigninPage() {
  const translations = await getTrans()
  const { global, auth } = translations

  return (
    <>
      <Banner
        title={auth.login.title}
        crumbs={[{ label: global.home, href: '/' }, { label: global.login }]}
      />

      <div className='container section-y'>
        <div className='mx-auto w-full max-w-md border border-border bg-background p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] md:p-10'>
          <div className='mb-8 text-center'>
            <h2 className='text-2xl font-bold text-foreground'>{auth.login.title}</h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              Please login using account detail below.
            </p>
          </div>

          <SigninForm />

          <div className='mt-6 flex items-center justify-center gap-1.5 text-sm'>
            <span className='text-muted-foreground'>{auth.login.authPrompt.message}</span>
            <Link
              href={`/${Routes.AUTH}/${Pages.Register}`}
              className='font-medium text-brand underline-offset-4 hover:underline'
            >
              {auth.login.authPrompt.signUpLinkText}
            </Link>
          </div>
        </div>
      </div>

      <PartnersStrip />
    </>
  )
}

export default SigninPage
