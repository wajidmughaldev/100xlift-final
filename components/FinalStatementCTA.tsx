'use client'

import React from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'

import { CTAButton } from './ui/cta-button'

const highlightClassName = 'inline bg-[#a8d400] px-2 py-0.5 text-black sm:px-3 sm:py-1'

const FinalStatementCTA = () => {
  const openCalendarModal = () => {
    window.dispatchEvent(new Event('open-calendar-modal'))
  }

  const openProposalModal = () => {
    window.dispatchEvent(new Event('open-proposal-modal'))
  }

  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 py-10 text-center text-[var(--page-fg)]">
      <div className="space-y-6">
        <div className="text-[1.95rem] font-normal leading-[1.18] tracking-[-0.05em] sm:text-[2.6rem] md:text-[3.2rem]">
          <div>
            <span className={highlightClassName}>
              Your <strong>business</strong> should not look <strong>smaller</strong>, <strong>weaker</strong>, or
            </span>
          </div>
          <div className="mt-3">
            <span className={highlightClassName}><strong>less credible</strong> than it is.</span>
          </div>
        </div>

        <div className="pt-4 text-[1.95rem] font-normal leading-[1.18] tracking-[-0.05em] sm:pt-6 sm:text-[2.6rem] md:text-[3.2rem]">
          <div>
            <span className={highlightClassName}>
              If your <strong>website</strong>, <strong>branding</strong>, or <strong>digital presence</strong> is
            </span>
          </div>
          <div className="mt-3">
            <span className={highlightClassName}>
              <strong>slowing growth</strong>, let&apos;s fix the parts that <strong>matter first</strong>.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row sm:flex-wrap sm:gap-8 sm:pt-8">
          <CTAButton
            variant="discovery"
            text="Book a Discovery Call"
            icon={<Phone size={22} strokeWidth={2.6} />}
            className="text-[15px] font-semibold sm:text-[18px]"
            onClick={openCalendarModal}
          />

          <CTAButton
            variant="primary"
            text="Request a Digital Audit"
            icon={<ArrowUpRight size={22} strokeWidth={2.6} />}
            className="min-h-[48px] px-5 text-[15px] font-semibold sm:min-h-[56px] sm:px-7 sm:text-[18px]"
            onClick={openProposalModal}
          />
        </div>
      </div>
    </section>
  )
}

export default FinalStatementCTA
