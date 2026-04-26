'use client'
import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { Translations } from '@/types/translations'
import { useParams, usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import logo from '../../../public/logo.png'
const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, href: 'dashboard', label: 'Overview' },
  { id: 'orders', icon: ShoppingBag, href: 'dashboard/orders', label: 'Orders' },
  { id: 'profile', icon: User, href: 'dashboard/profile', label: 'Profile' }
]

export default function DeliverySidebar({ translations }: { translations: Translations }) {
  const pathname = usePathname()
  const { locale } = useParams()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === `/${locale}/${href}` || pathname.startsWith(`/${locale}/${href}/`)

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
        <span className='text-sm font-medium text-muted-foreground'>Delivery Panel</span>
      </div>

      {open && (
        <div
          className='fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 flex flex-col transition-all duration-300
        lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-border mt-16 lg:mt-0'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-primary flex items-center justify-center'>
              <span className='text-foreground font-bold text-sm'>🚴</span>
            </div>
            <div>
              <Link href={'/'}>
                <img src={logo.src} alt='akla' loading='lazy' className='w-[70px] lg:w-[90px]' />
                <p className='text-[10px] text-muted-foreground uppercase tracking-widest'>
                  Delivery Panel
                </p>
              </Link>
            </div>
          </div>
          <button
            className='lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted'
            onClick={() => setOpen(false)}
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-4'>
          <ul className='flex flex-col gap-1'>
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href)
              return (
                <li key={item.id}>
                  <Link
                    href={`/${item.href}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        active
                          ? 'bg-primary/15 text-foreground'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                      }`}
                  >
                    <item.icon
                      className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary' : ''}`}
                    />
                    <span className='flex-1'>{item.label}</span>
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
            <span className='text-xs text-muted-foreground'>On duty</span>
          </div>
        </div>
      </aside>
    </>
  )
}
