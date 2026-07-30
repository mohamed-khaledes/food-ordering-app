'use client'

import { formatCurrency } from '@/lib/helpers'
import { ExtraIngredients, ProductSizes } from '@prisma/client'
import { useTrans } from '@/lib/translations/client'
import { cn } from '@/lib/utils'

export type Filters = {
  categories: string[]
  maxPrice: number
  sizes: ProductSizes[]
  extras: ExtraIngredients[]
}

/**
 * Faceted filter rail from 05_shop_list.
 *
 * The template filters by colour and by free-text tags; neither exists on the
 * Product model, so those two panels map onto the fields that do — sizes and
 * extra ingredients.
 */
const FiltersSidebar = ({
  categories,
  filters,
  priceBounds,
  onChange,
  onReset,
  className
}: {
  categories: { id: string; name: string; count: number }[]
  filters: Filters
  priceBounds: { min: number; max: number }
  onChange: (next: Filters) => void
  onReset: () => void
  /** Lets the mobile filter sheet drop the rail's own border and padding. */
  className?: string
}) => {
  const { filters: t } = useTrans()

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value]

  return (
    <aside className={cn('border border-border bg-background p-6', className)}>
      {/* Categories */}
      <section>
        <h3 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
          {t.categories}
        </h3>
        <ul className='flex flex-col gap-2.5'>
          {categories.map(category => {
            const checked = filters.categories.includes(category.name)
            return (
              <li key={category.id}>
                <label className='flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-brand'>
                  <input
                    type='checkbox'
                    checked={checked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        categories: toggle(filters.categories, category.name)
                      })
                    }
                    className='h-4 w-4 shrink-0 accent-[var(--brand)]'
                  />
                  <span className='capitalize'>{category.name}</span>
                  <span className='ms-auto text-xs'>({category.count})</span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Price */}
      <section className='mt-8'>
        <h3 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
          {t.price}
        </h3>
        <input
          type='range'
          min={priceBounds.min}
          max={priceBounds.max}
          value={filters.maxPrice}
          onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          aria-label={t.maxPrice}
          className='w-full accent-[var(--brand)]'
        />
        <p className='mt-2 text-sm text-muted-foreground'>
          {t.from} {formatCurrency(priceBounds.min)} {t.to}{' '}
          <span className='font-medium text-foreground'>{formatCurrency(filters.maxPrice)}</span>
        </p>
      </section>

      {/* Sizes — stands in for the template's colour swatches */}
      <section className='mt-8'>
        <h3 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
          {t.size}
        </h3>
        <div className='flex flex-wrap gap-x-5 gap-y-2.5'>
          {Object.values(ProductSizes).map(size => {
            const checked = filters.sizes.includes(size)
            return (
              <label
                key={size}
                className='flex cursor-pointer items-center gap-2 text-sm capitalize text-muted-foreground transition-colors hover:text-brand'
              >
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={() => onChange({ ...filters, sizes: toggle(filters.sizes, size) })}
                  className='h-4 w-4 accent-[var(--brand)]'
                />
                {size.toLowerCase()}
              </label>
            )
          })}
        </div>
      </section>

      {/* Extras — stands in for the template's related tags */}
      <section className='mt-8'>
        <h3 className='mb-4 border-b border-border pb-3 text-base font-bold text-foreground'>
          {t.tags}
        </h3>
        <div className='flex flex-wrap gap-2'>
          {Object.values(ExtraIngredients).map(extra => {
            const active = filters.extras.includes(extra)
            return (
              <button
                key={extra}
                type='button'
                onClick={() => onChange({ ...filters, extras: toggle(filters.extras, extra) })}
                className={`rounded-full border px-3.5 py-1.5 text-xs capitalize transition-colors ${
                  active
                    ? 'border-brand bg-brand text-white'
                    : 'border-brand/40 text-muted-foreground hover:border-brand hover:text-brand'
                }`}
              >
                {extra.toLowerCase()}
              </button>
            )
          })}
        </div>
      </section>

      <button
        type='button'
        onClick={onReset}
        className='mt-8 w-full border border-border py-2.5 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand'
      >
        {t.reset}
      </button>
    </aside>
  )
}

export default FiltersSidebar
