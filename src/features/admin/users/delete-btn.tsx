'use client'

import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { deleteUser } from './_actions/users'
import Toast from '@/components/ui/toast'
import Loader from '@/components/ui/loader'

function DeleteUserButton({ userId }: { userId: string }) {
  const [state, setState] = useState<{
    pending: boolean
    status: null | number
    message: string
  }>({ pending: false, status: null, message: '' })

  const handleDelete = async (id: string) => {
    try {
      setState(prev => ({ ...prev, pending: true }))
      const res = await deleteUser(id)
      setState(prev => ({ ...prev, status: res.status, message: res.message }))
    } catch (error) {
      console.log(error)
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
      onClick={() => handleDelete(userId)}
      className='w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-destructive/40 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all disabled:opacity-50'
    >
      {state.pending ? <Loader /> : <Trash2 className='w-3.5 h-3.5' />}
    </button>
  )
}

export default DeleteUserButton
