'use client'
import React from 'react'
import { motion } from 'framer-motion'
import heroImg from '@public/assets/images/hero.png'

const HeroImage = () => {
  return (
    <motion.div
      className='relative order-first md:order-last mx-auto'
      initial={{ opacity: 0, scale: 0.9, x: 150 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.div
        className='absolute inset-0 bg-primary/30 blur-3xl rounded-full'
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <img
        src={heroImg.src}
        alt='Healthy Meal'
        className='relative rounded-full shadow-2xl w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]'
        loading='lazy'
      />
    </motion.div>
  )
}

export default HeroImage
