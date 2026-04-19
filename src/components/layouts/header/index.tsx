import Link from '@/components/link'
import React from 'react'
import Navbar from './navbar'
import CartButton from './cart-button'
import { getTrans } from '@/lib/translations/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import LanguageSwitcher from './language-switcher'
import AuthButtons from './auth-buttons'
import ProfileDropdown from './profile-dropdown'
import logo from '../../../../public/logo.png'
const Header = async () => {
  const t = await getTrans()
  const initialSession = await getServerSession(authOptions)

  return (
    <header className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl'>
      <div className='px-4 md:px-6 py-2.5 bg-background/80 backdrop-blur-xl border border-border/60 shadow-sm rounded-2xl'>
        <div className='flex items-center justify-between gap-4 flex-nowrap'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 text-nowrap group shrink-0'>
            <img src={logo.src} alt='akla' loading='lazy' className='w-[60px] md:w-[80px]' />
          </Link>

          {/* Right side */}
          <div className='flex items-center gap-1 md:gap-2 flex-nowrap'>
            <Navbar initialSession={initialSession} />

            <div className='w-px h-5 bg-border mx-1 hidden md:block' />

            <CartButton />
            <LanguageSwitcher />

            <div className='hidden md:block'>
              <AuthButtons initialSession={initialSession} translations={t} />
            </div>

            <ProfileDropdown initialSession={initialSession} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
