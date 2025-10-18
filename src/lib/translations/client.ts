// ✅ client-safe version (no 'server-only', no headers)
import en from '@/dictionaries/en.json'
import ar from '@/dictionaries/ar.json'
import { Languages } from '@/constants/enums'
import { useParams } from 'next/navigation'

export const useTrans = () => {
  const { locale } = useParams()
  switch (locale) {
    case Languages.ARABIC:
    case 'ar':
      return ar
    default:
      return en
  }
}
