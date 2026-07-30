'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/helpers'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Link from '@/components/link'
import { Routes } from '@/constants/enums'
import { IMAGES } from '@/constants/images'
import { useTrans } from '@/lib/translations/client'
import AddToCart from './cart/add-to-cart'

/**
 * Circular hover/inline actions shared by both card layouts.
 *
 * The cart icon opens the add-to-cart dialog in place; the eye icon navigates
 * to the product's own page.
 */
const CardActions = ({ item, className = '' }: { item: any; className?: string }) => {
  const { product } = useTrans()
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <AddToCart
        item={item}
        trigger={
          <button
            type='button'
            aria-label={product.addToCart}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground/70 shadow-md transition-colors hover:bg-brand hover:text-white'
          >
            <ShoppingCart className='h-4 w-4' />
          </button>
        }
      />

      <span className='flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-md'>
        <Heart className='h-4 w-4' />
      </span>

      <Link
        href={`/${Routes.MENU}/${item?.id}`}
        aria-label={product.viewDetails}
        className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground/70 shadow-md transition-colors hover:bg-brand hover:text-white'
      >
        <Eye className='h-4 w-4' />
      </Link>
    </div>
  )
}

/**
 * Product tile. `layout="grid"` is the square tile from the shop grid;
 * `layout="list"` is the wide row from 05_shop_list.
 *
 * Both layouts are horizontal below `sm`. Every grid call site is a single
 * column on mobile, where a stacked tile runs ~320px tall — a row keeps the
 * list scannable and, because touch has no hover, gives the actions somewhere
 * visible to live.
 *
 * The template shows a star rating and a "-29%" badge on every card; neither
 * exists on the Product model, so the meta line falls back to the category.
 */
const Card = ({
  item,
  index = 0,
  isAdmin = false,
  layout = 'grid'
}: {
  item: any
  /** Position in the grid — drives the stagger on scroll-in. */
  index?: number
  isAdmin?: boolean
  layout?: 'grid' | 'list'
}) => {
  const categoryName = typeof item?.category === 'string' ? item.category : item?.category?.name
  const image = item?.image || IMAGES.productFallback

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay: Math.min(index, 8) * 0.06 }
  }

  // ── Horizontal row ────────────────────────────────────────
  if (layout === 'list') {
    return (
      <motion.div
        {...motionProps}
        className='group flex flex-row border border-border bg-background transition-all duration-300 hover:border-brand hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]'
      >
        <Link
          href={`/${Routes.MENU}/${item?.id}`}
          className='flex min-h-[164px] w-[118px] shrink-0 self-stretch items-center justify-center overflow-hidden bg-white p-3 sm:min-h-[200px] sm:w-[220px] sm:p-5'
        >
          <img
            src={image}
            alt={item?.name ?? 'item'}
            loading='lazy'
            className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
          />
        </Link>

        <div className='flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3.5 sm:gap-2 sm:p-5'>
          <Link href={`/${Routes.MENU}/${item?.id}`}>
            <h3 className='line-clamp-2 text-[15px] font-bold capitalize leading-snug text-foreground transition-colors hover:text-brand sm:line-clamp-none sm:text-lg'>
              {item?.name}
            </h3>
          </Link>

          <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
            <span className='text-[15px] font-bold text-brand'>
              {formatCurrency(item?.basePrice)}
            </span>
            {categoryName && (
              <span className='text-[11px] uppercase tracking-widest text-muted-foreground'>
                {categoryName}
              </span>
            )}
          </div>

          {item?.description && (
            <p className='line-clamp-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm'>
              {item.description}
            </p>
          )}

          {!isAdmin && <CardActions item={item} className='mt-1' />}
        </div>
      </motion.div>
    )
  }

  // ── Square tile ───────────────────────────────────────────
  return (
    <motion.div
      {...motionProps}
      className='group flex h-full w-full flex-row border border-border bg-background transition-all duration-300 hover:border-brand hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] sm:flex-col sm:border-0'
    >
      <div className='relative flex min-h-[164px] w-[118px] shrink-0 self-stretch items-center justify-center overflow-hidden bg-white p-3 sm:h-[200px] sm:min-h-0 sm:w-full sm:p-6 md:h-[230px]'>
        <Link
          href={`/${Routes.MENU}/${item?.id}`}
          className='flex h-full w-full items-center justify-center'
        >
          <img
            src={image}
            alt={item?.name ?? 'product'}
            loading='lazy'
            className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
          />
        </Link>

        {/* Hover reveal only where hover exists — see the inline copy below. */}
        {!isAdmin && (
          <div className='absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex'>
            <CardActions item={item} />
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-1.5 p-3.5 sm:px-5 sm:pb-5 sm:pt-0'>
        {categoryName && (
          <span className='text-[11px] uppercase tracking-widest text-muted-foreground'>
            {categoryName}
          </span>
        )}

        <Link href={`/${Routes.MENU}/${item?.id}`}>
          <h3 className='line-clamp-2 text-[15px] font-bold capitalize leading-snug text-foreground transition-colors hover:text-brand sm:line-clamp-none'>
            {item?.name}
          </h3>
        </Link>

        {item?.description && (
          <p className='line-clamp-2 text-[13px] leading-relaxed text-muted-foreground'>
            {item.description}
          </p>
        )}

        <div className='mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 sm:pt-3'>
          <span className='text-[15px] font-bold text-foreground'>
            {formatCurrency(item?.basePrice)}
          </span>
          {/* Touch has no hover, so the actions are always visible below sm. */}
          {!isAdmin && <CardActions item={item} className='sm:hidden' />}
        </div>
      </div>
    </motion.div>
  )
}

export default Card
