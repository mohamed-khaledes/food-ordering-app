import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { Languages, Routes } from '@/constants/enums'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import HeroImage from './hero-image'

async function Hero() {
  const {
    home: { hero }
  } = await getTrans()
  const locale = await getCurrentLocale()
  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center text-center px-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 text-start'>
        {/* <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-5xl md:text-7xl font-extrabold leading-tight'
          >
            Fresh • Healthy • Delicious
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='mt-4 text-lg md:text-xl text-gray-600 max-w-xl'
          >
            Your meals delivered fresh every day. Made with love, made for your health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className='mt-8 flex gap-4'
          >
            <Link href='/menu'>
              <Button className='px-8 py-6 text-lg rounded-2xl'>Explore Menu</Button>
            </Link>
            <Link href='/plans'>
              <Button variant='outline' className='px-8 py-6 text-lg rounded-2xl border-2'>
                View Plans
              </Button>
            </Link>
          </motion.div>
        </div> */}
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='text-5xl md:text-7xl font-extrabold leading-tight'>
              Fresh • Healthy • Delicious
            </h1>
            <p className='mt-4 text-lg md:text-xl text-gray-600 max-w-xl'>
              Your meals delivered fresh every day. Made with love, made for your health.
            </p>
            <div className='mt-8 flex gap-4'>
              <Link href='/menu'>
                <Button className='px-8 py-6 text-lg rounded-2xl'>Explore Menu</Button>
              </Link>
              <Link href='/plans'>
                <Button variant='outline' className='px-8 py-6 text-lg rounded-2xl border-2'>
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Hero Image */}
        <HeroImage />
      </div>
    </section>
  )
}
export default Hero
