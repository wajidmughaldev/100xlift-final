import React from 'react'
import { HandCoins } from 'lucide-react'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'

type ProcessItem = {
  number: string
  title: string
  description: string
}

const processItems: ProcessItem[] = [
  {
    number: '01',
    title: 'Audit',
    description: 'We identify trust leaks and conversion gaps',
  },
  {
    number: '02',
    title: 'Prioritize',
    description: 'We focus on what matters most first',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We design and launch what is actually needed',
  },
  {
    number: '04',
    title: 'Support',
    description: 'We help keep the system consistent after go-live',
  },
]

const HexCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`relative flex aspect-[1.05/1] w-full items-center justify-center border border-[#a7ca1d] bg-[linear-gradient(180deg,#d7ff2a_0%,#b4de12_56%,#8fad10_100%)] text-black [clip-path:polygon(50%_0%,96%_25%,96%_75%,50%_100%,4%_75%,4%_25%)] ${className}`}
    >
      {children}
    </div>
  )
}

const OurProcess = () => {
  return (
    <section className="mx-auto flex max-w-[980px] flex-col items-center px-4 py-10 text-center text-[var(--page-fg)]">

      <SectionIntro
        topContent={
          <FeatureStrip
            text="Our process"
            icon={<HandCoins size={16} strokeWidth={2.2} />}
          />
        }
        title="Why good businesses still lose leads online?"
        description={
          <>
             A simple process built around clarity and momentum
          </>
        }
      />




      <div className="mt-14 hidden w-full items-center md:flex md:flex-col">
        <div className="flex items-center justify-center gap-2">
          {processItems.map((item) => (
            <HexCard key={item.number} className="w-[150px] lg:w-[168px] xl:w-[184px]">
              <div className="mt-[-23px] flex max-w-[72%] flex-col items-center text-center">
                <span className="text-[18px] font-normal leading-none">
                  {item.number}
                </span>
                <h3 className="mt-3 text-[28px] font-semibold leading-[0.95] tracking-[-0.05em] lg:text-[32px] xl:text-[34px]">
                  {item.title}
                </h3>
              </div>
            </HexCard>
          ))}
        </div> 

        <div className="-mt-[20px] flex items-center justify-center gap-2 lg:ml-[188px] xl:ml-[190px]">
          {processItems.map((item) => (
            <HexCard key={`${item.number}-desc`} className="w-[150px] lg:w-[168px] xl:w-[184px]">
              <div className="max-w-[72%] text-center text-[16px] font-medium leading-[0.95] tracking-[-0.03em] lg:text-[17px] xl:text-[18px]">
                {item.description}
              </div>
            </HexCard>
          ))}
        </div>
      </div>

      <div className="mt-12 grid w-full max-w-[520px] grid-cols-1 gap-5 md:hidden">
        {processItems.map((item) => (
          <div key={item.number} className="space-y-3">
            <HexCard className="mx-auto max-w-[280px]">
              <div className="flex max-w-[72%] flex-col items-center text-center">
                <span className="text-[18px] font-normal leading-none">
                  {item.number}
                </span>
                <h3 className="mt-3 text-[34px] font-semibold leading-[0.95] tracking-[-0.05em]">
                  {item.title}
                </h3>
              </div>
            </HexCard>
            <HexCard className="mx-auto max-w-[280px]">
              <div className="max-w-[72%] text-center text-[18px] font-medium leading-[0.95] tracking-[-0.03em]">
                {item.description}
              </div>
            </HexCard>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurProcess
export { processItems }
