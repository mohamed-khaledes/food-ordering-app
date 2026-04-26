import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { getTrans } from '@/lib/translations/server'
import EditUserForm from '@/features/profile/form'

async function DeliveryProfilePage() {
  const session = await getServerSession(authOptions)
  const translations = await getTrans()

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary' />
          <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
            My account
          </span>
        </div>
        <h1 className='text-3xl font-bold'>Profile</h1>
        <p className='text-muted-foreground mt-1'>Manage your personal information</p>
      </div>

      {/* Profile card */}
      <div className='bg-background rounded-2xl border border-border p-6 max-w-2xl'>
        <EditUserForm user={session?.user as any} translations={translations} />
      </div>
    </div>
  )
}

export default DeliveryProfilePage
