import { getTrans } from '@/lib/translations/server'
import React from 'react'
import { ArrowRight, Mail, MapPin, PhoneCall } from 'lucide-react'
import { Container } from '@/components/ui/container'

/** Contact values are the same in both locales; only the labels translate. */
const CONTACT_VALUES = [
  '+20 100 000 0000',
  'support@akla.com',
  'Tahrir Square, Cairo, Egypt'
]
const CONTACT_ICONS = [PhoneCall, Mail, MapPin]

/**
 * Contact card from the design: copy and contact rows on the left, a boxed
 * enquiry form on the right. Presentational only — there is no submit handler.
 */
const ContactUs = async () => {
  const { global, sections } = await getTrans()

  const rows = [
    sections.contact.phoneLabel,
    sections.contact.mailLabel,
    sections.contact.officeLabel
  ]

  return (
    <section id='contact' className='section-y bg-background'>
      <Container>
        <div className='grid grid-cols-1 gap-10 bg-background p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)] md:gap-12 md:p-12 lg:grid-cols-2'>
          {/* Left: heading + contact rows */}
          <div>
            <h2 className='mb-8 max-w-sm text-[24px] font-bold leading-tight text-foreground sm:text-[28px] md:text-[36px]'>
              {sections.contact.heading}
            </h2>

            <ul className='flex flex-col gap-5'>
              {rows.map((label, i) => {
                const Icon = CONTACT_ICONS[i]
                return (
                  <li key={label} className='flex items-center gap-4'>
                    <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white sm:h-14 sm:w-14'>
                      <Icon className='h-5 w-5' />
                    </span>
                    <div className='min-w-0'>
                      <p className='text-sm font-bold text-foreground'>{label}</p>
                      <p className='truncate text-sm text-muted-foreground'>{CONTACT_VALUES[i]}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right: enquiry form */}
          <form className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <input
                type='text'
                placeholder={`${global.name}*`}
                aria-label={global.name}
                className='border border-border bg-haze px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'
              />
              <input
                type='email'
                placeholder={`${global.email}*`}
                aria-label={global.email}
                className='border border-border bg-haze px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'
              />
            </div>

            <input
              type='tel'
              placeholder={global.phone}
              aria-label={global.phone}
              className='border border-border bg-haze px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'
            />

            <textarea
              rows={6}
              placeholder={global.message}
              aria-label={global.message}
              className='resize-none border border-border bg-haze px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand'
            />

            <button type='submit' className='btn-brand group w-fit px-8'>
              {global.send}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default ContactUs
