import Link from 'next/link'
import { getTrans } from '@/lib/translations/server'

export default async function NotFound() {
  const { notFound } = await getTrans()

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center'>
      <div className='relative flex items-center justify-center'>
        <span className='select-none text-[140px] font-bold leading-none text-haze md:text-[220px]'>
          404
        </span>
      </div>

      <h1 className='-mt-6 max-w-xl text-2xl font-bold text-foreground md:text-[34px]'>
{notFound.title}
      </h1>

      <p className='mt-3 text-sm text-muted-foreground'>
{notFound.subtitle}
      </p>

      <Link href='/' className='btn-brand mt-8 px-8'>
{notFound.back}
      </Link>
    </div>
  )
}
