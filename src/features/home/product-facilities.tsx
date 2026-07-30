'use client'
import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/section-heading'
import { useTrans } from '@/lib/translations/client'
import { Salad, Leaf, CakeSlice, ShoppingBag, Beef, Layers } from 'lucide-react'
import { Container } from '@/components/ui/container'
import facilitiesImg from '../../../public/assets/items/Green Detox Juice.png'

const LEFT_ICONS = [Salad, Leaf, CakeSlice]
const RIGHT_ICONS = [ShoppingBag, Beef, Layers]

/**
 * Six facilities arranged around a centre product shot — three left-aligned,
 * three right-aligned with the icon on the outside edge.
 */
const ProductFacilities = () => {
  const { sections } = useTrans()
  const items = sections.facilities.items

  const Facility = ({
    item,
    Icon,
    side,
    delay
  }: {
    item: { title: string; text: string }
    Icon: React.ComponentType<{ className?: string }>
    side: 'start' | 'end'
    delay: number
  }) => (
    <motion.div
      initial={{ opacity: 0, x: side === 'start' ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-start gap-4 ${side === 'end' ? 'lg:flex-row-reverse lg:text-end' : ''}`}
    >
      <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white sm:h-14 sm:w-14'>
        <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
      </span>
      <div className='min-w-0'>
        <h3 className='mb-1 text-base font-bold text-foreground sm:text-lg'>{item.title}</h3>
        <p className='text-sm leading-relaxed text-muted-foreground'>{item.text}</p>
      </div>
    </motion.div>
  )

  return (
    <section className='section-y bg-background'>
      <Container>
        <SectionHeading
          title={sections.facilities.title}
          subtitle={sections.facilities.subtitle}
        />

        <div className='grid grid-cols-1 items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
          <div className='flex flex-col gap-8 sm:gap-10'>
            {items.slice(0, 3).map((item, i) => (
              <Facility
                key={item.title}
                item={item}
                Icon={LEFT_ICONS[i]}
                side='start'
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Centre shot is decorative — hidden on the 2-col tablet layout */}
          <div className='order-first hidden justify-center sm:col-span-2 sm:flex lg:order-none lg:col-span-1'>
            <img
              src={facilitiesImg.src}
              alt=''
              aria-hidden
              loading='lazy'
              className='w-[220px] object-contain lg:w-full lg:max-w-[360px]'
            />
          </div>

          <div className='flex flex-col gap-8 sm:gap-10'>
            {items.slice(3, 6).map((item, i) => (
              <Facility
                key={item.title}
                item={item}
                Icon={RIGHT_ICONS[i]}
                side='end'
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductFacilities
