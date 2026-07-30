import SectionHeading from '@/components/ui/section-heading'
import { Container } from '@/components/ui/container'
import { IMAGES } from '@/constants/images'
import { getTrans } from '@/lib/translations/server'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const SOCIALS = [Twitter, Facebook, Instagram]

const Team = async () => {
  const { sections } = await getTrans()

  return (
    <section className='section-y bg-background'>
      <Container>
        <SectionHeading title={sections.team.title} subtitle={sections.team.subtitle} />

        <ul className='grid grid-cols-1 gap-10 sm:grid-cols-3'>
          {sections.team.items.map((member, i) => (
            <li key={member.name} className='flex flex-col items-center gap-3 text-center'>
              <div className='group h-32 w-32 overflow-hidden rounded-full bg-cream ring-2 ring-transparent transition-all duration-300 hover:ring-brand sm:h-40 sm:w-40'>
                <img
                  src={IMAGES.team[i % IMAGES.team.length]}
                  alt={member.name}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>

              <div>
                <h3 className='font-bold text-foreground'>{member.name}</h3>
                <p className='text-sm text-brand'>{member.role}</p>
              </div>

              <div className='flex gap-2'>
                {SOCIALS.map((Icon, si) => (
                  <span
                    key={si}
                    className='flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors hover:bg-brand hover:text-white'
                  >
                    <Icon className='h-3.5 w-3.5' />
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default Team
