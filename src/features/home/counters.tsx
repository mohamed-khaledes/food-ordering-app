'use client'

import { Leaf, Star, Sprout, Users } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { useTrans } from '@/lib/translations/client'

const ICONS = [Star, Leaf, Sprout, Users]

/** Light band of headline numbers, split by thin dividers as in the design. */
const Counters = () => {
  const { sections } = useTrans()

  return (
    <section className='bg-cream'>
      <Container className='grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16'>
        {sections.counters.items.map((stat, i) => {
          const Icon = ICONS[i]
          return (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 px-2 text-center ${
                i > 0 ? 'md:border-s md:border-foreground/10' : ''
              }`}
            >
              <Icon className='h-6 w-6 text-brand sm:h-7 sm:w-7' />
              <span className='text-[28px] font-bold leading-none text-foreground sm:text-[34px]'>
                {stat.value}
              </span>
              <span className='text-sm text-muted-foreground'>{stat.label}</span>
            </div>
          )
        })}
      </Container>
    </section>
  )
}

export default Counters
