import Hero from './hero'
import Featured from './featured'
import WhyUs from './why-us'
import Cta from './cta'
import About from './about'
import ContactUs from './contact-us'

export default function Landing() {
  return (
    <div className='w-full overflow-hidden bg-white text-gray-900'>
      {/* Hero Section */}
      <Hero />
      {/* Featured Meals */}
      <Featured />
      {/* Why Us Section */}
      <WhyUs />
      {/* CTA Section */}
      <Cta />
      {/*about */}
      <About />
      {/*contact us */}
      <ContactUs />
    </div>
  )
}
