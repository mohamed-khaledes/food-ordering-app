'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/helpers'
import AddToCart from './cart/add-to-cart'

const Card = ({
  item,
  key,
  isAdmin = false
}: {
  item: any
  key: number | string
  isAdmin?: boolean
}) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: +key * 0.2 }}
      className='flex md:flex-col bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1'
    >
      {/* Image Wrapper with hover animation */}
      <motion.img
        src={item?.image || null}
        alt={`Meal ${item?.id}`}
        className='object-cover w-[150px] md:w-[250px] h-[150px] md:h-[250px] mx-auto my-auto'
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        loading='lazy'
      />
      <div className='p-3 md:p-6 text-start'>
        <div className='flex items-center justify-between mb-4 mt-4'>
          <h3 className='text-md md:text-xl font-semibold mb-2 first-letter:uppercase'>
            {item?.name}
          </h3>
          <strong className='text-accent text-md md:text-lg bg-accent/10 px-3 py-1 rounded-full'>
            {formatCurrency(item?.basePrice)}
          </strong>
        </div>
        <p className='text-gray-600 text-sm mb-4'>{item?.description?.slice(0, 80)}</p>
        {!isAdmin && <AddToCart item={item} />}
      </div>
    </motion.div>
  )
}

export default Card
