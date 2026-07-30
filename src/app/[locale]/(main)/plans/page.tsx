import React from 'react'
import { getTrans } from '@/lib/translations/server'
import type { Metadata } from 'next'
import { alternatesFor } from '@/constants/seo'

/**
 * Still a placeholder, so keep it out of the index — a thin "Coming Soon" page
 * dilutes the site's crawl budget. Drop the `robots` block once it has content
 * and add `/plans` back to `app/sitemap.ts`.
 *
 * `alternates` is set explicitly because a page that omits it inherits the
 * layout's canonical, which pointed every such route at the locale root.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Meal Plans',
    alternates: alternatesFor(locale, '/plans'),
    robots: { index: false, follow: true }
  }
}

const PlansPage = async () => {
  const t = await getTrans()
  return (
    <main>
      <section className='section-gap'>
        <div className='container flex items-center justify-center h-52'>
          <h1 className='text-5xl uppercase font-bold text-gray-700'>{t.common.comingSoon}</h1>
        </div>
      </section>
    </main>
  )
}

export default PlansPage
