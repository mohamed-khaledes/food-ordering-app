import { Pages, Routes } from '@/constants/enums'
import { getProducts } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'
import MenuItems from '@/features/admin/menu'
import Link from '@/components/link'
import { Plus } from 'lucide-react'
import DashboardHeader from '@/features/admin/page-header'

async function MenuItemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const translations = await getTrans()
  const products = await getProducts()

  return (
    <div>
      <DashboardHeader
title={translations.admin.tabs.menuItems}
description={`${products.length} ${translations.adminUi.itemsTotal}`}
        action={
          <Link
            href={`/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
            className='btn-brand px-5 py-2.5'
          >
            <Plus className='h-4 w-4' />
            {translations.admin['menu'].createNewMenuItem}
          </Link>
        }
      />

      <MenuItems products={products} />
    </div>
  )
}

export default MenuItemsPage
