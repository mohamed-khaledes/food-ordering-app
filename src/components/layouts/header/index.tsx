import Link from '@/components/link'
import React from 'react'
import Navbar from './navbar'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='py-4 md:py-6'>
      <div className='container flex items-center justify-between gap-6 lg:gap-10'>
        <Link href={`/`} className='text-primary font-semibold text-2xl'>
          🍕 Pizza
        </Link>
        <div className='flex items-center gap-6 flex-1 justify-end'>
          <Navbar />
          <div className='hidden lg:flex lg:items-center lg:gap-6 '>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
