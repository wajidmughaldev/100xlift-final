import React from 'react'

type ProblemHighlightCardProps = {
  number: number | string
  text: string
  icon?: React.ReactNode
  label?: string
  metric?: React.ReactNode
  hideFooter?: boolean
  className?: string
}

const miniBars = (
  <div className="flex items-end gap-2">
    <span className="h-5 w-2.5 rounded-full bg-[#7f9f10]" />
    <span className="h-10 w-2.5 rounded-full bg-[#a9d411]" />
    <span className="h-14 w-2.5 rounded-full bg-[#cfff19]" />
    <span className="h-11 w-2.5 rounded-full bg-[#a9d411]" />
    <span className="h-7 w-2.5 rounded-full bg-[#7f9f10]" />
  </div>
)

const miniGauge = (
  <div className="relative flex size-[88px] items-center justify-center">
    <div className="absolute inset-0 rounded-full border-[7px] border-[#5d7410] border-r-[#e7ff96] border-t-[#cfff19]" />
    <div className="text-center">
      <div className="text-[1.15rem] font-semibold leading-none text-white">80</div>
      <div className="mt-1 text-[0.55rem] uppercase tracking-[0.16em] text-[#c6d89a]">Trust</div>
    </div>
  </div>
)

const miniCalendar = (
  <div className="grid grid-cols-5 gap-1.5">
    {Array.from({ length: 20 }).map((_, index) => {
      const active = [2, 7, 8, 12, 13, 14].includes(index)
      return (
        <span
          key={index}
          className={`size-3 rounded-full ${active ? 'bg-[#f3ffc6]' : 'bg-[#6e841d]'}`}
        />
      )
    })}
  </div>
)

const miniLine = (
  <svg viewBox="0 0 96 40" aria-hidden="true" className="h-10 w-[96px]">
    <path
      d="M4 30 L18 30 L24 10 L40 10 L46 24 L63 24 L70 14 L82 14 L88 30 L94 30"
      fill="none"
      stroke="#cfff19"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const defaultMetric = (label?: string) => {
  if (label === 'Credibility') return miniGauge
  if (label === 'Clarity') return miniCalendar
  if (label === 'Brand') return miniLine
  return miniBars
}

const ProblemHighlightCard = ({
  number,
  text,
  icon,
  label = 'Overview',
  metric,
  hideFooter = false,
  className = '',
}: ProblemHighlightCardProps) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-[#c6fb36]/16 bg-[linear-gradient(180deg,#1b1f10_0%,#111406_52%,#0a0a08_100%)] p-5 text-left ${hideFooter ? 'min-h-[180px] sm:min-h-[190px]' : 'min-h-[220px] sm:min-h-[240px]'} sm:p-6 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(195,255,58,0.18)_0%,transparent_28%),radial-gradient(circle_at_78%_86%,rgba(195,255,58,0.08)_0%,transparent_30%)]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 backdrop-blur-sm">
            <span className="flex size-9 items-center justify-center rounded-full border border-[#e0ff88]/30 bg-[#cfff19]">
              {icon}
            </span>
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/62">
              {label}
            </span>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e0ff88]/24 bg-[#cfff19] text-[1.45rem] font-semibold leading-none text-black">
            {number}
          </div>
        </div>

        <div className={`${hideFooter ? 'mt-6' : 'mt-6 flex-1'}`}>
          <p className="max-w-[18ch] text-[1.35rem] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-[1.55rem]">
            {text}
          </p>
        </div>

        {!hideFooter ? (
          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="min-h-[88px] flex items-end">{metric ?? defaultMetric(label)}</div>

            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-[#cfff19]" />
              <span className="size-2 rounded-full bg-[#a7c43c]" />
              <span className="size-2 rounded-full bg-white/20" />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default ProblemHighlightCard
