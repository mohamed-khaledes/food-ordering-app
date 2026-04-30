'use client'

import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { useTrans } from '@/lib/translations/client'
import { useParams, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { Home, UtensilsCrossed, ShoppingBag, Info, Phone } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home', href: '', icon: Home },
  { id: 'menu', href: Routes.MENU, icon: UtensilsCrossed },
  { id: 'orders', href: Routes.ORDERS, icon: ShoppingBag },
  { id: 'about', href: Routes.ABOUT, icon: Info },
  { id: 'contact', href: Routes.CONTACT, icon: Phone }
]

export default function MobileNav({ initialSession }: { initialSession: Session | null }) {
  const translations = useTrans()
  const { locale } = useParams()
  const pathname = usePathname()

  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    title:
      item.id === 'home'
        ? 'Home'
        : (translations.navbar[item.id as keyof typeof translations.navbar] ?? item.id)
  }))

  return (
    <>
      {navItems.map(item => {
        const isActive =
          item.href === ''
            ? pathname === `/${locale}` || pathname === `/${locale}/`
            : pathname.startsWith(`/${locale}/${item.href}`)

        return (
          <Link
            key={item.id}
            href={item.href ? `/${item.href}` : '/'}
            className='flex flex-col items-center gap-0.5 px-2 py-1 min-w-[44px]'
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200
                ${isActive ? 'bg-primary' : 'hover:bg-muted'}`}
            >
              <item.icon
                className={`w-4 h-4 transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
              />
            </div>
            <span
              className={`text-[10px] font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {item.title}
            </span>
          </Link>
        )
      })}
    </>
  )
}
