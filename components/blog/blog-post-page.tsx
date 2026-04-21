import { notFound } from 'next/navigation'

import BlogPostLayout from '@/components/blog/blog-post-layout'
import { getPostBySlug, getPosts, mapWPPostToBlogPost } from '@/lib/wordpress'

type BlogPostPageProps = {
  slug: string
}

export default async function BlogPostPage({ slug }: BlogPostPageProps) {
  const [selectedPost, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()])

  if (!selectedPost) {
    notFound()
  }

  const mappedPost = mapWPPostToBlogPost(selectedPost)
  const mappedPosts = allPosts.map(mapWPPostToBlogPost)

  const relatedPosts = mappedPosts.filter((post) => post.slug !== slug).slice(0, 8)
  const trendingPosts = mappedPosts.filter((post) => post.slug !== slug).slice(0, 4)

  return <BlogPostLayout post={mappedPost} relatedPosts={relatedPosts} trendingPosts={trendingPosts} />
}
