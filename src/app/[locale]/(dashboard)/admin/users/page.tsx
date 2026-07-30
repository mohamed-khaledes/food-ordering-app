import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { Edit, Users } from 'lucide-react'
import DashboardHeader from '@/features/admin/page-header'
import { User } from '@prisma/client'
import DeleteUserButton from '@/features/admin/users/delete-btn'
import { getUsers } from '@/server/db/users'
import { getTrans } from '@/lib/translations/server'

async function UsersPage() {
  const users = await getUsers()
  const { adminUi: ui, admin } = await getTrans()

  return (
    <div>
      <DashboardHeader title={admin.tabs.users} description={`${users.length} ${ui.registeredAccounts}`} />

      {users.length > 0 ? (
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
          {/* Table header */}
          <div className='grid grid-cols-12 gap-4 border-b border-border/70 bg-haze/70 px-6 py-3'>
            <div className='col-span-8 sm:col-span-6 md:col-span-5 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              {ui.table.user}
            </div>
            <div className='col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:block'>
              {ui.table.role}
            </div>
            <div className='sm:col-span-3 md:col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden sm:block'>
              {ui.table.joined}
            </div>
            <div className='col-span-4 sm:col-span-3 md:col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-right'>
              {ui.table.actions}
            </div>
          </div>

          {/* Rows */}
          <ul className='divide-y divide-border'>
            {users.map((user: User) => (
              <li
                key={user.id}
                className='grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors'
              >
                <div className='col-span-8 sm:col-span-6 md:col-span-5 flex items-center gap-3'>
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft'>
                    <span className='text-sm font-semibold text-brand'>
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-foreground'>{user.name}</p>
                    <p className='text-xs text-muted-foreground truncate max-w-[160px]'>
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className='col-span-3 hidden md:block'>
                  <span
                    className={`text-[10px] font-medium px-2.5 py-1 uppercase tracking-wider
                    ${
                      user.role === 'ADMIN'
                        ? 'bg-brand text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className='sm:col-span-3 md:col-span-2 hidden sm:block'>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className='col-span-4 sm:col-span-3 md:col-span-2 flex justify-end items-center gap-2'>
                  <Link
                    href={`/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                    className='flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 transition-colors hover:border-brand hover:text-brand'
                  >
                    <Edit className='w-3.5 h-3.5' />
                  </Link>
                  <DeleteUserButton userId={user.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
            <Users className='h-5 w-5 text-brand' />
          </div>
          <p className='text-sm text-muted-foreground'>{ui.noUsers}</p>
        </div>
      )}
    </div>
  )
}

export default UsersPage
