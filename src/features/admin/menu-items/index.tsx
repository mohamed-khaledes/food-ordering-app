import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import Card from '@/features/shared/card'
import { getTrans } from '@/lib/translations/server'
import { Product } from '@prisma/client'

async function MenuItems({ products }: { products: Product[] }) {
  const translations = await getTrans()
  return products && products.length > 0 ? (
    <div className='grid lg:grid-cols-3 gap-3 w-full mx-auto'>
      {products.map((product, i) => (
        <Link
          key={product?.id}
          href={`/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
          className='element-center flex-col py-4'
        >
          <Card item={product} key={i} isAdmin />
        </Link>
      ))}
    </div>
  ) : (
    <p className='text-accent text-center'>{translations.noProductsFound}</p>
  )
}

export default MenuItems
