import { getUsers } from '@/server/db/users'
import { getTrans } from '@/lib/translations/server'
import { User, UserRole } from '@prisma/client'
import { Truck, Users } from 'lucide-react'
import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import DeleteUserButton from '@/features/admin/users/delete-btn'
import { Edit } from 'lucide-react'
import ToggleDeliveryRole from '@/features/admin/delivery/toggle-role'

async function DeliveryMenPage() {
  const allUsers = await getUsers()
  const deliveryMen = allUsers.filter((u: User) => u.role === UserRole.DELIVERY)
  const regularUsers = allUsers.filter((u: User) => u.role === UserRole.USER)

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            Manage
          </span>
        </div>
        <h1 className='text-3xl font-bold'>Delivery Men</h1>
        <p className='text-muted-foreground mt-1'>
          {deliveryMen.length} delivery {deliveryMen.length === 1 ? 'man' : 'men'} active
        </p>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Active delivery men */}
        <div className='bg-background rounded-2xl border border-border overflow-hidden'>
          <div className='px-6 py-4 border-b border-border flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-primary animate-pulse' />
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
              Active delivery men ({deliveryMen.length})
            </h2>
          </div>

          {deliveryMen.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-muted flex items-center justify-center'>
                <Truck className='w-5 h-5 text-muted-foreground' />
              </div>
              <p className='text-sm text-muted-foreground'>No delivery men assigned yet</p>
              <p className='text-xs text-muted-foreground'>
                Assign users from the list on the right
              </p>
            </div>
          ) : (
            <ul className='divide-y divide-border'>
              {deliveryMen.map((user: User) => (
                <li
                  key={user.id}
                  className='flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0'>
                      <span className='text-sm font-bold text-foreground'>
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-foreground'>{user.name}</p>
                      <p className='text-xs text-muted-foreground'>{user.email}</p>
                      {user.phone && <p className='text-xs text-muted-foreground'>{user.phone}</p>}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1.5 px-2.5 py-1 bg-primary/15 border border-primary/30 rounded-full'>
                      <span className='w-1 h-1 rounded-full bg-primary' />
                      <span className='text-[10px] font-medium text-foreground uppercase tracking-widest'>
                        Delivery
                      </span>
                    </div>
                    {/* Remove delivery role */}
                    <ToggleDeliveryRole userId={user.id} currentRole={user.role} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Users to assign */}
        <div className='bg-background rounded-2xl border border-border overflow-hidden'>
          <div className='px-6 py-4 border-b border-border flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-muted-foreground' />
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
              Assign from users ({regularUsers.length})
            </h2>
          </div>

          {regularUsers.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-muted flex items-center justify-center'>
                <Users className='w-5 h-5 text-muted-foreground' />
              </div>
              <p className='text-sm text-muted-foreground'>No regular users found</p>
            </div>
          ) : (
            <ul className='divide-y divide-border'>
              {regularUsers.map((user: User) => (
                <li
                  key={user.id}
                  className='flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0'>
                      <span className='text-sm font-medium text-muted-foreground'>
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-foreground'>{user.name}</p>
                      <p className='text-xs text-muted-foreground'>{user.email}</p>
                    </div>
                  </div>
                  <ToggleDeliveryRole userId={user.id} currentRole={user.role} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeliveryMenPage
