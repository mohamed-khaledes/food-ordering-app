'use client'

import SectionHeading from '@/components/ui/section-heading'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { useTestimonials } from './hooks'

const Testimonials = () => {
  const { copy, items, index, active, photo, goTo, next, previous } = useTestimonials()

  return (
    <section className='section-y bg-haze'>
      <Container>
        <SectionHeading title={copy.title} subtitle={copy.subtitle} />

        {/* Arrows sit outside the card on desktop, so the rail is padded there */}
        <div className='relative mx-auto max-w-3xl px-0 md:px-8'>
          <Quote
            aria-hidden
            className='pointer-events-none absolute -top-6 end-0 h-20 w-20 text-brand/10 md:h-24 md:w-24'
          />

          <div className='relative bg-background p-6 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)] sm:p-8 md:p-12'>
            <img
              src={photo}
              alt={active.name}
              className='mx-auto mb-4 h-20 w-20 rounded-full object-cover'
            />
            <h3 className='font-bold text-foreground'>{active.name}</h3>
            <p className='mb-5 text-sm text-muted-foreground'>{active.role}</p>
            <p className='mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base'>
              {active.quote}
            </p>

            <div className='mt-7 flex items-center justify-center gap-2'>
              {items.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => goTo(i)}
                  aria-label={`${copy.title} ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === index ? 'bg-brand' : 'bg-brand/25 hover:bg-brand/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Arrows — below the card on mobile so they never overlap the text */}
          <div className='mt-6 flex items-center justify-center gap-4 md:mt-0'>
            <button
              onClick={previous}
              aria-label={copy.previous}
              className='flex h-11 w-11 items-center justify-center rounded-full border border-brand/40 bg-background text-brand transition-colors hover:bg-brand hover:text-white md:absolute md:-start-2 md:top-1/2 md:-translate-y-1/2'
            >
              <ChevronLeft className='h-5 w-5 rtl:rotate-180' />
            </button>
            <button
              onClick={next}
              aria-label={copy.next}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark md:absolute md:-end-2 md:top-1/2 md:-translate-y-1/2'
            >
              <ChevronRight className='h-5 w-5 rtl:rotate-180' />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
