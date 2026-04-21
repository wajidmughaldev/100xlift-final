import type { Metadata } from 'next'

import BlogArchivePage from '@/components/blog/blog-archive-page'

export const dynamic = 'force-dynamic'

const siteUrl = 'https://100xlift.com'

export const metadata: Metadata = {
  title: 'Blog | 100XLift',
  description: 'Editorial archive layout for the 100XLift blog.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
}

export default function Page() {
  return <BlogArchivePage />
}
