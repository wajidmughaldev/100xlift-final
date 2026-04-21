'use client'

import React from 'react'
import Image from 'next/image'

import { CTAButton } from './ui/cta-button'

const FixFirstCallout = () => {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 px-0 py-6 text-[var(--page-fg)] sm:py-8">
      <div className="w-full border-y border-[var(--outline-soft)] bg-[linear-gradient(90deg,#2a3400_0%,#657f06_58%,#566d04_100%)] px-4 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16">
        <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
          <div className="inline-flex w-full max-w-[460px] items-center justify-center bg-[#b9eb17] px-4 py-2 text-center text-[1.05rem] font-semibold leading-[1.05] tracking-[-0.03em] text-black sm:w-auto sm:max-w-full sm:px-5 sm:text-[1.35rem]">
            Not every business needs a full rebuild
          </div>

          <div className="relative mt-7 w-full max-w-[920px] px-7 text-center font-semibold tracking-[-0.04em] text-white sm:mt-8 sm:px-10 md:px-12">
            <Image
              src="/icons/“.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="absolute left-0 top-0 size-[28px] object-contain sm:size-[42px] lg:size-[52px]"
            />

            <Image
              src="/icons/“.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="absolute bottom-[5.5rem] right-0 size-[28px] rotate-180 object-contain sm:bottom-[4.25rem] sm:size-[42px] lg:size-[52px]"
            />

            <div className="space-y-4 sm:space-y-5">
              <p className="mx-auto max-w-[760px] text-balance text-[clamp(1.55rem,6.2vw,3.05rem)] leading-[1.08]">
                Sometimes the issue is the website. Sometimes it is the messaging.
                Sometimes it is brand inconsistency.
              </p>

              <p className="mx-auto max-w-[800px] text-balance text-[clamp(1.55rem,6.2vw,3.05rem)] leading-[1.08]">
                We help identify what actually needs fixing first so you do not
                waste time and budget on the wrong solution.
              </p>
            </div>
          </div>

          <CTAButton
            variant="secondary"
            text="Let's Start a Project"
            className="mt-8 min-h-[46px] px-5 text-[14px] font-semibold sm:mt-9 sm:min-h-[52px] sm:px-6 sm:text-[15px]"
            onClick={() => {
              window.location.hash = 'contact'
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default FixFirstCallout
