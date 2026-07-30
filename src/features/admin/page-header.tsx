/**
 * Title block for dashboard pages.
 *
 * The brand rule sits on the leading edge — logical, so it flips in RTL — and
 * the surface matches the rest of the panels: softened corners and a hairline
 * shadow rather than the flat square box this used to be.
 */
const DashboardHeader = ({
  title,
  description,
  action
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) => {
  return (
    <div className='border-border/70 bg-background mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]'>
      <div className='border-brand min-w-0 border-s-[3px] ps-4'>
        <h1 className='truncate text-xl font-bold sm:text-2xl'>{title}</h1>
        {description && <p className='text-muted-foreground mt-0.5 text-sm'>{description}</p>}
      </div>
      {action}
    </div>
  )
}

export default DashboardHeader
