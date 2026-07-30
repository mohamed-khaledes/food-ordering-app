import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { getTrans } from '@/lib/translations/server'
import { Product } from '@prisma/client'
import { formatCurrency } from '@/lib/helpers'
import { Edit, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'

async function MenuItems({ products }: { products: Product[] }) {
  const translations = await getTrans()

  if (!products || products.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
          <UtensilsCrossed className='w-5 h-5 text-muted-foreground' />
        </div>
        <p className='text-sm text-muted-foreground'>{translations.noProductsFound}</p>
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
      {/* Table header */}
      <div className='grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/30'>
        <div className='col-span-8 sm:col-span-6 md:col-span-5 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
          Product
        </div>
        <div className='col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:block'>
          Category
        </div>
        <div className='sm:col-span-3 md:col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden sm:block'>
          Price
        </div>
        <div className='col-span-4 sm:col-span-3 md:col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-right'>
          Action
        </div>
      </div>

      {/* Rows */}
      <ul className='divide-y divide-border'>
        {products.map(product => (
          <li
            key={product.id}
            className='grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors'
          >
            <div className='col-span-8 sm:col-span-6 md:col-span-5 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0'>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <UtensilsCrossed className='w-4 h-4 text-muted-foreground' />
                  </div>
                )}
              </div>
              <div>
                <p className='text-sm font-medium text-foreground capitalize'>{product.name}</p>
                <p className='text-xs text-muted-foreground truncate max-w-[140px]'>
                  {product.description?.slice(0, 40)}...
                </p>
              </div>
            </div>

            <div className='col-span-3 hidden md:block'>
              <span className='text-xs bg-brand-soft text-foreground px-2.5 py-1 rounded-full font-medium'>
                {(product as any).category?.name ?? '—'}
              </span>
            </div>

            <div className='sm:col-span-3 md:col-span-2 hidden sm:block'>
              <span className='text-sm font-semibold text-foreground'>
                {formatCurrency(product.basePrice)}
              </span>
            </div>

            <div className='col-span-4 sm:col-span-3 md:col-span-2 flex justify-end'>
              <Link
                href={`/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-brand hover:bg-muted/50 transition-all text-xs font-medium'
              >
                <Edit className='w-3 h-3' />
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuItems
