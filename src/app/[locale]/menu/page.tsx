import React from 'react'
import Menu from '@/features/menu'
import { getProductsByCategory } from '@/server/db/products'

const MenuPage = async () => {
  const categories = await getProductsByCategory()
  return (
    <main>
      <section className='section-gap'>
        <div className='container text-center'>
          <Menu categories={categories} />
        </div>
      </section>
    </main>
  )
}

export default MenuPage
