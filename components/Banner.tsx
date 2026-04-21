'use client'

import React from 'react'
import Image from 'next/image'
import { Award, MoveUpRight, Phone } from 'lucide-react'
import FeatureStrip from './FeatureStrip'
import { CTAButton } from './ui/cta-button'

const Banner = () => {
  const openCalendarModal = () => {
    window.dispatchEvent(new Event('open-calendar-modal'))
  }

  return (
    <section
      className="relative flex min-h-[560px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[1rem] bg-black px-5 py-12 text-center sm:min-h-[620px] sm:px-8 sm:py-16 lg:min-h-[760px] lg:gap-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="banner-bg-motion absolute inset-0"
      >
        <Image
          src="/banner-bg-gradient.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/8"
      />

      <FeatureStrip
        icon={<Award size={20} strokeWidth={2.2} />}
        text="Digital systems for growth-focused businesses"
        className="relative z-[1] mx-auto max-w-[320px] justify-center text-left !text-white sm:max-w-full sm:justify-center sm:text-center"
      />

      <h1 className="relative z-[1] max-w-[980px] text-[2rem] leading-[1.08] tracking-[-0.05em] text-white sm:text-[2.8rem] md:text-[3.4rem] lg:text-[4.2rem] lg:leading-[1.02]">
        Your <strong>business</strong> may be growing.
        <br className="hidden sm:block" />
        {' '}Your <strong>digital presence</strong> may still be
        <br className="hidden sm:block" />
        {' '}<strong>holding it back.</strong>
      </h1>

      <p className="relative z-[1] max-w-[760px] text-sm leading-6 text-white/86 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
        We help businesses fix weak websites, unclear messaging, and inconsistent brand
        presentation so they can build trust faster and generate better leads.
      </p>

      <div className="relative z-[1] flex w-full max-w-[760px] flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <CTAButton
          variant="discovery"
          text="Book a Discovery Call"
          icon={<Phone size={22} strokeWidth={2} />}
          className="w-auto justify-start whitespace-nowrap !text-white text-[13px] sm:text-[16px]"
          onClick={openCalendarModal}
        />
        <CTAButton
          variant="secondary"
          text="Explore Our Work"
          icon={<MoveUpRight size={22} strokeWidth={2} />}
          className="w-auto whitespace-nowrap px-5 text-[13px] sm:px-6 sm:text-[16px]"
          onClick={() => {
            window.location.hash = 'case-studies'
          }}
        />
      </div>
    </section>
  )
}

export default Banner
