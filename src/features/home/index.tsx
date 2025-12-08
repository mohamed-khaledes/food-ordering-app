import dynamic from 'next/dynamic'
const Featured = dynamic(() => import('./featured'))
const Cta = dynamic(() => import('./cta'))
const About = dynamic(() => import('./about'))
const ContactUs = dynamic(() => import('./contact-us'))
const WhyUs = dynamic(() => import('./why-us'))
const Hero = dynamic(() => import('./hero'))

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
