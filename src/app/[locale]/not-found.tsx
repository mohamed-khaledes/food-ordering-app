import Link from 'next/link'

export default function NotFound() {
  return (
    <html>
      <body>
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-center px-6'>
          <div className='max-w-md'>
            <div className='text-[120px] font-extrabold text-gray-300 dark:text-gray-700 leading-none mb-4'>
              404
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3'>
              Page Not Found
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
              href='/'
              className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow transition-colors duration-200'
            >
              Go Home
            </Link>
            <p className='mt-10 text-sm text-gray-500 dark:text-gray-400'>
              © {new Date().getFullYear()} Kemetraa. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
