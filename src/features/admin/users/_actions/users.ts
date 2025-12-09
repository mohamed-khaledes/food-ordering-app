'use server'

import { Pages, Routes } from '@/constants/enums'
import { db } from '@/lib/prisma'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { revalidatePath } from 'next/cache'

export const deleteUser = async (id: string) => {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  try {
    await db.user.delete({
      where: { id }
    })
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`)
    return {
      status: 200,
      message: translations.messages.deleteUserSucess
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}
