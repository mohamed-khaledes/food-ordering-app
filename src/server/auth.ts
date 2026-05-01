import { Environments, Pages, Routes } from '@/constants/enums'
import { DefaultSession, type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import { db } from '@/lib/prisma'
import { login } from './_actions/auth'
import { Locale } from '@/i18n.config'
import { User, UserRole } from '@prisma/client'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Partial<User> {
    id: string
    name: string
    email: string
    role: UserRole
  }
}

export const authOptions: NextAuthOptions = {
  // ── No adapter when using JWT strategy ──────────────────
  // PrismaAdapter conflicts with JWT strategy — remove it.
  // OAuth users are created manually in the signIn callback below.

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,

  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`
  },

  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const currentUrl = req?.headers?.referer
        const locale = currentUrl?.split('/')[3] as Locale
        const res = await login(credentials)
        if (res.status === 200 && res.user) {
          return res.user
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responseError: res.message
            })
          )
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    // ── Create OAuth users in DB manually ─────────────────
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google' || account?.provider === 'apple') {
        try {
          const existingUser = await db.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            await db.user.create({
              data: {
                email: user.email!,
                name: user.name ?? 'User',
                image: user.image ?? null,
                password: '', // OAuth users have no password
                role: UserRole.USER
              }
            })
          }
          return true
        } catch (error) {
          console.error('OAuth signIn error:', error)
          return false
        }
      }
      // Credentials provider — allow through
      return true
    },

    // ── JWT: always pull fresh data from DB ───────────────
    jwt: async ({ token }): Promise<JWT> => {
      if (!token?.email) return token

      const dbUser = await db.user.findUnique({
        where: { email: token.email }
      })

      if (!dbUser) return token

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
        city: dbUser.city,
        country: dbUser.country,
        phone: dbUser.phone,
        postalCode: dbUser.postalCode,
        streetAddress: dbUser.streetAddress
      }
    },

    // ── Session: map JWT token to session.user ─────────────
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
          city: token.city,
          country: token.country,
          phone: token.phone,
          postalCode: token.postalCode,
          streetAddress: token.streetAddress
        }
      }
    }
  }
}
