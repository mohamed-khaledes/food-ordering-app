import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { getTrans } from '@/lib/translations/server'
import HeroImage from './hero-image'

async function Hero() {
  const {
    home: { hero }
  } = await getTrans()

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-foreground'>
      {/* Decorative blobs */}
      <div className='absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl pointer-events-none' />
      <div className='absolute bottom-10 -right-20 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-6xl px-6 relative z-10 pt-24 pb-16 md:py-0'>
        {/* Left: text */}
        <div className='flex flex-col text-start'>
          {/* Eyebrow badge */}
          <div className='inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6 w-fit'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <span className='text-xs font-medium text-primary uppercase tracking-widest'>
              Fresh · Healthy · Delicious
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-background mb-4'>
            {hero.title}
          </h1>

          {/* Description */}
          <p className='text-lg md:text-xl text-background/60 max-w-xl leading-relaxed mb-8'>
            {hero.description}
          </p>

          {/* CTAs */}
          <div className='flex gap-3 flex-wrap'>
            <Link href='/menu'>
              <Button className='px-8 py-6 text-lg rounded-2xl bg-primary text-foreground font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20'>
                {hero.orderNow}
              </Button>
            </Link>
            <Link href='/menu'>
              <Button
                variant='outline'
                className='capitalize px-8 py-6 text-lg rounded-2xl border-background/20 hover:bg-background/10 active:scale-[0.98] transition-all'
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
                  className='w-8 h-8 rounded-full bg-primary/20 border-2 border-foreground flex items-center justify-center text-xs font-medium text-background'
                >
                  {letter}
                </div>
              ))}
            </div>

            <div className='h-8 w-px bg-background/20' />

            {/* Stars + count */}
            <div>
              <div className='flex items-center gap-0.5 text-amber-400 text-sm leading-none mb-1'>
                ★★★★★
              </div>
              <p className='text-xs text-background/50'>
                Loved by <strong className='text-primary font-medium'>12,000+</strong> customers
              </p>
            </div>

            <div className='h-8 w-px bg-background/20' />

            {/* Rating */}
            <div>
              <p className='text-lg font-bold text-primary leading-none mb-1'>4.9</p>
              <p className='text-xs text-background/50'>Avg. rating</p>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <HeroImage />
      </div>

      {/* Bottom wave — same as banner */}
      <div className='absolute bottom-0 left-0 right-0 h-10 bg-foreground'>
        <svg
          viewBox='0 0 1440 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute bottom-0 w-full'
          preserveAspectRatio='none'
        >
          <path
            d='M0 40C240 40 240 0 480 0C720 0 720 40 960 40C1200 40 1200 0 1440 0V40H0Z'
            className='fill-background'
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
