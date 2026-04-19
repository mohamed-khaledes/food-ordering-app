import { getTrans } from '@/lib/translations/server'
import React from 'react'

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Tahrir Square, Cairo, Egypt'
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+20 100 000 0000'
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'hello@yourfood.com'
  },
  {
    icon: '🕐',
    label: 'Hours',
    value: 'Daily 8:00 am – 10:00 pm'
  }
]

const ContactUs = async () => {
  const { global } = await getTrans()

  return (
    <section id='contact' className='py-24 bg-white dark:bg-background overflow-hidden'>
      <div className='container'>
        {/* Header */}
        <div className='max-w-xl mb-16'>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              Get in touch
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>{global.contact}</h2>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            Have a question or want to place a special order? We'd love to hear from you.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
          {/* Left: form */}
          <form className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  {global.name}
                </label>
                <input
                  type='text'
                  placeholder='John Doe'
                  className='w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                  {global.email}
                </label>
                <input
                  type='email'
                  placeholder='john@example.com'
                  className='w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                Subject
              </label>
              <input
                type='text'
                placeholder='How can we help?'
                className='w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-muted-foreground uppercase tracking-widest'>
                {global.message}
              </label>
              <textarea
                placeholder='Tell us anything...'
                rows={5}
                className='w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm resize-none'
              />
            </div>

            <button className='w-full py-3.5 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 active:scale-[0.98] transition-all text-sm'>
              {global.send} →
            </button>
          </form>

          {/* Right: info + map */}
          <div className='flex flex-col gap-6'>
            {/* Contact info grid */}
            <div className='grid grid-cols-2 gap-4'>
              {contactInfo.map(item => (
                <div
                  key={item.label}
                  className='p-5 rounded-2xl border border-border bg-muted/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group'
                >
                  <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-base mb-3 group-hover:bg-primary/20 transition-colors'>
                    {item.icon}
                  </div>
                  <p className='text-xs text-muted-foreground uppercase tracking-widest mb-1'>
                    {item.label}
                  </p>
                  <p className='text-sm font-medium text-foreground leading-snug'>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className='rounded-2xl overflow-hidden border border-border h-64'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.090819458354!2d31.235711315115904!3d30.04441998188008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840d4edb6a6e3%3A0x2d7a8f7aab62f14a!2sTahrir%20Square%2C%20Cairo!5e0!3m2!1sen!2seg!4v1695300000000!5m2!1sen!2seg'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
