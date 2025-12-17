'use client'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    isVisible && (
      <CustomButton
        icon={<ArrowUp className='animate-bounce' />}
        onClick={scrollToTop}
        aria-label='scroll'
      ></CustomButton>
    )
  )
}

export default ScrollToTopBtn

const CustomButton = ({
  onClick,
  icon,
  href,
  className,
  props
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>
  icon: ReactNode
  href?: string
  className?: string
  props?: any
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed bottom-20 right-6 z-50 flex justify-center items-center w-12 h-12 text-lg rounded-full bg-primary text-gray-900 shadow-lg hover:bg-primary-dark transition',
        className
      )}
      aria-label='scroll-to-top'
      {...props}
    >
      {icon}
    </Button>
  )
}
