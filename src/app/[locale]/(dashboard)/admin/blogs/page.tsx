import Link from '@/components/link'
import { Pages, Routes } from '@/constants/enums'
import { Edit, Newspaper, Plus } from 'lucide-react'
import DashboardHeader from '@/features/admin/page-header'
import DeleteBlogButton from '@/features/admin/blogs/delete-btn'
import { getAllBlogs } from '@/server/db/blogs'
import { getTrans } from '@/lib/translations/server'

export const dynamic = 'force-dynamic'

async function AdminBlogsPage() {
  const [blogs, t] = await Promise.all([getAllBlogs(), getTrans()])
  const ui = t.adminUi
  const b = ui.blogs

  return (
    <div>
      <DashboardHeader
title={b.title}
description={`${blogs.length} ${b.postsTotal}`}
        action={
          <Link href={`/${Routes.ADMIN}/blogs/${Pages.NEW}`} className='btn-brand px-5 py-2.5'>
            <Plus className='h-4 w-4' />
            {b.newPost}
          </Link>
        }
      />

      {blogs.length > 0 ? (
        <div className='overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]'>
          <div className='grid grid-cols-12 gap-4 border-b border-border/70 bg-haze/70 px-6 py-3'>
            <div className='col-span-8 sm:col-span-6 text-xs font-medium uppercase tracking-widest text-muted-foreground'>
              {ui.table.post}
            </div>
            <div className='col-span-2 hidden text-xs font-medium uppercase tracking-widest text-muted-foreground md:block'>
              {ui.table.status}
            </div>
            <div className='sm:col-span-2 hidden text-xs font-medium uppercase tracking-widest text-muted-foreground sm:block'>
              {ui.table.created}
            </div>
            <div className='col-span-4 md:col-span-2 text-end text-xs font-medium uppercase tracking-widest text-muted-foreground'>
              {ui.table.actions}
            </div>
          </div>

          <ul className='divide-y divide-border'>
            {blogs.map(blog => (
              <li
                key={blog.id}
                className='grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/20'
              >
                <div className='col-span-8 sm:col-span-6 flex items-center gap-3'>
                  <div className='h-11 w-16 shrink-0 overflow-hidden bg-muted'>
                    <img src={blog.image} alt='' className='h-full w-full object-cover' />
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-medium text-foreground'>{blog.title}</p>
                    <p className='truncate text-xs text-muted-foreground'>/{blog.slug}</p>
                  </div>
                </div>

                <div className='col-span-2 hidden md:block'>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                      blog.published ? 'bg-brand text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
{blog.published ? b.published : b.draft}
                  </span>
                </div>

                <div className='sm:col-span-2 hidden sm:block'>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className='col-span-4 md:col-span-2 flex items-center justify-end gap-2'>
                  <Link
                    href={`/${Routes.ADMIN}/blogs/${blog.id}/${Pages.EDIT}`}
aria-label={b.editPost}
                    className='flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 transition-colors hover:border-brand hover:text-brand'
                  >
                    <Edit className='h-3.5 w-3.5' />
                  </Link>
                  <DeleteBlogButton blogId={blog.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/70 bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)] py-20'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft'>
            <Newspaper className='h-5 w-5 text-brand' />
          </div>
          <p className='text-sm text-muted-foreground'>{b.none}</p>
          <Link href={`/${Routes.ADMIN}/blogs/${Pages.NEW}`} className='btn-brand mt-2 px-5 py-2.5'>
            <Plus className='h-4 w-4' />
            {b.writeFirst}
          </Link>
        </div>
      )}
    </div>
  )
}

export default AdminBlogsPage
