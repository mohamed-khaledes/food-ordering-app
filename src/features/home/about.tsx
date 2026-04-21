import React from 'react'
import { getTrans } from '@/lib/translations/server'

const milestones = [
  { n: '2018', l: 'Founded' },
  { n: '50+', l: 'Team members' },
  { n: '15+', l: 'Cities served' },
  { n: '200+', l: 'Weekly meals' }
]

const values = [
  {
    icon: '🌱',
    title: 'Farm to table',
    text: 'Every ingredient is sourced directly from local farms, picked at peak freshness.'
  },
  {
    icon: '👨‍🍳',
    title: 'Chef crafted',
    text: 'Our in-house chefs design every recipe with nutrition and flavor in mind.'
  },
  {
    icon: '♻️',
    title: 'Sustainable',
    text: 'Eco-friendly packaging and zero-waste kitchen practices across all locations.'
  }
]

const About = async () => {
  const {
    home: { about }
  } = await getTrans()

  return (
    <section id='about' className='py-24 bg-white dark:bg-background overflow-hidden'>
      <div className='container relative z-10'>
        {/* Top: eyebrow + headline */}
        <div className='max-w-2xl mb-16'>
          <div className='inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='text-xs font-medium text-foreground/70 uppercase tracking-widest'>
              Our story
            </span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>{about.aboutUs}</h2>
          <p className='text-muted-foreground text-lg leading-relaxed'>{about.ourStory}</p>
        </div>

        {/* Middle: descriptions in a 3-col grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-16'>
          {[about.descriptions.one, about.descriptions.two, about.descriptions.three].map(
            (desc, i) => (
              <div
                key={i}
                className='bg-white dark:bg-background p-8 hover:bg-muted/40 transition-colors duration-300 group'
              >
                <div className='text-4xl font-bold text-primary/30 mb-4 group-hover:text-primary/60 transition-colors'>
                  0{i + 1}
                </div>
                <p className='text-muted-foreground leading-relaxed text-sm group-hover:text-foreground transition-colors'>
                  {desc}
                </p>
              </div>
            )
          )}
        </div>

        {/* Stats row */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16'>
          {milestones.map(m => (
            <div
              key={m.l}
              className='bg-white dark:bg-background px-8 py-10 text-center hover:bg-muted/40 transition-colors group'
            >
              <div className='text-4xl font-bold text-foreground group-hover:text-primary transition-colors mb-1'>
                {m.n}
              </div>
              <div className='text-xs text-muted-foreground uppercase tracking-widest'>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Values row */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {values.map((v, i) => (
            <div
              key={i}
              className='flex items-start gap-4 p-6 rounded-2xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group'
            >
              <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors'>
                {v.icon}
              </div>
              <div>
                <h3 className='font-semibold text-foreground mb-1'>{v.title}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
