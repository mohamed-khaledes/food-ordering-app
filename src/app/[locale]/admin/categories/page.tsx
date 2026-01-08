import { getCategories } from '@/server/db/categories'
import CategoryForm from '@/features/admin/categories/form'
import { getTrans } from '@/lib/translations/server'
import CategoryItem from '@/features/admin/categories/item'

async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const categories = await getCategories()
  const translations = await getTrans()

  return (
    <main>
      <section className='section-gap'>
        <div className='container'>
          <div className='sm:max-w-[625px] mx-auto space-y-6'>
            <CategoryForm translations={translations} />
            {categories.length > 0 ? (
              <ul className='flex flex-col gap-4'>
                {categories?.map(category => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </ul>
            ) : (
              <p className='text-accent text-center py-10'>{translations.noCategoriesFound}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default CategoriesPage
