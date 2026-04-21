import React from 'react'
import { Handshake, MoveUpRight } from 'lucide-react'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'
import HashCTAButton from './HashCTAButton'

type IntroCard = {
  id: number
  title: string
  label: string
}

const introCards: IntroCard[] = [
  {
    id: 1,
    title: 'Custom websites built for business goals',
    label: 'Web Design',
  },
  {
    id: 2,
    title: 'E-commerce websites that support sales',
    label: 'E-commerce',
  },
  {
    id: 3,
    title: 'WordPress, Shopify, Webflow, and CMS builds',
    label: 'CMS Builds',
  },
  {
    id: 4,
    title: 'Custom portals and web-based systems',
    label: 'Web Systems',
  },
  {
    id: 5,
    title: 'Landing pages designed to generate leads',
    label: 'Lead Capture',
  },
  {
    id: 6,
    title: 'Website redesigns and platform migrations',
    label: 'Redesign',
  },
  {
    id: 7,
    title: 'UI/UX that improves clarity and flow',
    label: 'Experience',
  },
  {
    id: 8,
    title: 'Better structure for user journeys',
    label: 'User Flow',
  },
  {
    id: 9,
    title: 'SEO that improves visibility',
    label: 'Visibility',
  },
  {
    id: 10,
    title: 'Ongoing support, updates, and growth',
    label: 'Growth',
  },
  {
    id: 11,
    title: 'Brand-consistent digital presentation',
    label: 'Brand Presence',
  },
  {
    id: 12,
    title: 'Content layouts that support action',
    label: 'Conversion',
  },
]

type IntroCardItemProps = IntroCard & {
  className?: string
}

const IntroCardItem = ({ title, label, className = '' }: IntroCardItemProps) => {
  return (
    <article
      className={`group relative isolate flex min-h-[232px] flex-col justify-between overflow-hidden rounded-[26px] border border-[color-mix(in_srgb,var(--accent-lime)_24%,transparent)] bg-[linear-gradient(145deg,#20270e_0%,#121607_48%,#070805_100%)] px-7 py-6 text-white shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-lime)_52%,transparent)] hover:shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:min-h-[248px] lg:h-full lg:min-h-0 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(191,239,46,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(191,239,46,0.08)_1px,transparent_1px)] bg-[size:92px_92px] opacity-60" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_20%,rgba(191,239,46,0.24),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(109,133,24,0.42),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.17] [background-image:radial-gradient(rgba(255,255,255,0.82)_0.8px,transparent_0.9px)] [background-size:7px_7px]" />
      <div className="pointer-events-none absolute inset-[18px] -z-10 rounded-[22px] border border-white/10" />

      <div className="flex items-start justify-between gap-5">
        <p className="max-w-[180px] text-[14px] font-semibold leading-tight text-[#f3ffd4]/90 sm:text-[15px]">
          {label}
        </p>
        <MoveUpRight
          aria-hidden="true"
          className="h-10 w-10 shrink-0 text-[#dfff72] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12"
          strokeWidth={1.35}
        />
      </div>

      <h3 className="max-w-[420px] pt-8 text-[28px] font-medium leading-[1] tracking-[-0.03em] text-[#f7f9f0] sm:text-[32px] lg:text-[clamp(1.85rem,2.4vw,2.75rem)]">
        {title}
      </h3>
    </article>
  )
}

const NowIntroducing = () => {
  return (
    <section className="space-y-10">
      <SectionIntro
        topContent={
          <FeatureStrip
            text="Now introduce 100xlift."
            icon={<Handshake size={16} strokeWidth={2} />}
          />
        }
        title="We fix the parts of your digital presence that quietly kill growth"
        description={
          <>
            100xlift helps businesses improve how they show up online and how well that
            presence supports lead generation.
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[132px] lg:gap-3">
        <IntroCardItem {...introCards[0]} className="lg:col-span-6 lg:row-span-2" />
        <IntroCardItem {...introCards[1]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[2]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[3]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[4]} className="lg:col-span-6 lg:row-span-2" />
        <IntroCardItem {...introCards[5]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[6]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[7]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[8]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[9]} className="lg:col-span-3 lg:row-span-2" />
        <IntroCardItem {...introCards[10]} className="lg:col-span-6 lg:row-span-2" />
        <IntroCardItem {...introCards[11]} className="lg:col-span-6 lg:row-span-2" />
      </div>

      <div className="flex justify-center">
        <HashCTAButton hash="contact" text="Talk About Your Project" />
      </div>
    </section>
  )
}

export default NowIntroducing
export { introCards }
