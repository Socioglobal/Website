import * as React from 'react'

import { PipelineCalculator } from '@/components/PipelineCalculator'
import { Section, SectionHeading } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { calculator } from '@/content/site'

export function CalculatorSection() {
  return (
    <Section
      id="pipeline-calculator"
      tone="blue"
      dotGrid
      aria-labelledby="calculator-heading"
      className="scroll-mt-20"
    >
      <SectionHeading
        id="calculator-heading"
        eyebrow={calculator.eyebrow}
        title={calculator.h2}
        sub={calculator.sub}
      />

      <Reveal className="mt-14">
        <PipelineCalculator />
      </Reveal>
    </Section>
  )
}
