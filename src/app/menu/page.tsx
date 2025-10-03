import Menu from '@/features/menu'
import { getProductsByCategory } from '@/server/db/products'
import React from 'react'

const MenuPage = async () => {
  const categories = await getProductsByCategory()
  return (
    <main>
      <section className='section-gap'>
        <div className='container text-center'>
          {categories?.map(item => {
            return (
              <div className='my-5' key={item?.id}>
                <h1 className='text-primary my-2 font-bold text-2xl text-start uppercase'>
                  {item?.name}
                </h1>
                <Menu items={item?.Product} />
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default MenuPage
