import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = async () => {
  const { global } = await getTrans()
  return (
    <footer className='border-t bg-gray-50/60 backdrop-blur-sm py-5 text-gray-600'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6'>
        {/* Left: Copyright */}
        <p className='text-sm text-gray-500'>
          © {new Date().getFullYear()}{' '}
          <span className='font-semibold text-accent mx-1'>Kemetraa</span>.{global.copyRight}
        </p>

        {/* Middle: Links */}
        <nav className='flex gap-6 text-sm'>
          <Link href='/about' className='hover:text-accent transition-colors'>
            {global.about}
          </Link>
          <Link href='/menu' className='hover:text-accent transition-colors'>
            {global.menu}
          </Link>
          <Link href='/contact' className='hover:text-accent transition-colors'>
            {global.contact}
          </Link>
        </nav>

        {/* Right: Social Icons */}
        <div className='flex gap-4'>
          <a
            href='https://facebook.com'
            target='_blank'
            className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors'
          >
            <Facebook />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors'
          >
            <Instagram />
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            className='w-10 h-10 p-2 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors'
          >
            <Twitter />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
