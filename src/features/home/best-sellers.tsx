import Menu from '@/features/menu'
import MainHead from '@/components/ui/main-head'
import { getBestSellers } from '@/server/db/products'
import { getTrans } from '@/lib/translations/server'

async function BestSellers() {
  const products = await getBestSellers(3)
  const {
    home: { bestSeller }
  } = await getTrans()
  return (
    <section className='section-gap'>
      <div className='container'>
        <div className='text-center mb-4'>
          <MainHead subTitle={bestSeller.checkOut} title={bestSeller.OurBestSellers} />
        </div>
        <Menu items={products} />
      </div>
    </section>
  )
}

export default BestSellers
