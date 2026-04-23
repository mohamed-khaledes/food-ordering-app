'use client'

import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { Translations } from '@/types/translations'
import { useParams, usePathname } from 'next/navigation'
import logo from '../../../public/logo.png'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  Users,
  ShoppingBag,
  ChevronRight,
  X,
  Menu
} from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, href: Routes.ADMIN },
  { id: 'menu', icon: UtensilsCrossed, href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}` },
  { id: 'categories', icon: Tag, href: `${Routes.ADMIN}/${Pages.CATEGORIES}` },
  { id: 'users', icon: Users, href: `${Routes.ADMIN}/${Pages.USERS}` },
  { id: 'orders', icon: ShoppingBag, href: `${Routes.ADMIN}/${Pages.ORDERS}` }
]

function AdminSidebar({ translations }: { translations: Translations }) {
  const pathname = usePathname()
  const { locale } = useParams()
  const [open, setOpen] = useState(false)

  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    title: translations.admin.tabs[item.id as keyof typeof translations.admin.tabs] ?? item.id
  }))

  const isActive = (href: string) => {
    const parts = href.split('/')
    return parts.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className='lg:hidden fixed top-16 left-0 right-0 z-30 bg-background border-b border-border px-4 py-2 flex items-center gap-3'>
        <button
          onClick={() => setOpen(true)}
          className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors'
        >
          <Menu className='w-4 h-4' />
        </button>
        <span className='text-sm font-medium text-muted-foreground'>Admin Panel</span>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          className='fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 flex flex-col transition-all duration-300
          lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-border mt-16 lg:mt-0'>
          <Link href={'/'}>
            <img src={logo.src} alt='akla' loading='lazy' className='w-[70px] lg:w-[90px]' />
            <p className='text-[10px] text-muted-foreground uppercase tracking-widest'>
              Admin Panel
            </p>
          </Link>

          <button
            className='lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors'
            onClick={() => setOpen(false)}
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-4 overflow-y-auto'>
          <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-3 mb-3'>
            Navigation
          </p>
          <ul className='flex flex-col gap-1'>
            {navItems.map(item => {
              const active = isActive(item.href)
              return (
                <li key={item.id}>
                  <Link
                    href={`/${item.href}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${
                        active
                          ? 'bg-primary/15 text-foreground'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`}
                  >
                    <item.icon
                      className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary' : ''}`}
                    />
                    <span className='flex-1'>{item.title}</span>
                    {active && <ChevronRight className='w-3 h-3 text-primary' />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className='px-4 py-4 border-t border-border'>
          <div className='flex items-center gap-1.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <span className='text-xs text-muted-foreground'>System operational</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
