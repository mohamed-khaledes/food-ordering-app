'use client'

import { Directions, Languages } from '@/constants/enums'
import { Product } from '@prisma/client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { Filters } from './filters-sidebar'

export type SortKey = 'best' | 'price-asc' | 'price-desc' | 'name'

export const PER_PAGE_OPTIONS = [8, 12, 24]

/* eslint-disable @typescript-eslint/no-explicit-any */

const emptyFilters = (maxPrice: number): Filters => ({
  categories: [],
  maxPrice,
  sizes: [],
  extras: []
})

/**
 * Everything the shop page does that isn't markup: flattening the category
 * tree, faceted filtering, sorting, pagination, and keeping the search box in
 * step with the `q` param the header popup also writes to.
 */
export function useShopFilters(categories: any[]) {
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
    return { min: 0, max: prices.length ? Math.ceil(Math.max(...prices)) : 100 }
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

  /** Every control that narrows the list sends the reader back to page one. */
  const applyFilters = (next: Filters) => {
    setFilters(next)
    setPage(1)
  }

  const changeSort = (next: SortKey) => {
    setSort(next)
    setPage(1)
  }

  const changePerPage = (next: number) => {
    setPerPage(next)
    setPage(1)
  }

  return {
    dir,
    query,
    setQuery,
    commitQuery,
    filters,
    applyFilters,
    priceBounds,
    activeFilterCount,
    sort,
    changeSort,
    perPage,
    changePerPage,
    layout,
    setLayout,
    showFilters,
    setShowFilters,
    products,
    visible,
    sidebarCategories,
    currentPage,
    totalPages,
    setPage,
    reset
  }
}
