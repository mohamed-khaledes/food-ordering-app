import { authOptions } from '@/server/auth'
import { UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import DeliverySidebar from '@/features/delivery/sidebar'
import { getTrans } from '@/lib/translations/server'

export default async function DeliveryLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await getServerSession(authOptions)
  const translations = await getTrans()

  if (!session) redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
  if (session.user.role !== UserRole.DELIVERY) {
    redirect(`/${locale}`)
  }

  return (
    <div className='min-h-screen bg-muted/30 flex'>
      <DeliverySidebar translations={translations} />
      <div className='flex-1 lg:ml-64'>
        <main className='p-6 pt-24 lg:pt-8 min-h-screen'>{children}</main>
      </div>
    </div>
  )
}
