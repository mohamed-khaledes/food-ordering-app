import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import SectionHeading from '@/components/ui/section-heading'
import Card from '@/features/shared/card'
import AddToCart from '@/features/shared/cart/add-to-cart'
import ProductGallery from '@/features/menu/single/gallery'
import ProductTabs from '@/features/menu/single/tabs'
import { getProduct, getProductsByCategory } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'
import { formatCurrency } from '@/lib/helpers'
import { IMAGES } from '@/constants/images'
import { Languages, Routes } from '@/constants/enums'
import { ShoppingCart } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { alternatesFor, OG_LOCALE, SITE_URL } from '@/constants/seo'
import { breadcrumbSchema, JsonLd, productSchema } from '@/components/seo/json-ld'
import { localize, localizeCategories } from '@/lib/localize'

/**
 * Per-dish metadata. Without this every product shared the site-wide title, so
 * search engines saw dozens of near-duplicate pages.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const raw = await getProduct(id)

  if (!raw || Array.isArray(raw)) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }

  // The title and description that get indexed must match the visible page.
  const product = localize(raw, locale)

  const description =
    product.description?.slice(0, 300) ??
    (locale === Languages.ARABIC
      ? `اطلب ${product.name} من أكلة — ${formatCurrency(product.basePrice)}، توصيل سريع في مصر.`
      : `Order ${product.name} from Akla — ${formatCurrency(product.basePrice)}, delivered fresh across Egypt.`)

  const image = product.image || IMAGES.productFallback

  return {
    title: product.name,
    description,
    alternates: alternatesFor(locale, `/${Routes.MENU}/${id}`),
    openGraph: {
      type: 'website',
      title: product.name,
      description,
      url: `${SITE_URL}/${locale}/${Routes.MENU}/${id}`,
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [{ url: image, alt: product.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [{ url: image, alt: product.name }]
    }
  }
}

export default async function SingleProductPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const [raw, rawCategories, translations] = await Promise.all([
    getProduct(id),
    getProductsByCategory(),
    getTrans()
  ])
  const { global, product: productCopy } = translations

  // getProduct returns [] on failure, so guard on the shape rather than null.
  if (!raw || Array.isArray(raw)) notFound()

  const product = localize(raw, locale)
  const categories = localizeCategories(rawCategories, locale)

  const owningCategory = categories.find(category =>
    category.Product?.some(p => p.id === product.id)
  )

  const related = (owningCategory?.Product ?? [])
    .filter(p => p.id !== product.id)
    .slice(0, 4)
    .map(p => ({ ...p, category: owningCategory?.name }))

  const image = product.image || IMAGES.productFallback

  return (
    <>
      <JsonLd
        data={productSchema({
          locale,
          id: product.id,
          name: product.name,
          description: product.description,
          image,
          price: product.basePrice,
          category: owningCategory?.name
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: global.home, path: '' },
          { name: global.menu, path: `/${Routes.MENU}` },
          { name: product.name }
        ])}
      />

      <Banner
        title={product.name}
        crumbs={[
          { label: global.home, href: '/' },
          { label: global.menu, href: `/${Routes.MENU}` },
          { label: product.name }
        ]}
      />

      {/* ── Product ──────────────────────────────────────── */}
      <section className='section-y'>
        <Container className=' grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14'>
          <ProductGallery images={[image, image, image]} alt={product.name} />

          <div className='flex flex-col'>
            <div className='mb-4 flex flex-wrap items-start justify-between gap-4'>
              <h1 className='text-[24px] font-bold capitalize leading-tight text-foreground sm:text-[28px] md:text-[34px]'>
                {product.name}
              </h1>
              <span className='text-2xl font-bold text-brand'>
                {formatCurrency(product.basePrice)}
              </span>
            </div>

            <p className='mb-6 text-sm leading-relaxed text-muted-foreground'>
              {product.description}
            </p>

            {product.sizes.length > 0 && (
              <p className='mb-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{global.size}: </span>
                <span className='capitalize'>
                  {product.sizes.map(s => s.name.toLowerCase()).join(', ')}
                </span>
              </p>
            )}

            {product.extras.length > 0 && (
              <p className='mb-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{global.extras}: </span>
                <span className='capitalize'>
                  {product.extras.map(e => e.name.toLowerCase()).join(', ')}
                </span>
              </p>
            )}

            {owningCategory && (
              <p className='mb-6 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{translations.category}: </span>
                <span className='capitalize'>{owningCategory.name}</span>
              </p>
            )}

            <div className='mt-auto'>
              <AddToCart
                item={product}
                trigger={
                  <button type='button' className='btn-brand w-full py-4 text-base'>
                    <ShoppingCart className='h-5 w-5' />
{productCopy.addToCart}
                  </button>
                }
              />
            </div>
          </div>
        </Container>
      </section>

      <ProductTabs
        description={product.description}
        sizes={product.sizes.map(s => ({ name: s.name, price: s.price }))}
        extras={product.extras.map(e => ({ name: e.name, price: e.price }))}
      />

      {/* ── Related ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className='section-y'>
          <Container>
            <SectionHeading
title={productCopy.trending}
              subtitle={productCopy.trendingSubtitle}
            />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
              {related.map((item, i) => (
                <Card key={item.id} item={item} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <PartnersStrip />
    </>
  )
}
