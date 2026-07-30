import Link from '@/components/link'
import React, { Suspense } from 'react'
import Navbar from './navbar'
import SearchDialog from './search-dialog'
import CartButton from './cart-button'
import { getTrans } from '@/lib/translations/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'
import AuthButtons from './auth-buttons'
import ProfileDropdown from './profile-dropdown'
import TopBar from './top-bar'
import { Routes } from '@/constants/enums'
import Logo from '@/components/ui/logo'
// ── Mobile bottom bar (separate import-free component) ────
import MobileBottomBar from './mobile-bottom-bar'
import { Container } from '@/components/ui/container'

const Header = async () => {
  const t = await getTrans()
  const initialSession = await getServerSession(authOptions)

  return (
    <>
      <TopBar />

      {/* ── Main navigation ───────────────────────────────── */}
      <header className='sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-sm'>
        <Container className=' flex h-[72px] items-center justify-between gap-6'>
          {/* Logo */}
          <Link href='/' aria-label='Akla' className='shrink-0'>
            <Logo />
          </Link>

          {/* Centre nav — desktop only */}
          <Navbar initialSession={initialSession} />

          {/* Actions */}
          <div className='flex flex-nowrap items-center gap-2 md:gap-3'>
            <Suspense fallback={null}>
              <SearchDialog />
            </Suspense>
            <CartButton />
            <div className='hidden md:flex md:items-center md:gap-3'>
              <AuthButtons initialSession={initialSession} translations={t} />
              <ProfileDropdown initialSession={initialSession} />
            </div>
            <Link
              href={`/${Routes.MENU}`}
              className='btn-brand hidden px-5 py-2.5 text-[13px] font-medium uppercase tracking-wide lg:inline-flex'
            >
              {t.home.hero.orderNow}
            </Link>
          </div>
        </Container>
      </header>

      {/* ── Mobile bottom bar ──────────────────────────────── */}
      <MobileBottomBar initialSession={initialSession} />
    </>
  )
}

export default Header
