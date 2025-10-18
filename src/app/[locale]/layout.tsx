import type { Metadata } from 'next'
import { Roboto, Cairo } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'
import ReduxProvider from '@/providers/redux-provider'
import { Directions, Languages } from '@/constants/enums'
import { Locale } from '@/i18n.config'

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }]
}
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true
})

const cairo = Cairo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true
})

export const metadata: Metadata = {
  title: 'Food ordering',
  description: 'food ordering app'
}

export default async function RootLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const locale = (await params).locale
  return (
    <html lang={locale} dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}>
      <body className={locale === Languages.ARABIC ? cairo.className : roboto.className}>
        <ReduxProvider>
          <Header />
          <main className='min-h-screen'>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
