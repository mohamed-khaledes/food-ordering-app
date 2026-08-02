'use client'

import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { Container } from '@/components/ui/container'
import { useTrans } from '@/lib/translations/client'
import { useCountdown } from './hooks'
import dealImg from '../../../public/assets/items/Teriyaki Chicken Bowl.png'

const Countdown = ({
  labels
}: {
  labels: { days: string; hours: string; minutes: string; seconds: string }
}) => {
  const { started, days, hours, minutes, seconds } = useCountdown()

  const units = [
    { label: labels.days, value: days },
    { label: labels.hours, value: hours },
    { label: labels.minutes, value: minutes },
    { label: labels.seconds, value: seconds }
  ]

  return (
    <div className='mb-8 flex flex-wrap gap-3 sm:gap-4'>
      {units.map((unit, i) => (
        <div key={unit.label} className='flex flex-col items-center gap-1.5'>
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-bold sm:h-16 sm:w-16 sm:text-lg ${
              i === 2 ? 'bg-brand text-white' : 'bg-background text-brand shadow-sm'
            }`}
          >
            {started ? unit.value : '––'}
          </span>
          <span className='text-xs text-muted-foreground'>{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

/** "Todays Hot Deals" — product shot left, countdown offer right. */
const HotDeals = () => {
  const { sections } = useTrans()
  const deal = sections.hotDeals

  return (
    <section className='bg-cream'>
      <Container className='grid grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-2'>
        <div className='flex justify-center'>
          <img
            src={dealImg.src}
            alt=''
            aria-hidden
            loading='lazy'
            className='max-h-[280px] w-auto object-contain sm:max-h-[380px] lg:max-h-[450px]'
          />
        </div>

        <div>
          <p className='mb-3 text-sm font-medium text-brand'>{deal.eyebrow}</p>

          <h2 className='mb-4 max-w-md text-[26px] font-bold leading-tight text-foreground sm:text-[34px] md:text-[46px]'>
            {deal.title}
          </h2>

          <p className='mb-8 max-w-md text-sm leading-relaxed text-muted-foreground'>
            {deal.description}
          </p>

          <Countdown
            labels={{
              days: deal.days,
              hours: deal.hours,
              minutes: deal.minutes,
              seconds: deal.seconds
            }}
          />

          <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
            <Link href={`/${Routes.MENU}`} className='btn-brand px-8'>
              {deal.shopNow}
            </Link>
            <Link
              href={`/${Routes.MENU}`}
              className='text-sm font-medium text-foreground underline underline-offset-4 hover:text-brand'
            >
              {deal.dealOfDay}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HotDeals
