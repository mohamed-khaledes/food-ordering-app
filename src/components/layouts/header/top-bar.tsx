import { Mail, MapPin } from 'lucide-react'
import LanguageSwitcher from './language-switcher'
import { Container } from '@/components/ui/container'

const SOCIALS = [
  { label: 'facebook', href: 'https://facebook.com' },
  { label: 'instagram', href: 'https://instagram.com' },
  { label: 'twitter', href: 'https://twitter.com' }
]

/**
 * Slim dark-green announcement strip above the main navigation.
 * Contact details are placeholders — swap for the real ones.
 */
const TopBar = () => {
  return (
    <div className='hidden bg-deep text-white/85 md:block'>
      <Container className=' flex h-11 items-center justify-between text-[13px]'>
        <div className='flex items-center gap-5'>
          <span className='flex items-center gap-1.5'>
            <MapPin className='h-3.5 w-3.5 text-brand' />
            Cairo, Egypt
          </span>
          <span className='h-3 w-px bg-white/20' />
          <a
            href='mailto:support@akla.com'
            className='flex items-center gap-1.5 transition-colors hover:text-brand'
          >
            <Mail className='h-3.5 w-3.5 text-brand' />
            support@akla.com
          </a>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            {SOCIALS.map((social, i) => (
              <span key={social.label} className='flex items-center gap-3'>
                <a
                  href={social.href}
                  target='_blank'
                  rel='noreferrer'
                  className='transition-colors hover:text-brand'
                >
                  {social.label}
                </a>
                {i < SOCIALS.length - 1 && <span className='text-white/30'>-</span>}
              </span>
            ))}
          </div>
          <span className='h-3 w-px bg-white/20' />
          <LanguageSwitcher variant='topbar' />
        </div>
      </Container>
    </div>
  )
}

export default TopBar
