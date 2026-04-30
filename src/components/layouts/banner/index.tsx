import React from 'react'

type Stat = {
  n: string | number
  l: string
}

type PageBannerProps = {
  eyebrow?: string
  title: string
  description?: string
  stats?: Stat[]
}

export default function Banner({ eyebrow, title, description, stats }: PageBannerProps) {
  return (
    <div className='md:pt-10 relative bg-foreground overflow-hidden'>
      {/* Decorative blobs */}
      <div className='absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none' />
      <div className='absolute -bottom-10 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 -translate-y-1/2 right-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl pointer-events-none' />

      <div className='container py-10 md:py-14 relative z-10'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
          {/* Left: text */}
          <div>
            {eyebrow && (
              <div className='inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-4'>
                <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
                <span className='text-xs font-medium text-primary uppercase tracking-widest'>
                  {eyebrow}
                </span>
              </div>
            )}
            <h1 className='text-4xl md:text-5xl font-bold text-background mb-3'>{title}</h1>
            {description && (
              <p className='text-background/60 text-base md:text-lg max-w-md leading-relaxed'>
                {description}
              </p>
            )}
          </div>

          {/* Right: stats */}
          {stats && stats.length > 0 && (
            <div className='flex items-center gap-px bg-background/10 rounded-2xl overflow-hidden flex-shrink-0'>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className='px-5 py-4 text-center bg-background/5 hover:bg-background/10 transition-colors'
                >
                  <div className='text-xl font-bold text-primary'>{s.n}</div>
                  <div className='text-xs text-background/50 uppercase tracking-widest mt-0.5'>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className='relative h-8 bg-foreground'>
        <svg
          viewBox='0 0 1440 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute bottom-0 w-full'
          preserveAspectRatio='none'
        >
          <path
            d='M0 32C240 32 240 0 480 0C720 0 720 32 960 32C1200 32 1200 0 1440 0V32H0Z'
            className='fill-background'
          />
        </svg>
      </div>
    </div>
  )
}
