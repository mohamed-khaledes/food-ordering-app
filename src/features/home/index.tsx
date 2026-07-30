import Hero from './hero'
import PromoBanners from './promo-banners'
import Featured from './featured'
import About from './about'
import WhyUs from './why-us'
import HotDeals from './hot-deals'
import TopCategories from './top-categories'
import ProductFacilities from './product-facilities'
import Cta from './cta'
import Faq from './faq'
import Counters from './counters'
import LatestBlog from '@/features/blog/latest'
import FeaturesStrip from './features-strip'

export default function Home() {
  return (
    <div className='w-full overflow-hidden bg-background text-foreground'>
      <Hero />
      <PromoBanners />
      <Featured />
      <About />
      <WhyUs />
      <HotDeals />
      <TopCategories />
      <ProductFacilities />
      <Cta />
      <Faq />
      <Counters />
      <LatestBlog />
      <FeaturesStrip />
    </div>
  )
}
