import Link from '@/components/link'
import { buttonVariants } from '@/components/ui/button'
import { Pages, Routes } from '@/constants/enums'
import SignupForm from '@/features/auth/signup/form'
import { getTrans } from '@/lib/translations/server'

async function SignupPage() {
  const translations = await getTrans()
  return (
    <div className='py-44 md:py-40 bg-gray-50 element-center'>
      <div className='container element-center'>
        <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-center text-black mb-4'>
            {translations.auth.register.title}
          </h2>
          <SignupForm />
          <p className='mt-2 flex items-center justify-center text-accent text-sm'>
            <span>{translations.auth.register.authPrompt.message}</span>
            <Link
              href={`/${Routes.AUTH}/${Pages.LOGIN}`}
              className={`${buttonVariants({
                variant: 'link',
                size: 'sm'
              })} !text-black`}
            >
              {translations.auth.register.authPrompt.loginLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
