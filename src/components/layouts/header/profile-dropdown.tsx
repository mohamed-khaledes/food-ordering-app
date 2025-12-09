'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Settings, CreditCard, LogOut, User as UserIcon } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'
import { User, UserRole } from '@prisma/client'
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
  if (!user) return
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-full p-0'>
          <Avatar className='h-9 w-9'>
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name ?? 'avatar'} />
            ) : (
              <AvatarFallback>{(user?.name || 'U').charAt(0)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end'>
        <div className='px-4 py-3'>
          <p className='text-sm font-medium'>{user?.name ?? 'User'}</p>
          <p className='text-xs text-muted-foreground truncate'>
            {user?.email ?? 'you@example.com'}
          </p>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={isAdmin ? `/${Routes.ADMIN}` : `/${locale}/${Routes.PROFILE}`}
            className='flex items-center gap-2'
          >
            <UserIcon className='h-4 w-4' />
            {isAdmin ? translations.navbar.admin : translations.navbar.profile}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={isAdmin ? `/${Routes.ADMIN}` : `/${locale}/${Routes.PROFILE}`}
            className='flex items-center gap-2'
          >
            <Settings className='h-4 w-4' />
            Settings
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem asChild>
          <Link href='/billing' className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            Billing
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='flex items-center gap-2'
          onSelect={e => {
            e.preventDefault()
            signOut()
          }}
        >
          <LogOut className='h-4 w-4' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
