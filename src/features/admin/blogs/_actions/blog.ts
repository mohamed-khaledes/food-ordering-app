'use server'

import { Routes } from '@/constants/enums'
import { db } from '@/lib/prisma'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { blogSchema, slugify } from '@/validations/blog'
import { revalidatePath } from 'next/cache'

const revalidateBlogPaths = async (slug?: string) => {
  const locale = await getCurrentLocale()
  revalidatePath(`/${locale}/${Routes.ADMIN}/blogs`)
  revalidatePath(`/${locale}/${Routes.ABOUT}`)
  revalidatePath(`/${locale}`)
  if (slug) revalidatePath(`/${locale}/blog/${slug}`)
}

/** Slugs must stay unique; append -2, -3 … when the base is taken. */
const uniqueSlug = async (base: string, ignoreId?: string) => {
  let candidate = base || 'post'
  let suffix = 1

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await db.blog.findUnique({ where: { slug: candidate } })
    if (!existing || existing.id === ignoreId) return candidate
    suffix += 1
    candidate = `${base}-${suffix}`
  }
}

export const createBlog = async (prevState: unknown, formData: FormData) => {
  const translations = await getTrans()
  const result = blogSchema().safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return { status: 400, error: result.error.flatten().fieldErrors, formData }
  }

  const { title, slug, excerpt, content, image, author, published } = result.data

  try {
    const finalSlug = await uniqueSlug(slug ? slugify(slug) : slugify(title))

    await db.blog.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        image,
        author,
        published: Boolean(published)
      }
    })

    await revalidateBlogPaths(finalSlug)
    return { status: 201, message: 'Blog post created' }
  } catch (error) {
    console.error(error)
    return { status: 500, message: translations.messages.unexpectedError }
  }
}

export const updateBlog = async (id: string, prevState: unknown, formData: FormData) => {
  const translations = await getTrans()
  const result = blogSchema().safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return { status: 400, error: result.error.flatten().fieldErrors, formData }
  }

  const { title, slug, excerpt, content, image, author, published } = result.data

  try {
    const finalSlug = await uniqueSlug(slug ? slugify(slug) : slugify(title), id)

    await db.blog.update({
      where: { id },
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        image,
        author,
        published: Boolean(published)
      }
    })

    await revalidateBlogPaths(finalSlug)
    return { status: 200, message: 'Blog post updated' }
  } catch (error) {
    console.error(error)
    return { status: 500, message: translations.messages.unexpectedError }
  }
}

export const deleteBlog = async (id: string) => {
  const translations = await getTrans()

  try {
    await db.blog.delete({ where: { id } })
    await revalidateBlogPaths()
    return { status: 200, message: 'Blog post deleted' }
  } catch (error) {
    console.error(error)
    return { status: 500, message: translations.messages.unexpectedError }
  }
}
