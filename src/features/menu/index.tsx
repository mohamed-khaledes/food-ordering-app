'use client'
import { Product } from '@prisma/client'
import Card from '../shared/card'
import FiltersSidebar, { Filters } from './filters-sidebar'
import { useEffect, useMemo, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LayoutGrid, List, Search, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Directions, Languages } from '@/constants/enums'
import { cn } from '@/lib/utils'

/**
 * Toolbar sizing for `SelectTrigger`. The height goes through the same
 * `data-[size=…]` variant the component uses, otherwise its `h-9` wins on
 * specificity and the control lands under the 44px touch target on mobile.
 */
const TRIGGER =
  'w-auto min-w-0 gap-2 rounded-lg border-border px-3 text-sm text-muted-foreground shadow-none ' +
  'data-[size=default]:h-11 sm:data-[size=default]:h-10 ' +
  'focus-visible:border-brand focus-visible:ring-0'

type SortKey = 'best' | 'price-asc' | 'price-desc' | 'name'

const PER_PAGE_OPTIONS = [8, 12, 24]

const emptyFilters = (maxPrice: number): Filters => ({
  categories: [],
  maxPrice,
  sizes: [],
  extras: []
})

function Menu({ categories }: { categories: any[] }) {
  const { shop } = useTrans()

  const SORTS: { value: SortKey; label: string }[] = [
    { value: 'best', label: shop.sort.best },
    { value: 'price-asc', label: shop.sort.priceAsc },
    { value: 'price-desc', label: shop.sort.priceDesc },
    { value: 'name', label: shop.sort.name }
  ]

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { locale } = useParams()
  // Radix reads direction from a prop, not from the document's `dir`.
  const dir = locale === Languages.ARABIC ? Directions.RTL : Directions.LTR

  const allProducts = useMemo(
    () =>
      (categories ?? []).flatMap(category =>
        (category?.Product ?? []).map((product: Product) => ({
          ...product,
          categoryName: category.name
        }))
      ),
    [categories]
  )

  const priceBounds = useMemo(() => {
    const prices = allProducts.map((p: any) => p.basePrice)
    return {
      min: 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 100
    }
  }, [allProducts])

  const [filters, setFilters] = useState<Filters>(() => emptyFilters(priceBounds.max))
  const [sort, setSort] = useState<SortKey>('best')
  const [perPage, setPerPage] = useState(12)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // The header popup and this page share one source of truth: the `q` param.
  const urlQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)
  useEffect(() => {
    setQuery(urlQuery)
    setPage(1)
  }, [urlQuery])

  // Price ceiling is only known once products load.
  useEffect(() => {
    setFilters(current => ({ ...current, maxPrice: priceBounds.max }))
  }, [priceBounds.max])

  /** Push the local search box back into the URL so both inputs agree. */
  const commitQuery = (value: string) => {
    setQuery(value)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) params.set('q', value.trim())
    else params.delete('q')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const products = useMemo(() => {
    let list = allProducts

    if (filters.categories.length > 0) {
      list = list.filter((p: any) => filters.categories.includes(p.categoryName))
    }

    if (query.trim()) {
      const needle = query.trim().toLowerCase()
      list = list.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(needle) || p.description?.toLowerCase().includes(needle)
      )
    }

    list = list.filter((p: any) => p.basePrice <= filters.maxPrice)

    if (filters.sizes.length > 0) {
      list = list.filter((p: any) => p.sizes?.some((s: any) => filters.sizes.includes(s.name)))
    }

    if (filters.extras.length > 0) {
      list = list.filter((p: any) => p.extras?.some((e: any) => filters.extras.includes(e.name)))
    }

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a: any, b: any) => a.basePrice - b.basePrice)
    if (sort === 'price-desc') sorted.sort((a: any, b: any) => b.basePrice - a.basePrice)
    if (sort === 'name') sorted.sort((a: any, b: any) => a.name.localeCompare(b.name))
    return sorted
  }, [allProducts, filters, query, sort])

  const totalPages = Math.max(1, Math.ceil(products.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const visible = products.slice((currentPage - 1) * perPage, currentPage * perPage)

  const sidebarCategories = (categories ?? []).map(c => ({
    id: c.id,
    name: c.name,
    count: c.Product?.length ?? 0
  }))

  /** Badge on the mobile filter button, so a collapsed sheet still shows state. */
  const activeFilterCount =
    filters.categories.length +
    filters.sizes.length +
    filters.extras.length +
    (filters.maxPrice < priceBounds.max ? 1 : 0)

  const reset = () => {
    setFilters(emptyFilters(priceBounds.max))
    setSort('best')
    commitQuery('')
  }

  if (!categories || categories.length < 1) {
    return (
      <div className='flex flex-col items-center justify-center gap-3 py-24'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft'>
          <UtensilsCrossed className='h-6 w-6 text-brand' />
        </div>
        <p className='text-sm text-muted-foreground'>{shop.noMatch}</p>
      </div>
    )
  }

  return (
    <div className='section-y'>
      {/* ── Toolbar ──────────────────────────────────────── */}
      <div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6'>
        <div className='min-w-0'>
          <h2 className='truncate text-lg font-bold text-foreground sm:text-xl'>
            {query ? `${shop.resultsFor} “${query}”` : shop.heading}
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            {products.length} {products.length === 1 ? shop.resultCount : shop.resultsCount}
          </p>
        </div>

        {/*
         * One wrapping row. The search field is `w-full` on mobile so it claims
         * a line of its own and the remaining controls wrap beneath it.
         */}
        <div className='flex flex-wrap items-center gap-2.5 lg:justify-end'>
          <form
            onSubmit={e => {
              e.preventDefault()
              commitQuery(query)
            }}
            className='flex h-11 w-full overflow-hidden rounded-lg border border-border focus-within:border-brand sm:h-10 sm:w-auto'
          >
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onBlur={() => commitQuery(query)}
              placeholder={shop.search}
              aria-label={shop.searchAria}
              className='min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground sm:w-40 sm:flex-none'
            />
            <button
              type='submit'
              aria-label={shop.search}
              className='flex w-11 shrink-0 items-center justify-center bg-brand text-white transition-colors hover:bg-brand-dark sm:w-10'
            >
              <Search className='h-4 w-4' />
            </button>
          </form>

          <button
            type='button'
            onClick={() => setShowFilters(true)}
            className='flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand sm:h-10 lg:hidden'
          >
            <SlidersHorizontal className='h-4 w-4 shrink-0' />
            <span className='truncate'>{shop.filters}</span>
            {activeFilterCount > 0 && (
              <span className='flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white'>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort — takes the slack on the wrapped mobile row. */}
          <Select
            dir={dir}
            value={sort}
            onValueChange={value => {
              setSort(value as SortKey)
              setPage(1)
            }}
          >
            <SelectTrigger aria-label={shop.sortBy} className={cn(TRIGGER, 'flex-1 sm:flex-none')}>
              <span className='flex min-w-0 items-center gap-2'>
                {/* No room for the label beside the value at ~164px. */}
                <span className='hidden shrink-0 sm:inline'>{shop.sortBy}</span>
                {/* Items live in a portal that isn't mounted yet, so Radix
                    can't resolve the label itself — pass it in. */}
                <SelectValue>{SORTS.find(s => s.value === sort)?.label}</SelectValue>
              </span>
            </SelectTrigger>
            <SelectContent align='start'>
              {SORTS.map(s => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            dir={dir}
            value={String(perPage)}
            onValueChange={value => {
              setPerPage(Number(value))
              setPage(1)
            }}
          >
            <SelectTrigger aria-label={shop.perPage} className={cn(TRIGGER, 'shrink-0')}>
              <span className='flex min-w-0 items-center gap-2'>
                <span className='hidden shrink-0 sm:inline'>{shop.perPage}</span>
                <SelectValue>{perPage}</SelectValue>
              </span>
            </SelectTrigger>
            <SelectContent align='start'>
              {PER_PAGE_OPTIONS.map(n => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Below sm both card layouts render as rows, so the toggle is a no-op. */}
          <div className='hidden overflow-hidden rounded-lg border border-border sm:flex'>
            <button
              onClick={() => setLayout('grid')}
              aria-label={shop.gridView}
              aria-pressed={layout === 'grid'}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                layout === 'grid' ? 'bg-brand text-white' : 'text-muted-foreground hover:bg-haze'
              }`}
            >
              <LayoutGrid className='h-4 w-4' />
            </button>
            <button
              onClick={() => setLayout('list')}
              aria-label={shop.listView}
              aria-pressed={layout === 'list'}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                layout === 'list' ? 'bg-brand text-white' : 'text-muted-foreground hover:bg-haze'
              }`}
            >
              <List className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter sheet (below lg, where there's no room for the rail) ──── */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent
          side='bottom'
          showCloseButton={false}
          className='max-h-[88vh] gap-0 p-0 lg:hidden'
        >
          <div className='flex items-center justify-between border-b border-border px-5 py-4'>
            <SheetTitle className='text-base'>{shop.filters}</SheetTitle>
            <SheetClose
              aria-label={shop.closeFilters}
              className='flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-haze'
            >
              <X className='h-4 w-4' />
            </SheetClose>
          </div>

          <div className='flex-1 overflow-y-auto px-5 py-5'>
            <FiltersSidebar
              className='border-0 p-0'
              categories={sidebarCategories}
              filters={filters}
              priceBounds={priceBounds}
              onChange={next => {
                setFilters(next)
                setPage(1)
              }}
              onReset={reset}
            />
          </div>

          <div className='border-t border-border px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'>
            <button
              type='button'
              onClick={() => setShowFilters(false)}
              className='btn-brand w-full rounded-lg'
            >
              {shop.showResults} ({products.length})
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Sidebar + results ────────────────────────────── */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]'>
        {/* Inline rail only where it fits; below lg the same panel is a sheet. */}
        <div className='hidden lg:block'>
          <FiltersSidebar
            categories={sidebarCategories}
            filters={filters}
            priceBounds={priceBounds}
            onChange={next => {
              setFilters(next)
              setPage(1)
            }}
            onReset={reset}
          />
        </div>

        <div>
          {visible.length > 0 ? (
            <ul
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3'
                  : 'flex flex-col gap-4 sm:gap-6'
              }
            >
              {visible.map((item: any, i: number) => (
                <li key={item.id}>
                  <Card item={{ ...item, category: item.categoryName }} index={i} layout={layout} />
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 py-24'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft'>
                <Search className='h-6 w-6 text-brand' />
              </div>
              <p className='text-sm font-medium'>{shop.noMatch}</p>
              <button
                onClick={reset}
                className='text-sm text-brand underline-offset-4 hover:underline'
              >
                {shop.clearFilters}
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className='mt-12 flex flex-wrap items-center justify-center gap-2'
              aria-label={shop.pagination}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? 'page' : undefined}
                  className={`h-10 w-10 rounded-full border text-sm transition-colors ${
                    n === currentPage
                      ? 'border-brand bg-brand text-white'
                      : 'border-border text-muted-foreground hover:border-brand hover:text-brand'
                  }`}
                >
                  {n}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export default Menu
