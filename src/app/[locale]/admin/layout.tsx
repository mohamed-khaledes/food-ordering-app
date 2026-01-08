import AdminTabs from '@/features/admin/tabs'
import { getTrans } from '@/lib/translations/server'

async function AdminLayout({
  children
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const translations = await getTrans()
  return (
    <>
      <AdminTabs translations={translations} />
      {children}
    </>
  )
}

export default AdminLayout
