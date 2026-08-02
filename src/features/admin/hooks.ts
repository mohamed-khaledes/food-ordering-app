'use client'

import { Pages, Routes } from '@/constants/enums'
import { Translations } from '@/types/translations'
import {
  LayoutDashboard,
  Newspaper,
  ShoppingBag,
  Tag,
  Truck,
  UtensilsCrossed,
  Users
} from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, href: Routes.ADMIN },
  { id: 'menu-items', icon: UtensilsCrossed, href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}` },
  { id: 'categories', icon: Tag, href: `${Routes.ADMIN}/${Pages.CATEGORIES}` },
  { id: 'blogs', icon: Newspaper, href: `${Routes.ADMIN}/blogs` },
  { id: 'users', icon: Users, href: `${Routes.ADMIN}/${Pages.USERS}` },
  { id: 'orders', icon: ShoppingBag, href: `${Routes.ADMIN}/${Pages.ORDERS}` },
  { id: 'delivery', icon: Truck, href: `${Routes.ADMIN}/delivery` }
]

/**
 * `/admin` is matched exactly so it doesn't light up on every child route,
 * while nested entries match by prefix so `/admin/orders/abc` keeps Orders lit.
 */
const isActive = (pathname: string, locale: string, href: string) => {
  const isNested = href.split('/').length > 1
  return isNested ? pathname.startsWith(`/${locale}/${href}`) : pathname === `/${locale}/${href}`
}

/**
 * Admin sidebar: translated nav items, which one is current, and the drawer
 * state the mobile layout slides in and out.
 */
export function useAdminSidebar(translations: Translations) {
  const pathname = usePathname()
  const { locale } = useParams()
  const [open, setOpen] = useState(false)

  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    title: translations.admin.tabs[item.id as keyof typeof translations.admin.tabs] ?? item.id,
    active: isActive(pathname, `${locale}`, item.href)
  }))

  return { navItems, open, setOpen, close: () => setOpen(false) }
}
