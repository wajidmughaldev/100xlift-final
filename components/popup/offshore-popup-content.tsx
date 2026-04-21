'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import SiteFooter from '../SiteFooter'

const sectorCards = [
  {
    title: 'Dedicated Designers',
    image: '/showcase-images/12.webp',
  },
  {
    title: 'Development Pods',
    image: '/showcase-images/4.webp',
  },
  {
    title: 'Marketing Support',
    image: '/showcase-images/3.webp',
  },
]

const processItems = [
  {
    title: 'Hire & Setup',
    body: 'We define the role, working model, expected overlap, and communication flow before onboarding begins.',
  },
  {
    title: 'Plan',
    body: 'You get a structured execution plan, ownership map, reporting rhythm, and milestone-based delivery path.',
  },
  {
    title: 'Train',
    body: 'We align the offshore team with your brand, systems, workflows, and standards so the handoff stays clean.',
  },
  {
    title: 'Support',
    body: 'We stay involved with quality control, team coordination, and delivery tracking to keep momentum stable.',
  },
]

const faqColumns = [
  [
    {
      question: 'How quickly can we build your offshore team?',
      answer:
        'Most offshore team setups start with role mapping and candidate alignment in the first few days. Depending on the scope, the initial team can usually be structured and ready for onboarding within one to three weeks.',
    },
    {
      question: 'Who manages the offshore workflow?',
      answer:
        'We can support the workflow structure, reporting rhythm, and communication model, while your internal lead keeps business priorities aligned. The goal is to make the offshore team feel like a clear extension of your main operation.',
    },
    {
      question: 'Why is an offshore model a smart fit?',
      answer:
        'It gives you longer-term continuity than short-term outsourcing, with better knowledge retention, more predictable communication, and stronger day-to-day ownership across delivery work.',
    },
  ],
  [
    {
      question: 'What time zones do you cover?',
      answer:
        'We can structure overlap around your working hours and project needs. That usually means building a schedule with enough shared time for reviews, handoffs, and decision-making without forcing a fully mismatched day.',
    },
    {
      question: 'Do you support long-term placements?',
      answer:
        'Yes. The offshore model is designed for ongoing delivery, not just one-off production work. That makes it well suited for teams that need stability, retained knowledge, and consistent output over time.',
    },
    {
      question: 'Do you match for culture and communication?',
      answer:
        'Yes. Beyond technical fit, we pay attention to communication style, ownership level, responsiveness, and workflow compatibility so the team can integrate smoothly into your existing environment.',
    },
  ],
]

const OffshorePopupContent = () => {
  const [activeStep, setActiveStep] = useState('Hire & Setup')
  const [activeFaq, setActiveFaq] = useState(
    'How quickly can we build your offshore team?'
  )

  return (
    <section className="mx-auto w-11/12 bg-[var(--page-bg)] py-5 text-[var(--page-fg)] sm:py-7">
      <div className="flex w-full flex-col gap-6 sm:gap-8">
        <section className="rounded-lg border border-[var(--outline-soft)] bg-[radial-gradient(circle_at_top_left,rgba(184,234,24,0.10),transparent_32%),var(--surface-1)] px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div className="max-w-[620px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5f7a0f] dark:text-[#b8ea18]/85">
                Offshore Teams
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.8rem] lg:text-[3.6rem]">
                We build offshore teams with the right talent for long-term growth.
              </h2>
              <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[var(--page-fg)]/74 sm:text-[17px]">
                100XLift helps companies extend delivery capacity with design,
                development, marketing, and support talent that integrates into
                real workflows without adding unnecessary management friction.
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8ab310] px-5 py-3 text-sm font-bold text-[#f8fff0] transition hover:bg-[#7ca109] dark:bg-[#b8ea18] dark:text-[#101408] dark:hover:bg-[#cdfb45]"
              >
                Build your offshore team
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px]">
              <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] sm:min-h-[360px]">
                <Image
                  src="/showcase-images/1.webp"
                  alt="Offshore leadership"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 36vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                {['/showcase-images/10.webp', '/showcase-images/11.webp'].map((src) => (
                  <div
                    key={src}
                    className="relative min-h-[132px] overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] sm:min-h-[172px]"
                  >
                    <Image
                      src={src}
                      alt="Offshore team collaboration"
                      fill
                      className="object-cover"
                      sizes="(max-width: 639px) 50vw, 180px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5f7a0f] dark:text-[#b8ea18]/85">
              Sectors
            </p>
            <h3 className="text-[1.7rem] font-semibold tracking-[-0.04em] sm:text-[2.2rem]">
              Teams we structure around real delivery needs
            </h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sectorCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)]"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.68)_100%)]" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#8ab310] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f8fff0] dark:bg-[#b8ea18] dark:text-[#101408]">
                      Offshore
                    </span>
                    <h4 className="text-right text-lg font-semibold">
                      {card.title}
                    </h4>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[1fr_.92fr] lg:px-10">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5f7a0f] dark:text-[#b8ea18]/85">
              Offshoring vs Outsourcing
            </p>
            <h3 className="mt-3 text-[1.8rem] font-semibold leading-tight tracking-[-0.04em] sm:text-[2.4rem]">
              Offshore teams give you control, continuity, and deeper team alignment.
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--page-fg)]/74 sm:text-[17px]">
              Outsourcing often focuses on handing over tasks. Offshoring is
              about building a dedicated extension of your business with more
              ownership, clearer communication, and stronger day-to-day
              consistency.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] p-4">
                <p className="text-sm font-semibold text-[#5f7a0f] dark:text-[#b8ea18]">Why Offshore?</p>
                <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/70">
                  Better process control, longer-term retention, and a team that
                  learns your systems instead of working as a disconnected vendor.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] p-4">
                <p className="text-sm font-semibold text-[#5f7a0f] dark:text-[#b8ea18]">Why Outsourcing?</p>
                <p className="mt-2 text-sm leading-6 text-[var(--page-fg)]/70">
                  Useful for narrow one-off scopes, but less effective when you
                  need stable communication and ongoing operational ownership.
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] sm:min-h-[360px]">
            <Image
              src="/showcase-images/9.png"
              alt="Offshore workshop meeting"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </div>
        </section>

        <section className="grid gap-6 rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5f7a0f] dark:text-[#b8ea18]/85">
              How It Works
            </p>
            <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] sm:text-[2.4rem]">
              A simple process that keeps offshore delivery practical.
            </h3>

            <div className="mt-6 divide-y divide-[var(--outline-soft)] rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)]">
              {processItems.map((item) => {
                const isActive = activeStep === item.title

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveStep(item.title)}
                    className="w-full px-4 py-4 text-left"
                  >
                      <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition ${isActive ? 'rotate-180 text-[#5f7a0f] dark:text-[#b8ea18]' : 'text-[var(--page-fg)]/45 dark:text-white/55'}`}
                      />
                    </div>
                    {isActive ? (
                      <p className="pt-3 text-sm leading-7 text-[var(--page-fg)]/72">
                        {item.body}
                      </p>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] sm:min-h-[420px]">
            <Image
              src="/showcase-images/5.webp"
              alt="Offshore workflow planning"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 46vw"
            />
          </div>
        </section>

        <section className="rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#5f7a0f] dark:text-[#b8ea18]/85">
            FAQ
          </p>
          <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] sm:text-[2.4rem]">
            Frequently asked questions
          </h3>

            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-6">
              {faqColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {column.map((item) => {
                    const isActive = activeFaq === item.question

                    return (
                      <button
                        key={item.question}
                        type="button"
                        onClick={() =>
                          setActiveFaq((current) =>
                            current === item.question ? '' : item.question
                          )
                        }
                        className="w-full rounded-lg border border-[var(--outline-soft)] bg-[var(--surface-2)] px-4 py-4 text-left"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium leading-6 text-[var(--page-fg)]/84">
                            {item.question}
                          </p>
                          <ChevronDown
                            size={18}
                            className={`transition ${isActive ? 'rotate-180 text-[#5f7a0f] dark:text-[#b8ea18]' : 'text-[var(--page-fg)]/55'}`}
                          />
                        </div>
                        {isActive ? (
                          <p className="pt-3 pr-6 text-sm leading-7 text-[var(--page-fg)]/64">
                            {item.answer}
                          </p>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
        </section>

        <SiteFooter />
      </div>
    </section>
  )
}

export default OffshorePopupContent
