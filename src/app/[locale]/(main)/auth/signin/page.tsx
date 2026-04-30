import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import SigninForm from '@/features/auth/signin/form'
import { getTrans } from '@/lib/translations/server'
import logo from '../../../../../../public/logo.png'
import Banner from '@/components/layouts/banner'

async function SigninPage() {
  const translations = await getTrans()
  return (
    <div>
      <Banner title='Welcome back' description='Sign in to your account to continue ordering.' />
      <div className='bg-background flex items-center justify-center px-4'>
        {/* Background blobs */}
        <div className='fixed -top-20 left-1/3 w-[360px] h-[360px] rounded-full bg-primary/8 blur-3xl pointer-events-none' />
        <div className='fixed bottom-0 -right-20 w-[260px] h-[260px] rounded-full bg-primary/5 blur-3xl pointer-events-none' />

        <div className='w-full max-w-md relative z-10'>
          {/* Logo */}
          <div className='flex flex-col items-center mb-8'>
            <img src={logo.src} alt='akla' loading='lazy' className='w-[70px] lg:w-[90px]' />
            <h1 className='text-2xl font-bold text-foreground'>{translations.auth.login.title}</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Welcome back — good to see you again
            </p>
          </div>

          {/* Card */}
          <div className='bg-background border border-border rounded-2xl p-8 shadow-sm'>
            <SigninForm />

            <div className='mt-6 pt-6 border-t border-border flex items-center justify-center gap-1.5 text-sm'>
              <span className='text-muted-foreground'>
                {translations.auth.login.authPrompt.message}
              </span>
              <Link
                href={`/${Routes.AUTH}/${Pages.Register}`}
                className='text-foreground font-medium hover:text-primary transition-colors underline underline-offset-2'
              >
                {translations.auth.login.authPrompt.signUpLinkText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
