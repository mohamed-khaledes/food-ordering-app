import { getUsers } from '@/server/db/users'
import { getTrans } from '@/lib/translations/server'
import { User, UserRole } from '@prisma/client'
import { Truck, Users } from 'lucide-react'
import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import DeleteUserButton from '@/features/admin/users/delete-btn'
import { Edit } from 'lucide-react'
import ToggleDeliveryRole from '@/features/admin/delivery/toggle-role'
import DashboardHeader from '@/features/admin/page-header'

async function DeliveryMenPage() {
  const [allUsers, t] = await Promise.all([getUsers(), getTrans()])
  const d = t.adminUi.delivery
  const deliveryMen = allUsers.filter((u: User) => u.role === UserRole.DELIVERY)
  const regularUsers = allUsers.filter((u: User) => u.role === UserRole.USER)

  return (
    <div>
      <DashboardHeader
title={d.title}
description={`${deliveryMen.length} ${d.activeCount}`}
      />

      <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
        {/* Active delivery men */}
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
          <div className='px-6 py-4 border-b border-border flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-brand animate-pulse' />
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
              {d.active} ({deliveryMen.length})
            </h2>
          </div>

          {deliveryMen.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
                <Truck className='w-5 h-5 text-muted-foreground' />
              </div>
              <p className='text-sm text-muted-foreground'>{d.none}</p>
              <p className='text-xs text-muted-foreground'>
                {d.assignHint}
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
                    <div className='w-9 h-9 rounded-full bg-brand-soft flex items-center justify-center flex-shrink-0'>
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
                    <div className='flex items-center gap-1.5 px-2.5 py-1 bg-brand-soft border border-brand/40 rounded-full'>
                      <span className='w-1 h-1 rounded-full bg-brand' />
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
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
          <div className='px-6 py-4 border-b border-border flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-muted-foreground' />
            <h2 className='text-sm font-bold uppercase tracking-widest text-muted-foreground'>
              {d.assignFrom} ({regularUsers.length})
            </h2>
          </div>

          {regularUsers.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
                <Users className='w-5 h-5 text-muted-foreground' />
              </div>
              <p className='text-sm text-muted-foreground'>{d.noRegular}</p>
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
