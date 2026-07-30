import { Languages } from '@/constants/enums'
import { SITE_NAME, SITE_URL } from '@/constants/seo'

/**
 * Emits a JSON-LD block. Rendered as a plain script tag rather than via
 * `next/script` so it lands in the initial HTML, which is what crawlers read.
 */
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type='application/ld+json'
    // Only our own serialised objects reach this, never user input.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

/**
 * Who the business is. `FoodEstablishment` rather than plain `Organization` so
 * Google can treat it as a food ordering entity and surface the menu action.
 */
export const organizationSchema = (locale: string) => {
  const isArabic = locale === Languages.ARABIC
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': ORG_ID,
    name: isArabic ? 'أكلة' : SITE_NAME,
    alternateName: isArabic ? SITE_NAME : 'أكلة',
    url: `${SITE_URL}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-badge.svg`,
      width: 512,
      height: 512
    },
    image: `${SITE_URL}/og-image.jpg`,
    description: isArabic
      ? 'وجبات صحية يحضرها الشيف من مكونات محلية طازجة، مع توصيل سريع في مصر.'
      : 'Chef-crafted healthy meals from locally sourced ingredients, delivered across Egypt.',
    servesCuisine: isArabic ? ['صحي', 'شرق أوسطي'] : ['Healthy', 'Middle Eastern'],
    priceRange: 'EGP',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressRegion: isArabic ? 'القاهرة' : 'Cairo'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt'
    },
    acceptsReservations: false,
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/menu`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'
    },
    sameAs: ['https://www.linkedin.com/in/mohamed-khaledes/']
  }
}

/** The site itself, with the shop's `?q=` search wired up as a SearchAction. */
export const websiteSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/${locale}`,
  name: locale === Languages.ARABIC ? 'أكلة' : SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: locale === Languages.ARABIC ? 'ar-EG' : 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/${locale}/menu?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
})

/** One dish. `offers` is what makes a rich result eligible. */
export const productSchema = ({
  locale,
  id,
  name,
  description,
  image,
  price,
  category
}: {
  locale: string
  id: string
  name: string
  description?: string | null
  image?: string | null
  price: number
  category?: string | null
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE_URL}/${locale}/menu/${id}#product`,
  name,
  ...(description ? { description } : {}),
  ...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
  ...(category ? { category } : {}),
  brand: { '@id': ORG_ID },
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/${locale}/menu/${id}`,
    priceCurrency: 'EGP',
    price: price.toFixed(2),
    availability: 'https://schema.org/InStock',
    seller: { '@id': ORG_ID }
  }
})

/** One blog post. */
export const articleSchema = ({
  locale,
  slug,
  title,
  description,
  image,
  author,
  published,
  modified
}: {
  locale: string
  slug: string
  title: string
  description?: string | null
  image?: string | null
  author?: string | null
  published: Date | string
  modified: Date | string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${SITE_URL}/${locale}/blog/${slug}#article`,
  headline: title.slice(0, 110),
  ...(description ? { description: description.slice(0, 300) } : {}),
  ...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
  datePublished: new Date(published).toISOString(),
  dateModified: new Date(modified).toISOString(),
  author: { '@type': 'Person', name: author || SITE_NAME },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${locale}/blog/${slug}`
  },
  inLanguage: locale === Languages.ARABIC ? 'ar-EG' : 'en-US'
})

/** Mirrors the visible breadcrumb in the page banner. */
export const breadcrumbSchema = (locale: string, crumbs: { name: string; path?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    ...(crumb.path ? { item: `${SITE_URL}/${locale}${crumb.path}` } : {})
  }))
})

/** Collection pages (the shop) — helps the menu rank as a listing. */
export const itemListSchema = (
  locale: string,
  items: { id: string; name: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.slice(0, 30).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/${locale}/menu/${item.id}`,
    name: item.name
  }))
})
