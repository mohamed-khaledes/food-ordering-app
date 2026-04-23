'use client'
import { Product } from '@prisma/client'
import Card from '../shared/card'
import { useState } from 'react'

function Menu({ categories }: { categories: any[] }) {
  const [category, setCategory] = useState('')

  const products =
    category && category !== 'all'
      ? (categories?.find(it => it?.name === category)?.Product ?? [])
      : categories?.flatMap(item => item?.Product ?? [])

  if (categories?.length < 1)
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-3'>
        <div className='w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-2xl'>
          🍽️
        </div>
        <p className='text-muted-foreground text-sm'>No products found</p>
      </div>
    )

  return (
    <div>
      {/* Filter bar */}
      <div className='sticky top-20 z-30 -mx-4 px-4 md:-mx-8 md:px-8 py-3 bg-background/80 backdrop-blur-lg border-b border-border mb-8'>
        <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
          {/* All button */}
          <button
            onClick={() => setCategory('all')}
            className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 
              ${
                !category || category === 'all'
                  ? 'bg-foreground text-background'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
          >
            All
            <span
              className={`ml-2 text-xs px-1.5 py-0.5 rounded-full
              ${
                !category || category === 'all'
                  ? 'bg-primary/20 text-background'
                  : 'bg-border text-muted-foreground'
              }`}
            >
              {categories?.flatMap(item => item?.Product ?? []).length}
            </span>
          </button>

          {/* Divider */}
          <div className='w-px h-5 bg-border flex-shrink-0' />

          {/* Category buttons */}
          {categories?.map(item => {
            const isActive = category === item?.name
            return (
              <button
                key={item?.id}
                onClick={() => setCategory(item?.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize
                  ${
                    isActive
                      ? 'bg-primary text-foreground'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                {item?.name}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full
                  ${
                    isActive
                      ? 'bg-foreground/10 text-foreground'
                      : 'bg-border text-muted-foreground'
                  }`}
                >
                  {item?.Product?.length ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='w-1.5 h-1.5 rounded-full bg-primary' />
          <p className='text-sm text-muted-foreground'>
            Showing <span className='text-foreground font-medium'>{products.length}</span>{' '}
            {products.length === 1 ? 'meal' : 'meals'}
            {category && category !== 'all' && (
              <span>
                {' '}
                in <span className='text-foreground font-medium capitalize'>{category}</span>
              </span>
            )}
          </p>
        </div>

        {/* Clear filter */}
        {category && category !== 'all' && (
          <button
            onClick={() => setCategory('')}
            className='text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors'
          >
            Clear filter
            <span className='w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px]'>
              ✕
            </span>
          </button>
        )}
      </div>
      <div className='min-h-[80vh]'>
        {/* Grid */}
        {products.length > 0 ? (
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products?.map((item: Product) => (
              <li key={item.id}>
                <Card key={item?.id} item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex flex-col items-center justify-center py-24 gap-3'>
            <div className='w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-2xl'>
              🔍
            </div>
            <p className='text-sm font-medium'>No meals in this category</p>
            <button
              onClick={() => setCategory('')}
              className='text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors'
            >
              Show all meals
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default Menu
