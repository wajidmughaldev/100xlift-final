import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Navigation from '@/components/Navigation'
import SiteFooter from '@/components/SiteFooter'
import { getCategories, mapTermToSummary } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Categories | 100XLift',
  description: 'Browse all blog categories.',
}

export default async function Page() {
  let categories = [] as ReturnType<typeof mapTermToSummary>[]

  try {
    const wpCategories = await getCategories()
    categories = wpCategories.map(mapTermToSummary)
  } catch {
    categories = []
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
            <span className="text-[#8ab310]">Categories</span>
          </div>
        </div>

        <div className="mb-10 space-y-3">
          <h1 className="text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.8rem]">
            All Categories
          </h1>
          <p className="text-sm text-[var(--page-fg)]/66 sm:text-base">
            Explore every category from your WordPress taxonomy.
          </p>
        </div>

        {!categories.length ? (
          <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-8 text-sm text-[var(--page-fg)]/70">
            No categories found.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="group overflow-hidden rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] transition hover:border-[var(--page-fg)]/24"
              >
                <div className="relative h-40 w-full overflow-hidden bg-[var(--surface-2)]">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="space-y-1 px-4 py-4">
                  <h2 className="text-[1.05rem] font-medium tracking-[-0.03em]">{category.name}</h2>
                  <p className="text-xs text-[var(--page-fg)]/60">{category.count} posts</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  )
}
