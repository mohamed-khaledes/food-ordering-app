import Link from '@/components/link'
import React from 'react'
import Navbar from './navbar'
import CartButton from './cart-button'
import { getTrans } from '@/lib/translations/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

const Header = async () => {
  const t = await getTrans()
  const initialSession = await getServerSession(authOptions)
  return (
    <header className='py-4 md:py-6'>
      <div className='container flex items-center justify-between gap-6 lg:gap-10'>
        <Link href={`/`} className='text-primary font-semibold text-2xl'>
          🍕 {t.logo}
        </Link>
        <div className='flex items-center gap-6 flex-1 justify-end'>
          <Navbar initialSession={initialSession} />
          <CartButton />
          <div className='hidden lg:flex lg:items-center lg:gap-6 '>
            <Link href={'/auth/signin'}>{t.navbar.login}</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
