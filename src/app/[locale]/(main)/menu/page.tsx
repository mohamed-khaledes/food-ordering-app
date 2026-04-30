import React from 'react'
import Menu from '@/features/menu'
import { getProductsByCategory } from '@/server/db/products'
import Banner from '@/components/layouts/banner'

const MenuPage = async () => {
  const categories = await getProductsByCategory()
  const totalMeals = categories.flatMap((c: any) => c.Product ?? []).length

  return (
    <main>
      {/* ── Banner ───────────────────────────────────────── */}
      <Banner
        eyebrow='Updated weekly'
        title='Our Menu'
        description='Chef-crafted meals made with locally sourced ingredients — fresh, healthy, and ready to order.'
        stats={[
          { n: totalMeals, l: 'Meals' },
          { n: categories.length, l: 'Categories' },
          { n: '30 min', l: 'Delivery' }
        ]}
      />
      {/* ── Menu content ─────────────────────────────────── */}
      <section>
        <div className='container'>
          <Menu categories={categories} />
        </div>
      </section>
    </main>
  )
}

export default MenuPage
