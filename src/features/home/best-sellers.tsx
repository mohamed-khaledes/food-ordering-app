import Menu from '@/features/menu'
import MainHead from '@/components/ui/main-head'
import { getBestSellers } from '@/server/db/products'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { Container } from '@/components/ui/container'
import { localizeAll } from '@/lib/localize'

async function BestSellers() {
  const [raw, locale, translations] = await Promise.all([
    getBestSellers(3),
    getCurrentLocale(),
    getTrans()
  ])
  const {
    home: { bestSeller }
  } = translations
  // Swap in Arabic copy before the tiles ever see the rows.
  const products = localizeAll(raw, locale)
  return (
    <section className='section-gap'>
      <Container>
        <div className='text-center mb-4'>
          <MainHead subTitle={bestSeller.checkOut} title={bestSeller.OurBestSellers} />
        </div>
        <Menu categories={products} />
      </Container>
    </section>
  )
}

export default BestSellers
