'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTrans } from '@/lib/translations/client'
import SectionHeading from '@/components/ui/section-heading'
import { Sprout, Carrot, Bug, RotateCcw } from 'lucide-react'
import { Container } from '@/components/ui/container'

const ICONS = [Sprout, Carrot, Bug, RotateCcw]

/**
 * 2×2 card grid on a light band, with the second card filled brand green —
 * the "Why Choose Us" section from 02_home_02.
 */
const WhyUs = () => {
  const { global, sections } = useTrans()

  return (
    <section className='section-y bg-haze'>
      <Container>
        <SectionHeading title={global['Why Choose Us']} subtitle={sections.whyUs.subtitle} />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {sections.whyUs.items.map((item, i) => {
            const Icon = ICONS[i]
            const highlighted = i === 1

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flex items-start gap-4 p-6 transition-colors duration-300 sm:gap-5 sm:p-8 ${
                  highlighted ? 'bg-brand text-white' : 'bg-background hover:bg-white'
                }`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16 ${
                    highlighted ? 'bg-white text-brand' : 'bg-brand text-white'
                  }`}
                >
                  <Icon className='h-6 w-6 sm:h-7 sm:w-7' />
                </span>

                <div className='min-w-0'>
                  <h3
                    className={`mb-2 text-base font-bold sm:text-lg ${
                      highlighted ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      highlighted ? 'text-white/85' : 'text-muted-foreground'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyUs
