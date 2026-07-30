import Banner from '@/components/layouts/banner'
import PartnersStrip from '@/components/layouts/partners-strip'
import About from '@/features/home/about'
import Cta from '@/features/home/cta'
import Counters from '@/features/home/counters'
import Team from '@/features/about/team'
import Testimonials from '@/features/about/testimonials'
import LatestBlog from '@/features/blog/latest'
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
    path: `/${Routes.ABOUT}`,
    title: isArabic ? 'من نحن' : 'About Us',
    description: isArabic
      ? 'تعرّف على قصة أكلة: من أين نحصل على مكوناتنا، الفريق الذي يطبخ لك، ولماذا يثق بنا آلاف العملاء في مصر.'
      : 'The story behind Akla — where we source our ingredients, the team who cooks for you, and why thousands of customers across Egypt order with us.'
  })
}

export default async function AboutPage() {
  const { global } = await getTrans()

  return (
    <>
      <Banner
        title={global.about}
        crumbs={[{ label: global.home, href: '/' }, { label: global.about }]}
      />
      <About />
      <Cta />
      <Team />
      <Testimonials />
      <LatestBlog />
      <Counters />
      <PartnersStrip />
    </>
  )
}
