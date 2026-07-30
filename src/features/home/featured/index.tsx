import React from 'react'
import Card from '@/features/shared/card'
import Link from '@/components/link'
import SectionHeading from '@/components/ui/section-heading'
import { getProductsByCategory } from '@/server/db/products'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { localizeCategories } from '@/lib/localize'
import { Routes } from '@/constants/enums'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'

const Featured = async () => {
  const [raw, locale, { global, sections }] = await Promise.all([
    getProductsByCategory(),
    getCurrentLocale(),
    getTrans()
  ])
  const categories = localizeCategories(raw, locale)

  // The design shows a single 4-up grid of eight tiles.
  const products = (categories ?? [])
    .flatMap(category =>
      (category?.Product ?? []).map(product => ({ ...product, category: category.name }))
    )
    .slice(0, 8)

  if (products.length === 0) return null

  return (
    <section className='section-y bg-background'>
      <Container>
        <SectionHeading
          title={global['popular meals']}
          subtitle={sections.featured.subtitle}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
          {products.map((product, i) => (
            <Card key={product.id} item={product} index={i} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Link href={`/${Routes.MENU}`} className='btn-brand-outline group px-8'>
            {global.menu}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Featured
