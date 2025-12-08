import Link from '@/components/link'
import React from 'react'
import Navbar from './navbar'
import CartButton from './cart-button'
import { getTrans } from '@/lib/translations/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from './language-switcher'

const Header = async () => {
  const t = await getTrans()
  const initialSession = await getServerSession(authOptions)
  return (
    <header className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto'>
      <div className='px-3 md:px-6 py-3 bg-white/80 backdrop-blur-xl border shadow-lg rounded-2xl'>
        <div className='flex items-center gap-6 md:gap-10 flex-nowrap'>
          <Link
            href={`/`}
            className='text-primary uppercase font-semibold text-lg md:text-2xl text-nowrap'
          >
            🍕 {t.logo}
          </Link>

          <div className='flex items-center gap-6  flex-nowrap'>
            <Navbar initialSession={initialSession} />
            <CartButton />
            <div className='flex flex-nowrap gap-2'>
              <LanguageSwitcher />
              <Button>
                <Link href='/auth/signin'>{t.navbar.login}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
