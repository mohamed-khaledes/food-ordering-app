import Link from '@/components/link'
import { Container } from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import { Routes } from '@/constants/enums'
import { getProductsByCategory } from '@/server/db/products'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { localizeCategories } from '@/lib/localize'
import { UtensilsCrossed } from 'lucide-react'

/**
 * Dark forest band with a white card of category shortcuts overlapping its
 * lower edge — the "Top Catagories" section of the design.
 */
const TopCategories = async () => {
  const [raw, locale, { sections }] = await Promise.all([
    getProductsByCategory(),
    getCurrentLocale(),
    getTrans()
  ])
  const categories = localizeCategories(raw, locale)

  if (!categories || categories.length === 0) return null

  return (
    <section className='relative'>
      {/* Dark band — the card below overlaps its bottom edge */}
      <div className='bg-forest pb-40 pt-16 md:pt-20'>
        <Container>
          <SectionHeading
            title={sections.categories.title}
            subtitle={sections.categories.subtitle}
            tone='light'
            className='mb-0'
          />
        </Container>
      </div>

      {/* Overlapping white card */}
      <Container className='relative -mt-32 pb-7 md:pb-20'>
        <div className='bg-background p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)] sm:p-8 md:p-12'>
          <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5'>
            {categories.slice(0, 5).map(category => (
              <li key={category.id}>
                <Link
                  href={`/${Routes.MENU}`}
                  className='group flex flex-col items-center gap-3 text-center'
                >
                  <span className='flex h-16 w-16 items-center justify-center rounded-full bg-cream transition-colors duration-300 group-hover:bg-brand-soft sm:h-20 sm:w-20'>
                    <UtensilsCrossed className='h-7 w-7 text-brand sm:h-8 sm:w-8' />
                  </span>
                  <span className='font-bold capitalize text-foreground transition-colors group-hover:text-brand'>
                    {category.name}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    ({category.Product?.length ?? 0} {sections.categories.itemsCount})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default TopCategories
