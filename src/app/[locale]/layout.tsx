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
// SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === Languages.ARABIC

  return {
    metadataBase: new URL('https://akla-pi.vercel.app'),

    title: {
      default: isArabic ? 'أكله | طلب طعام في مصر' : 'Akla | Food Ordering in Egypt',
      template: isArabic ? '%s |أكله' : '%s | Akla'
    },

    description: isArabic
      ? 'أكلة منصة ذكية لطلب الطعام الصحي في مصر. وجبات يحضرها الشيف من مكونات محلية طازجة، مع دفع آمن عبر باي موب وتوصيل سريع لباب منزلك.'
      : 'Akla is a smart food ordering platform in Egypt. Chef-crafted meals with locally sourced ingredients, secure Paymob payments, and fast delivery to your door.',

    keywords: isArabic
      ? [
          'طلب طعام مصر',
          'أكل صحي',
          'توصيل طعام',
          'وجبات صحية',
          'طلب اونلاين',
          'أكلة',
          'مطعم اونلاين',
          'طعام طازج',
          'دفع اون لاين',
          'باي موب'
        ]
      : [
          'food ordering Egypt',
          'healthy food delivery',
          'online food ordering',
          'Akla food',
          'healthy meals Egypt',
          'chef crafted food',
          'food delivery Cairo',
          'order food online Egypt',
          'Paymob food',
          'fresh meals delivery'
        ],

    authors: [{ name: 'Akla', url: 'https://akla-pi.vercel.app' }],
    creator: 'Akla',
    publisher: 'Akla',

    // ── Open Graph ────────────────────────────────────────
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_EG' : 'en_US',
      alternateLocale: isArabic ? 'en_US' : 'ar_EG',
      url: 'https://akla-pi.vercel.app',
      siteName: 'Akla',
      title: isArabic ? 'أكلة | طلب طعام صحي في مصر' : 'Akla | Healthy Food Ordering in Egypt',
      description: isArabic
        ? 'وجبات يحضرها الشيف من مكونات محلية طازجة مع توصيل سريع'
        : 'Chef-crafted meals with locally sourced ingredients and fast delivery',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isArabic ? 'أكله - طلب طعام ' : 'Akla - Food Ordering'
        }
      ]
    },

    // ── Twitter / X ───────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? 'أكلة | طلب طعام  في مصر' : 'Akla | Food Ordering in Egypt',
      description: isArabic
        ? 'وجبات يحضرها الشيف من مكونات محلية طازجة مع توصيل سريع'
        : 'Chef-crafted meals with locally sourced ingredients and fast delivery',
      images: ['/og-image.jpg'],
      creator: '@m7md_5aled'
    },

    // ── Robots ────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // ── Alternate languages ───────────────────────────────
    alternates: {
      canonical: `https://akla-pi.vercel.app/${locale}`,
      languages: {
        'en-US': 'https://akla-pi.vercel.app/en',
        'ar-EG': 'https://akla-pi.vercel.app/ar'
      }
    },

    // ── Icons ─────────────────────────────────────────────
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
    }

    // ── Verification ──────────────────────────────────────
    // verification: {
    //   google: 'your-google-verification-code',
    // },
  }
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
