'use client'

import { useState } from 'react'
import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { useTrans } from '@/lib/translations/client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { UserRole } from '@prisma/client'
import { useClientSession } from '@/hooks/useClientSession'
import { useAppSelector } from '@/redux/hooks'
import { selectCartItems } from '@/features/cart/slice'
import { getCartQuantity } from '@/features/cart/hooks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import LanguageSwitcher from './language-switcher'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Home,
  Info,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  LogOut,
  Phone,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  User as UserIcon,
  UserPlus,
  UtensilsCrossed
} from 'lucide-react'

/**
 * App-style bottom tab bar.
 *
 * Four tabs plus a raised cart action — the same shape as a native mobile app.
 * Everything secondary (about, contact, account, language) lives in the "More"
 * action sheet so the bar never has to squeeze more than five targets onto a
 * 360px screen.
 */

/** Primary tabs, two either side of the raised cart button. */
const LEFT_TABS = [
  // `homeShort` exists because the full Arabic label ("الصفحة الرئيسية") is far
  // too wide for a ~65px tab slot.
  { id: 'home', label: 'homeShort', href: '', icon: Home },
  { id: 'menu', label: 'menu', href: Routes.MENU, icon: UtensilsCrossed }
] as const

const RIGHT_TABS = [
  { id: 'orders', label: 'orders', href: Routes.ORDERS, icon: ShoppingBag }
] as const

/** Routes that live behind "More" — used to keep that tab lit while you're on one. */
const SECONDARY_ROUTES = [Routes.ABOUT, Routes.CONTACT, Routes.PROFILE, Routes.ADMIN, Routes.DASHBOARD]

export default function MobileNav({ initialSession }: { initialSession: Session | null }) {
  const { navbar, global } = useTrans()
  const { locale } = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const session = useClientSession(initialSession)
  const cartQuantity = getCartQuantity(useAppSelector(selectCartItems))
  const [sheetOpen, setSheetOpen] = useState(false)

  const user = session.data?.user
  const isAdmin = user?.role === UserRole.ADMIN
  const isDelivery = user?.role === UserRole.DELIVERY

  const isTabActive = (href: string) =>
    href === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}/${href}`)

  const onCart = pathname.startsWith(`/${locale}/${Routes.CART}`)
  const moreActive = SECONDARY_ROUTES.some(route => pathname.startsWith(`/${locale}/${route}`))

  /** Where the account row points, depending on role. */
  const accountHref = isAdmin
    ? `/${Routes.ADMIN}`
    : isDelivery
      ? `/${Routes.DASHBOARD}`
      : `/${Routes.PROFILE}`
  const accountLabel = isAdmin
    ? navbar.admin
    : isDelivery
      ? navbar.dashboard
      : navbar.profile
  const AccountIcon = isAdmin ? ShieldCheck : isDelivery ? LayoutDashboard : UserIcon

  const closeSheet = () => setSheetOpen(false)

  const goTo = (href: string) => {
    closeSheet()
    router.push(`/${locale}${href}`)
  }

  return (
    <>
      {/* Floating tab bar */}
      <nav
        aria-label={navbar.bottomNav}
        className='fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden'
      >
        <div className='border-border/60 bg-background/80 relative flex items-end justify-around rounded-[22px] border px-1.5 pt-2 pb-2 shadow-[0_8px_30px_-8px_rgb(0_0_0/0.25)] backdrop-blur-xl'>
          {LEFT_TABS.map(tab => (
            <Tab
              key={tab.id}
              href={tab.href ? `/${tab.href}` : '/'}
              icon={tab.icon}
              label={navbar[tab.label]}
              active={isTabActive(tab.href)}
            />
          ))}

          {/* Raised cart action */}
          <Link
            href={`/${Routes.CART}`}
            aria-label={navbar.cart}
            className='flex min-w-0 flex-1 flex-col items-center gap-1 py-1.5 transition-transform active:scale-90'
          >
            <span
              className={cn(
                'ring-background relative -mt-10 flex h-14 w-14 items-center justify-center rounded-full ring-4 transition-colors',
                onCart ? 'bg-brand-dark' : 'bg-brand',
                'shadow-[0_6px_18px_-4px_var(--brand)]'
              )}
            >
              <ShoppingCart className='h-[22px] w-[22px] text-white' strokeWidth={2.2} />
              {cartQuantity > 0 && (
                <span className='bg-ink ring-background absolute -end-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-white ring-2'>
                  {cartQuantity}
                </span>
              )}
            </span>
            <span
              className={cn(
                'max-w-full truncate text-[10px] leading-none whitespace-nowrap transition-colors',
                onCart ? 'text-brand font-semibold' : 'text-muted-foreground font-medium'
              )}
            >
              {navbar.cart}
            </span>
          </Link>

          {RIGHT_TABS.map(tab => (
            <Tab
              key={tab.id}
              href={`/${tab.href}`}
              icon={tab.icon}
              label={navbar[tab.label]}
              active={isTabActive(tab.href)}
            />
          ))}

          {/* More → action sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type='button'
                aria-label={navbar.more}
                className='flex min-w-0 flex-1 flex-col items-center gap-1 py-1.5 transition-transform active:scale-90'
              >
                <span className='relative flex h-9 w-14 items-center justify-center'>
                  {moreActive && <ActivePill />}
                  {user ? (
                    <Avatar className='relative h-[22px] w-[22px]'>
                      {user.image ? (
                        <AvatarImage src={user.image} alt='' />
                      ) : (
                        <AvatarFallback className='bg-brand-soft text-foreground text-[10px] font-semibold'>
                          {(user.name || 'U').charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ) : (
                    <LayoutGrid
                      className={cn(
                        'relative h-[19px] w-[19px] transition-colors',
                        moreActive ? 'text-brand' : 'text-muted-foreground'
                      )}
                      strokeWidth={moreActive ? 2.4 : 1.8}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    'max-w-full truncate text-[10px] leading-none whitespace-nowrap transition-colors',
                    moreActive ? 'text-brand font-semibold' : 'text-muted-foreground font-medium'
                  )}
                >
                  {navbar.more}
                </span>
              </button>
            </SheetTrigger>

            <SheetContent
              side='bottom'
              showCloseButton={false}
              className='gap-0 overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden'
            >
              {/* Grab handle */}
              <div className='flex justify-center pt-3 pb-1'>
                <span aria-hidden className='bg-border h-1 w-10 rounded-full' />
              </div>
              <SheetTitle className='sr-only'>{navbar.more}</SheetTitle>

              <div className='space-y-5 px-5 pt-2'>
                {/* Account */}
                {user ? (
                  <button
                    type='button'
                    onClick={() => goTo(accountHref)}
                    className='bg-muted/40 border-border/60 flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition-colors active:bg-muted'
                  >
                    <Avatar className='h-11 w-11'>
                      {user.image ? (
                        <AvatarImage src={user.image} alt='' />
                      ) : (
                        <AvatarFallback className='bg-brand-soft text-foreground text-sm font-semibold'>
                          {(user.name || 'U').charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className='min-w-0 flex-1'>
                      <span className='block truncate text-sm font-semibold'>
                        {user.name ?? accountLabel}
                      </span>
                      <span className='text-muted-foreground block truncate text-xs'>
                        {user.email ?? accountLabel}
                      </span>
                    </span>
                    <ChevronRight className='text-muted-foreground h-4 w-4 shrink-0 rtl:rotate-180' />
                  </button>
                ) : (
                  <div className='bg-muted/40 border-border/60 rounded-2xl border p-4'>
                    <p className='text-sm font-semibold'>{navbar.guest}</p>
                    <p className='text-muted-foreground mt-0.5 text-xs'>{navbar.guestHint}</p>
                    <div className='mt-3 flex gap-2'>
                      <button
                        type='button'
                        onClick={() => goTo(`/${Routes.AUTH}/${Pages.LOGIN}`)}
                        className='border-border flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors active:bg-muted'
                      >
                        <LogIn className='h-4 w-4' />
                        {navbar.login}
                      </button>
                      <button
                        type='button'
                        onClick={() => goTo(`/${Routes.AUTH}/${Pages.Register}`)}
                        className='bg-brand hover:bg-brand-dark flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-colors'
                      >
                        <UserPlus className='h-4 w-4' />
                        {navbar.register}
                      </button>
                    </div>
                  </div>
                )}

                {/* Secondary destinations */}
                <div className='grid grid-cols-2 gap-2'>
                  <SheetTile
                    icon={Info}
                    label={navbar.about}
                    onClick={() => goTo(`/${Routes.ABOUT}`)}
                  />
                  <SheetTile
                    icon={Phone}
                    label={navbar.contact}
                    onClick={() => goTo(`/${Routes.CONTACT}`)}
                  />
                  {user && (
                    <SheetTile
                      icon={AccountIcon}
                      label={accountLabel}
                      onClick={() => goTo(accountHref)}
                    />
                  )}
                  <SheetTile
                    icon={UtensilsCrossed}
                    label={navbar.menu}
                    onClick={() => goTo(`/${Routes.MENU}`)}
                  />
                </div>

                {/* Preferences */}
                <div className='border-border/60 divide-border/60 divide-y rounded-2xl border'>
                  <LanguageSwitcher variant='row' onNavigate={closeSheet} />
                  {user && (
                    <button
                      type='button'
                      onClick={() => {
                        closeSheet()
                        signOut()
                      }}
                      className='text-destructive flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors active:bg-destructive/5'
                    >
                      <LogOut className='h-4 w-4' />
                      {global.signOut}
                    </button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
}

/** Brand-tinted capsule that slides between tabs as the route changes. */
const ActivePill = () => (
  <motion.span
    layoutId='mobile-tab-pill'
    aria-hidden
    className='bg-brand-soft absolute inset-0 rounded-full'
    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
  />
)

const Tab = ({
  href,
  icon: Icon,
  label,
  active
}: {
  href: string
  icon: React.ElementType
  label: string
  active: boolean
}) => (
  <Link
    href={href}
    aria-current={active ? 'page' : undefined}
    className='flex min-w-0 flex-1 flex-col items-center gap-1 py-1.5 transition-transform active:scale-90'
  >
    <span className='relative flex h-9 w-14 items-center justify-center'>
      {active && <ActivePill />}
      <Icon
        className={cn(
          'relative h-[19px] w-[19px] transition-colors',
          active ? 'text-brand' : 'text-muted-foreground'
        )}
        strokeWidth={active ? 2.4 : 1.8}
      />
    </span>
    <span
      className={cn(
        'max-w-full truncate text-[10px] leading-none whitespace-nowrap transition-colors',
        active ? 'text-brand font-semibold' : 'text-muted-foreground font-medium'
      )}
    >
      {label}
    </span>
  </Link>
)

const SheetTile = ({
  icon: Icon,
  label,
  onClick
}: {
  icon: React.ElementType
  label: string
  onClick: () => void
}) => (
  <button
    type='button'
    onClick={onClick}
    className='border-border/60 bg-muted/30 active:bg-muted flex items-center gap-3 rounded-2xl border p-3 text-start transition-colors'
  >
    <span className='bg-brand-soft text-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-full'>
      <Icon className='h-[17px] w-[17px]' />
    </span>
    <span className='truncate text-sm font-medium'>{label}</span>
  </button>
)
