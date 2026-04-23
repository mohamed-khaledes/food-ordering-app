import { getTrans } from '@/lib/translations/server'
import { authOptions } from '@/server/auth'
import { UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Pages, Routes } from '@/constants/enums'
import AdminSidebar from '@/features/admin/sidebar'

async function AdminLayout({
  children,
  params
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const { locale } = await params
  const translations = await getTrans()
  const session = await getServerSession(authOptions)

  if (!session) redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
  if (session.user.role !== UserRole.ADMIN) redirect(`/${locale}/${Routes.PROFILE}`)

  return (
    <div className='min-h-screen bg-muted/30 flex'>
      <AdminSidebar translations={translations} />
      <div className='flex-1 lg:ml-64'>
        <main className='p-6 lg:pt-8 min-h-screen'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
