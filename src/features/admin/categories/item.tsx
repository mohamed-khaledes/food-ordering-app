import { Category } from '@prisma/client'
import { getTrans } from '@/lib/translations/server'
import EditCategory from './edit'
import DeleteCategory from './delete'

async function CategoryItem({ category }: { category: Category }) {
  const translations = await getTrans()
  return (
    <li className='flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all duration-200 group'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
          <span className='text-xs font-bold text-foreground'>
            {category.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className='text-sm font-medium capitalize'>{category.name}</h3>
      </div>
      <div className='flex items-center gap-2'>
        <EditCategory translations={translations} category={category} />
        <DeleteCategory id={category.id} />
      </div>
    </li>
  )
}

export default CategoryItem
