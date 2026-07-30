import { Languages } from '@/constants/enums'

/**
 * Picks the Arabic value when the locale is Arabic and that value is actually
 * filled in, otherwise falls back to English. Blank strings count as missing,
 * so a half-translated row never renders an empty product name.
 */
export const pickLocale = (locale: string, base: string, arabic?: string | null): string =>
  locale === Languages.ARABIC && arabic && arabic.trim().length > 0 ? arabic : base

type Translatable = {
  name: string
  nameAr?: string | null
  description?: string
  descriptionAr?: string | null
}

/**
 * Collapses the `*Ar` columns into `name`/`description` for one row.
 *
 * Localizing here — at the boundary where storefront code reads the database —
 * rather than in each component means every consumer keeps using `item.name`
 * and gets the right language for free. The admin deliberately does NOT go
 * through this: it needs both languages to edit.
 */
export const localize = <T extends Translatable>(entity: T, locale: string): T => ({
  ...entity,
  name: pickLocale(locale, entity.name, entity.nameAr),
  ...(entity.description !== undefined
    ? { description: pickLocale(locale, entity.description, entity.descriptionAr) }
    : {})
})

/** A category plus the products hanging off it. */
export const localizeCategory = <
  T extends Translatable & { Product?: Translatable[] | null }
>(
  category: T,
  locale: string
): T => ({
  ...localize(category, locale),
  ...(category.Product
    ? { Product: category.Product.map(product => localize(product, locale)) }
    : {})
})

export const localizeAll = <T extends Translatable>(rows: T[], locale: string): T[] =>
  rows.map(row => localize(row, locale))

export const localizeCategories = <
  T extends Translatable & { Product?: Translatable[] | null }
>(
  rows: T[],
  locale: string
): T[] => rows.map(row => localizeCategory(row, locale))
