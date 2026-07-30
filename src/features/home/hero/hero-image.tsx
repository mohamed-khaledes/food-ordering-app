'use client'
import React from 'react'
import { motion } from 'framer-motion'
import heroImg from '../../../../public/assets/items/Grilled Salmon Bowl.png'
const HeroImage = () => {
  return (
    <div className='relative order-first flex items-center justify-center md:order-last lg:min-h-[500px]'>
      {/* Soft halo behind the product shot */}
      <div className='pointer-events-none absolute w-[280px] lg:w-[420px] xl:w-[500px] rounded-full bg-brand/10 blur-2xl' />
      <motion.img
        src={heroImg.src || ''}
        alt='Healthy meal'
        className='relative w-[280px] object-contain lg:w-[420px] xl:w-[500px]'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ animation: 'float 6s ease-in-out infinite' }}
        loading='lazy'
      />
    </div>
  )
}

export default HeroImage
