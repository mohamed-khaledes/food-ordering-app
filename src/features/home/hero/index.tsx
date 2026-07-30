import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Routes } from '@/constants/enums'
import { ArrowRight, Leaf } from 'lucide-react'
import HeroImage from './hero-image'
import { Container } from '@/components/ui/container'

/** Drifting leaves in the top-left corner of the design's hero. */
const LEAVES = [
  'left-[2%] top-[12%] h-5 w-5 rotate-12',
  'left-[7%] top-[24%] h-4 w-4 -rotate-45',
  'left-[1%] top-[38%] h-6 w-6 rotate-[70deg]',
  'left-[9%] top-[52%] h-4 w-4 -rotate-12',
  'left-[4%] top-[66%] h-5 w-5 rotate-[100deg]'
]

async function Hero() {
  const {
    home: { hero }
  } = await getTrans()

  return (
    <section className='relative overflow-hidden bg-cream'>
      {/* Decorative leaves */}
      {LEAVES.map(pos => (
        <Leaf
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute hidden text-brand/30 lg:block ${pos}`}
        />
      ))}

      <Container className='relative grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-24'>
        {/* Copy */}
        <div className='flex flex-col items-start'>
          <p className='mb-5 flex items-center gap-2 text-sm text-foreground/70'>
            <Leaf className='h-4 w-4 text-brand' />
            {hero.genuine}
          </p>

          <h1 className='mb-8 max-w-xl text-[38px] font-bold leading-[1.1] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]'>
            {hero.title}
          </h1>

          <p className='mb-8 max-w-lg text-base leading-relaxed text-muted-foreground'>
            {hero.description}
          </p>

          <Link href={`/${Routes.MENU}`} className='btn-brand group px-7 py-3.5 capitalize'>
            {hero['explore menu']}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
          </Link>
        </div>

        <HeroImage />
      </Container>
    </section>
  )
}

export default Hero
