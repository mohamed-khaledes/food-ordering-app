import { buttonVariants } from '@/components/ui/button'
import MainHead from '@/components/ui/main-head'
import { Routes } from '@/constants/enums'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'

const Contact = async () => {
  return (
    <section
      className='relative section-gap bg-gradient-to-b from-white via-gray-50 to-white'
      id={Routes.CONTACT}
    >
      <div className='container grid grid-cols-1 md:grid-cols-3 gap-12 items-center'>
        {/* Left: Contact Info */}
        <div className='col-span-1 text-center md:text-left'>
          <MainHead subTitle="Don't Hesitate" title='Contact Us' />

          <div className='mt-8 flex flex-col gap-3'>
            {/* Phone */}
            <a
              className='text-lg text-gray-600 hover:text-accent transition-colors'
              href='tel:+2012121212'
            >
              +20 121 212 1212
            </a>

            {/* Email */}
            <a
              className='text-lg text-gray-600 hover:text-accent transition-colors'
              href='mailto:info@pizzaco.com'
            >
              info@pizzaco.com
            </a>

            {/* Address */}
            <p className='text-gray-500 text-sm max-w-md leading-relaxed mx-auto md:mx-0'>
              123 Pizza Street, Downtown, Cairo, Egypt
            </p>

            {/* CTA Button */}
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: 'lg'
              })} space-x-2 !px-4 !rounded-full uppercase w-fit`}
            >
              order now
              <ArrowRightCircle className={`!w-5 !h-5 `} />
            </Link>
          </div>
        </div>

        {/* Right: Google Map */}
        <div className='col-span-1 md:col-span-2 w-full h-[400px] rounded-xl overflow-hidden shadow-lg'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.090819458354!2d31.235711315115904!3d30.04441998188008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840d4edb6a6e3%3A0x2d7a8f7aab62f14a!2sTahrir%20Square%2C%20Cairo!5e0!3m2!1sen!2seg!4v1695300000000!5m2!1sen!2seg'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
