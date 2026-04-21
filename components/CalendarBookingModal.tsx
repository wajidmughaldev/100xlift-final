'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'

type CalendarBookingModalProps = {
  isOpen: boolean
  onClose: () => void
}

const calendarUrl =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ119LlIGzcq7WELOc2lzIvRpekRLrvykT8e8jqCp2EO8Y0xl21jAw8BMNM6SXMwNe_wyVSxXsLo'

const CalendarBookingModal = ({ isOpen, onClose }: CalendarBookingModalProps) => {
  useEffect(() => {
    if (!isOpen) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.classList.add('popup-page-locked')
    document.body.classList.add('popup-page-locked')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.documentElement.classList.remove('popup-page-locked')
      document.body.classList.remove('popup-page-locked')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const portalTarget = typeof document === 'undefined' ? null : document.body

  if (!portalTarget || !isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/60 px-4 py-5 backdrop-blur-xl"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a calendar appointment"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative flex max-h-[calc(100dvh-2.5rem)] w-full max-w-[980px] flex-col overflow-hidden rounded-lg border border-[var(--outline-soft)] bg-[#f8faf2] shadow-[0_24px_90px_rgba(0,0,0,0.42)] dark:bg-[#080906]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--outline-soft)] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#101408] dark:text-white">
              Let&apos;s Talk
            </h2>
            <p className="mt-1 text-sm font-medium text-[var(--muted-fg)]">
              Pick a time that works for you.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close calendar booking"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#101408]/70 transition hover:bg-black/5 hover:text-[#101408] dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <div className="h-[68dvh] min-h-[520px] bg-white dark:bg-[#101207]">
          <iframe
            title="100XLift appointment booking calendar"
            src={calendarUrl}
            className="h-full w-full border-0 bg-white"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--outline-soft)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs font-medium text-[var(--muted-fg)]">
            If the calendar does not load, open it directly.
          </p>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#b8ea18] px-5 text-sm font-bold text-[#101408] transition hover:bg-[#cdfb45]"
          >
            Open Calendar
            <ArrowUpRight size={16} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </div>,
    portalTarget
  )
}

export default CalendarBookingModal
