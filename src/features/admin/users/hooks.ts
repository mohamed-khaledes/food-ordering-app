'use client'

import { useMutation } from '@/hooks/useMutation'
import { deleteUser } from './_actions/users'

/** Delete button on a user row. The action supplies its own message. */
export function useDeleteUser(userId: string) {
  const { run, pending } = useMutation(deleteUser)
  return { remove: () => run(userId), pending }
}
