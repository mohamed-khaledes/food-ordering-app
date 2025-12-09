import { Pages, Routes } from '@/constants/enums'
import EditUserForm from '@/features/profile/form'
import { Locale } from '@/i18n.config'
import { getTrans } from '@/lib/translations/server'
import { getUser, getUsers } from '@/server/db/users'
import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  const users = await getUsers()

  return users.map(user => ({ userId: user.id }))
}

async function EditUserPage({ params }: { params: Promise<{ id: string; locale: Locale }> }) {
  const { locale, id } = await params
  const translations = await getTrans()
  const user = await getUser(id)
  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
  }
  return (
    <main>
      <section className='section-gap'>
        <div className='container'>
          <EditUserForm translations={translations} user={user} />
        </div>
      </section>
    </main>
  )
}

export default EditUserPage
