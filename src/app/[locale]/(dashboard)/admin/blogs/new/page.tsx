import DashboardHeader from '@/features/admin/page-header'
import BlogForm from '@/features/admin/blogs/form'
import { getTrans } from '@/lib/translations/server'

export default async function NewBlogPage() {
  const { adminUi } = await getTrans()
  const b = adminUi.blogs
  return (
    <div>
      <DashboardHeader title={b.newPost} description={b.form.newDescription} />
      <div className='border border-border bg-background p-6 md:p-8'>
        <BlogForm />
      </div>
    </div>
  )
}
