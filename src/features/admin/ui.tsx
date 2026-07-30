import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { statusTone } from './order-status'

/**
 * Shared surfaces for the dashboard.
 *
 * The admin previously drew every panel as a flat 1px rectangle with square
 * corners, which read as a wireframe next to the storefront. These give it the
 * same softened, slightly elevated card language the site and mobile nav use,
 * while keeping the brand's restrained palette.
 */

export const Panel = ({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) => (
  <section
    className={cn(
      'border-border/70 bg-background rounded-2xl border shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-16px_rgb(0_0_0/0.12)]',
      className
    )}
  >
    {children}
  </section>
)

export const PanelHeader = ({
  title,
  meta,
  action
}: {
  title: string
  meta?: React.ReactNode
  action?: React.ReactNode
}) => (
  <div className='border-border/70 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4'>
    <h2 className='text-[15px] font-bold'>{title}</h2>
    {meta && <div className='text-muted-foreground text-xs'>{meta}</div>}
    {action}
  </div>
)

/**
 * KPI tile. `tone="accent"` is the one deep-green tile per screen — spending the
 * emphasis in a single place keeps the row calm.
 */
export const StatCard = ({
  label,
  value,
  sub,
  icon: Icon,
  tone = 'plain'
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  tone?: 'plain' | 'accent'
}) => {
  const accent = tone === 'accent'
  return (
    <div
      className={cn(
        'rounded-2xl border p-5 transition-colors',
        accent
          ? 'border-deep bg-deep text-white'
          : 'border-border/70 bg-background hover:border-brand/60 shadow-[0_1px_2px_rgb(0_0_0/0.04)]'
      )}
    >
      <div className='flex items-center gap-2.5'>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            accent ? 'bg-white/12 text-brand' : 'bg-brand-soft text-brand'
          )}
        >
          <Icon className='h-4 w-4' />
        </span>
        <span
          className={cn(
            'text-[11px] font-medium tracking-widest uppercase',
            accent ? 'text-white/60' : 'text-muted-foreground'
          )}
        >
          {label}
        </span>
      </div>

      <p
        className={cn(
          'mt-4 text-[28px] leading-none font-bold tabular-nums',
          accent ? 'text-white' : 'text-foreground'
        )}
      >
        {value}
      </p>
      {sub && (
        <p className={cn('mt-2 text-xs', accent ? 'text-white/55' : 'text-muted-foreground')}>
          {sub}
        </p>
      )}
    </div>
  )
}

/** Order state as a chip. The dot encodes state in form, not just colour. */
export const StatusChip = ({
  status,
  label,
  className
}: {
  status: OrderStatus
  label: string
  className?: string
}) => {
  const tone = statusTone(status)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap',
        tone.chip,
        className
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 shrink-0 rounded-full', tone.dot)} />
      {label}
    </span>
  )
}

export const EmptyState = ({
  icon: Icon,
  message,
  action
}: {
  icon: React.ElementType
  message: string
  action?: React.ReactNode
}) => (
  <Panel className='flex flex-col items-center justify-center gap-3 px-6 py-16'>
    <div className='bg-brand-soft flex h-12 w-12 items-center justify-center rounded-full'>
      <Icon className='text-brand h-5 w-5' />
    </div>
    <p className='text-muted-foreground text-sm'>{message}</p>
    {action}
  </Panel>
)
