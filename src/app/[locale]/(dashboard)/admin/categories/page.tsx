import { getCategories } from '@/server/db/categories'
import CategoryForm from '@/features/admin/categories/form'
import { getTrans } from '@/lib/translations/server'
import CategoryItem from '@/features/admin/categories/item'
import { Tag } from 'lucide-react'
import DashboardHeader from '@/features/admin/page-header'

async function CategoriesPage() {
  const categories = await getCategories()
  const translations = await getTrans()

  return (
    <div>
      <DashboardHeader
title={translations.admin.tabs.categories}
description={`${categories.length} ${translations.adminUi.categoriesTotal}`}
      />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Form */}
        <div className='rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)] p-6'>
          <h2 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
            {translations.adminUi.addNewCategory}
          </h2>
          <CategoryForm translations={translations} />
        </div>

        {/* List */}
        <div className='rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)] p-6 lg:col-span-2'>
          <h2 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
            {translations.adminUi.allCategories}
          </h2>
          {categories.length > 0 ? (
            <ul className='flex flex-col gap-2'>
              {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 py-12'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
                <Tag className='h-5 w-5 text-brand' />
              </div>
              <p className='text-sm text-muted-foreground'>{translations.noCategoriesFound}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
