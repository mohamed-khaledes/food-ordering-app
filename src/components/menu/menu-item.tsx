import Image from 'next/image'
import { formatCurrency } from '@/lib/helpers'
import AddToCart from './add-to-cart'

function MenuItem({ item }: { item: any }) {
  return (
    <li
      className='p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100 
  text-center group hover:-translate-y-2 hover:bg-white hover:shadow-xl hover:shadow-black/15 
  transition-all duration-300 ease-in-out cursor-pointer'
    >
      <div className='relative w-48 h-48 mx-auto rounded-xl '>
        <Image
          src={item.image || '/assets/images/pizza.png'}
          alt={item.name}
          fill
          className='object-cover transform group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className='flex items-center justify-between mb-4 mt-4'>
        <h4 className='font-semibold text-xl text-gray-800 group-hover:text-accent transition-colors first-letter:uppercase'>
          {item.name}
        </h4>
        <strong className='text-accent text-lg bg-accent/10 px-3 py-1 rounded-full'>
          {formatCurrency(item.basePrice)}
        </strong>
      </div>

      <p className='text-gray-500 text-sm leading-relaxed line-clamp-3 text-start'>
        {item.description}
      </p>
      <AddToCart item={item} />
    </li>
  )
}

export default MenuItem
