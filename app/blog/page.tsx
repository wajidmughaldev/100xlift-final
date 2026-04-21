import type { Metadata } from 'next'

import BlogArchivePage from '@/components/blog/blog-archive-page'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | 100XLift',
  description: 'Editorial archive layout for the 100XLift blog.',
}

export default function Page() {
  return <BlogArchivePage />
}
