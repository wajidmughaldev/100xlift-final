import React from 'react'

type SectionIntroProps = {
  topContent?: React.ReactNode
  title: string
  description: React.ReactNode
  className?: string
}

const SectionIntro = ({
  topContent,
  title,
  description,
  className = '',
}: SectionIntroProps) => {
  return (
    <section
      className={`mx-auto flex w-full max-w-[920px] flex-col items-center text-center text-[var(--page-fg)] ${className}`}
    >
      {topContent ? <div className="mb-3 sm:mb-4">{topContent}</div> : null}
      <h2 className="max-w-[860px] text-balance font-semibold text-[2rem] leading-[1.08] tracking-[-0.055em] sm:text-[2.4rem] md:text-[2.9rem] md:leading-[1.06] lg:text-[3.35rem]">
        {title}
      </h2>
      <div className="mt-3 max-w-[780px] text-balance text-[1rem] font-normal leading-[1.5] text-[var(--muted-fg)] sm:mt-4 sm:text-[1.075rem] sm:leading-[1.55] md:text-[1.2rem] md:leading-[1.6]">
        {description}
      </div>
    </section>
  )
}

export default SectionIntro
