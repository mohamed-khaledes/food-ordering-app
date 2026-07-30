'use client'

import { Leaf, ChefHat, Sprout, Truck } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { useTrans } from '@/lib/translations/client'

const ICONS = [Leaf, ChefHat, Sprout, Truck]

/** White card of trust badges that straddles the footer edge in the design. */
const FeaturesStrip = () => {
  const { sections } = useTrans()

  return (
    <section className='relative bg-background'>
      <Container className='pb-14 md:pb-20'>
        <div className='grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4'>
          {sections.features.items.map((feature, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={feature.title}
                className='group flex items-center gap-4 bg-background px-5 py-6 transition-colors hover:bg-cream sm:px-6 sm:py-7'
              >
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white'>
                  <Icon className='h-5 w-5' />
                </span>
                <div className='min-w-0'>
                  <h3 className='text-sm font-bold text-foreground'>{feature.title}</h3>
                  <p className='text-xs text-muted-foreground'>{feature.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default FeaturesStrip
