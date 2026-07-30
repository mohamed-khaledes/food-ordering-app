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
    <div className='flex min-h-screen bg-haze'>
      <AdminSidebar translations={translations} />
      <div className='flex-1 lg:ms-64'>
        <main className='min-h-screen p-4 pt-20 md:p-6 lg:pt-8'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
