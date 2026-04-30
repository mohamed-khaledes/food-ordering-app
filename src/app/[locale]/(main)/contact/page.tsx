import Banner from '@/components/layouts/banner'
import ContactUs from '@/features/home/contact-us'

export default async function ContactPage() {
  return (
    <>
      <Banner
        eyebrow='Get in touch'
        title='Contact Us'
        description="Have a question or want to place a special order? We'd love to hear from you."
      />
      <ContactUs />
    </>
  )
}
