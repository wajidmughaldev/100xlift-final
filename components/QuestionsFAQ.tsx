'use client'

import React, { useState } from 'react'
import { CircleHelp, CircleMinus, CirclePlus } from 'lucide-react'

import FeatureStrip from './FeatureStrip'
import SectionIntro from './SectionIntro'

type FAQItem = {
  question: string
  answer: string
}

type QuestionsFAQProps = {
  items?: FAQItem[]
  title?: string
  stripText?: string
  className?: string
}

const defaultFaqItems: FAQItem[] = [
  {
    question: 'Can you improve an existing website?',
    answer:
      "like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  },
  {
    question: 'What if we are not sure what is wrong yet?',
    answer:
      'We start by identifying trust, clarity, and conversion issues first so the next step is based on what actually matters.',
  },
  {
    question: 'Can we start with one service?',
    answer:
      'Yes. We can begin with the highest-impact piece first and expand only if it supports the business goal.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. We can support updates, design consistency, content improvements, and continued optimization after launch.',
  },
]

const QuestionsFAQ = ({
  items = defaultFaqItems,
  title = 'What clients usually want to know',
  stripText = 'Questions',
  className = '',
}: QuestionsFAQProps) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={`mx-auto flex max-w-[980px] flex-col items-center px-4 py-10 text-[var(--page-fg)] ${className}`}>
      <SectionIntro
        topContent={
          <FeatureStrip
            text={stripText}
            icon={<CircleHelp size={16} strokeWidth={2.2} />}
          />
        }
        title={title}
        description=""
      />

      <div className="mt-12 w-full">
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={item.question}
              className={index === 0 ? '' : 'border-t border-[#97c000]'}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`relative w-full text-left ${
                  isOpen
                    ? 'rounded-[10px] bg-[linear-gradient(180deg,#1b1f10_0%,#111406_52%,#0a0a08_100%)] px-5 py-5 text-white sm:px-6 sm:py-6'
                    : 'px-5 py-7 sm:px-6'
                }`}
              >
                <div className="w-full pr-12">
                  <h3 className={`text-[22px] leading-[1.2] ${isOpen ? 'font-semibold' : 'font-medium'}`}>
                    {item.question}
                  </h3>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className={`mt-4 w-full overflow-hidden text-[17px] leading-[1.25] ${isOpen ? 'text-white/95' : 'text-[var(--muted-fg)]'}`}>
                      {item.answer}
                    </p>
                  </div>
                </div>

                <span className="absolute right-5 top-5 shrink-0 text-[#cfff19] sm:right-6 sm:top-6">
                  {isOpen ? (
                    <CircleMinus size={22} strokeWidth={2.2} />
                  ) : (
                    <CirclePlus size={22} strokeWidth={2.2} />
                  )}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuestionsFAQ
export { defaultFaqItems }
