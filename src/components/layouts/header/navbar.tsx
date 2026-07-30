'use client'

import { Routes } from '@/constants/enums'
import { useParams, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import Link from '@/components/link'
import { useTrans } from '@/lib/translations/client'

const NAV_ITEMS = [
  { id: 'home', href: '' },
  { id: 'menu', href: Routes.MENU },
  { id: 'orders', href: Routes.ORDERS },
  { id: 'about', href: Routes.ABOUT },
  { id: 'contact', href: Routes.CONTACT }
]

function Navbar({ initialSession }: { initialSession: Session | null }) {
  const translations = useTrans()
  const { locale } = useParams()
  const pathname = usePathname()

  const links = NAV_ITEMS.map(item => ({
    ...item,
    title: translations.navbar[item.id as keyof typeof translations.navbar] ?? item.id
  }))

  return (
    <nav className='hidden md:block'>
      <ul className='flex items-center gap-7 lg:gap-9'>
        {links.map(link => {
          const isActive =
            link.href === ''
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(`/${locale}/${link.href}`)
          return (
            <li key={link.id}>
              <Link
                href={`/${link.href}`}
                className={`text-[15px] transition-colors duration-200 hover:text-brand ${
                  isActive ? 'font-medium text-brand' : 'text-foreground/80'
                }`}
              >
                {link.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
