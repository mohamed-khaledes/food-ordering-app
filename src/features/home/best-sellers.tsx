import Menu from '@/features/menu'
import MainHead from '@/components/ui/main-head'
import { getBestSellers } from '@/server/db/products'

async function BestSellers() {
  const products = await getBestSellers(3)
  return (
    <section className='section-gap'>
      <div className='container'>
        <div className='text-center mb-4'>
          <MainHead subTitle={'checkOut'} title={'Our Best Sellers'} />
        </div>
        <Menu items={products} />
      </div>
    </section>
  )
}

export default BestSellers
