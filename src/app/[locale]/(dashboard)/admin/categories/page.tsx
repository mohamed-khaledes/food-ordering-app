import { getCategories } from '@/server/db/categories'
import CategoryForm from '@/features/admin/categories/form'
import { getTrans } from '@/lib/translations/server'
import CategoryItem from '@/features/admin/categories/item'
import { Tag } from 'lucide-react'

async function CategoriesPage() {
  const categories = await getCategories()
  const translations = await getTrans()

  return (
    <div className='space-y-6'>
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Manage
          </span>
        </div>
        <h1 className='text-3xl font-bold'>Categories</h1>
        <p className='text-muted-foreground mt-1'>{categories.length} categories total</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Form */}
        <div className='bg-background rounded-2xl border border-border p-6'>
          <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4'>
            Add New Category
          </h2>
          <CategoryForm translations={translations} />
        </div>

        {/* List */}
        <div className='lg:col-span-2 bg-background rounded-2xl border border-border p-6'>
          <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4'>
            All Categories
          </h2>
          {categories.length > 0 ? (
            <ul className='flex flex-col gap-2'>
              {categories.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-muted flex items-center justify-center'>
                <Tag className='w-5 h-5 text-muted-foreground' />
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
