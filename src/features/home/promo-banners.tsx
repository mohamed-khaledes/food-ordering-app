'use client'

import Link from '@/components/link'
import { Container } from '@/components/ui/container'
import { Routes } from '@/constants/enums'
import { useTrans } from '@/lib/translations/client'
import { ArrowRight } from 'lucide-react'
import saleImg from '../../../public/assets/items/Orange Sunrise Juice.png'
import orderImg from '../../../public/assets/items/Greek Salad.png'
import packageImg from '../../../public/assets/items/Berry Blast Juice.png'

const STYLES = [
  { className: 'bg-amber', image: saleImg.src },
  { className: 'bg-forest', image: orderImg.src },
  { className: 'bg-brand', image: packageImg.src }
]

/** Three coloured offer tiles overlapping the bottom of the hero. */
const PromoBanners = () => {
  const { sections } = useTrans()
  const promos = sections.promos

  return (
    <section className='bg-cream pb-14 md:pb-20'>
      <Container className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {promos.items.map((banner, i) => {
          const style = STYLES[i]
          return (
            <div
              key={banner.title}
              className={`relative flex min-h-[180px] flex-col justify-center overflow-hidden p-6 text-white sm:min-h-[190px] sm:p-7 ${style.className}`}
            >
              {/* Product shot bleeding off the trailing edge */}
              <img
                src={style.image}
                alt=''
                aria-hidden
                loading='lazy'
                className='pointer-events-none absolute -end-4 bottom-0 h-32 w-32 object-contain opacity-90 sm:h-40 sm:w-40'
              />

              <p className='relative mb-2 text-[11px] uppercase tracking-[0.2em] text-white/80'>
                {i === 2 ? promos.mealPlans : promos.hotSales}
              </p>
              <h3 className='relative text-2xl font-bold leading-tight sm:text-3xl'>
                {banner.title}
              </h3>
              <p className='relative mb-4 text-base text-white/90 sm:text-lg'>{banner.subtitle}</p>

              <Link
                href={`/${Routes.MENU}`}
                className='group relative inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white underline-offset-4 hover:underline'
              >
                {promos.buyNow}
                <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
              </Link>
            </div>
          )
        })}
      </Container>
    </section>
  )
}

export default PromoBanners
