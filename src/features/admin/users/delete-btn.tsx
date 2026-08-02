'use client'

import { Trash2 } from 'lucide-react'
import Loader from '@/components/ui/loader'
import { useDeleteUser } from './hooks'

function DeleteUserButton({ userId }: { userId: string }) {
  const { remove, pending } = useDeleteUser(userId)

  return (
    <button
      type='button'
      disabled={pending}
      onClick={remove}
      className='w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-destructive/40 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all disabled:opacity-50'
    >
      {pending ? <Loader /> : <Trash2 className='w-3.5 h-3.5' />}
    </button>
  )
}

export default DeleteUserButton
