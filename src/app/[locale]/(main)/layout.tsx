import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
      {/* Keeps the footer clear of the fixed mobile tab bar. */}
      <div aria-hidden className='h-[92px] md:hidden' />
    </>
  )
}
