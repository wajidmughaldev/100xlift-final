import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import Navigation from '@/components/Navigation'
import SiteFooter from '@/components/SiteFooter'

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-11/12 bg-[var(--page-bg)] text-[var(--page-fg)]"
    >
      <Navigation />

      <section className="pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-[980px] rounded-[14px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-6 sm:p-10 lg:p-14">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--muted-fg)]">
            404 Error
          </p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-[2.8rem] lg:text-[3.4rem]">
            This page is not available.
          </h1>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-7 text-[var(--page-fg)]/76 sm:text-base">
            The link may be outdated, the page may have moved, or the URL might be incorrect.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#314100] px-5 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600]"
            >
              Go Home
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>

            <Link
              href="/blog"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--outline-soft)] bg-[var(--surface-2)] px-5 text-sm font-semibold text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/22"
            >
              Browse Blog
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>

            <Link
              href="/#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--outline-soft)] px-5 text-sm font-semibold text-[var(--page-fg)] transition hover:bg-[var(--surface-2)]"
            >
              <ArrowLeft size={16} strokeWidth={2.4} />
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

