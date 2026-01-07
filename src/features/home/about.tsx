import React from 'react'
import aboutImg from '@public/assets/images/pexels-ella-olsson-572949-1640770.jpg'
import { getTrans } from '@/lib/translations/server'

const About = async () => {
  const {
    home: { about }
  } = await getTrans()
  return (
    <section id='about' className='py-20 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-10'>{about.aboutUs}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold'>{about.ourStory}</h3>
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
          </div>
          <div>
            <img
              src={aboutImg.src || ''}
              alt='About us'
              loading='lazy'
              className='rounded-2xl shadow-lg w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
