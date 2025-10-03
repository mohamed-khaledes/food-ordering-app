import { buttonVariants } from '@/components/ui/button'
import MainHead from '@/components/ui/main-head'
import { Routes } from '@/constants/enums'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'

async function About() {
  return (
    <section
      className='relative section-gap bg-gradient-to-b from-white via-gray-50 to-white'
      id={Routes.ABOUT}
    >
      {/* Decorative background */}
      <div className='absolute inset-0 -z-10'>
        <div className="h-full w-full bg-[url('/pattern.svg')] opacity-5" />
      </div>

      <div className='container text-center'>
        {/* Heading */}
        <MainHead subTitle='our story' title='about us' />

        {/* Content */}
        <div className='mt-8 max-w-3xl mx-auto text-start text-gray-600 flex flex-col gap-6 leading-relaxed tracking-wide'>
          <p className='transition-all duration-300 hover:text-gray-800'>
            Welcome to our pizzeria, where we serve the finest pizzas made with the freshest
            ingredients. Every slice is a masterpiece, crafted with care to deliver the perfect
            balance of flavors. From classic favorites to unique creations, there's something for
            every pizza lover!
          </p>
          <p className='transition-all duration-300 hover:text-gray-800'>
            Our chefs blend tradition with creativity, ensuring every bite is bursting with taste
            and authenticity. We believe in quality over quantity, and that passion is reflected in
            every pizza we serve.
          </p>
          <p className='transition-all duration-300 hover:text-gray-800'>
            Whether you’re dining in with friends, grabbing a quick bite, or celebrating a special
            moment, we promise a warm atmosphere, friendly service, and pizza you’ll never forget.
          </p>
        </div>

        {/* Call to action */}
        <div className='mt-10'>
          <Link
            href={`/${Routes.MENU}`}
            className={`${buttonVariants({
              size: 'lg'
            })} space-x-2 !px-4 !rounded-full uppercase w-fit`}
          >
            explore our menus
            <ArrowRightCircle className={`!w-5 !h-5 `} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
