'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/helpers'
import AddToCart from './cart/add-to-cart'

const Card = ({
  item,
  key = 1,
  isAdmin = false
}: {
  item: any
  key: number | string
  isAdmin?: boolean
}) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: +key * 0.1 }}
      className='group w-full flex flex-col bg-background rounded-3xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:-translate-y-1.5'
    >
      {/* Image */}
      <div className='relative overflow-hidden bg-white h-[220px]'>
        <motion.img
          src={item?.image || null}
          alt={`Meal ${item?.id}`}
          className='w-full h-full object-contain'
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading='lazy'
        />
        {/* Price badge overlaid on image */}
        <div className='absolute top-3 right-3 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1'>
          <span className='text-sm font-semibold text-foreground'>
            {formatCurrency(item?.basePrice)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-5'>
        {/* Name + category */}
        <div className='mb-2'>
          <h3 className='text-base font-bold leading-snug first-letter:uppercase'>{item?.name}</h3>
          {item?.category && (
            <span className='text-xs text-muted-foreground uppercase tracking-widest mt-0.5 inline-block'>
              {item.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className='text-sm text-muted-foreground leading-relaxed flex-1 mb-4'>
          {item?.description?.slice(0, 90)}
          {item?.description?.length > 90 && '...'}
        </p>

        {/* Divider */}
        <div className='border-t border-border mb-4' />

        {/* Footer */}
        {!isAdmin ? (
          <AddToCart item={item} />
        ) : (
          <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground uppercase tracking-widest'>
              Admin view
            </span>
            <strong className='text-sm font-semibold'>{formatCurrency(item?.basePrice)}</strong>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Card
