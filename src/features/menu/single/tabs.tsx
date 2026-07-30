'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { useTrans } from '@/lib/translations/client'

const TABS = ['Description', 'Additional Info', 'Reviews'] as const
type Tab = (typeof TABS)[number]

/** Description / Additional Info / Reviews tab strip below the product. */
const ProductTabs = ({
  description,
  sizes,
  extras
}: {
  description: string
  sizes: { name: string; price: number }[]
  extras: { name: string; price: number }[]
}) => {
  const { product } = useTrans()
  const [active, setActive] = useState<Tab>('Description')
  const LABELS: Record<Tab, string> = {
    Description: product.tabs.description,
    'Additional Info': product.tabs.additional,
    Reviews: product.tabs.reviews
  }

  return (
    <section className='bg-[#f8f8fb] py-14 md:py-20'>
      <Container>
        <div className='mb-8 flex flex-wrap gap-8'>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`border-b-2 pb-1.5 text-base font-medium transition-colors ${
                active === tab
                  ? 'border-brand text-brand'
                  : 'border-transparent text-foreground/70 hover:text-brand'
              }`}
            >
              {LABELS[tab]}
            </button>
          ))}
        </div>

        <div className='bg-background p-6 md:p-10'>
          {active === 'Description' && (
            <>
              <h3 className='mb-3 text-lg font-bold text-foreground'>{product.about}</h3>
              <p className='max-w-3xl text-sm leading-relaxed text-muted-foreground'>
                {description}
              </p>
            </>
          )}

          {active === 'Additional Info' && (
            <>
              <h3 className='mb-4 text-lg font-bold text-foreground'>{product.moreDetails}</h3>
              <ul className='flex flex-col gap-3'>
                {sizes.length === 0 && extras.length === 0 && (
                  <li className='text-sm text-muted-foreground'>
                    {product.noOptions}
                  </li>
                )}
                {sizes.map(size => (
                  <li
                    key={`size-${size.name}`}
                    className='flex items-center gap-3 text-sm text-muted-foreground'
                  >
                    <ArrowRight className='h-4 w-4 shrink-0 text-brand rtl:rotate-180' />
                    <span className='capitalize'>
                      {product.sizeRow} — <strong className='text-foreground'>{size.name.toLowerCase()}</strong>
                    </span>
                  </li>
                ))}
                {extras.map(extra => (
                  <li
                    key={`extra-${extra.name}`}
                    className='flex items-center gap-3 text-sm text-muted-foreground'
                  >
                    <ArrowRight className='h-4 w-4 shrink-0 text-brand rtl:rotate-180' />
                    <span className='capitalize'>
                      {product.extraRow} —{' '}
                      <strong className='text-foreground'>{extra.name.toLowerCase()}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {active === 'Reviews' && (
            <>
              <h3 className='mb-3 text-lg font-bold text-foreground'>{product.tabs.reviews}</h3>
              <p className='text-sm text-muted-foreground'>
                {product.noReviews}
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default ProductTabs
