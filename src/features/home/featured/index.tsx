import React from 'react'
import Card from '@/features/shared/card'
import { getProductsByCategory } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'

const Featured = async () => {
  const categories = await getProductsByCategory()
  const { global } = await getTrans()
  return (
    <section className='py-24'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-4xl font-bold mb-12'>{global['popular meals']}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          {categories?.map((item, i) =>
            item?.Product?.map((el, i) => {
              return <Card item={el} key={i} />
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default Featured
