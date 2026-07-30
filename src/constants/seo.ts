import type { Metadata } from 'next'
import { Languages } from './enums'

/** Single source of truth for the canonical origin. */
export const SITE_URL = 'https://akla-pi.vercel.app'

export const SITE_NAME = 'Akla'

export const LOCALES = [Languages.ENGLISH, Languages.ARABIC] as const

/** BCP-47 tags for `hreflang` / `og:locale`, keyed by our route locale. */
export const HREFLANG: Record<string, string> = {
  [Languages.ENGLISH]: 'en-US',
  [Languages.ARABIC]: 'ar-EG'
}

export const OG_LOCALE: Record<string, string> = {
  [Languages.ENGLISH]: 'en_US',
  [Languages.ARABIC]: 'ar_EG'
}

/**
 * Canonical plus every translation of one path, for a page's `alternates`.
 * `x-default` points at English so search engines have a fallback for locales
 * we don't publish.
 */
export const alternatesFor = (locale: string, path = '') => {
  const clean = path && !path.startsWith('/') ? `/${path}` : path
  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: {
      ...Object.fromEntries(
        LOCALES.map(l => [HREFLANG[l], `${SITE_URL}/${l}${clean}`])
      ),
      'x-default': `${SITE_URL}/${Languages.ENGLISH}${clean}`
    }
  }
}

/**
 * Private or transactional routes: crawlable so the `noindex` is actually seen,
 * but kept out of the index. A robots.txt `Disallow` alone can't do this — a
 * blocked URL can still be indexed from inbound links, and the crawler never
 * gets to read the meta tag that would have excluded it.
 *
 * `alternates` is always set: a page that omits it inherits the layout's
 * canonical, which points at the locale root.
 */
export const privateMetadata = ({
  locale,
  path,
  title
}: {
  locale: string
  path: string
  title: string
}): Metadata => ({
  title,
  alternates: alternatesFor(locale, path),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } }
})

/**
 * Title, description, canonical and both social cards for one page — the set
 * every indexable route needs. SEO copy is written per page rather than pulled
 * from the UI dictionary: the two serve different readers and drift apart.
 */
export const pageMetadata = ({
  locale,
  path,
  title,
  description,
  image = '/og-image.jpg'
}: {
  locale: string
  path: string
  title: string
  description: string
  image?: string
}): Metadata => ({
  title,
  description,
  alternates: alternatesFor(locale, path),
  openGraph: {
    type: 'website',
    title,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    siteName: SITE_NAME,
    locale: OG_LOCALE[locale] ?? OG_LOCALE[Languages.ENGLISH],
    images: [{ url: image, alt: title }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: image, alt: title }]
  }
})
