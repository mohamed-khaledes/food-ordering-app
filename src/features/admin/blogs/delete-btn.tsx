'use client'

import { Trash2 } from 'lucide-react'
import Loader from '@/components/ui/loader'
import { useTrans } from '@/lib/translations/client'
import { useDeleteBlog } from './hooks'

function DeleteBlogButton({ blogId }: { blogId: string }) {
  const t = useTrans()
  const { remove, pending } = useDeleteBlog(blogId)

  return (
    <button
      type='button'
      disabled={pending}
      onClick={remove}
      aria-label={t.delete}
      className='flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50'
    >
      {pending ? <Loader /> : <Trash2 className='h-3.5 w-3.5' />}
    </button>
  )
}

export default DeleteBlogButton
