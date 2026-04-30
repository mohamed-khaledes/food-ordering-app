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
// ── Mobile bottom bar (separate import-free component) ────
import MobileBottomBar from './mobile-bottom-bar'
const Header = async () => {
  const t = await getTrans()
  const initialSession = await getServerSession(authOptions)

  return (
    <>
      {/* ── Desktop header — top floating pill ────────────── */}
      <header className='hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl'>
        <div className='w-full px-6 py-2.5 bg-background/80 backdrop-blur-xl border border-border/60 shadow-sm rounded-2xl'>
          <div className='flex items-center justify-between gap-4 flex-nowrap'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2 text-nowrap group shrink-0'>
              <img src={logo.src} alt='akla' loading='lazy' className='w-[80px]' />
            </Link>

            {/* Right side */}
            <div className='flex items-center gap-2 flex-nowrap'>
              <Navbar initialSession={initialSession} />
              <div className='w-px h-5 bg-border mx-1' />
              <CartButton />
              <LanguageSwitcher />
              <AuthButtons initialSession={initialSession} translations={t} />
              <ProfileDropdown initialSession={initialSession} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile bottom bar ──────────────────────────────── */}
      <MobileBottomBar t={t} initialSession={initialSession} />
    </>
  )
}

export default Header
