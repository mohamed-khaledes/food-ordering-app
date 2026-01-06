'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTrans } from '@/lib/translations/client'

const WhyUs = () => {
  const { locale } = useParams()
  const { global } = useTrans()
  const data: any = {
    en: [
      {
        title: 'Fresh Ingredients',
        text: 'We use high-quality, farm-fresh ingredients to prepare your meals daily.'
      },
      {
        title: 'Healthy & Balanced',
        text: 'Nutritious meals crafted by experts to fuel your lifestyle.'
      },
      {
        title: 'Delivered Daily',
        text: 'Your food arrives fresh at your doorstep every single day.'
      }
    ],
    ar: [
      {
        title: 'مكونات طازجة',
        text: 'نستخدم مكونات عالية الجودة وطازجة من المزارع لتحضير وجباتك يوميًا.'
      },
      {
        title: 'صحي ومتوازن',
        text: 'وجبات غذائية متكاملة أعدّها خبراء لدعم أسلوب حياتك.'
      },
      {
        title: 'توصيل يومي',
        text: 'تصلك وجباتك طازجة إلى باب منزلك كل يوم.'
      }
    ]
  }

  return (
    <section className='py-24 bg-gray-50'>
      <div className='container mx-auto px-6 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-4xl font-bold mb-12'
        >
          {global['Why Choose Us']}
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {data?.[locale as string]?.map((item: { title: string; text: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className='p-8 bg-white rounded-3xl shadow-md hover:shadow-lg transition'
            >
              <h3 className='text-2xl font-semibold mb-4'>{item.title}</h3>
              <p className='text-gray-600 text-lg'>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
