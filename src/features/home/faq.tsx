'use client'

import SectionHeading from '@/components/ui/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Container } from '@/components/ui/container'
import { useTrans } from '@/lib/translations/client'
import faqImg from '../../../public/assets/items/Orange Sunrise Juice.png'

const Faq = () => {
  const { sections } = useTrans()

  return (
    <section className='section-y bg-background'>
      <Container>
        <SectionHeading title={sections.faq.title} subtitle={sections.faq.subtitle} />

        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2'>
          <Accordion type='single' collapsible defaultValue='item-1' className='w-full'>
            {sections.faq.items.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i + 1}`}
                className='mb-3 border border-border bg-haze px-5 data-[state=open]:border-brand data-[state=open]:bg-brand data-[state=open]:text-white'
              >
                <AccordionTrigger className='text-start text-sm font-medium hover:no-underline'>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className='text-sm leading-relaxed opacity-90'>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className='flex justify-center'>
            <img
              src={faqImg.src}
              alt=''
              aria-hidden
              loading='lazy'
              className='w-[220px] object-contain sm:w-[260px] lg:w-[380px]'
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Faq
