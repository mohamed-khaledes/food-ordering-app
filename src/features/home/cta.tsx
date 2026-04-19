'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { useTrans } from '@/lib/translations/client'

const stats = [
  { n: '12k+', l: 'Happy customers' },
  { n: '200+', l: 'Weekly meals' },
  { n: '4.9', l: 'Avg. rating' }
]

const Cta = () => {
  const { global } = useTrans()

  return (
    <section className='relative py-24 bg-foreground text-background overflow-hidden'>
      {/* Decorative blobs */}
      <div className='absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/10 pointer-events-none' />
      <div className='absolute -bottom-10 left-1/4 w-40 h-40 rounded-full bg-primary/5 pointer-events-none' />

      <div className='container mx-auto px-6 text-center relative z-10'>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
          <span className='text-xs font-medium text-primary uppercase tracking-widest'>
            Limited time offer
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-4xl md:text-5xl font-bold mb-4 text-background'
        >
          {global['Ready to Eat Clean?']}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-lg md:text-xl mb-10 max-w-2xl mx-auto text-background/60'
        >
          {global['Choose your meal']}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex gap-4 justify-center flex-wrap'
        >
          <Link href='/plans'>
            <Button className='px-10 py-6 text-lg rounded-2xl bg-primary text-foreground font-semibold hover:bg-primary/90 active:scale-[0.98] transition'>
              {global['Choose Your Plan']}
            </Button>
          </Link>
          <Link href='/menu'>
            <Button
              variant='outline'
              className='px-10 py-6 text-lg rounded-2xl bg-transparent border-background/30 text-background hover:bg-background/10 active:scale-[0.98] transition'
            >
              Browse menu →
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-14 flex items-center justify-center gap-10 flex-wrap'
        >
          {stats.map((s, i) => (
            <React.Fragment key={s.l}>
              {i > 0 && <div className='h-8 w-px bg-background/15' />}
              <div>
                <div className='text-2xl font-bold text-primary'>{s.n}</div>
                <div className='text-sm text-background/60'>{s.l}</div>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Cta
