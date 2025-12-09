'use client'

import { Routes } from '@/constants/enums'
import { useState } from 'react'
import { Menu, XIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { Button } from '@/components/ui/button'
import Link from '@/components/link'
import { useTrans } from '@/lib/translations/client'
import AuthButtons from './auth-buttons'

function Navbar({ initialSession }: { initialSession: Session | null }) {
  const translations = useTrans()
  const [openMenu, setOpenMenu] = useState(false)
  const { locale } = useParams()
  const pathname = usePathname()

  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.navbar.menu,
      href: Routes.MENU
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.about,
      href: Routes.ABOUT
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.contact,
      href: Routes.CONTACT
    }
  ]

  return (
    <nav className='order-last lg:order-none p-2 md:p-3'>
      <Button variant='secondary' size='sm' className='lg:hidden' onClick={() => setOpenMenu(true)}>
        <Menu className='!w-6 !h-6' />
      </Button>
      <ul
        className={`fixed lg:static !h-auto ${
          openMenu ? 'left-0 z-50' : 'left-[-200%]'
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant='secondary'
          size='sm'
          className='absolute top-10 right-10 lg:hidden'
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className='!w-6 !h-6' />
        </Button>
        {links.map(link => (
          <li key={link.id}>
            <Link
              onClick={() => setOpenMenu(false)}
              href={`/${link.href}`}
              className={`hover:text-primary duration-200 transition-colors font-semibold uppercase ${
                pathname.startsWith(`/${locale}/${link.href}`) ? 'text-primary' : 'text-gray-900'
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
        <li className='lg:hidden flex flex-col gap-4'>
          <div onClick={() => setOpenMenu(false)}>
            <AuthButtons translations={translations} initialSession={initialSession} />
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
