import { notFound } from 'next/navigation'
import DashboardHeader from '@/features/admin/page-header'
import BlogForm from '@/features/admin/blogs/form'
import { getBlogById } from '@/server/db/blogs'
import { getTrans } from '@/lib/translations/server'

export const dynamic = 'force-dynamic'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [blog, t] = await Promise.all([getBlogById(id), getTrans()])

  if (!blog) notFound()

  return (
    <div>
      <DashboardHeader title={t.adminUi.blogs.editPost} description={blog.title} />
      <div className='border border-border bg-background p-6 md:p-8'>
        <BlogForm blog={blog} />
      </div>
    </div>
  )
}
