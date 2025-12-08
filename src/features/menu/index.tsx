import { ProductWithRelations } from '../home/featured/type'
import Card from '../shared/card'

async function Menu({ items }: { items: ProductWithRelations[] }) {
  return items.length > 0 ? (
    <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className='text-accent text-center'>No product found</p>
  )
}

export default Menu
