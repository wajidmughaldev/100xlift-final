'use client'

import React from 'react'
import { MoveUpRight } from 'lucide-react'

import { CTAButton } from './ui/cta-button'

type HashCTAButtonProps = {
  hash: string
  text: string
  className?: string
}

const HashCTAButton = ({ hash, text, className = '' }: HashCTAButtonProps) => {
  return (
    <CTAButton
      variant="secondary"
      text={text}
      icon={<MoveUpRight size={18} strokeWidth={2} />}
      className={className}
      onClick={() => {
        window.location.hash = hash
      }}
    />
  )
}

export default HashCTAButton
