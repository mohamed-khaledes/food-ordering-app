import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com', icon: Youtube, label: 'Youtube' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' }
]

const Footer = async () => {
  const { global } = await getTrans()

  const navColumns = [
    {
      title: global.company,
      links: [
        { href: '/about', label: global.about },
        { href: '/careers', label: global.careers },
        { href: '/blog', label: global.blog }
      ]
    },
    {
      title: global.menu,
      links: [
        { href: '/meals', label: global.meals },
        { href: '/plans', label: global.plans },
        { href: '/pricing', label: global.pricing }
      ]
    },
    {
      title: global.support,
      links: [
        { href: '/contact', label: global.contact },
        { href: '/faq', label: global.faq },
        { href: '/terms', label: global.terms },
        { href: '/privacy', label: global.privacy }
      ]
    }
  ]

  return (
    <footer className='bg-foreground text-background rounded-tl-3xl rounded-tr-3xl overflow-hidden'>
      {/* Top accent bar */}
      <div className='h-1 w-full bg-primary' />

      <div className='container py-16'>
        {/* Main grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-background/10'>
          {/* Brand col — spans 2 */}
          <div className='lg:col-span-2 flex flex-col gap-5'>
            <div>
              <div className='inline-flex items-center gap-2 mb-3'>
                <div className='w-8 h-8 rounded-xl bg-primary flex items-center justify-center'>
                  <span className='text-foreground font-bold text-sm'>K</span>
                </div>
                <span className='text-lg font-bold text-background'>Kemetraa</span>
              </div>
              <p className='text-sm text-background/50 leading-relaxed max-w-xs'>
                Chef-crafted meals with locally sourced ingredients, delivered fresh to your door
                every day.
              </p>
            </div>

            {/* Social icons */}
            <div>
              <p className='text-xs text-background/40 uppercase tracking-widest mb-3'>
                {global.followUs}
              </p>
              <div className='flex gap-2'>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    aria-label={label}
                    className='w-9 h-9 flex items-center justify-center rounded-xl bg-background/10 hover:bg-primary hover:text-foreground text-background/60 transition-all duration-200'
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Mini stats */}
            <div className='flex gap-6 pt-2'>
              {[
                { n: '12k+', l: 'Customers' },
                { n: '200+', l: 'Meals' },
                { n: '4.9', l: 'Rating' }
              ].map(s => (
                <div key={s.l}>
                  <div className='text-base font-bold text-primary'>{s.n}</div>
                  <div className='text-xs text-background/40'>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map(col => (
            <div key={col.title}>
              <h3 className='text-xs font-medium text-background/40 uppercase tracking-widest mb-5'>
                {col.title}
              </h3>
              <ul className='flex flex-col gap-3'>
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className='text-sm text-background/60 hover:text-primary transition-colors duration-200'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-background/40'>
            © {new Date().getFullYear()} <span className='text-primary font-medium'>Kemetraa</span>{' '}
            {global.copyRight}
          </p>
          <div className='flex items-center gap-1.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
            <span className='text-xs text-background/40'>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
