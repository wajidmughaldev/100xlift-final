'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { BlogMappedPost } from '@/lib/wordpress'

const INITIAL_POST_COUNT = 6
const LOAD_BATCH_SIZE = 6
type SortOption = 'newest' | 'oldest' | 'title-az'

type BlogArchiveFeedProps = {
  posts: BlogMappedPost[]
  heading?: string
  subheading?: string
}

function PostImage({ post, className, wrapperClassName }: { post: BlogMappedPost; className: string; wrapperClassName: string }) {
  if (!post.featuredImage) {
    return (
      <div className={wrapperClassName}>
        <div className={`${className} h-full w-full bg-[var(--surface-2)]`} aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={wrapperClassName}>
      <Image
        src={post.featuredImage}
        alt={post.featuredImageAlt || post.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
        className={className}
      />
    </div>
  )
}

function AuthorBadge({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || 'A'

  return (
    <div className="inline-flex items-center gap-3 text-sm text-[var(--page-fg)]/68">
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--surface-2)] text-[0.78rem] font-semibold text-[var(--page-fg)]">
        {initial}
      </span>
      <span>{name}</span>
    </div>
  )
}

function TaxonomyChips({
  categories,
  tags,
}: {
  categories: BlogMappedPost['categories']
  tags: BlogMappedPost['tags']
}) {
  const visibleTags = tags.slice(0, 2)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.slice(0, 1).map((category) => (
        <Link
          href={`/blog/category/${category.slug}`}
          key={category.id}
          className="inline-flex rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--page-fg)]/80"
        >
          {category.name}
        </Link>
      ))}
      {visibleTags.map((tag) => (
        <Link
          href={`/blog/tag/${tag.slug}`}
          key={tag.id}
          className="inline-flex rounded-full border border-[var(--outline-soft)] px-3 py-1 text-xs text-[var(--page-fg)]/70"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}

function BlogCard({ post }: { post: BlogMappedPost }) {
  const shortExcerpt = post.excerpt.length > 150 ? `${post.excerpt.slice(0, 150).trimEnd()}...` : post.excerpt
  const shortTitle = post.title.length > 75 ? `${post.title.slice(0, 75).trimEnd()}...` : post.title

  return (
    <article className="mb-10 break-inside-avoid space-y-5 rounded-[10px] animate-in slide-in-from-bottom-4 fade-in duration-500">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-[6px]">
        <PostImage
          post={post}
          wrapperClassName="relative h-[270px] w-full overflow-hidden rounded-[6px]"
          className="rounded-[6px] object-cover"
        />
      </Link>
      <div className="space-y-4">
        <TaxonomyChips categories={post.categories} tags={post.tags} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--page-fg)]/58">
          <AuthorBadge name={post.authorName} />
          <span>{post.dateLabel}</span>
          <span>{post.readTime}</span>
        </div>
        <div className="space-y-3">
          <Link
            href={`/blog/${post.slug}`}
            className="block text-[1.4rem] font-medium leading-[1.2] tracking-[-0.04em] text-[var(--page-fg)]"
          >
            {shortTitle}
          </Link>
          <p className="max-w-[34rem] text-[0.95rem] leading-6 text-[var(--page-fg)]/70">
            {shortExcerpt}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[#314100] px-4 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600]"
        >
          Read More
          <ChevronRight className="size-4" strokeWidth={2.4} />
        </Link>
      </div>
    </article>
  )
}

function TrendingPost({ post }: { post: BlogMappedPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grid grid-cols-[108px_minmax(0,1fr)] gap-4 sm:grid-cols-[132px_minmax(0,1fr)]"
    >
      <PostImage
        post={post}
        wrapperClassName="relative h-[108px] w-[108px] overflow-hidden rounded-[6px] sm:h-[132px] sm:w-[132px]"
        className="rounded-[6px] object-cover"
      />
      <div className="flex min-w-0 flex-col justify-center gap-2.5">
        <p className="text-xs text-[var(--page-fg)]/52 sm:text-sm">{post.dateLabel}</p>
        <h3 className="line-clamp-2 text-[1rem] font-medium leading-6 tracking-[-0.03em] text-[var(--page-fg)] sm:text-[1.12rem]">
          {post.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--page-fg)]/65">
          {post.categories.slice(0, 1).map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
          <span>{post.readTime}</span>
          <span>{post.authorName}</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogArchiveFeed({
  posts,
  heading = 'Exploring New Articles',
  subheading = 'Dive into a world of insights, ideas, and inspiration. Stay updated with the latest trends shaping our present and future.',
}: BlogArchiveFeedProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [visibleCount, setVisibleCount] = useState(INITIAL_POST_COUNT)

  const categoryOptions = useMemo(() => {
    const categoryMap = new Map<number, { id: number; name: string; slug: string }>()
    posts.forEach((post) => {
      post.categories.forEach((category) => categoryMap.set(category.id, category))
    })
    return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [posts])

  const tagOptions = useMemo(() => {
    const tagMap = new Map<number, { id: number; name: string; slug: string }>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagMap.set(tag.id, tag))
    })
    return Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [posts])

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const result = posts.filter((post) => {
      const categoryMatch =
        selectedCategory === 'all' || post.categories.some((category) => category.slug === selectedCategory)
      if (!categoryMatch) return false

      const tagMatch = selectedTag === 'all' || post.tags.some((tag) => tag.slug === selectedTag)
      if (!tagMatch) return false

      if (!query) return true

      const haystack = [
        post.title,
        post.excerpt,
        post.authorName,
        ...post.categories.map((category) => category.name),
        ...post.tags.map((tag) => tag.name),
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })

    if (sortBy === 'oldest') {
      return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    if (sortBy === 'title-az') {
      return result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy])

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  )
  const hasMorePosts = visibleCount < filteredPosts.length
  const trendingPosts = filteredPosts.slice(0, 4)
  const featuredPost = filteredPosts[4] ?? filteredPosts[0]

  if (!posts.length) {
    return (
      <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-8 text-[var(--page-fg)]/70">
        No posts found from WordPress.
      </div>
    )
  }

  return (
    <div
      className={`grid gap-10 transition-all duration-500 ease-out lg:gap-12 xl:gap-16 ${
        isSidebarOpen
          ? 'lg:grid-cols-[minmax(0,1.45fr)_52px_minmax(300px,0.78fr)]'
          : 'lg:grid-cols-[minmax(0,1fr)_52px]'
      }`}
    >
      <div className="space-y-10 sm:space-y-12">
        <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_180px_auto]">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setVisibleCount(INITIAL_POST_COUNT)
              }}
              placeholder="Search by title, author, category, or tag"
              className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-sm text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              aria-label="Search posts"
            />

            <select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value)
                setVisibleCount(INITIAL_POST_COUNT)
              }}
              className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-sm text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={(event) => {
                setSelectedTag(event.target.value)
                setVisibleCount(INITIAL_POST_COUNT)
              }}
              className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-sm text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              aria-label="Filter by tag"
            >
              <option value="all">All Tags</option>
              {tagOptions.map((tag) => (
                <option key={tag.id} value={tag.slug}>
                  {tag.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value as SortOption)
                setVisibleCount(INITIAL_POST_COUNT)
              }}
              className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-sm text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              aria-label="Sort posts"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title-az">Title A-Z</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedTag('all')
                setSortBy('newest')
              }}
              className="h-11 rounded-[8px] border border-[var(--outline-soft)] px-4 text-sm font-medium text-[var(--page-fg)] transition hover:bg-[var(--surface-2)]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.56fr)] lg:items-start">
          <div>
            <h1 className="max-w-[9ch] text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--page-fg)] sm:text-[3.6rem] lg:text-[4.4rem]">
              {heading}
            </h1>
          </div>
          <p className="max-w-[22rem] pt-1 text-[1rem] leading-7 text-[var(--page-fg)]/72 sm:text-[1.05rem] lg:justify-self-end">
            {subheading}
          </p>
        </div>

        <div
          className={`columns-1 gap-10 sm:columns-2 ${
            isSidebarOpen ? 'xl:columns-2' : 'xl:columns-3'
          }`}
        >
          {visiblePosts.map((post, index) => (
            <div key={post.id} style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {!filteredPosts.length ? (
          <div className="rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-8 text-sm text-[var(--page-fg)]/70">
            No posts matched your search and filters.
          </div>
        ) : null}

        {hasMorePosts ? (
          <div className="flex justify-center py-4">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((current) => Math.min(current + LOAD_BATCH_SIZE, posts.length))
              }
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#314100] px-5 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600]"
            >
              Load More
              <ChevronRight className="size-4" strokeWidth={2.4} />
            </button>
          </div>
        ) : null}
      </div>

      <div className="hidden lg:flex lg:justify-center">
        <div className="sticky top-32 h-fit">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((current) => !current)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--page-fg)]/12 bg-[var(--surface-1)] text-sm font-medium text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/22"
            aria-expanded={isSidebarOpen}
            aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--surface-2)]">
              {isSidebarOpen ? (
                <ChevronRight className="size-4" strokeWidth={2.5} />
              ) : (
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              )}
            </span>
          </button>
        </div>
      </div>

      <aside
        className={`overflow-hidden transition-all duration-500 ease-out lg:pt-1 ${
          isSidebarOpen ? 'max-h-[2200px] opacity-100 lg:w-auto' : 'max-h-0 opacity-0 lg:w-0'
        }`}
      >
        <div className={`space-y-9 ${isSidebarOpen ? '' : 'lg:hidden'}`}>
          <div className="space-y-6">
            <h2 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[var(--page-fg)] sm:text-[2.15rem]">
              Trending Topic
            </h2>
            <div className="space-y-6">
              {trendingPosts.map((post) => (
                <TrendingPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          {featuredPost ? (
            <Link href={`/blog/${featuredPost.slug}`} className="block space-y-5">
              <div className="relative">
                <PostImage
                  post={featuredPost}
                  wrapperClassName="relative h-[300px] w-full overflow-hidden rounded-[6px]"
                  className="rounded-[6px] object-cover"
                />
                <div className="absolute inset-0 rounded-[6px] bg-[linear-gradient(180deg,rgba(22,19,47,0.18),rgba(22,19,47,0.66))]" />
                <div className="absolute inset-x-0 bottom-0 flex min-h-[8rem] flex-col justify-end gap-3 px-6 pb-6 text-white sm:px-8 sm:pb-8">
                  <p className="text-sm text-white/76">{featuredPost.dateLabel}</p>
                  <h3 className="max-w-[18ch] text-[1.4rem] font-medium leading-[1.28] tracking-[-0.04em] sm:text-[1.6rem]">
                    {featuredPost.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-white/84">
                    <span>{featuredPost.authorName}</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </aside>
    </div>
  )
}
