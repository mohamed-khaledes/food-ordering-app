import * as z from 'zod'

/** `My First Post!` → `my-first-post` */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)

export const blogSchema = () =>
  z.object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters'),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]*$/, 'Slug may only contain lowercase letters, numbers and dashes')
      .optional()
      .or(z.literal('')),
    excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters'),
    content: z.string().trim().min(20, 'Content must be at least 20 characters'),
    image: z.string().trim().url('Image must be a valid URL'),
    author: z.string().trim().min(2, 'Author is required'),
    published: z.union([z.literal('on'), z.literal('true'), z.literal('')]).optional()
  })

export type BlogFormValues = z.infer<ReturnType<typeof blogSchema>>
