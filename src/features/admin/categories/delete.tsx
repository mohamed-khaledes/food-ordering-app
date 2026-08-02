'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useDeleteCategory } from './hooks'

function DeleteCategory({ id }: { id: string }) {
  const { remove, pending } = useDeleteCategory(id)

  return (
    <Button variant='secondary' className='bg-red-500' disabled={pending} onClick={remove}>
      <Trash2 className='text-white' />
    </Button>
  )
}

export default DeleteCategory
