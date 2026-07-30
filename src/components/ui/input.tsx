import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        // Base
        'h-12 w-full min-w-0 rounded-sm px-4 py-2 text-base md:text-sm transition-all outline-none',
        'bg-background border border-input',
        'placeholder:text-muted-foreground file:text-foreground',

        // Focus Styles
        'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20',

        // Hover
        'hover:border-brand/50',

        // Disabled
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',

        // Invalid
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:shadow-none',

        // File Input Styling
        'file:inline-flex file:h-8 file:px-3 file:mr-3 file:rounded-md file:border file:border-input file:bg-muted/30',
        'file:text-sm file:font-medium file:hover:bg-muted/50 file:transition-all',

        className
      )}
      {...props}
    />
  )
}

export { Input }
