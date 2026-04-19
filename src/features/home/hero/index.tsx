import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { getTrans } from '@/lib/translations/server'
import HeroImage from './hero-image'

async function Hero() {
  const {
    home: { hero }
  } = await getTrans()

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden'>
      {/* Background blobs */}
      <div className='absolute -top-20 left-1/3 w-[360px] h-[360px] rounded-full bg-primary/10 blur-3xl pointer-events-none' />
      <div className='absolute bottom-0 -left-20 w-[260px] h-[260px] rounded-full bg-primary/5 blur-3xl pointer-events-none' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-6xl'>
        {/* Left: text */}
        <div className='flex flex-col text-start'>
          {/* Eyebrow badge */}
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6 w-fit'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              Fresh · Healthy · Delicious
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl md:text-7xl font-extrabold leading-tight tracking-tight'>
            {hero.title}
          </h1>

          {/* Description */}
          <p className='mt-4 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed'>
            {hero.description}
          </p>

          {/* CTAs */}
          <div className='mt-8 flex gap-4 flex-wrap'>
            <Link href='/menu'>
              <Button className='px-8 py-6 text-lg rounded-2xl text-foreground font-semibold active:scale-[0.98] transition-all'>
                {hero.orderNow}
              </Button>
            </Link>
            <Link href='/menu'>
              <Button
                variant='outline'
                className='px-8 py-6 text-lg rounded-2xl border-2 hover:bg-muted/50 active:scale-[0.98] transition-all'
              >
                {hero['explore menu']} →
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className='mt-10 flex items-center gap-5 flex-wrap'>
            {/* Avatar stack */}
            <div className='flex -space-x-2'>
              {['A', 'B', 'C'].map(letter => (
                <div
                  key={letter}
                  className='w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-foreground'
                >
                  {letter}
                </div>
              ))}
            </div>

            <div className='h-8 w-px bg-border' />

            {/* Stars + count */}
            <div>
              <div className='flex items-center gap-0.5 text-amber-400 text-sm leading-none mb-1'>
                ★★★★★
              </div>
              <p className='text-xs text-muted-foreground'>
                Loved by <strong className='text-foreground font-medium'>12,000+</strong> customers
              </p>
            </div>

            <div className='h-8 w-px bg-border' />

            {/* Rating */}
            <div>
              <p className='text-lg font-bold text-foreground leading-none mb-1'>4.9</p>
              <p className='text-xs text-muted-foreground'>Avg. rating</p>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <HeroImage />
      </div>
    </section>
  )
}

export default Hero
