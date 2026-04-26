'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/auth'

export async function toggleDeliveryRole(userId: string, newRole: UserRole) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== UserRole.ADMIN) {
    throw new Error('Unauthorized')
  }

  await db.user.update({
    where: { id: userId },
    data: { role: newRole }
  })

  revalidatePath('/admin/delivery')
  revalidatePath('/admin/users')
  return { success: true }
}
