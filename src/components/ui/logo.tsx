import { cn } from '@/lib/utils'

/**
 * Akla brand mark — an "A" whose legs taper and curve like two young leaves,
 * with the crossbar as the stem.
 *
 * Monochrome on purpose. An earlier two-tone version put the crossbar in brand
 * green, which visually welded it to the left leg and made the right leg read
 * as a thin sliver; a single fill keeps the counter balanced and survives down
 * to 16px. The viewBox is trimmed to the ink, so `h-7` really is 28px of mark.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 52 49'
    aria-hidden
    focusable='false'
    className={cn('text-brand', className)}
  >
    <g fill='currentColor' transform='translate(-6 -7)'>
      <path d='M32 7 C31 7 30.2 7.5 29.7 8.3 C19 23 9.6 39.4 6 56 H20 C22.6 41.6 26.4 24.6 32 9.4 Z' />
      <path d='M32 7 C33 7 33.8 7.5 34.3 8.3 C45 23 54.4 39.4 58 56 H44 C41.4 41.6 37.6 24.6 32 9.4 Z' />
      <path d='M22.6 40 H41.4 L43.4 47 H20.6 Z' />
    </g>
  </svg>
)

/**
 * Horizontal lockup: mark + wordmark.
 *
 * The wordmark is live text rather than SVG `<text>` or an outlined path, so it
 * renders in the site's own heading face, inherits `currentColor` (ink in the
 * header, white on the dark footer) and stays crisp at any size. `markClassName`
 * is separate because the mark keeps brand green while the word takes the
 * surrounding colour.
 */
const Logo = ({
  className,
  markClassName,
  wordClassName
}: {
  className?: string
  markClassName?: string
  wordClassName?: string
}) => (
  <span className={cn('inline-flex items-center gap-2', className)}>
    <LogoMark className={cn('h-7 w-auto shrink-0', markClassName)} />
    <span
      className={cn(
        'font-heading text-[26px] font-bold leading-none tracking-tight',
        wordClassName
      )}
    >
      Akla
    </span>
  </span>
)

export default Logo
