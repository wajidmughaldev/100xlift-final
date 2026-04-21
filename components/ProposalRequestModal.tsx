'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { submitLeadForm } from '@/lib/lead-form'
import ThemeSelect from './ui/theme-select'

type ProposalRequestModalProps = {
  isOpen: boolean
  onClose: () => void
}

type ProposalFormValues = {
  name: string
  email: string
  phone: string
  company: string
  website: string
  projectType: string
  budget: string
  timeline: string
  details: string
}

const inputClassName = (hasError: boolean) =>
  `h-11 rounded-md border bg-white px-3 text-sm text-[#101408] outline-none transition focus:ring-2 dark:bg-[#101207] dark:text-white dark:placeholder:text-white/42 ${
    hasError
      ? 'border-[#d75b5b] focus:border-[#d75b5b] focus:ring-[#d75b5b]/20'
      : 'border-[var(--outline-soft)] focus:border-[#9bd200] focus:ring-[#b8ea18]/30'
  }`

const textareaClassName = (hasError: boolean) =>
  `min-h-[130px] rounded-md border bg-white px-3 py-3 text-sm text-[#101408] outline-none transition focus:ring-2 dark:bg-[#101207] dark:text-white dark:placeholder:text-white/42 ${
    hasError
      ? 'border-[#d75b5b] focus:border-[#d75b5b] focus:ring-[#d75b5b]/20'
      : 'border-[var(--outline-soft)] focus:border-[#9bd200] focus:ring-[#b8ea18]/30'
  }`

const labelClassName = 'text-sm font-semibold text-[#101408] dark:text-white'
const errorClassName = 'text-xs font-medium text-[#b13f3f] dark:text-[#ff8f8f]'
const proposalTypeOptions = [
  { label: 'Web App', value: 'Web App' },
  { label: 'Website', value: 'Website' },
  { label: 'UI/UX Design', value: 'UI/UX Design' },
  { label: 'SEO', value: 'SEO' },
  { label: 'Branding', value: 'Branding' },
]
const budgetOptions = [
  { label: 'Select budget', value: '', disabled: true },
  { label: 'Less than $1,000', value: 'Less than $1,000' },
  { label: '$1,000 - $3,000', value: '$1,000 - $3,000' },
  { label: '$3,000 - $7,500', value: '$3,000 - $7,500' },
  { label: '$7,500+', value: '$7,500+' },
]
const timelineOptions = [
  { label: 'ASAP', value: 'ASAP' },
  { label: '2 - 4 weeks', value: '2 - 4 weeks' },
  { label: '1 - 2 months', value: '1 - 2 months' },
  { label: 'Flexible', value: 'Flexible' },
]

const ProposalRequestModal = ({ isOpen, onClose }: ProposalRequestModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProposalFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    delayError: 350,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      projectType: 'Web App',
      budget: '',
      timeline: 'ASAP',
      details: '',
    },
  })

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

  const onSubmit = async (values: ProposalFormValues) => {
    setIsSubmitting(true)
    setFeedback(null)

    try {
      await submitLeadForm({
        source: 'proposal-modal',
        name: values.name,
        email: values.email,
        phone: values.phone,
        company: values.company,
        website: values.website,
        projectType: values.projectType,
        budget: values.budget,
        timeline: values.timeline,
        details: values.details,
      })

      reset()
      setFeedback({
        type: 'success',
        message: 'Request sent. Check your inbox for the confirmation email.',
      })
    } catch (error) {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to send your request right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/58 px-4 py-5 backdrop-blur-xl"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a proposal"
        onMouseDown={(event) => event.stopPropagation()}
        className="popup-scrollbar-hidden relative max-h-[calc(100dvh-2.5rem)] w-full max-w-[760px] overflow-y-auto rounded-lg border border-[var(--outline-soft)] bg-[#f8faf2] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)] dark:bg-[#080906] sm:p-7"
      >
        <button
          type="button"
          aria-label="Close request proposal form"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-[#101408]/70 transition hover:bg-black/5 hover:text-[#101408] dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="pr-10">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#101408] dark:text-white">
            Request a Proposal
          </h2>
          <p className="mt-2 text-sm font-medium text-[var(--muted-fg)]">
            Share a few details. We will reply with a clear plan, timeline, and estimate.
          </p>
        </div>

        <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClassName}>Full name</span>
              <input
                className={inputClassName(Boolean(errors.name))}
                placeholder="Your name"
                {...register('name', {
                  required: 'Full name is required.',
                  minLength: {
                    value: 2,
                    message: 'Enter at least 2 characters.',
                  },
                })}
              />
              {errors.name ? <span className={errorClassName}>{errors.name.message}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Email</span>
              <input
                className={inputClassName(Boolean(errors.email))}
                type="email"
                placeholder="you@email.com"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address.',
                  },
                })}
              />
              {errors.email ? <span className={errorClassName}>{errors.email.message}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Phone / WhatsApp <span className="font-normal">(optional)</span></span>
              <input
                className={inputClassName(Boolean(errors.phone))}
                placeholder="+92..."
                {...register('phone', {
                  validate: (value) =>
                    !value || value.trim().length >= 7 || 'Enter a valid phone number.',
                })}
              />
              {errors.phone ? <span className={errorClassName}>{errors.phone.message}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Company <span className="font-normal">(optional)</span></span>
              <input
                className={inputClassName(Boolean(errors.company))}
                placeholder="Company name"
                {...register('company')}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClassName}>Website / Link <span className="font-normal">(optional)</span></span>
            <input
              className={inputClassName(Boolean(errors.website))}
              placeholder="https://..."
              {...register('website', {
                validate: (value) =>
                  !value ||
                  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(value) ||
                  'Enter a valid website URL.',
              })}
            />
            {errors.website ? <span className={errorClassName}>{errors.website.message}</span> : null}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClassName}>Project type</span>
              <Controller
                control={control}
                name="projectType"
                rules={{ required: 'Select a project type.' }}
                render={({ field }) => (
                  <ThemeSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={proposalTypeOptions}
                    error={Boolean(errors.projectType)}
                  />
                )}
              />
              {errors.projectType ? <span className={errorClassName}>{errors.projectType.message}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className={labelClassName}>Budget</span>
              <Controller
                control={control}
                name="budget"
                rules={{ required: 'Select a budget range.' }}
                render={({ field }) => (
                  <ThemeSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={budgetOptions}
                    placeholder="Select budget"
                    error={Boolean(errors.budget)}
                  />
                )}
              />
              {errors.budget ? <span className={errorClassName}>{errors.budget.message}</span> : null}
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClassName}>Timeline</span>
            <Controller
              control={control}
              name="timeline"
              rules={{ required: 'Select a timeline.' }}
              render={({ field }) => (
                <ThemeSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={timelineOptions}
                  error={Boolean(errors.timeline)}
                />
              )}
            />
            {errors.timeline ? <span className={errorClassName}>{errors.timeline.message}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClassName}>Project details</span>
            <textarea
              className={textareaClassName(Boolean(errors.details))}
              placeholder="What are you building, what's the goal, and what's the main challenge?"
              {...register('details', {
                required: 'Project details are required.',
                minLength: {
                  value: 20,
                  message: 'Add a little more detail so we can understand the scope.',
                },
              })}
            />
            {errors.details ? <span className={errorClassName}>{errors.details.message}</span> : null}
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--muted-fg)]">
                No spam. Your details stay private.
              </p>
              {feedback ? (
                <p
                  className={`mt-2 text-xs font-semibold ${
                    feedback.type === 'success' ? 'text-[#5b7b00]' : 'text-[#d75b5b]'
                  }`}
                >
                  {feedback.message}
                </p>
              ) : null}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 rounded-full border border-[#b8ea18]/40 px-5 text-sm font-semibold text-[#101408] transition hover:bg-[#b8ea18]/12 dark:text-white"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#b8ea18] px-5 text-sm font-bold text-[#101408] transition hover:bg-[#cdfb45] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Request Proposal'}
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    portalTarget
  )
}

export default ProposalRequestModal
