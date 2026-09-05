'use client'

import * as React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { faqs } from '@/content/site'

export function Faq() {
  return (
    <Section tone="canvas" aria-labelledby="faq-heading">
      <SectionHeading
        id="faq-heading"
        eyebrow="Questions"
        title="Straight answers before you book."
      />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <div className="card px-7 py-2 sm:px-9">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </Section>
  )
}
