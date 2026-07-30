import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/seo'

/**
 * There was no robots.txt at all — the request fell through to `[locale]` and
 * was served as an HTML page with `lang="robots.txt"`.
 *
 * Only the API and the two staff panels are blocked here. Customer routes like
 * the cart and order history carry a `noindex` meta tag instead (see
 * `privateMetadata`): blocking them in robots.txt would stop crawlers reading
 * that tag, and a disallowed URL can still land in the index via inbound links.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*/admin', '/*/dashboard']
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  }
}
