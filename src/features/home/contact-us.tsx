import { getTrans } from '@/lib/translations/server'
import React from 'react'

const ContactUs = async () => {
  const { global } = await getTrans()
  return (
    <section id='contact' className='py-20 bg-gray-100 dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-10'>{global.contact}</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <form className='space-y-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg'>
            <input
              type='text'
              placeholder={global.name}
              className='w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800'
            />
            <input
              type='email'
              placeholder={global.email}
              className='w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800'
            />
            <textarea
              placeholder={global.message}
              className='w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800'
              // rows='5'
            ></textarea>
            <button className='px-6 py-3 bg-black text-white rounded-xl w-full hover:bg-gray-800 transition'>
              {global.send}
            </button>
          </form>

          <div className='rounded-2xl overflow-hidden shadow-lg h-80'>
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
      </div>
    </section>
  )
}

export default ContactUs
