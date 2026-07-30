import '../globals.css'
import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Toaster } from '@/components/ui/toast'
import { Rubik, Jost, Cairo } from 'next/font/google'
import { LoadingPage } from '@/components/ui/loading'
import ReduxProvider from '@/providers/redux-provider'
import { Directions, Languages } from '@/constants/enums'
import ScrollToTopBtn from '@/components/ui/scroll-to-top'
import NextAuthSessionProvider from '@/providers/NextAuthSessionProvider'
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo/json-ld'
import { alternatesFor, OG_LOCALE, SITE_URL } from '@/constants/seo'
export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }]
}
// Headings across the design are a tight geometric bold; body copy is lighter and wider.
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  preload: true
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  preload: true
})

// Arabic drives both roles — Rubik/Jost have no Arabic coverage.
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  preload: true
})
/**
 * Tints the mobile browser chrome brand green. This belongs to the `viewport`
 * export, not `metadata` — Next 15 warns and ignores it there.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#84b905' },
    { media: '(prefers-color-scheme: dark)', color: '#0b472e' }
  ],
  colorScheme: 'light'
}

// SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === Languages.ARABIC

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: isArabic ? 'أكلة | طلب طعام صحي في مصر' : 'Akla | Healthy Food Ordering in Egypt',
      template: isArabic ? '%s | أكلة' : '%s | Akla'
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
      locale: OG_LOCALE[locale] ?? 'en_US',
      alternateLocale: isArabic ? 'en_US' : 'ar_EG',
      url: `${SITE_URL}/${locale}`,
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
      images: [
        {
          url: '/og-image.jpg',
          alt: isArabic ? 'أكلة — طلب طعام صحي' : 'Akla — healthy food ordering'
        }
      ],
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
    // `x-default` gives crawlers a fallback for locales we don't publish.
    alternates: alternatesFor(locale),

    // ── Icons ─────────────────────────────────────────────
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon.ico', sizes: '48x48' }
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
    },

    manifest: '/site.webmanifest'

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
  const isArabic = locale === Languages.ARABIC
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={isArabic ? Directions.RTL : Directions.LTR}
    >
      <body
        className={`${rubik.variable} ${jost.variable} ${cairo.variable}`}
        style={
          isArabic
            ? ({
                '--font-heading': 'var(--font-arabic)',
                '--font-body': 'var(--font-arabic)'
              } as React.CSSProperties)
            : undefined
        }
        suppressHydrationWarning
      >
        {/* Site-wide entities. Page-level schema references these by @id. */}
        <JsonLd data={organizationSchema(locale)} />
        <JsonLd data={websiteSchema(locale)} />

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
