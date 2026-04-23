import { Pages, Routes } from '@/constants/enums'
import { getProducts } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'
import MenuItems from '@/features/admin/menu'
import Link from '@/components/link'
import { Plus } from 'lucide-react'

async function MenuItemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const translations = await getTrans()
  const products = await getProducts()

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              Manage
            </span>
          </div>
          <h1 className='text-3xl font-bold'>Menu Items</h1>
          <p className='text-muted-foreground mt-1'>{products.length} items total</p>
        </div>
        <Link
          href={`/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
          className='flex items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all'
        >
          <Plus className='w-4 h-4' />
          {translations.admin['menu'].createNewMenuItem}
        </Link>
      </div>

      <MenuItems products={products} />
    </div>
  )
}

export default MenuItemsPage
