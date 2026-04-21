import type { Metadata } from 'next'

import BlogPostPage from '@/components/blog/blog-post-page'
import { decodeHtmlEntities, getPostBySlug, mapWPPostToBlogPost, stripHtml } from '@/lib/wordpress'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 300

const siteUrl = 'https://100xlift.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | 100XLift',
    }
  }

  const mappedPost = mapWPPostToBlogPost(post)

  return {
    title: `${mappedPost.title} | 100XLift`,
    description:
      mappedPost.excerpt || decodeHtmlEntities(stripHtml(post.content.rendered)).slice(0, 180),
    alternates: {
      canonical: `${siteUrl}/blog/${mappedPost.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return <BlogPostPage slug={slug} />
}
