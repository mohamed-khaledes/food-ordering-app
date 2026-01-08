'use client'
import { Category, Product } from '@prisma/client'
import Card from '../shared/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

function Menu({ categories }: { categories: any[] }) {
  const [category, setCategory] = useState('')
  const products =
    categories?.find(it => it?.name == category)?.Product ||
    categories?.map(item => item?.Product)?.flatMap(e => e)

  if (categories?.length < 1) return <p className='text-accent text-center'>No product found</p>
  return (
    <div>
      <div className='my-5 flex flex-wrap gap-3'>
        <Button
          variant={category == 'all' ? 'outline' : 'default'}
          size={'lg'}
          className='rounded-full capitalize cursor-pointer'
          onClick={() => setCategory('all')}
        >
          All
        </Button>
        {categories?.map(item => {
          return (
            <Button
              variant={category == item?.name ? 'outline' : 'default'}
              size={'lg'}
              className='rounded-full capitalize cursor-pointer'
              key={item?.id}
              onClick={() => setCategory(item?.name)}
            >
              {item?.name}
            </Button>
          )
        })}
      </div>
      <ul className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
        {products?.map((item: Product) => {
          return <Card key={item.id} item={item} />
        })}
      </ul>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default Menu
