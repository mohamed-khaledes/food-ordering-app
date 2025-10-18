import 'server-only'

import { Locale } from '@/i18n.config'
import { Languages } from '@/constants/enums'
import { headers } from 'next/headers'

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default)
}
export const getCurrentLocale = async () => {
  const url = (await headers()).get('x-url')
  const locale = url?.split('/')[3] as Locale
  return locale
}
export const getTrans = async () => {
  const locale = await getCurrentLocale()
  return locale === Languages.ARABIC ? dictionaries.ar() : dictionaries.en()
}
