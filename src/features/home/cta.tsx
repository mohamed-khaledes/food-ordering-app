'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { useTrans } from '@/lib/translations/client'

const Cta = () => {
  const { global } = useTrans()
  return (
    <section className='py-24 bg-primary text-white text-center'>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-4xl md:text-5xl font-bold mb-6'
      >
        {global['Ready to Eat Clean?']}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='text-lg md:text-xl mb-10 max-w-2xl mx-auto'
      >
        {global['Choose your meal']}
      </motion.p>
      <Link href='/plans'>
        <Button className='px-10 py-6 text-lg rounded-2xl bg-white text-primary font-semibold hover:bg-gray-100 transition'>
          {global['Choose Your Plan']}
        </Button>
      </Link>
    </section>
  )
}

export default Cta
