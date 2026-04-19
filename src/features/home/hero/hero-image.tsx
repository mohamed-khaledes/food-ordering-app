'use client'
import React from 'react'
import { motion } from 'framer-motion'
import heroImg from '@public/assets/images/hero-meal.svg'

const badges = [
  {
    icon: '⚡',
    label: '30 min',
    sub: 'Avg. delivery',
    position: 'top-4 right-0'
  },
  {
    icon: '🥗',
    label: '200+ Meals',
    sub: 'Updated weekly',
    position: 'bottom-4 left-0'
  }
]

const HeroImage = () => {
  return (
    <div className='relative order-first md:order-last mx-auto flex items-center justify-center'>
      {/* Orbit ring */}
      <div className='absolute w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] rounded-full border border-dashed border-primary/30 pointer-events-none' />

      {/* Pulsing glow */}
      <motion.div
        className='absolute w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full bg-primary/15'
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main image */}
      <motion.img
        src={heroImg.src}
        alt='Healthy Meal'
        className='relative rounded-full w-[260px] h-[260px] lg:h-[360px] lg:w-[360px] xl:w-[440px] xl:h-[440px] object-cover ring-4 ring-primary/20'
        initial={{ opacity: 0, scale: 0.88, x: 80 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ animation: 'float 5s ease-in-out infinite' }}
        loading='lazy'
      />

      {/* Floating badges */}
      {badges.map(({ icon, label, sub, position }, i) => (
        <motion.div
          key={label}
          className={`absolute ${position} bg-background border border-border rounded-2xl px-3 py-2.5 flex items-center gap-2.5 z-10`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
        >
          <div className='w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center text-base flex-shrink-0'>
            {icon}
          </div>
          <div>
            <p className='text-xs font-semibold text-foreground leading-none mb-0.5'>{label}</p>
            <p className='text-[11px] text-muted-foreground'>{sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default HeroImage
