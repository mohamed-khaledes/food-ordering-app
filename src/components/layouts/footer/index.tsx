import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'

const Footer = async () => {
  const { global } = await getTrans()

  return (
    <footer className='border-t bg-primary backdrop-blur-sm py-10 text-gray-600 rounded-tr-3xl rounded-tl-3xl'>
      <div className='container mx-auto px-4'>
        {/* Top Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10'>
          {/* Company Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>{global.company}</h3>
            <ul className='flex flex-col gap-3 text-sm'>
              <Link href='/about' className='hover:text-accent transition-colors'>
                {global.about}
              </Link>
              <Link href='/careers' className='hover:text-accent transition-colors'>
                {global.careers}
              </Link>
              <Link href='/blog' className='hover:text-accent transition-colors'>
                {global.blog}
              </Link>
            </ul>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>{global.menu}</h3>
            <ul className='flex flex-col gap-3 text-sm'>
              <Link href='/meals' className='hover:text-accent transition-colors'>
                {global.meals}
              </Link>
              <Link href='/plans' className='hover:text-accent transition-colors'>
                {global.plans}
              </Link>
              <Link href='/pricing' className='hover:text-accent transition-colors'>
                {global.pricing}
              </Link>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>{global.support}</h3>
            <ul className='flex flex-col gap-3 text-sm'>
              <Link href='/contact' className='hover:text-accent transition-colors'>
                {global.contact}
              </Link>
              <Link href='/faq' className='hover:text-accent transition-colors'>
                {global.faq}
              </Link>
              <Link href='/terms' className='hover:text-accent transition-colors'>
                {global.terms}
              </Link>
              <Link href='/privacy' className='hover:text-accent transition-colors'>
                {global.privacy}
              </Link>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>{global.followUs}</h3>
            <div className='flex gap-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-gray-900 hover:bg-primary/90 transition-colors'
              >
                <Facebook />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-gray-900 hover:bg-primary/90 transition-colors'
              >
                <Instagram />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-gray-900 hover:bg-primary/90 transition-colors'
              >
                <Twitter />
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-gray-900 hover:bg-primary/90 transition-colors'
              >
                <Youtube />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-gray-900 hover:bg-primary/90 transition-colors'
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className='pt-4 text-center text-sm text-gray-500'>
          © {new Date().getFullYear()}
          <span className='font-semibold text-accent mx-1'>Kemetraa</span>
          {global.copyRight}
        </div>
      </div>
    </footer>
  )
}

export default Footer
