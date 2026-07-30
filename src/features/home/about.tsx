import React from 'react'
import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Routes } from '@/constants/enums'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import farmImg1 from '../../../public/assets/images/farm01.jpg'
import farmImg2 from '../../../public/assets/images/farm02.jpg'
/**
 * "Trusted Organic Food Store For People" — copy on the left, a pair of
 * offset images on the right.
 */
const About = async () => {
  const {
    home: { about }
  } = await getTrans()

  return (
    <section id='about' className='section-y overflow-hidden bg-background'>
      <Container className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        {/* Copy */}
        <div>
          <p className='mb-3 text-sm font-medium text-brand'>{about.ourStory}</p>

          <h2 className='mb-5 max-w-md text-[24px] font-bold leading-tight text-foreground sm:text-[28px] md:text-[40px]'>
            {about.aboutUs}
          </h2>

          <div className='flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground'>
            <p>{about.descriptions.one}</p>
            <p>{about.descriptions.two}</p>
            <p>{about.descriptions.three}</p>
          </div>

          <Link href={`/${Routes.MENU}`} className='btn-brand group mt-8'>
            {about.exploreOurMenus}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
          </Link>
        </div>

        {/* Offset image pair */}
        <div className='grid grid-cols-2 gap-5'>
          <img
            src={farmImg1.src}
            alt=''
            aria-hidden
            loading='lazy'
            className='h-[320px] w-full object-cover md:h-[500px] rounded-md'
          />
          <img
            src={farmImg2.src}
            alt=''
            aria-hidden
            loading='lazy'
            className='h-[320px] w-full object-cover md:h-[500px] rounded-md relative top-[50px]'
          />
        </div>
      </Container>
    </section>
  )
}

export default About
