import { Translations } from '@/types/translations'
import * as z from 'zod'

/** Blank means "reuse the English name", so store `null` rather than `''`. */
const optionalArabic = z
  .string()
  .trim()
  .transform(value => (value.length > 0 ? value : null))
  .nullish()

export const addCategorySchema = (translations: Translations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required
    }),
    nameAr: optionalArabic
  })
}

export const updateCategorySchema = (translations: Translations) => {
  return z.object({
    categoryName: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required
    }),
    categoryNameAr: optionalArabic
  })
}
