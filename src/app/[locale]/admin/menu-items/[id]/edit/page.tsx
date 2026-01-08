import { Pages, Routes } from '@/constants/enums'
import { Locale } from '@/i18n.config'
import { getProduct, getProducts } from '@/server/db/products'
import { redirect } from 'next/navigation'
import { getCategories } from '@/server/db/categories'
import { getTrans } from '@/lib/translations/server'
import MenuForm from '@/features/admin/menu-items/form'

export async function generateStaticParams() {
  const products = await getProducts()

  return products.map(product => ({ id: product.id }))
}
async function EditProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id, locale } = await params
  const translations = await getTrans()
  const product = await getProduct(id)
  const categories = await getCategories()

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
  }

  return (
    <main>
      <section>
        <div className='container'>
          <MenuForm categories={categories} translations={translations} product={product} />
        </div>
      </section>
    </main>
  )
}

export default EditProductPage
