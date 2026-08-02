'use client'

import Link from '@/components/link'
import { Translations } from '@/types/translations'
import Logo from '@/components/ui/logo'
import { ChevronRight, X, Menu, ExternalLink } from 'lucide-react'
import { useAdminSidebar } from './hooks'

function AdminSidebar({ translations }: { translations: Translations }) {
  const ui = translations.adminUi
  const { navItems, open, setOpen, close } = useAdminSidebar(translations)

  return (
    <>
      {/* Mobile top bar */}
      <div className='fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:hidden'>
        <button
          onClick={() => setOpen(true)}
aria-label={ui.openMenu}
          className='flex h-8 w-8 items-center justify-center border border-border transition-colors hover:border-brand hover:text-brand'
        >
          <Menu className='h-4 w-4' />
        </button>
        <span className='text-sm font-medium text-muted-foreground'>{ui.adminPanel}</span>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          className='fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden'
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-64 flex-col bg-ink text-white transition-transform duration-300
          lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:translate-x-0 rtl:lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-white/10 px-6 py-5'>
          <Link href='/'>
            <Logo markClassName='h-6' wordClassName='text-[22px] text-white' />
            <p className='mt-1 text-[10px] uppercase tracking-widest text-white/40'>{ui.adminPanel}</p>
          </Link>

          <button
            className='flex h-7 w-7 items-center justify-center text-white/60 transition-colors hover:text-white lg:hidden'
            onClick={close}
            aria-label={ui.closeMenu}
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 overflow-y-auto px-3 py-5'>
          <p className='mb-3 px-3 text-[10px] font-medium uppercase tracking-widest text-white/35'>
            {ui.navigation}
          </p>
          <ul className='flex flex-col gap-1'>
            {navItems.map(item => (
              <li key={item.id}>
                <Link
                  href={`/${item.href}`}
                  onClick={close}
                  className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-200
                      ${
                        item.active
                          ? 'bg-brand text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                >
                  <item.icon className='h-4 w-4 shrink-0' />
                  <span className='flex-1'>{item.title}</span>
                  {item.active && <ChevronRight className='h-3 w-3 rtl:rotate-180' />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className='border-t border-white/10 px-4 py-4'>
          <Link
            href='/'
            className='mb-3 flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-brand'
          >
            <ExternalLink className='h-3.5 w-3.5' />
            {ui.viewStorefront}
          </Link>
          <div className='flex items-center gap-1.5'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-brand' />
            <span className='text-xs text-white/40'>{ui.systemOperational}</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
