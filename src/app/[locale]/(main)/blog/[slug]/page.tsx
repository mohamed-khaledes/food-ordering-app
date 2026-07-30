import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import LatestBlog from '@/features/blog/latest'
import { getBlogBySlug } from '@/server/db/blogs'
import { getTrans } from '@/lib/translations/server'
import { IMAGES } from '@/constants/images'
import { CalendarDays, Eye, User } from 'lucide-react'
import { Routes } from '@/constants/enums'
import { alternatesFor, OG_LOCALE, SITE_URL } from '@/constants/seo'
import { articleSchema, breadcrumbSchema, JsonLd } from '@/components/seo/json-ld'

export const dynamic = 'force-dynamic'

/**
 * Posts are listed in the sitemap, so they need their own canonical — without
 * this they inherit the layout's, which points every post at the locale root.
 * `article` OG type gets the author and publish dates into social cards.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog || !blog.published) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }

  const description = (blog.excerpt || blog.content || '').slice(0, 300)
  const image = blog.image || IMAGES.blogFallback

  return {
    title: blog.title,
    description,
    alternates: alternatesFor(locale, `/${Routes.BLOG}/${slug}`),
    openGraph: {
      type: 'article',
      title: blog.title,
      description,
      url: `${SITE_URL}/${locale}/${Routes.BLOG}/${slug}`,
      locale: OG_LOCALE[locale] ?? 'en_US',
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: blog.author ? [blog.author] : undefined,
      images: [{ url: image, alt: blog.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: [{ url: image, alt: blog.title }]
    }
  }
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const [blog, { global }] = await Promise.all([getBlogBySlug(slug), getTrans()])

  if (!blog || !blog.published) notFound()

  return (
    <>
      <JsonLd
        data={articleSchema({
          locale,
          slug,
          title: blog.title,
          description: blog.excerpt || blog.content,
          image: blog.image,
          author: blog.author,
          published: blog.createdAt,
          modified: blog.updatedAt
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: global.home, path: '' },
          { name: global.blog, path: `/${Routes.ABOUT}` },
          { name: blog.title }
        ])}
      />

      <Banner
        title={blog.title}
        background={blog.image || IMAGES.blogFallback}
        crumbs={[
          { label: global.home, href: '/' },
          { label: global.blog, href: '/about' },
          { label: blog.title }
        ]}
      />

      <article className='section-y'>
        <div className='container max-w-3xl'>
          <div className='mb-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1.5'>
              <User className='h-4 w-4 text-brand' />
              {blog.author}
            </span>
            <span className='flex items-center gap-1.5'>
              <CalendarDays className='h-4 w-4 text-brand' />
              {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className='flex items-center gap-1.5'>
              <Eye className='h-4 w-4 text-brand' />
              {blog.views} views
            </span>
          </div>

          <img
            src={blog.image || IMAGES.blogFallback}
            alt={blog.title}
            className='mb-8 h-[320px] w-full object-cover md:h-[420px]'
          />

          <p className='mb-6 border-s-4 border-brand ps-4 text-base font-medium leading-relaxed text-foreground'>
            {blog.excerpt}
          </p>

          {/* Content is plain text — split on blank lines into paragraphs. */}
          <div className='flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground md:text-base'>
            {blog.content
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
        </div>
      </article>

      <LatestBlog limit={3} />
      <PartnersStrip />
    </>
  )
}
