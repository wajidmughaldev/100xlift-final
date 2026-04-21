import React from 'react'

type SectionSpacerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const spacingMap = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
  '2xl': 'h-32',
}

const SectionSpacer = ({ size = 'lg' }: SectionSpacerProps) => {
  return <div aria-hidden="true" className={spacingMap[size]} />
}

export default SectionSpacer
