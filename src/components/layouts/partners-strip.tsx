import { Container } from '../ui/container'

const PARTNERS = ['greenery', 'Design & Branding', 'Nature', 'Style Nature', 'Designs Branding']

/**
 * Muted logo band that separates the page body from the footer on every
 * inner page. Rendered as wordmarks — no partner logo assets were supplied.
 */
const PartnersStrip = () => {
  return (
    <section className='bg-muted'>
      <Container className='flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-10 md:justify-between md:py-14'>
        {PARTNERS.map(name => (
          <span
            key={name}
            className='text-center text-lg font-medium tracking-[0.2em] text-foreground/25 uppercase select-none md:text-xl'
          >
            {name}
          </span>
        ))}
      </Container>
    </section>
  )
}

export default PartnersStrip
