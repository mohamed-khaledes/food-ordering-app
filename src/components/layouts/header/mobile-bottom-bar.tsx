import CartButton from './cart-button'
import LanguageSwitcher from './language-switcher'
import ProfileDropdown from './profile-dropdown'
import AuthButtons from './auth-buttons'
import MobileNav from './mobile-nav'
import { Session } from 'next-auth'
import { Translations } from '@/types/translations'

export default function MobileBottomBar({
  t,
  initialSession
}: {
  t: Translations
  initialSession: Session | null
}) {
  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/60 px-2 py-2 safe-bottom'>
      <div className='flex items-center justify-around'>
        <MobileNav initialSession={initialSession} />
        <CartButton />
        <LanguageSwitcher />
        <ProfileDropdown initialSession={initialSession} />
        <AuthButtons initialSession={initialSession} translations={t} mobileBar />
      </div>
    </div>
  )
}
