import React from 'react'
import Card from '@/features/shared/card'
import { getProductsByCategory } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'

const Featured = async () => {
  const categories = await getProductsByCategory()
  const { global } = await getTrans()

  return (
    <section className='py-24 bg-white dark:bg-background'>
      <div className='container'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14'>
          <div>
            <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-4'>
              <span className='w-1.5 h-1.5 rounded-full bg-primary' />
              <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
                Popular meals
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold capitalize'>{global['popular meals']}</h2>
          </div>
          <p className='text-muted-foreground text-lg max-w-sm md:text-right leading-relaxed'>
            Chef-crafted, fresh daily — updated every week so there's always something new.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories?.map(item => item?.Product?.map((el, i) => <Card item={el} key={i} />))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-14 text-center'>
          <p className='text-muted-foreground text-sm mb-4'>
            Showing our most popular picks — there's plenty more where that came from.
          </p>
          <a
            href='/menu'
            className='inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-2xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200'
          >
            View full menu →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Featured
