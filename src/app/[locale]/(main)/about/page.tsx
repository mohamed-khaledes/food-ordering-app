import Banner from '@/components/layouts/banner'
import About from '@/features/home/about'
import ContactUs from '@/features/home/contact-us'

export default async function AboutPage() {
  return (
    <>
      <Banner
        eyebrow='Our story'
        title='About Akla'
        description='We started with a simple belief — healthy food should never feel like a compromise.'
        stats={[
          { n: '2018', l: 'Founded' },
          { n: '50+', l: 'Team members' },
          { n: '12k+', l: 'Customers' }
        ]}
      />
      {/*about */}
      <About />
      {/*contact us */}
      <ContactUs />
    </>
  )
}
