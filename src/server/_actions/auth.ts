'use server'

import { Pages, Routes } from '@/constants/enums'
import { db } from '@/lib/prisma'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { loginSchema, signUpSchema } from '@/validations/auth'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

// export const login = async (credentials: Record<'email' | 'password', string> | undefined) => {
//   const translations = await getTrans()
//   const result = loginSchema(translations).safeParse(credentials)

//   if (result.success === false) {
//     return {
//       error: result.error,
//       status: 400
//     }
//   }
//   try {
//     const user = await db.user.findUnique({
//       where: {
//         email: result.data.email
//       }
//     })
//     if (!user) {
//       return { message: translations.messages.userNotFound, status: 401 }
//     }
//     const hashedPassword = user.password
//     const isValidPassword = await bcrypt.compare(result.data.password, hashedPassword)
//     if (!isValidPassword) {
//       return {
//         message: translations.messages.incorrectPassword,
//         status: 401
//       }
//     }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password, ...userWithoutPassword } = user
//     return {
//       user: userWithoutPassword,
//       status: 200,
//       message: translations.messages.loginSuccessful
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       status: 500,
//       message: translations.messages.unexpectedError
//     }
//   }
// }
export const login = async (credentials: { email: string; password: string } | undefined) => {
  const translations = await getTrans()

  // Validate input
  const result = loginSchema(translations).safeParse(credentials)

  if (!result.success) {
    return {
      status: 400,
      error: result.error.flatten().fieldErrors
    }
  }

  try {
    const user = await db.user.findUnique({
      where: { email: result.data.email }
    })

    if (!user) {
      return {
        status: 401,
        message: translations.messages.userNotFound
      }
    }

    const isValidPassword = await bcrypt.compare(result.data.password, user.password)

    if (!isValidPassword) {
      return {
        status: 401,
        message: translations.messages.incorrectPassword
      }
    }

    // Strip password safely
    const { password, ...userWithoutPassword } = user

    return {
      status: 200,
      user: userWithoutPassword,
      message: translations.messages.loginSuccessful
    }
  } catch (error) {
    console.error(error)

    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}

export const signup = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  const result: any = signUpSchema(translations).safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData
    }
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      }
    })
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData
      }
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10)
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword
      }
    })
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`)
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createdUser.id}/${Pages.EDIT}`)
    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}
