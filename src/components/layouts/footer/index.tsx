import Link from '@/components/link'
import { getTrans } from '@/lib/translations/server'
import { Facebook, Instagram, Twitter, Youtube, MapPin } from 'lucide-react'
import Logo from '@/components/ui/logo'
import { Routes } from '@/constants/enums'
import { Container } from '@/components/ui/container'

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: Youtube, label: 'Youtube' }
]

const Footer = async () => {
  const { global, common } = await getTrans()

  const navColumns = [
    {
      title: global.company,
      links: [
        { href: `/${Routes.ABOUT}`, label: global.about },
        { href: `/${Routes.MENU}`, label: global.meals },
        { href: '/', label: global.careers },
        { href: '/', label: global.blog },
        { href: `/${Routes.CONTACT}`, label: global.contact }
      ]
    },
    {
      title: global.support,
      links: [
        { href: '/', label: global.faq },
        { href: '/', label: global.terms },
        { href: '/', label: global.privacy },
        { href: '/', label: global.pricing },
        { href: '/', label: global.plans }
      ]
    }
  ]

  return (
    <footer className='relative overflow-hidden bg-ink text-white'>
      <Container>
        {/* Decorative leaf outlines, as in the design's corners */}
        <span
          aria-hidden
          className='pointer-events-none absolute -bottom-10 -start-10 h-52 w-52 rounded-full border border-white/5'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute -top-16 end-[6%] h-64 w-64 rounded-[45%] border border-white/5'
        />

        <div className='container relative py-16 md:py-20'>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
            {/* About */}
            <div className='flex flex-col gap-5'>
              <h3 className='text-lg font-bold'>{global.about}</h3>
              <p className='text-sm leading-relaxed text-white/55'>
                Chef-crafted meals made with locally sourced, chemical-free ingredients — delivered
                fresh to your door every day.
              </p>
              <div className='flex gap-2.5'>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={label}
                    className='flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-brand hover:text-white'
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {navColumns.map(col => (
              <div key={col.title}>
                <h3 className='mb-5 text-lg font-bold'>{col.title}</h3>
                <ul className='flex flex-col gap-3'>
                  {col.links.map(({ href, label }, i) => (
                    <li key={`${href}-${i}`}>
                      <Link
                        href={href}
                        className='text-sm text-white/55 transition-colors duration-200 hover:text-brand'
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Brand + newsletter */}
            <div className='flex flex-col gap-4'>
              <Logo markClassName='h-8' wordClassName='text-[30px] text-white' />
              <p className='text-sm leading-relaxed text-white/55'>
                We deliver healthy, chef-prepared food across Egypt — fast, fresh and fairly priced.
              </p>
              <p className='flex items-center gap-2 text-sm text-white/70'>
                <MapPin className='h-4 w-4 shrink-0 text-brand' />
                Cairo, Egypt
              </p>

              <form className='mt-1 flex overflow-hidden rounded-sm bg-white'>
                <input
                  type='email'
                  required
                  placeholder={global.email}
                  aria-label={global.email}
                  className='min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground'
                />
                <button
                  type='submit'
                  className='shrink-0 bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-dark'
                >
                  {global.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      {/* Bottom strip */}
      <div className='relative bg-ink-soft'>
        <Container className='flex flex-col items-center justify-between gap-3 py-5 sm:flex-row'>
          <a
            href='https://www.linkedin.com/in/mohamed-khaledes/'
            target='_blank'
            rel='noreferrer'
            className='text-xs text-white/55'
          >
            © {new Date().getFullYear()}{' '}
            <span className='font-medium text-brand'>Mohamed khaled</span> {global.copyRight}
          </a>
          <div className='flex items-center gap-1.5'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-brand' />
            <span className='text-xs text-white/55'>{common.allSystems}</span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
