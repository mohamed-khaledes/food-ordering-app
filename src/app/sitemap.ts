import type { MetadataRoute } from 'next'
import { HREFLANG, LOCALES, SITE_URL } from '@/constants/seo'
import { Languages } from '@/constants/enums'
import { db } from '@/lib/prisma'

/**
 * Public, indexable paths. Account and checkout routes are excluded, and so is
 * `/plans` — it's still a "Coming Soon" placeholder marked `noindex`, and
 * listing a noindex URL here just sends crawlers to a dead end.
 */
const STATIC_PATHS: { path: string; priority: number; freq: Frequency }[] = [
  { path: '', priority: 1, freq: 'daily' },
  { path: '/menu', priority: 0.9, freq: 'daily' },
  { path: '/about', priority: 0.6, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' }
]

type Frequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

/** Every locale of one path, cross-linked via `alternates.languages`. */
const entriesFor = (path: string, lastModified: Date, priority: number, freq: Frequency) =>
  LOCALES.map(locale => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map(l => [HREFLANG[l], `${SITE_URL}/${l}${path}`])),
        'x-default': `${SITE_URL}/${Languages.ENGLISH}${path}`
      }
    }
  }))

/**
 * The DB is queried directly rather than through `server/db` because those
 * helpers return the un-awaited Prisma promise inside their `try`, so a
 * rejection escapes their `catch`. A sitemap that throws returns a 500 and
 * search engines drop it, so failures degrade to the static routes instead.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries = STATIC_PATHS.flatMap(({ path, priority, freq }) =>
    entriesFor(path, now, priority, freq)
  )

  let productEntries: MetadataRoute.Sitemap = []
  let blogEntries: MetadataRoute.Sitemap = []

  try {
    const products = await db.product.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    })
    productEntries = products.flatMap(p =>
      entriesFor(`/menu/${p.id}`, p.updatedAt ?? now, 0.8, 'weekly')
    )
  } catch (error) {
    console.error('sitemap: could not list products, falling back to static routes', error)
  }

  try {
    const blogs = await db.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    })
    blogEntries = blogs.flatMap(b =>
      entriesFor(`/blog/${b.slug}`, b.updatedAt ?? now, 0.5, 'monthly')
    )
  } catch (error) {
    console.error('sitemap: could not list blog posts, skipping them', error)
  }

  return [...staticEntries, ...productEntries, ...blogEntries]
}
