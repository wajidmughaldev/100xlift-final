import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const ctaButtonVariants = cva(
  'inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full px-5 text-[15px] font-semibold tracking-[-0.03em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 sm:min-h-[60px] sm:gap-4 sm:px-6 sm:text-[16px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-white text-xl text-black hover:bg-white/92 focus-visible:ring-white',
        secondary:
          'bg-[#BFEF2E] text-black hover:bg-[#d0ff44] focus-visible:ring-[#BFEF2E]',
        discovery:
          'justify-start rounded-none bg-transparent px-0 text-[var(--page-fg)] hover:text-[var(--page-fg)]/90 focus-visible:ring-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

type CTAButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ctaButtonVariants> & {
    text: string
    icon?: React.ReactNode
  }

const CTAButton = ({
  text,
  icon,
  variant,
  className,
  type = 'button',
  ...props
}: CTAButtonProps) => {
  const iconNode = icon ? (
    variant === 'discovery' ? (
      <span className="flex size-[52px] items-center justify-center rounded-full bg-[#314100] text-[#BFEF2E] sm:size-[60px]">
        {icon}
      </span>
    ) : (
      <span className="flex items-center justify-center">{icon}</span>
    )
  ) : null

  return (
    <button
      type={type}
      className={cn(ctaButtonVariants({ variant }), className)}
      {...props}
    >
      {iconNode}
      <span>{text}</span>
    </button>
  )
}

export { CTAButton, ctaButtonVariants }
