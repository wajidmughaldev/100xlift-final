'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

import { useTheme } from './theme-provider'
import { IconCircleButton } from './ui/icon-circle-button'

const CalendarBookingModal = dynamic(() => import('./CalendarBookingModal'), {
  ssr: false,
})
const ProposalRequestModal = dynamic(() => import('./ProposalRequestModal'), {
  ssr: false,
})

type NavLink = {
  href: string
  label: string
  type: 'section' | 'route'
}

const navLinks: NavLink[] = [
  { href: '#services', label: 'Our Services', type: 'section' },
  { href: '#case-studies', label: 'Case Studies', type: 'section' },
  { href: '#process', label: 'Our Process', type: 'section' },
  { href: '#testimonials', label: 'Testimonials', type: 'section' },
  { href: '#contact', label: 'Contact', type: 'section' },
  { href: '/blog', label: 'Blog', type: 'route' },
]

const Navigation = () => {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isProposalOpen, setIsProposalOpen] = useState(false)
  const [isStickyActive, setIsStickyActive] = useState(false)
  const [activeSection, setActiveSection] = useState('#services')
  const isDarkMode = theme === 'dark'
  const logoSrc = isDarkMode ? '/white-logo.svg' : '/black-logo.svg'
  const sectionLinks = useMemo(() => navLinks.filter((link) => link.type === 'section'), [])
  const sectionIds = useMemo(() => sectionLinks.map((link) => link.href.replace('#', '')), [sectionLinks])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const openProposalModal = () => {
    setIsMobileMenuOpen(false)
    setIsProposalOpen(true)
  }
  const openCalendarModal = () => {
    setIsMobileMenuOpen(false)
    setIsCalendarOpen(true)
  }

  useEffect(() => {
    let animationFrame = 0

    const updateStickyState = () => {
      setIsStickyActive((current) => {
        const next = window.scrollY > 12
        return current === next ? current : next
      })
      animationFrame = 0
    }

    const handleScroll = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateStickyState)
    }

    if (pathname === '/') {
      updateStickyState()
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') return

    const sections = sectionIds
      .map((id, index) => ({
        href: sectionLinks[index]?.href,
        element: document.getElementById(id),
      }))
      .filter((item): item is { href: string; element: HTMLElement } => Boolean(item.href && item.element))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextHref = visibleEntries[0]?.target
          ? sections.find((section) => section.element === visibleEntries[0].target)?.href
          : undefined

        if (nextHref) {
          setActiveSection((current) => (current === nextHref ? current : nextHref))
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      }
    )

    sections.forEach((section) => observer.observe(section.element))

    return () => observer.disconnect()
  }, [pathname, sectionIds, sectionLinks])

  useEffect(() => {
    const handleOpenCalendar = () => setIsCalendarOpen(true)
    const handleOpenProposal = () => setIsProposalOpen(true)

    window.addEventListener('open-calendar-modal', handleOpenCalendar)
    window.addEventListener('open-proposal-modal', handleOpenProposal)

    return () => {
      window.removeEventListener('open-calendar-modal', handleOpenCalendar)
      window.removeEventListener('open-proposal-modal', handleOpenProposal)
    }
  }, [])

  const isLinkActive = (link: NavLink) => {
    if (link.type === 'route') {
      return pathname.startsWith(link.href)
    }

    return pathname === '/' && activeSection === link.href
  }

  const getLinkHref = (link: NavLink) => {
    if (link.type === 'section') {
      return `/${link.href}`
    }
    return link.href
  }

  return (
    <>
      <header
        className={`${isStickyActive ? 'fixed inset-x-0 top-0 z-40' : 'relative'} mb-2 transition-all duration-300 ${
          isStickyActive
            ? 'bg-[var(--header-glass)] py-2 backdrop-blur-xl'
            : 'bg-transparent py-0'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isStickyActive
              ? 'h-[64px] translate-y-0 scale-[0.985] md:h-[84px]'
              : 'h-[92px] translate-y-0 scale-100 md:h-[120px]'
          } ${isStickyActive ? 'mx-auto w-11/12' : ''}`}
        >
          <Link href="/" className="shrink-0">
            <Image
              src={logoSrc}
              alt="100XLift logo"
              width={160}
              height={28}
              className="h-auto w-32 md:w-40"
              style={{ height: 'auto' }}
            />
          </Link>

          <ul
            className={`hidden list-none items-center gap-6 rounded-full px-8 py-4 transition-colors duration-300 md:flex ${
              isStickyActive ? 'bg-transparent' : 'bg-[var(--nav-pill-bg)]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link)

              return (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link)}
                    className={`inline-flex items-center gap-2 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#314100] dark:text-[#BFEF2E]'
                        : 'text-[var(--page-fg)] hover:text-[#314100] dark:hover:text-[#BFEF2E]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden gap-2 md:flex">
            <IconCircleButton
              type="button"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-pressed={true}
              className="bg-[#314100] text-[#BFEF2E]"
              onClick={toggleTheme}
            >
              <span
                key={theme}
                className="inline-flex animate-[theme-toggle-in_220ms_ease-out]"
              >
                {isDarkMode ? (
                  <Moon size={20} strokeWidth={2} />
                ) : (
                  <Sun size={20} strokeWidth={2} />
                )}
              </span>
            </IconCircleButton>

            <button
              type="button"
              aria-label="Book a calendar appointment"
              onClick={openCalendarModal}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[#BFEF2E]/35 bg-[var(--surface-2)] px-5 text-sm font-bold text-[var(--page-fg)] transition hover:border-[#BFEF2E] hover:text-[#BFEF2E]"
            >
              Let&apos;s talk
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              aria-label="Request a proposal"
              onClick={openProposalModal}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#314100] px-5 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600]"
            >
              Request a proposal
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </button>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--surface-2)] text-[#BFEF2E] transition-transform duration-300 md:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      {isStickyActive ? <div aria-hidden="true" className="h-[80px] md:h-[100px]" /> : null}

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-[var(--mobile-overlay)] p-4 backdrop-blur-sm md:hidden">
          <div className="relative flex min-h-full flex-col rounded-[28px] border border-[var(--outline-soft)] bg-[var(--mobile-panel-bg)] px-7 pb-10 pt-7 text-white">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src={logoSrc}
                  alt="100XLift logo"
                  width={112}
                  height={20}
                  className="h-auto w-28"
                  style={{ height: 'auto' }}
                />
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-white/90"
                onClick={closeMobileMenu}
              >
                <X size={24} strokeWidth={2.2} />
              </button>
            </div>

            <nav className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
              <ul className="flex w-full flex-col items-center gap-2 text-center">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link)

                  return (
                    <li key={`mobile-${link.label}`} className="w-full">
                      <Link
                        href={getLinkHref(link)}
                        className={`block text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.02] tracking-[-0.05em] transition-colors duration-200 ${
                          isActive ? 'text-[#BFEF2E]' : 'text-white hover:text-[#d8ff71]'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                onClick={toggleTheme}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#BFEF2E]/50 px-5 py-3 text-sm font-bold text-white"
              >
                {isDarkMode ? <Moon size={16} strokeWidth={2.2} /> : <Sun size={16} strokeWidth={2.2} />}
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </button>

              <button
                type="button"
                onClick={openCalendarModal}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#BFEF2E]/50 px-5 py-3 text-sm font-bold text-white"
              >
                Let&apos;s talk
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={openProposalModal}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#BFEF2E] px-5 py-3 text-sm font-bold text-[#101408]"
              >
                Request a proposal
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </button>
            </nav>
          </div>
        </div>
      ) : null}

      {isProposalOpen ? (
        <ProposalRequestModal
          isOpen={isProposalOpen}
          onClose={() => setIsProposalOpen(false)}
        />
      ) : null}
      {isCalendarOpen ? (
        <CalendarBookingModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
        />
      ) : null}
    </>
  )
}

export default Navigation

