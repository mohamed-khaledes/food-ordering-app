import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import ContactUs from '@/features/home/contact-us'
import { getTrans } from '@/lib/translations/server'
import type { Metadata } from 'next'
import { Languages, Routes } from '@/constants/enums'
import { pageMetadata } from '@/constants/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === Languages.ARABIC

  return pageMetadata({
    locale,
    path: `/${Routes.CONTACT}`,
    title: isArabic ? 'اتصل بنا' : 'Contact Us',
    description: isArabic
      ? 'أسئلة عن طلبك أو عن التوصيل أو الطلبات الكبيرة؟ راسل فريق أكلة وسنرد عليك في نفس اليوم.'
      : 'Questions about an order, delivery, or catering? Send the Akla team a message and we will reply the same day.'
  })
}

export default async function ContactPage() {
  const { global } = await getTrans()

  return (
    <>
      <Banner
        title={global.contact}
        crumbs={[{ label: global.home, href: '/' }, { label: global.contact }]}
      />
      <ContactUs />
      <PartnersStrip />
    </>
  )
}
