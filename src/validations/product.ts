import { Translations } from '@/types/translations'
import { z } from 'zod'

const imageValidation = (translations: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.custom(val => val instanceof File)
    : z.custom(
        val => {
          if (typeof val !== 'object' || !val) {
            return false
          }

          if (!(val instanceof File)) {
            return false
          }

          const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

          const maxSizeInBytes = 250 * 1024 // 250KB

          if (!validMimeTypes.includes(val.type)) {
            return false
          }

          if (val.size > maxSizeInBytes) {
            return false
          }

          return true
        },
        {
          message: translations.admin['menu'].form.image.validation.required
        }
      )
}
/**
 * Arabic copy is optional — the storefront falls back to English when it's
 * blank. An empty input arrives as `''`, which is normalised to `null` so we
 * don't store a whitespace value that the fallback would then treat as real.
 */
const optionalArabic = z
  .string()
  .trim()
  .transform(value => (value.length > 0 ? value : null))
  .nullish()

const getCommonValidations = (translations: Translations) => {
  return {
    name: z.string().trim().min(1, {
      message: translations.admin['menu'].form.name.validation.required
    }),
    nameAr: optionalArabic,
    description: z.string().trim().min(1, {
      message: translations.admin['menu'].form.description.validation.required
    }),
    descriptionAr: optionalArabic,
    basePrice: z.string().min(1, {
      message: translations.admin['menu'].form.basePrice.validation.required
    }),
    categoryId: z.string().min(1, {
      message: translations.admin['menu'].form.category.validation.required
    })
  }
}
export const addProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, true)
  })
}
export const updateProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, false)
  })
}
