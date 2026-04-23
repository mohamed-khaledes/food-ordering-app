import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { Edit, Users } from 'lucide-react'
import { User } from '@prisma/client'
import DeleteUserButton from '@/features/admin/users/delete-btn'
import { getUsers } from '@/server/db/users'

async function UsersPage() {
  const users = await getUsers()

  return (
    <div className='space-y-6'>
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Manage
          </span>
        </div>
        <h1 className='text-3xl font-bold'>Users</h1>
        <p className='text-muted-foreground mt-1'>{users.length} registered accounts</p>
      </div>

      {users.length > 0 ? (
        <div className='bg-background rounded-2xl border border-border overflow-hidden'>
          {/* Table header */}
          <div className='grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-muted/30'>
            <div className='col-span-5 text-xs font-medium text-muted-foreground uppercase tracking-widest'>
              User
            </div>
            <div className='col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:block'>
              Role
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest hidden sm:block'>
              Joined
            </div>
            <div className='col-span-2 text-xs font-medium text-muted-foreground uppercase tracking-widest text-right'>
              Actions
            </div>
          </div>

          {/* Rows */}
          <ul className='divide-y divide-border'>
            {users.map((user: User) => (
              <li
                key={user.id}
                className='grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors'
              >
                <div className='col-span-5 flex items-center gap-3'>
                  <div className='w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0'>
                    <span className='text-sm font-semibold text-foreground'>
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
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider
                    ${
                      user.role === 'ADMIN'
                        ? 'bg-primary/15 text-foreground border border-primary/30'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className='col-span-2 hidden sm:block'>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className='col-span-2 flex justify-end items-center gap-2'>
                  <Link
                    href={`/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                    className='w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 transition-all'
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
        <div className='flex flex-col items-center justify-center py-20 gap-3 bg-background rounded-2xl border border-border'>
          <div className='w-12 h-12 rounded-2xl bg-muted flex items-center justify-center'>
            <Users className='w-5 h-5 text-muted-foreground' />
          </div>
          <p className='text-sm text-muted-foreground'>No users found</p>
        </div>
      )}
    </div>
  )
}

export default UsersPage
