'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

type ShowcaseFeatureSectionProps = {
  image: string
  eyebrow: string
  title: string
  description: string
  checklist: string[]
  ctaLabel: string
}

const ShowcaseFeatureSection = ({
  image,
  eyebrow,
  title,
  description,
  checklist,
  ctaLabel,
}: ShowcaseFeatureSectionProps) => {
  return (
    <section className="pb-12 pt-2 text-[var(--page-fg)]">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-8 rounded-[30px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-0 py-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10">
          <div className="min-w-0 rounded-[26px] bg-[var(--panel-strong)] p-4 sm:p-5">
            <div className="overflow-hidden rounded-[18px] border border-[var(--outline-soft)] bg-[var(--surface-1)]">
              <div className="relative aspect-[1.05/1] overflow-hidden">
                <Image
                  src={image}
                  alt={`${title} visual preview`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 px-5 py-6 sm:px-7 lg:px-0 lg:pr-10">
            <p className="text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-fg)]">
              {eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-[2.6rem]">
              {title}
            </h3>
            <p className="mt-5 max-w-[520px] text-[0.98rem] font-medium leading-[1.75] text-[var(--muted-fg)] sm:text-base">
              {description}
            </p>

            <div className="mt-6 space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 inline-flex size-2.5 shrink-0 rounded-full bg-[#b8ea18]" />
                  <p className="text-sm font-semibold leading-[1.65] text-[var(--page-fg)] sm:text-[0.96rem]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#b8ea18] px-5 py-3 text-sm font-bold text-[#101408] transition hover:bg-[#cdfb45]"
            >
              {ctaLabel}
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ShowcaseFeatureSection
