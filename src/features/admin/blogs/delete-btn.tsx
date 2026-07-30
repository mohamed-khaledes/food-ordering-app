'use client'

import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteBlog } from './_actions/blog'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'
import { useTrans } from '@/lib/translations/client'

function DeleteBlogButton({ blogId }: { blogId: string }) {
  const router = useRouter()
  const t = useTrans()
  const b = t.adminUi.blogs
  const [state, setState] = useState<{
    pending: boolean
    status: null | number
    message: string
  }>({ pending: false, status: null, message: '' })

  const handleDelete = async () => {
    if (!window.confirm(b.deleteConfirm)) return
    try {
      setState(prev => ({ ...prev, pending: true }))
      const res = await deleteBlog(blogId)
      setState(prev => ({ ...prev, status: res.status, message: res.message ?? '' }))
      if (res.status === 200) router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, pending: false }))
    }
  }

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      Toast(state.message, state.status === 200 ? 'success' : 'error')
    }
  }, [state.pending, state.message, state.status])

  return (
    <button
      type='button'
      disabled={state.pending}
      onClick={handleDelete}
aria-label={t.delete}
      className='flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50'
    >
      {state.pending ? <Loader /> : <Trash2 className='h-3.5 w-3.5' />}
    </button>
  )
}

export default DeleteBlogButton
