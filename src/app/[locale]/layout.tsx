import '../globals.css'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toast'
import { Roboto, Cairo } from 'next/font/google'
import { LoadingPage } from '@/components/ui/loading'
import ReduxProvider from '@/providers/redux-provider'
import { Directions, Languages } from '@/constants/enums'
import ScrollToTopBtn from '@/components/ui/scroll-to-top'
import NextAuthSessionProvider from '@/providers/NextAuthSessionProvider'

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
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body
        className={locale === Languages.ARABIC ? cairo.className : roboto.className}
        suppressHydrationWarning
      >
        <Suspense fallback={<LoadingPage />}>
          <NextAuthSessionProvider>
            <ReduxProvider>
              <main className='min-h-screen'>{children}</main>
              <Toaster />
              <ScrollToTopBtn />
            </ReduxProvider>
          </NextAuthSessionProvider>
        </Suspense>
      </body>
    </html>
  )
}
