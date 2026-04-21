import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Navigation from '@/components/Navigation'
import SiteFooter from '@/components/SiteFooter'
import BlogArchiveFeed from '@/components/blog/blog-archive-feed'
import { getPostsByTagSlug, mapWPPostToBlogPost } from '@/lib/wordpress'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 300

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { term } = await getPostsByTagSlug(slug)

  if (!term) {
    return { title: 'Tag Not Found | 100XLift' }
  }

  return {
    title: `#${term.name} Posts | 100XLift`,
    description: `Browse posts tagged with ${term.name}.`,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const { term, posts } = await getPostsByTagSlug(slug)

  if (!term) {
    notFound()
  }

  const mappedPosts = posts.map(mapWPPostToBlogPost)

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
            <span>Tag</span>
            <span>/</span>
            <span className="text-[#8ab310]">{term.name}</span>
          </div>
        </div>
        <BlogArchiveFeed
          posts={mappedPosts}
          heading={`Tag: #${term.name}`}
          subheading={`Showing posts tagged with ${term.name}.`}
        />
      </section>
      <SiteFooter />
    </main>
  )
}
