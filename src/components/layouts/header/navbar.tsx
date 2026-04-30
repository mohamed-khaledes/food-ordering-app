'use client'

import { Routes } from '@/constants/enums'
import { useParams, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import Link from '@/components/link'
import { useTrans } from '@/lib/translations/client'

const NAV_ITEMS = [
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
    <nav>
      <ul className='flex items-center gap-1'>
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
    </nav>
  )
}

export default Navbar
