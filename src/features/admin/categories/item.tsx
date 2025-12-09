import { Category } from '@prisma/client'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import EditCategory from './edit'
import DeleteCategory from './delete'

async function CategoryItem({ category }: { category: Category }) {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  return (
    <li className='bg-primary/50 p-4 rounded-md flex justify-between'>
      <h3 className='text-black font-medium text-lg flex-1 capitalize'>{category.name}</h3>
      <div className='flex items-center gap-2'>
        <EditCategory translations={translations} category={category} />
        <DeleteCategory id={category.id} />
      </div>
    </li>
  )
}

export default CategoryItem
