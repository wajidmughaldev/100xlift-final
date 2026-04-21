'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import IconStrip from './IconStrip'
import { submitLeadForm } from '@/lib/lead-form'
import ThemeSelect from './ui/theme-select'
import { countryCodeOptions } from '@/lib/country-codes'

const iconItems = [
  { href: 'https://www.facebook.com/profile.php?id=61586106101272', label: 'Facebook', iconSrc: '/icons/facebook.png' },
  { href: 'https://www.linkedin.com/company/110819732', label: 'LinkedIn', iconSrc: '/icons/linkedin.png' },
  { href: 'https://instagram.com', label: 'Instagram', iconSrc: '/icons/instagram.png' },
  { href: 'mailto:100xlift@gmail.com', label: 'Email', iconSrc: '/icons/email.png' },
  { href: 'tel:+923361815141', label: 'Phone', iconSrc: '/icons/phone-call.png' },
  { href: 'https://wa.me/923361815141', label: 'WhatsApp', iconSrc: '/icons/whatsapp.png' },
]

const serviceTags = ['Website Development', 'UI/UX Designing', 'SEO/AEO']
const budgetOptions = [
  { label: 'Less Than 100', value: 'Less Than 100' },
  { label: '100 - 300', value: '100 - 300' },
  { label: '300 - 500', value: '300 - 500' },
  { label: '500 - 1,000', value: '500 - 1,000' },
  { label: '1,000 - 2,500', value: '1,000 - 2,500' },
  { label: '2,500+', value: '2,500+' },
]

type ProjectStartFormValues = {
  services: string[]
  name: string
  email: string
  phoneCode: string
  phoneNumber: string
  budget: string
  details: string
}

const inputClass = (hasError: boolean) =>
  `h-10 w-full min-w-0 rounded-[8px] border bg-[var(--panel-strong)] px-4 text-[13px] text-[var(--page-fg)] outline-none placeholder:text-[var(--muted-fg)] transition focus:ring-2 ${
    hasError
      ? 'border-[#d75b5b] focus:border-[#d75b5b] focus:ring-[#d75b5b]/15'
      : 'border-[var(--outline-soft)] focus:border-[#b8ea18] focus:ring-[#b8ea18]/20'
  }`

const ProjectStartSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<ProjectStartFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    delayError: 350,
    defaultValues: {
      services: [],
      name: '',
      email: '',
      phoneCode: '+92',
      phoneNumber: '',
      budget: 'Less Than 100',
      details: '',
    },
  })

  const selectedServices = watch('services')

  const toggleService = (service: string) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service]

    setValue('services', updatedServices, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    if (updatedServices.length > 0) {
      clearErrors('services')
    }
  }

  const onSubmit = async (values: ProjectStartFormValues) => {
    setIsSubmitting(true)
    setFeedback(null)

    try {
      await submitLeadForm({
        source: 'project-start',
        name: values.name,
        email: values.email,
        phone: `${values.phoneCode} ${values.phoneNumber}`.trim(),
        budget: values.budget,
        details: values.details,
        services: values.services,
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

  return (
    <section className="mx-auto w-full max-w-[1120px] px-0 py-10 text-[var(--page-fg)] sm:px-4">
      <div className="overflow-hidden rounded-[24px] border border-[var(--outline-soft)] bg-[var(--panel-bg)] lg:grid lg:grid-cols-[55%_45%]">
        <div
          className="relative flex flex-col px-4 py-6 sm:min-h-[620px] sm:px-8 sm:py-8 lg:min-h-[720px] lg:justify-between lg:px-10 lg:py-10"
          style={{
            backgroundColor: '#000',
            backgroundImage: "url('/banner-bg-gradient.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="grid gap-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(180deg,#f1f1f1_0%,#cfcfcf_100%)] text-[24px] font-semibold text-black sm:size-[90px] sm:text-[28px]">
                  AW
                </div>
                <div className="max-w-[240px] pt-1 sm:max-w-[280px] sm:pt-2">
                  <h3 className="text-[1rem] font-semibold leading-[1.08] text-white sm:text-[18px]">
                    Abdul Wajid Khan -
                  </h3>
                  <p className="mt-1 text-[0.82rem] leading-[1.15] text-white/90 sm:text-[14px]">
                    Project Coordinator
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-[1.15] text-white/90 sm:text-[14px]">
                    Can guide your project
                    <br />
                    initial steps.
                  </p>
                </div>
              </div>

              <a
                href="mailto:100xlift@gmail.com"
                className="text-[0.78rem] font-semibold text-white sm:pt-6 sm:text-[16px]"
              >
                100xlift@gmail.com
              </a>
            </div>

            <h2 className="max-w-[520px] pt-2 text-[2.3rem] font-thin leading-[0.98] tracking-[-0.05em] text-white sm:pt-6 sm:text-[4rem] lg:pt-10 lg:text-[58px] lg:leading-20">
              Every Project Start
              <br />
              With A Plan
            </h2>
          </div>

          <IconStrip items={iconItems} className="mt-5 gap-3 sm:gap-4 lg:mt-0" openInNewTab={false} />
        </div>

        <div className="flex min-h-[520px] min-w-0 flex-col justify-between bg-[var(--panel-bg)] px-4 py-6 sm:min-h-[620px] sm:px-8 sm:py-8 lg:min-h-[720px] lg:px-10 lg:py-10">
          <div className="min-w-0">
            <h2 className="text-[2rem] font-base leading-[1.02] tracking-[-0.05em] sm:text-[2.35rem] lg:text-[3.1rem]">
              <span className="text-[#BFEF2E]">What Service</span>
              <br />
              <span className="text-[var(--page-fg)]">We Can Support You With?</span>
            </h2>

            <form className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 lg:mt-12" onSubmit={handleSubmit(onSubmit)} noValidate>
              <input
                type="hidden"
                {...register('services', {
                  validate: (value) =>
                    value.length > 0 || 'Select at least one service so we know where to start.',
                })}
              />

              <div>
                <p className="mb-3 text-[12px] font-medium text-[var(--muted-fg)]">Select Service</p>
                <div className="flex flex-wrap gap-3">
                  {serviceTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleService(tag)}
                      aria-pressed={selectedServices.includes(tag)}
                      className={`rounded-full border px-4 py-2 text-[12px] font-medium transition ${
                        selectedServices.includes(tag)
                          ? 'border-[#cfff19] bg-[#cfff19] text-black'
                          : `text-[var(--page-fg)] hover:bg-[#263300] hover:text-white dark:hover:text-white ${
                              errors.services ? 'border-[#d75b5b]' : 'border-[#9bc100]'
                            }`
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {errors.services ? (
                  <p className="mt-2 text-xs font-medium text-[#d75b5b]">
                    {errors.services.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Full Name</span>
                  <input
                    type="text"
                    className={inputClass(Boolean(errors.name))}
                    placeholder="Your full name"
                    {...register('name', {
                      required: 'Full name is required.',
                      minLength: {
                        value: 2,
                        message: 'Enter at least 2 characters.',
                      },
                    })}
                  />
                  {errors.name ? <span className="text-xs font-medium text-[#d75b5b]">{errors.name.message}</span> : null}
                </label>
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Email</span>
                  <input
                    type="email"
                    className={inputClass(Boolean(errors.email))}
                    placeholder="you@example.com"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address.',
                      },
                    })}
                  />
                  {errors.email ? <span className="text-xs font-medium text-[#d75b5b]">{errors.email.message}</span> : null}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Phone</span>
                  <div className="grid min-w-0 grid-cols-[84px_minmax(0,1fr)] gap-2 sm:grid-cols-[88px_minmax(0,1fr)]">
                    <Controller
                      control={control}
                      name="phoneCode"
                      render={({ field }) => (
                        <ThemeSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={countryCodeOptions}
                          buttonClassName="h-10 px-3"
                        />
                      )}
                    />
                    <input
                      type="text"
                      className={inputClass(Boolean(errors.phoneNumber))}
                      placeholder="336-1815 141"
                      {...register('phoneNumber', {
                        validate: (value) =>
                          !value ||
                          value.replace(/\D/g, '').length >= 7 ||
                          'Enter a valid phone number.',
                      })}
                    />
                  </div>
                  {errors.phoneNumber ? (
                    <span className="text-xs font-medium text-[#d75b5b]">{errors.phoneNumber.message}</span>
                  ) : null}
                </div>
                <label className="grid min-w-0 gap-2">
                  <span className="text-[12px] font-medium text-[var(--muted-fg)]">Select Budget</span>
                  <Controller
                    control={control}
                    name="budget"
                    rules={{ required: 'Select a budget range.' }}
                    render={({ field }) => (
                      <ThemeSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={budgetOptions}
                        error={Boolean(errors.budget)}
                        buttonClassName="h-10"
                      />
                    )}
                  />
                  {errors.budget ? <span className="text-xs font-medium text-[#d75b5b]">{errors.budget.message}</span> : null}
                </label>
              </div>

              <label className="grid min-w-0 gap-2">
                <span className="text-[12px] font-medium text-[var(--muted-fg)]">Brief Overview</span>
                <textarea
                  rows={5}
                  className={`${inputClass(Boolean(errors.details))} min-h-[118px] py-4`}
                  placeholder="Tell us what you need, what the goal is, and any timeline or platform details."
                  {...register('details', {
                    required: 'Project brief is required.',
                    minLength: {
                      value: 20,
                      message: 'Add a little more detail so we can understand the project.',
                    },
                  })}
                />
                {errors.details ? <span className="text-xs font-medium text-[#d75b5b]">{errors.details.message}</span> : null}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {feedback ? (
                    <p
                      className={`text-xs font-semibold ${
                        feedback.type === 'success' ? 'text-[#5b7b00]' : 'text-[#d75b5b]'
                      }`}
                    >
                      {feedback.message}
                    </p>
                  ) : (
                    <p className="text-xs font-medium text-[var(--muted-fg)]">
                      We will send a confirmation email after submission.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send project request"
                  className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#607907] text-[#d8ff71] transition hover:bg-[#6f8c09] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
                <p className="text-[13px] font-medium text-[var(--muted-fg)]">
                  {isSubmitting ? 'Sending your request...' : 'Response time is under 1hr'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectStartSection
