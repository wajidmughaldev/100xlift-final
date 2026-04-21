import type { Metadata } from 'next'
import Link from 'next/link'

import Navigation from '@/components/Navigation'
import SiteFooter from '@/components/SiteFooter'
import { getTags, mapTermToSummary } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'
export const revalidate = 300

const siteUrl = 'https://100xlift.com'

export const metadata: Metadata = {
  title: 'Tags | 100XLift',
  description: 'Browse all blog tags.',
  alternates: {
    canonical: `${siteUrl}/blog/tag`,
  },
}

export default async function Page() {
  let tags = [] as ReturnType<typeof mapTermToSummary>[]

  try {
    const wpTags = await getTags()
    tags = wpTags.map(mapTermToSummary)
  } catch {
    tags = []
  }

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-11/12 bg-[var(--page-bg)] text-[var(--page-fg)]"
    >
      <Navigation />

      <section className="pb-20 pt-6 sm:pb-24 sm:pt-10 lg:pt-12">
        <div className="mb-8 text-sm text-[var(--page-fg)]/56">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="transition hover:text-[var(--page-fg)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-[var(--page-fg)]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#8ab310]">Tags</span>
          </div>
        </div>

        <div className="mb-10 space-y-3">
          <h1 className="text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.8rem]">
            All Tags
          </h1>
          <p className="text-sm text-[var(--page-fg)]/66 sm:text-base">
            Browse all tags from your WordPress content.
          </p>
        </div>

        {!tags.length ? (
          <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-8 text-sm text-[var(--page-fg)]/70">
            No tags found.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                className="inline-flex items-center rounded-full border border-[var(--outline-soft)] bg-[var(--surface-1)] px-4 py-2 text-sm text-[var(--page-fg)]/82 transition hover:border-[var(--page-fg)]/30 hover:bg-[var(--surface-2)]"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  )
}
