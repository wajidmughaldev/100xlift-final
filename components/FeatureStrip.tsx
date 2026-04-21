import React from 'react'

type FeatureStripProps = {
  icon: React.ReactNode
  text: string
  className?: string
}

const FeatureStrip = ({ icon, text, className = '' }: FeatureStripProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 py-2 text-center text-[var(--page-fg)] ${className}`}
    >
      <span className="flex shrink-0 items-center justify-center self-center text-[#BFEF2E]">
        {icon}
      </span>
      <p className="text-sm font-medium leading-none tracking-[-0.02em]">
        {text}
      </p>
    </div>
  )
}

export default FeatureStrip
