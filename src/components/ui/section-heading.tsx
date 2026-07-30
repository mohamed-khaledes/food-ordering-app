import { cn } from '@/lib/utils'

/**
 * Centred title + muted subtitle that opens every band of the design.
 * `tone="light"` is for the dark green full-bleed sections.
 */
const SectionHeading = ({
  title,
  subtitle,
  tone = 'dark',
  align = 'center',
  className
}: {
  title: string
  subtitle?: string
  tone?: 'dark' | 'light'
  align?: 'center' | 'start'
  className?: string
}) => {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-3 md:mb-14',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className
      )}
    >
      <h2
        className={cn(
          'text-[24px] font-bold capitalize leading-tight sm:text-[30px] md:text-[40px]',
          tone === 'light' ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-sm md:text-base',
            tone === 'light' ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
