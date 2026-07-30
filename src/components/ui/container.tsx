import { cn } from '@/lib/utils'
import React from 'react'

export type TContainer = React.ComponentProps<'div'>

export const Container: React.FC<TContainer> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-3 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
