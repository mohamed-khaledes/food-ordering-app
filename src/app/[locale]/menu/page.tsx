import React from 'react'
import Menu from '@/features/menu'
import { getProductsByCategory } from '@/server/db/products'

const MenuPage = async () => {
  let categories: any[] = []

  try {
    categories = await getProductsByCategory()
  } catch (err) {
    console.error('Failed to fetch categories', err)
  }
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
