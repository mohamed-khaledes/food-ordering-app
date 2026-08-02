'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { useProductGallery } from './hooks'

/**
 * Product gallery from 06_single_shop — thumbnail strip pinned top-left over a
 * large image, with prev/next arrows on the sides.
 *
 * Products carry a single image, so the strip repeats the one shot until the
 * model grows a gallery relation.
 */
const ProductGallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const { product } = useTrans()
  const { active, current, goTo, next, previous, hasMultiple } = useProductGallery(images)

  return (
    <div className='relative flex items-center justify-center  p-6 md:p-10'>
      {/* Thumbnails */}
      {hasMultiple && (
        <div className='absolute start-6 top-6 z-10 flex gap-2'>
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
              className={`h-14 w-14 overflow-hidden border bg-white p-1 transition-colors ${
                i === active ? 'border-brand' : 'border-transparent hover:border-brand/40'
              }`}
            >
              <img src={src} alt='' className='h-full w-full object-contain' />
            </button>
          ))}
        </div>
      )}

      <img src={current} alt={alt} className='h-[320px] w-full object-contain md:h-[400px]' />

      {hasMultiple && (
        <>
          <button
            onClick={previous}
aria-label={product.previousImage}
            className='absolute start-4 flex h-9 w-9 items-center justify-center rounded-full border border-brand/40 bg-white text-brand transition-colors hover:bg-brand hover:text-white'
          >
            <ChevronLeft className='h-4 w-4 rtl:rotate-180' />
          </button>
          <button
            onClick={next}
            aria-label={product.nextImage}
            className='absolute end-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark'
          >
            <ChevronRight className='h-4 w-4 rtl:rotate-180' />
          </button>
        </>
      )}
    </div>
  )
}

export default ProductGallery
