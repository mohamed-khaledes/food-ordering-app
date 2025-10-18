import { buttonVariants } from '@/components/ui/button'
import MainHead from '@/components/ui/main-head'
import { Routes } from '@/constants/enums'
import { getTrans } from '@/lib/translations/server'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'

async function About() {
  const {
    home: { about }
  } = await getTrans()
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
        <MainHead subTitle={about.ourStory} title={about.aboutUs} />

        {/* Content */}
        <div className='mt-8 max-w-3xl mx-auto text-start text-gray-600 flex flex-col gap-6 leading-relaxed tracking-wide'>
          <p className='transition-all duration-300 hover:text-gray-800'>
            {about.descriptions.one}
          </p>
          <p className='transition-all duration-300 hover:text-gray-800'>
            {about.descriptions.two}
          </p>
          <p className='transition-all duration-300 hover:text-gray-800'>
            {about.descriptions.three}
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
            {about.exploreOurMenus}
            <ArrowRightCircle className={`!w-5 !h-5 `} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
