'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

type ShowcaseDetailsSectionProps = {
  projectFacts: Array<[string, string]>
  supportNotes: string[]
  accordionItems: Array<{ title: string; body: string }>
  headline: string
  introParagraphs: string[]
  outcomeTitle: string
  outcomeBody: string
}

const ShowcaseDetailsSection = ({
  projectFacts,
  supportNotes,
  accordionItems,
  headline,
  introParagraphs,
  outcomeTitle,
  outcomeBody,
}: ShowcaseDetailsSectionProps) => {
  const [openItem, setOpenItem] = useState<string>(accordionItems[0]?.title || '')

  return (
    <section className="px-5 pb-10 pt-8 text-[var(--page-fg)] sm:px-7 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 border-b border-[var(--outline-soft)] pb-10 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
          <aside className="border-b border-[var(--outline-soft)] pb-6 lg:border-b-0 lg:border-r lg:border-[var(--outline-soft)] lg:pb-0 lg:pr-8">
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-fg)]">
              Project Details
            </h3>

            <dl className="mt-5 space-y-4">
              {projectFacts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--muted-fg)]">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-[1.5] text-[var(--page-fg)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="min-w-0">
            <h3 className="text-xl font-bold leading-tight tracking-[-0.03em] text-[var(--page-fg)] sm:text-2xl">
              {headline}
            </h3>

            <div className="mt-5 space-y-4 text-[0.95rem] font-medium leading-[1.75] text-[var(--muted-fg)] sm:text-base">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:pl-2">
            {supportNotes.map((note) => (
              <div
                key={note}
                className="rounded-[18px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-5  dark:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                <p className="text-sm font-medium leading-[1.7] text-[var(--muted-fg)]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-2">
            {accordionItems.map((item) => {
              const isOpen = openItem === item.title

              return (
                <div key={item.title} className="border-b border-[var(--outline-soft)]">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? '' : item.title)}
                    className="flex w-full items-center justify-between py-4 text-left transition hover:text-[#314100] dark:hover:text-[#b8ea18]"
                  >
                    <span className="text-[0.95rem] font-semibold tracking-[-0.02em] sm:text-base">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <Minus size={16} strokeWidth={2.3} />
                    ) : (
                      <Plus size={16} strokeWidth={2.3} />
                    )}
                  </button>

                  {isOpen ? (
                    <div className="pb-4 pr-8 text-sm font-medium leading-[1.75] text-[var(--muted-fg)]">
                      {item.body}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="rounded-[20px] border border-[var(--outline-soft)] bg-[var(--surface-1)] px-5 py-6  dark:shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
            <h4 className="text-lg font-bold tracking-[-0.03em] text-[var(--page-fg)]">
              {outcomeTitle}
            </h4>
            <p className="mt-4 text-sm font-medium leading-[1.75] text-[var(--muted-fg)]">
              {outcomeBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseDetailsSection
