'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, User as UserIcon } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { UserRole } from '@prisma/client'
import { Routes } from '@/constants/enums'
import { useParams } from 'next/navigation'
import Link from '@/components/link'
import { useClientSession } from '@/hooks/useClientSession'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

type Props = {
  initialSession: Session | null
}

export default function ProfileDropdown({ initialSession }: Props) {
  const translations = useTrans()
  const { locale } = useParams()
  const session = useClientSession(initialSession)
  const isAdmin = session?.data?.user?.role === UserRole?.ADMIN
  const user = session?.data?.user

  if (!user) return null

  return (
    <DropdownMenu dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger asChild>
        <button className='rounded-full outline-none ring-2 ring-transparent hover:ring-primary/40 transition-all duration-200'>
          <Avatar className='h-8 w-8'>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name ?? 'avatar'} />
            ) : (
              <AvatarFallback className='bg-primary/20 text-foreground text-xs font-semibold'>
                {(user?.name || 'U').charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 rounded-2xl p-1' align='end'>
        {/* User info */}
        <div className='px-3 py-3 mb-1'>
          <div className='flex items-center gap-2.5'>
            <Avatar className='h-8 w-8'>
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name ?? 'avatar'} />
              ) : (
                <AvatarFallback className='bg-primary/20 text-foreground text-xs font-semibold'>
                  {(user?.name || 'U').charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate'>{user?.name ?? 'User'}</p>
              <p className='text-xs text-muted-foreground truncate'>
                {user?.email ?? 'you@example.com'}
              </p>
            </div>
          </div>
          {isAdmin && (
            <div className='mt-2 inline-flex items-center gap-1 bg-primary/15 border border-primary/30 rounded-full px-2 py-0.5'>
              <span className='w-1 h-1 rounded-full bg-primary' />
              <span className='text-[10px] font-medium text-foreground/70 uppercase tracking-widest'>
                Admin
              </span>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href={isAdmin ? `/${Routes.ADMIN}` : `/${locale}/${Routes.PROFILE}`}
            className='flex items-center gap-2 rounded-xl cursor-pointer'
          >
            <UserIcon className='h-4 w-4' />
            {isAdmin ? translations.navbar.admin : translations.navbar.profile}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='flex items-center gap-2 rounded-xl text-destructive focus:text-destructive cursor-pointer'
          onSelect={e => {
            e.preventDefault()
            signOut()
          }}
        >
          <LogOut className='h-4 w-4' />
          {translations.global.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
