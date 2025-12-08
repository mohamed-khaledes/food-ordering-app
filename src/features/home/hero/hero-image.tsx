'use client'
import React from 'react'
import { motion } from 'framer-motion'
import streetFoodImg from '@public/assets/images/street-food-still-life.jpg'

const HeroImage = () => {
  return (
    <motion.div
      className='relative'
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
        src={streetFoodImg.src}
        alt='Healthy Meal'
        className='relative rounded-full shadow-2xl w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[600px] xl:h-[600px]'
        loading='lazy'
      />
    </motion.div>
  )
}

export default HeroImage
