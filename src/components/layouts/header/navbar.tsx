'use client'

import { Routes } from '@/constants/enums'
import { useState } from 'react'
import { Menu, XIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import Link from '@/components/link'
import { useTrans } from '@/lib/translations/client'
import AuthButtons from './auth-buttons'
import logo from '../../../../public/logo.png'

function Navbar({ initialSession }: { initialSession: Session | null }) {
  const translations = useTrans()
  const [openMenu, setOpenMenu] = useState(false)
  const { locale } = useParams()
  const pathname = usePathname()

  const links = [
    { id: 'menu', title: translations.navbar.menu, href: Routes.MENU },
    { id: 'orders', title: translations.navbar.orders, href: Routes.ORDERS },
    { id: 'about', title: translations.navbar.about, href: Routes.ABOUT },
    { id: 'contact', title: translations.navbar.contact, href: Routes.CONTACT }
  ]
  return (
    <nav className='order-last md:order-none'>
      {/* Mobile trigger — hidden at md and above */}
      <button
        className='md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-colors'
        onClick={() => setOpenMenu(true)}
      >
        <Menu className='w-4 h-4 text-foreground' />
      </button>

      {/* Desktop links — visible at md and above */}
      <ul className='hidden md:flex items-center gap-1'>
        {links.map(link => {
          const isActive = pathname.startsWith(`/${locale}/${link.href}`)
          return (
            <li key={link.id}>
              <Link
                href={`/${link.href}`}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'text-foreground bg-primary/15'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                {link.title}
                {isActive && (
                  <span className='absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary' />
                )}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Backdrop — mobile only */}
      {openMenu && (
        <div
          className='fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Drawer — mobile only */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 h-[400px] w-72 bg-background border border-border rounded-2xl z-50 transition-all duration-300 ease-out md:hidden
  ${openMenu ? 'top-4 opacity-100 pointer-events-auto' : 'top-[-100%] opacity-0 pointer-events-none'}`}
      >
        {/* Drawer header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-border'>
          <div className='flex items-center gap-2'>
            <Link href='/' className='flex items-center gap-2 text-nowrap group'>
              <img src={logo.src} alt='akla' loading='lazy' className='w-[70px] lg:w-[90px]' />
            </Link>
          </div>
          <button
            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors'
            onClick={() => setOpenMenu(false)}
          >
            <XIcon className='w-4 h-4' />
          </button>
        </div>

        {/* Drawer links */}
        <ul className='flex flex-col gap-1 px-3 py-4'>
          {links.map(link => {
            const isActive = pathname.startsWith(`/${locale}/${link.href}`)
            return (
              <li key={link.id}>
                <Link
                  href={`/${link.href}`}
                  onClick={() => setOpenMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary/15 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                >
                  {isActive && (
                    <span className='w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0' />
                  )}
                  {link.title}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Drawer footer: auth */}
        <div className='absolute bottom-0 left-0 right-0 px-4 py-6 border-t border-border'>
          <div onClick={() => setOpenMenu(false)}>
            <AuthButtons translations={translations} initialSession={initialSession} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
