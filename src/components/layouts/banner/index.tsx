import React from 'react'
import Link from '@/components/link'
import { ChevronRight } from 'lucide-react'
import { IMAGES } from '@/constants/images'
import { Container } from '@/components/ui/container'

type Stat = {
  n: string | number
  l: string
}

export type Crumb = { label: string; href?: string }

type PageBannerProps = {
  eyebrow?: string
  title: string
  description?: string
  stats?: Stat[]
  /** Trail under the title. Falls back to `Home › {title}`. */
  crumbs?: Crumb[]
  /** Backdrop image URL. Pass `null` for the plain grey banner. */
  background?: string | null
}

/**
 * Grey masthead with an oversized title and breadcrumb — the shared banner on
 * every inner page of the design.
 */
export default function Banner({
  eyebrow,
  title,
  description,
  stats,
  crumbs,
  background = IMAGES.bannerBackground
}: PageBannerProps) {
  const trail: Crumb[] = crumbs ?? [{ label: 'Home', href: '/' }, { label: title }]

  return (
    <section className='relative overflow-hidden bg-haze'>
      {/* Photographic backdrop, washed out so the title stays legible */}
      {/* {background && (
        <>
          <img
            src={background}
            alt=''
            aria-hidden
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover'
          />
          <span aria-hidden className='absolute inset-0 bg-haze/90' />
        </>
      )} */}

      {/* Corner marks from the design's banner */}
      <span
        aria-hidden
        className='pointer-events-none absolute end-[8%] top-10 text-5xl leading-none text-black/10 select-none'
      >
        ✳
      </span>

      <Container className=' relative py-14 md:py-20'>
        {eyebrow && <p className='mb-3 text-sm font-medium text-brand'>{eyebrow}</p>}

        <h1 className='text-[26px] font-bold leading-tight text-foreground sm:text-[32px] md:text-[46px]'>
          {title}
        </h1>

        {trail.length > 0 && (
          <nav aria-label='Breadcrumb' className='mt-3'>
            <ol className='flex flex-wrap items-center gap-1.5 text-sm'>
              {trail.map((crumb, i) => {
                const isLast = i === trail.length - 1
                return (
                  <li key={`${crumb.label}-${i}`} className='flex items-center gap-1.5'>
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className='text-muted-foreground transition-colors hover:text-brand'
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className='text-foreground'>{crumb.label}</span>
                    )}
                    {!isLast && (
                      <ChevronRight className='h-3.5 w-3.5 text-muted-foreground rtl:rotate-180' />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {description && (
          <p className='mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base'>
            {description}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className='mt-8 flex flex-wrap items-center gap-x-10 gap-y-4'>
            {stats.map((stat, i) => (
              <div key={i}>
                <div className='text-2xl font-bold text-foreground'>{stat.n}</div>
                <div className='text-xs uppercase tracking-widest text-muted-foreground'>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
