import Link from '@/components/link'
import SectionHeading from '@/components/ui/section-heading'
import { getPublishedBlogs } from '@/server/db/blogs'
import { getTrans } from '@/lib/translations/server'
import { IMAGES } from '@/constants/images'
import { ArrowRight, CalendarDays, Eye } from 'lucide-react'
import { Container } from '@/components/ui/container'

/** "Leatest Blog" band — three most recent published posts. */
const LatestBlog = async ({ limit = 3 }: { limit?: number }) => {
  const [blogs, { sections }] = await Promise.all([getPublishedBlogs(limit), getTrans()])

  if (blogs.length === 0) return null

  return (
    <section className='section-y bg-background'>
      <Container>
        <SectionHeading
          title={sections.blog.title}
          subtitle={sections.blog.subtitle}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogs.map(blog => (
            <article
              key={blog.id}
              className='group flex flex-col border border-border bg-background transition-all duration-300 hover:border-brand hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]'
            >
              <Link href={`/blog/${blog.slug}`} className='block h-[210px] overflow-hidden'>
                <img
                  src={blog.image || IMAGES.blogFallback}
                  alt={blog.title}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </Link>

              <div className='flex flex-1 flex-col p-5'>
                <div className='mb-3 flex items-center gap-4 text-xs text-muted-foreground'>
                  <span className='flex items-center gap-1.5'>
                    <Eye className='h-3.5 w-3.5 text-brand' />
                    {blog.views} {sections.blog.views}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <CalendarDays className='h-3.5 w-3.5 text-brand' />
                    {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <h3 className='mb-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand'>
                    {blog.title}
                  </h3>
                </Link>

                <p className='line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground'>
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className='mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline'
                >
                  {sections.blog.readMore}
                  <ArrowRight className='h-3.5 w-3.5 rtl:rotate-180' />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default LatestBlog
