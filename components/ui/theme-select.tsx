'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type ThemeSelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type ThemeSelectProps = {
  value?: string
  onChange: (value: string) => void
  options: readonly ThemeSelectOption[]
  placeholder?: string
  error?: boolean
  className?: string
  buttonClassName?: string
}

const ThemeSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error = false,
  className,
  buttonClassName,
}: ThemeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-md border bg-[var(--panel-strong)] px-3 text-left text-sm text-[var(--page-fg)] outline-none transition focus:border-[#b8ea18] focus:ring-2 focus:ring-[#b8ea18]/20',
          error
            ? 'border-[#d75b5b] focus:border-[#d75b5b] focus:ring-[#d75b5b]/15'
            : 'border-[var(--outline-soft)]',
          buttonClassName
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selectedOption ? 'text-[var(--page-fg)]' : 'text-[var(--muted-fg)]'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn('shrink-0 transition', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen ? (
        <div
          role="listbox"
          className="themed-scrollbar absolute left-0 right-0 top-[calc(100%+0.45rem)] z-50 max-h-[280px] overflow-y-auto overflow-x-hidden rounded-md border border-[var(--outline-soft)] bg-[var(--panel-bg)] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.26)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                onClick={() => {
                  if (option.disabled) return
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition',
                  option.disabled
                    ? 'cursor-not-allowed text-[var(--muted-fg)]/60'
                    : isSelected
                      ? 'bg-[#b8ea18] text-[#101408]'
                      : 'text-[var(--page-fg)] hover:bg-[#314100] hover:text-[#d8ff71]'
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default ThemeSelect
export type { ThemeSelectOption }
