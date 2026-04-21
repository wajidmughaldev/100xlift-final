'use client'

import React from 'react'
import { MoveUpRight, Phone } from 'lucide-react'

import { CTAButton } from './ui/cta-button'

const BannerActions = () => {
  const openCalendarModal = () => {
    window.dispatchEvent(new Event('open-calendar-modal'))
  }

  return (
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
  )
}

export default BannerActions
