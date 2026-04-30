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
      className='group w-full bg-background rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:-translate-y-1 
        flex flex-row md:flex-col'
    >
      {/* Image */}
      <div
        className='relative overflow-hidden bg-white 
        w-[120px] h-[120px] shrink-0
        md:w-full md:h-[220px]'
      >
        <motion.img
          src={item?.image || null}
          alt={`Meal ${item?.id}`}
          className='w-full h-full object-cover'
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading='lazy'
        />
        {/* Price badge — desktop only */}
        <div className='absolute top-3 right-3 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 hidden md:block'>
          <span className='text-sm font-semibold text-foreground'>
            {formatCurrency(item?.basePrice)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-3 md:p-5 min-w-0'>
        {/* Name + price row — mobile */}
        <div className='flex items-start justify-between gap-2 mb-1'>
          <h3 className='text-sm md:text-base font-bold leading-snug first-letter:uppercase truncate'>
            {item?.name}
          </h3>
          {/* Price — mobile only */}
          <span className='text-sm font-bold text-foreground shrink-0 md:hidden'>
            {formatCurrency(item?.basePrice)}
          </span>
        </div>

        {/* Category */}
        {item?.category && (
          <span className='text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mb-1 inline-block'>
            {item.category}
          </span>
        )}

        {/* Description */}
        <p
          className='text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 mb-2 md:mb-4
          line-clamp-2 md:line-clamp-none'
        >
          {item?.description?.slice(0, 90)}
          {item?.description?.length > 90 && '...'}
        </p>

        {/* Divider — desktop only */}
        <div className='border-t border-border mb-3 hidden md:block' />

        {/* Footer */}
        {!isAdmin ? (
          <div className='mt-auto'>
            <AddToCart item={item} />
          </div>
        ) : (
          <div className='flex items-center justify-between mt-auto'>
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
