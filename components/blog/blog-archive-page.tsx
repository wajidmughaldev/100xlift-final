import Navigation from '@/components/Navigation'
import SiteFooter from '@/components/SiteFooter'
import BlogArchiveFeed from '@/components/blog/blog-archive-feed'
import { getPosts, mapWPPostToBlogPost, type BlogMappedPost } from '@/lib/wordpress'

export default async function BlogArchivePage() {
  let posts: BlogMappedPost[] = []

  try {
    const wpPosts = await getPosts()
    posts = wpPosts.map(mapWPPostToBlogPost)
  } catch (error) {
    console.error('Blog archive fetch failed:', error)
    posts = []
  }

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-11/12 bg-[var(--page-bg)] text-[var(--page-fg)]"
    >
      <Navigation />
      <section className="pb-20 pt-6 sm:pb-24 sm:pt-10 lg:pt-12">
        <BlogArchiveFeed posts={posts} />
      </section>
      <SiteFooter />
    </main>
  )
}
