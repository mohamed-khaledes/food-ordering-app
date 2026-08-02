'use client'

import { Routes } from '@/constants/enums'
import { ActionState, useActionToast } from '@/hooks/useActionToast'
import { useMutation } from '@/hooks/useMutation'
import { useTrans } from '@/lib/translations/client'
import { Blog } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { createBlog, deleteBlog, updateBlog } from './_actions/blog'

/**
 * Create/edit post form. On success it returns to the list — the post is gone
 * from this route either way, so staying on a stale form is misleading.
 */
export function useBlogForm(blog?: Blog) {
  const router = useRouter()
  const { locale } = useParams()
  const isEdit = Boolean(blog)

  const { state, action, pending } = useActionToast(
    isEdit ? updateBlog.bind(null, blog!.id) : createBlog,
    {} as ActionState,
    () => {
      router.push(`/${locale}/${Routes.ADMIN}/blogs`)
      router.refresh()
    }
  )

  return {
    state,
    action,
    pending,
    isEdit,
    cancel: () => router.push(`/${locale}/${Routes.ADMIN}/blogs`)
  }
}

/** Delete button on a post row, behind a confirm. */
export function useDeleteBlog(blogId: string) {
  const router = useRouter()
  const t = useTrans()

  const { run, pending } = useMutation(deleteBlog, {
    confirm: t.adminUi.blogs.deleteConfirm,
    onSuccess: () => router.refresh()
  })

  return { remove: () => run(blogId), pending }
}
