'use client'

import { useActionState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Blog } from '@prisma/client'
import { createBlog, updateBlog } from './_actions/blog'
import { Routes } from '@/constants/enums'
import { IMAGES } from '@/constants/images'
import { Loader2 } from 'lucide-react'
import Toast from '@/components/ui/toast'
import { useTrans } from '@/lib/translations/client'

type State = {
  status?: number
  message?: string
  error?: Record<string, string[] | undefined>
}

const initialState: State = {}

const Field = ({
  label,
  name,
  errors,
  children
}: {
  label: string
  name: string
  errors?: Record<string, string[] | undefined>
  children: React.ReactNode
}) => (
  <div className='flex flex-col gap-1.5'>
    <label htmlFor={name} className='text-sm font-medium text-foreground'>
      {label}
    </label>
    {children}
    {errors?.[name] && <p className='text-xs text-destructive'>{errors[name]?.[0]}</p>}
  </div>
)

const inputClass =
  'w-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'

const BlogForm = ({ blog }: { blog?: Blog }) => {
  const router = useRouter()
  const { locale } = useParams()
  const t = useTrans()
  const b = t.adminUi.blogs
  const isEdit = Boolean(blog)

  const action = isEdit ? updateBlog.bind(null, blog!.id) : createBlog
  const [state, formAction, pending] = useActionState(action as any, initialState)

  const result = state as State

  useEffect(() => {
    if (!result?.status) return
    if (result.status === 200 || result.status === 201) {
      Toast(result.message ?? 'Saved', 'success')
      router.push(`/${locale}/${Routes.ADMIN}/blogs`)
      router.refresh()
    } else if (result.status >= 500) {
      Toast(result.message ?? 'Something went wrong', 'error')
    }
  }, [result, router, locale])

  return (
    <form action={formAction} className='flex flex-col gap-5'>
<Field label={b.form.title} name='title' errors={result?.error}>
        <input
          id='title'
          name='title'
          defaultValue={blog?.title}
          placeholder='Nature’s path organic food'
          className={inputClass}
        />
      </Field>

<Field label={b.form.slug} name='slug' errors={result?.error}>
        <input
          id='slug'
          name='slug'
          defaultValue={blog?.slug}
          placeholder='natures-path-organic-food'
          className={inputClass}
        />
      </Field>

<Field label={b.form.image} name='image' errors={result?.error}>
        <input
          id='image'
          name='image'
          defaultValue={blog?.image ?? IMAGES.blogFallback}
          placeholder='https://…'
          className={inputClass}
        />
      </Field>

<Field label={b.form.author} name='author' errors={result?.error}>
        <input
          id='author'
          name='author'
          defaultValue={blog?.author ?? 'Akla Kitchen'}
          className={inputClass}
        />
      </Field>

<Field label={b.form.excerpt} name='excerpt' errors={result?.error}>
        <textarea
          id='excerpt'
          name='excerpt'
          rows={3}
          defaultValue={blog?.excerpt}
          placeholder='Short summary shown on the blog cards.'
          className={`${inputClass} resize-none`}
        />
      </Field>

<Field label={b.form.content} name='content' errors={result?.error}>
        <textarea
          id='content'
          name='content'
          rows={10}
          defaultValue={blog?.content}
          placeholder='Full article body.'
          className={`${inputClass} resize-y`}
        />
      </Field>

      <label className='flex items-center gap-2.5 text-sm text-foreground'>
        <input
          type='checkbox'
          name='published'
          defaultChecked={blog?.published ?? true}
          className='h-4 w-4 accent-[var(--brand)]'
        />
        {b.form.publishedLabel}
      </label>

      <div className='flex gap-3'>
        <button type='submit' disabled={pending} className='btn-brand px-8'>
          {pending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : isEdit ? (
            b.form.saveChanges
          ) : (
            b.form.create
          )}
        </button>
        <button
          type='button'
          onClick={() => router.push(`/${locale}/${Routes.ADMIN}/blogs`)}
          className='border border-border px-8 py-3 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand'
        >
          {t.cancel}
        </button>
      </div>
    </form>
  )
}

export default BlogForm
