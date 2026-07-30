'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from '@/components/link'
import { useTrans } from '@/lib/translations/client'
import { Routes } from '@/constants/enums'
import { IMAGES } from '@/constants/images'
import { Play } from 'lucide-react'
import { Container } from '@/components/ui/container'

/**
 * Full-bleed dark band with a play affordance — the "Need Any Organic Fresh
 * Food?" strip in the design.
 */
const Cta = () => {
  const { global } = useTrans()

  return (
    <section className='relative overflow-hidden bg-forest text-white'>
      {/* Photographic backdrop, darkened so the copy stays readable */}
      <img
        src={IMAGES.ctaBackground}
        alt=''
        aria-hidden
        loading='lazy'
        className='absolute inset-0 h-full w-full object-cover'
      />
      <span aria-hidden className='absolute inset-0 bg-forest/80' />

      <Container className='relative flex flex-col items-start gap-10 py-20 md:flex-row md:items-center md:justify-between md:py-28'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-lg'
        >
          <h2 className='mb-4 text-[26px] font-bold leading-tight sm:text-[30px] md:text-[42px]'>
            {global['Ready to Eat Clean?']}
          </h2>
          <p className='mb-8 text-white/70'>{global['Choose your meal']}</p>

          <div className='flex flex-wrap gap-3'>
            <Link href={`/${Routes.MENU}`} className='btn-brand px-8'>
              {global['Choose Your Plan']}
            </Link>
            <Link
              href={`/${Routes.CONTACT}`}
              className='inline-flex items-center justify-center border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10'
            >
              {global.contact}
            </Link>
          </div>
        </motion.div>

        {/* Play button ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className='relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-white/25 md:mx-0 md:h-40 md:w-40'
        >
          <span className='absolute inset-0 animate-ping rounded-full border border-white/10' />
          <span className='flex h-16 w-16 items-center justify-center rounded-full bg-white text-forest'>
            <Play className='ms-1 h-6 w-6 fill-current rtl:ms-0 rtl:me-1 rtl:rotate-180' />
          </span>
        </motion.div>
      </Container>
    </section>
  )
}

export default Cta
