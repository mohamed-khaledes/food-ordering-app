'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTrans } from '@/lib/translations/client'

const icons = ['🌱', '⚖️', '🚀']
const stats = [
  { n: '100%', l: 'organic sourcing' },
  { n: '30+', l: 'expert dieticians' },
  { n: '30 min', l: 'avg. delivery' }
]
const accentLines = [
  'No shortcuts, no preservatives — ever.',
  'Macro-balanced meals, built for your goals.',
  'From our kitchen to your door, still hot.'
]

const WhyUs = () => {
  const { locale } = useParams()
  const { global } = useTrans()

  const data: any = {
    en: [
      {
        title: 'Fresh Ingredients',
        text: 'Farm-sourced produce prepared daily — no shortcuts, no preservatives.'
      },
      {
        title: 'Healthy & Balanced',
        text: 'Nutritionist-approved macros crafted to fuel your lifestyle.'
      },
      {
        title: 'Delivered Daily',
        text: 'Your meals arrive fresh at your doorstep every single day.'
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
    <section className='py-24 bg-muted/40 dark:bg-muted/10 overflow-hidden'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16'
        >
          <div>
            <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-4'>
              <span className='w-1.5 h-1.5 rounded-full bg-primary' />
              <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
                Why choose us
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold'>{global['Why Choose Us']}</h2>
          </div>
          <p className='text-muted-foreground text-lg leading-relaxed max-w-sm md:text-right'>
            Every decision we make starts with one question: is this good for you?
          </p>
        </motion.div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {data?.[locale as string]?.map((item: { title: string; text: string }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group relative p-8 bg-background rounded-3xl border border-border hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'
            >
              {/* Large faded number bg */}
              <div className='absolute top-4 right-6 text-8xl font-bold text-foreground/[0.03] select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-300'>
                0{index + 1}
              </div>

              {/* Icon */}
              <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mb-6 group-hover:bg-primary/20 transition-colors duration-300'>
                {icons[index]}
              </div>

              {/* Title */}
              <h3 className='text-xl font-bold mb-3'>{item.title}</h3>

              {/* Text */}
              <p className='text-muted-foreground leading-relaxed text-sm mb-6'>{item.text}</p>

              {/* Accent line */}
              <p className='text-xs text-foreground/40 italic border-l-2 border-primary/40 pl-3 group-hover:border-primary group-hover:text-foreground/60 transition-all duration-300'>
                {accentLines[index]}
              </p>

              {/* Bottom stat */}
              <div className='mt-8 pt-6 border-t border-border flex items-baseline gap-2'>
                <span className='text-3xl font-bold text-foreground'>{stats[index].n}</span>
                <span className='text-xs text-muted-foreground uppercase tracking-widest'>
                  {stats[index].l}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom full-width banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden'
        >
          {[
            { label: 'Orders delivered', value: '1.2M+' },
            { label: 'Average rating', value: '4.9 / 5' },
            { label: 'Happy customers', value: '12,000+' }
          ].map(s => (
            <div
              key={s.label}
              className='bg-background px-8 py-8 text-center hover:bg-primary/5 transition-colors duration-300 group'
            >
              <div className='text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300'>
                {s.value}
              </div>
              <div className='text-xs text-muted-foreground uppercase tracking-widest'>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
