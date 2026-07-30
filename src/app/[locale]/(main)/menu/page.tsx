import React, { Suspense } from 'react'
import Menu from '@/features/menu'
import { getProductsByCategory } from '@/server/db/products'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import { getTrans } from '@/lib/translations/server'
import { Container } from '@/components/ui/container'
import type { Metadata } from 'next'
import { Languages, Routes } from '@/constants/enums'
import { pageMetadata } from '@/constants/seo'
import { breadcrumbSchema, itemListSchema, JsonLd } from '@/components/seo/json-ld'
import { localizeCategories } from '@/lib/localize'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === Languages.ARABIC

  return pageMetadata({
    locale,
    path: `/${Routes.MENU}`,
    title: isArabic ? 'قائمة الطعام' : 'Our Menu',
    description: isArabic
      ? 'تصفّح قائمة أكلة كاملة — أطباق صحية طازجة يحضّرها الشيف يوميًا. صفّي بالفئة والسعر والحجم واطلب التوصيل في مصر.'
      : "Browse Akla's full menu of fresh, chef-prepared healthy dishes. Filter by category, price and size, then order for delivery across Egypt."
  })
}

const MenuPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const raw = await getProductsByCategory()
  const { global } = await getTrans()
  // Arabic names/descriptions are resolved here so the shop, its filters and
  // its cards all read `name` without knowing about the `*Ar` columns.
  const categories = localizeCategories(raw, locale)

  // Flatten to the dishes the listing schema advertises.
  const listed = (categories ?? []).flatMap(category =>
    (category?.Product ?? []).map((p: { id: string; name: string }) => ({
      id: p.id,
      name: p.name
    }))
  )

  return (
    <>
      {listed.length > 0 && <JsonLd data={itemListSchema(locale, listed)} />}
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: global.home, path: '' },
          { name: global.menu }
        ])}
      />

      <Banner
        title={global.menu}
        crumbs={[{ label: global.home, href: '/' }, { label: global.menu }]}
      />

      <Container>
        {/* Menu reads the `q` search param, so it needs a boundary here. */}
        <Suspense fallback={<div className='section-y' />}>
          <Menu categories={categories} />
        </Suspense>
      </Container>

      <PartnersStrip />
    </>
  )
}

export default MenuPage
