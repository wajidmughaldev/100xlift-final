import React from 'react'
import Image from 'next/image'

type IconStripItem = {
  href: string
  label: string
  icon?: React.ReactNode
  iconSrc?: string
}

type IconStripProps = {
  items: IconStripItem[]
  className?: string
  openInNewTab?: boolean
}

const IconStrip = ({
  items,
  className = '',
  openInNewTab = true,
}: IconStripProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          className="flex size-10 items-center justify-center rounded-full bg-[#BFEF2E] text-black transition-transform duration-200 hover:scale-[1.05]"
        >
          {item.iconSrc ? (
            <Image
              src={item.iconSrc}
              alt={item.label}
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          ) : (
            item.icon
          )}
        </a>
      ))}
    </div>
  )
}

export default IconStrip
export type { IconStripItem }
