'use client'

import { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Routes } from '@/constants/enums'
import { Search, X } from 'lucide-react'
import { useTrans } from '@/lib/translations/client'

/**
 * Header search. Opens as a popup from anywhere; submitting always lands on
 * the menu page with `?q=` set, so the shop grid and its own search box stay
 * in sync with whatever was typed here.
 */
const SearchDialog = () => {
  const { search } = useTrans()
  const placeholder = search.placeholder
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')

  // Seed the field with the active query whenever the popup is opened.
  const activeQuery = searchParams.get('q') ?? ''
  useEffect(() => {
    if (open) setTerm(activeQuery)
  }, [open, activeQuery])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = term.trim()
    const target = `/${locale}/${Routes.MENU}${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ''}`
    const alreadyOnMenu = pathname === `/${locale}/${Routes.MENU}`

    // Staying on the menu shouldn't push a history entry for every search.
    if (alreadyOnMenu) router.replace(target, { scroll: false })
    else router.push(target)

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type='button'
          aria-label={placeholder}
          className='flex items-center gap-2 rounded-full bg-haze py-1.5 ps-4 pe-1.5 text-sm text-muted-foreground transition-colors hover:bg-brand-soft'
        >
          <span className='hidden lg:inline'>{placeholder}</span>
          <span className='flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white'>
            <Search className='h-4 w-4' />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className='top-[18%] w-[calc(100%-2rem)] max-w-xl translate-y-0 gap-0 rounded-none border-border p-0'
      >
        <DialogTitle className='sr-only'>{placeholder}</DialogTitle>

        <form onSubmit={submit} className='flex items-center gap-3 p-4'>
          <Search className='h-5 w-5 shrink-0 text-muted-foreground' />
          <input
            autoFocus
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder={placeholder}
            className='min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground'
          />
          {term && (
            <button
              type='button'
              onClick={() => setTerm('')}
aria-label={search.clear}
              className='flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-haze hover:text-foreground'
            >
              <X className='h-4 w-4' />
            </button>
          )}
          <button type='submit' className='btn-brand shrink-0 px-4 py-2 sm:px-5'>
            {search.button}
          </button>
        </form>

        <p className='border-t border-border px-4 py-3 text-xs text-muted-foreground'>
          {search.hint}
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
