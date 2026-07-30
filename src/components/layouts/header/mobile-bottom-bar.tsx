import MobileNav from './mobile-nav'
import { Session } from 'next-auth'

/**
 * Mount point for the mobile tab bar. `MobileNav` owns the whole bar — it needs
 * client state for the active tab and the "More" sheet — so this is just the
 * server-side seam that hands it the session.
 */
export default function MobileBottomBar({ initialSession }: { initialSession: Session | null }) {
  return <MobileNav initialSession={initialSession} />
}
