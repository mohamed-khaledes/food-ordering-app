import Link from '@/components/link'
import { Routes, Pages } from '@/constants/enums'
import { XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react'

const reasons = [
  'Insufficient funds on the card',
  'Card details entered incorrectly',
  'Transaction was declined by your bank',
  'Payment session expired'
]

async function PaymentFailedPage() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4 py-20'>
      {/* Background blobs */}
      <div className='fixed -top-20 left-1/3 w-[360px] h-[360px] rounded-full bg-destructive/5 blur-3xl pointer-events-none' />
      <div className='fixed bottom-0 -right-20 w-[260px] h-[260px] rounded-full bg-destructive/3 blur-3xl pointer-events-none' />

      <div className='w-full max-w-md relative z-10'>
        {/* Failed icon */}
        <div className='flex flex-col items-center mb-8'>
          <div className='w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4'>
            <XCircle className='w-10 h-10 text-destructive' strokeWidth={1.5} />
          </div>
          <h1 className='text-2xl font-bold text-foreground'>Payment failed</h1>
          <p className='text-muted-foreground text-sm mt-1 text-center'>
            We couldn't process your payment. No charges were made.
          </p>
        </div>

        {/* Reasons card */}
        <div className='bg-background border border-border rounded-2xl overflow-hidden mb-4'>
          <div className='px-6 py-4 border-b border-border'>
            <p className='text-sm font-medium text-foreground'>This can happen because of</p>
          </div>
          <ul className='divide-y divide-border'>
            {reasons.map((reason, i) => (
              <li key={i} className='flex items-center gap-3 px-6 py-3'>
                <span className='w-1.5 h-1.5 rounded-full bg-destructive/50 flex-shrink-0' />
                <span className='text-sm text-muted-foreground'>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Support note */}
        <div className='flex items-start gap-3 px-4 py-3 bg-muted/40 rounded-2xl border border-border mb-6'>
          <span className='w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0' />
          <p className='text-xs text-muted-foreground leading-relaxed'>
            If you were charged but see this page, the charge will be automatically reversed within
            3–5 business days. Contact us at{' '}
            <a
              href='mailto:hello@kemetraa.com'
              className='text-foreground underline underline-offset-2'
            >
              hello@kemetraa.com
            </a>{' '}
            if you need help.
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col gap-3'>
          <Link
            href={`/${Routes.CART}`}
            className='flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all'
          >
            <RefreshCw className='w-4 h-4' />
            Try again
          </Link>
          <Link
            href={`/${Routes.MENU}`}
            className='flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to menu
          </Link>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            <Home className='w-4 h-4' />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailedPage
