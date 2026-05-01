'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  Pin,
  Send,
  ThumbsUp,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'

import SiteFooter from '@/components/SiteFooter'
import Navigation from '@/components/Navigation'
import type { BlogComment, BlogMappedPost } from '@/lib/wordpress'

type BlogPostLayoutProps = {
  post: BlogMappedPost
  relatedPosts: BlogMappedPost[]
  trendingPosts: BlogMappedPost[]
  comments: BlogComment[]
}

type CommentSortOption = 'oldest' | 'newest' | 'most-replied'

function storageKey(scope: string, id: string | number) {
  return `100xlift:${scope}:${id}`
}

function PostImage({
  post,
  className,
  wrapperClassName,
}: {
  post: BlogMappedPost
  className: string
  wrapperClassName: string
}) {
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
        sizes="(max-width: 900px) 100vw, 760px"
        quality={92}
        className={className}
      />
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
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => (
        <Link
          key={`cat-${category.id}`}
          href={`/blog/category/${category.slug}`}
          className="inline-flex rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--page-fg)]/82"
        >
          {category.name}
        </Link>
      ))}
      {tags.map((tag) => (
        <Link
          key={`tag-${tag.id}`}
          href={`/blog/tag/${tag.slug}`}
          className="inline-flex rounded-full border border-[var(--outline-soft)] px-3 py-1 text-xs text-[var(--page-fg)]/70"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}

function TrendingSidebar({
  isOpen,
  onToggle,
  trendingPosts,
}: {
  isOpen: boolean
  onToggle: () => void
  trendingPosts: BlogMappedPost[]
}) {
  return (
    <div className="xl:flex xl:h-full xl:flex-col">
      <button
        type="button"
        onClick={onToggle}
        className="mb-5 inline-flex size-11 items-center justify-center self-start rounded-full border border-[var(--page-fg)]/12 bg-[var(--surface-1)] text-sm font-medium text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/22 xl:hidden"
        aria-expanded={isOpen}
      >
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--surface-2)]">
          {isOpen ? (
            <ChevronRight className="size-4" strokeWidth={2.5} />
          ) : (
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen
          ? 'max-h-[1400px] translate-x-0 opacity-100 xl:max-h-none xl:w-[320px] xl:opacity-100'
          : 'max-h-0 -translate-x-3 opacity-0 xl:max-h-none xl:w-0 xl:opacity-0'
          }`}
      >
        <div
          className={`space-y-5 rounded-[10px] border border-[var(--page-fg)]/10 bg-[var(--surface-1)] p-5 ${isOpen ? '' : 'xl:hidden'
            }`}
        >
          <h3 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[var(--page-fg)]">
            Trending Topic
          </h3>
          {trendingPosts.map((item) => (
            <Link
              key={item.id}
              href={`/blog/${item.slug}`}
              className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 rounded-[8px] p-1 transition hover:bg-[var(--surface-2)]"
            >
              <PostImage
                post={item}
                wrapperClassName="relative h-[84px] w-[84px] overflow-hidden rounded-[6px] bg-black"
                className="rounded-[6px] object-contain"
              />
              <div className="min-w-0 space-y-2">
                <p className="text-xs text-[var(--page-fg)]/52">{item.dateLabel}</p>
                <h3 className="line-clamp-2 text-[0.98rem] font-medium leading-6 tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--page-fg)]/60">{item.authorName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function CommentsSection({
  post,
  initialComments,
}: {
  post: BlogMappedPost
  initialComments: BlogComment[]
}) {
  const [comments, setComments] = useState(initialComments)
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [content, setContent] = useState('')
  const [replyTo, setReplyTo] = useState<BlogComment | null>(null)
  const [sortBy, setSortBy] = useState<CommentSortOption>('oldest')
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const savedLikes: Record<number, boolean> = {}
    comments.forEach((comment) => {
      savedLikes[comment.id] = localStorage.getItem(storageKey('comment-liked', comment.id)) === 'true'
    })
    setLikedComments(savedLikes)
  }, [comments])

  const nestedComments = useMemo(() => {
    const byParent = new Map<number, BlogComment[]>()
    comments.forEach((comment) => {
      const parentId = comment.parent || 0
      byParent.set(parentId, [...(byParent.get(parentId) || []), comment])
    })

    const countReplies = (commentId: number): number => {
      const directReplies = byParent.get(commentId) || []
      return directReplies.length + directReplies.reduce((total, reply) => total + countReplies(reply.id), 0)
    }

    byParent.forEach((items, parentId) => {
      const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }

        if (sortBy === 'most-replied') {
          return countReplies(b.id) - countReplies(a.id)
        }

        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      byParent.set(parentId, sortedItems)
    })

    return byParent
  }, [comments, sortBy])

  const normalizedPostAuthor = post.authorName.trim().toLowerCase()
  const isAuthorComment = (comment: BlogComment) =>
    comment.authorName.trim().toLowerCase() === normalizedPostAuthor
  const pinnedComment = comments.find(isAuthorComment)

  const toggleCommentLike = (commentId: number) => {
    setLikedComments((current) => {
      const nextValue = !current[commentId]
      localStorage.setItem(storageKey('comment-liked', commentId), String(nextValue))
      return { ...current, [commentId]: nextValue }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          parentId: replyTo?.id,
          authorName,
          authorEmail,
          content,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Comment could not be submitted.')
      }

      const payload = await response.json()
      if (payload?.comment) {
        setComments((current) => [...current, payload.comment])
      }

      setAuthorName('')
      setAuthorEmail('')
      setContent('')
      setReplyTo(null)
      setStatus('sent')
      setMessage('Your comment has been sent.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Comment could not be submitted.')
    }
  }

  const commentById = useMemo(() => {
    const map = new Map<number, BlogComment>()
    comments.forEach((comment) => map.set(comment.id, comment))
    return map
  }, [comments])

  const renderCommentRow = (comment: BlogComment, depth = 0): React.ReactNode => {
    const parentComment = comment.parent ? commentById.get(comment.parent) : null

    return (
      <article
        key={comment.id}
        className={`relative flex w-full min-w-0 items-start gap-3 sm:gap-4 ${
          depth > 0
            ? 'sm:before:absolute sm:before:left-[-2.5rem] sm:before:top-5 sm:before:h-px sm:before:w-8 sm:before:bg-[var(--outline-soft)]'
            : ''
        }`}
      >
        <div className="relative flex shrink-0 justify-center">
          <span
            className={`relative z-10 inline-flex size-9 items-center justify-center rounded-full text-xs font-bold ring-4 ring-[var(--page-bg)] sm:size-11 sm:text-sm ${
              depth > 0
                ? 'bg-[var(--surface-2)] text-[var(--page-fg)]'
                : 'bg-[#314100] text-[#BFEF2E]'
            }`}
          >
            {comment.authorName.trim().charAt(0).toUpperCase() || 'A'}
          </span>
        </div>

        <div className="min-w-0 flex-1 pb-1">
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
            <span className="min-w-0 break-words text-[0.96rem] font-bold leading-5 text-[var(--page-fg)] sm:text-[0.98rem]">
              {comment.authorName}
            </span>
            {isAuthorComment(comment) ? (
              <span className="inline-flex w-fit rounded-full bg-[#314100] px-2 py-0.5 text-[11px] font-bold text-[#BFEF2E]">
                Author reply
              </span>
            ) : null}
            <span className="text-sm leading-5 text-[var(--page-fg)]/52">{comment.dateLabel}</span>
          </div>
          {parentComment ? (
            <p className="mt-1 break-words text-xs font-medium text-[var(--page-fg)]/50">
              Replying to {parentComment.authorName}
            </p>
          ) : null}
          <div
            className="wp-comment-content mt-2 break-words text-[0.95rem] leading-7 text-[var(--page-fg)]/78 sm:text-[0.98rem]"
            dangerouslySetInnerHTML={{ __html: comment.contentHtml }}
          />
          <div className="mt-3 flex items-center gap-3 text-sm text-[var(--page-fg)]/58">
            <button
              type="button"
              onClick={() => toggleCommentLike(comment.id)}
              className={`inline-flex items-center gap-1.5 font-semibold transition hover:text-[var(--page-fg)] ${
                likedComments[comment.id] ? 'text-[#6f8c09]' : ''
              }`}
            >
              <ThumbsUp className="size-4" fill={likedComments[comment.id] ? 'currentColor' : 'none'} strokeWidth={2.1} />
              Helpful
            </button>
            {post.commentsOpen ? (
              <button
                type="button"
                onClick={() => {
                  setReplyTo(comment)
                  setMessage('')
                  setStatus('idle')
                }}
                className="inline-flex items-center gap-1.5 font-semibold transition hover:text-[var(--page-fg)]"
              >
                <MessageCircle className="size-4" strokeWidth={2.1} />
                Reply
              </button>
            ) : null}
          </div>
        </div>
      </article>
    )
  }

  const renderComments = (parentId = 0, depth = 0): React.ReactNode => {
    const items = nestedComments.get(parentId) || []
    if (!items.length) return null

    return (
      <div
        className={
          depth === 0
            ? 'space-y-7 sm:space-y-8'
            : depth <= 3
              ? 'relative ml-4 mt-4 space-y-5 border-l border-[var(--outline-soft)] pl-4 sm:ml-[22px] sm:space-y-6 sm:border-l-0 sm:pl-10 sm:before:absolute sm:before:bottom-8 sm:before:left-0 sm:before:top-[-1.15rem] sm:before:w-px sm:before:bg-[var(--outline-soft)]'
              : 'mt-4 space-y-5 sm:mt-5'
        }
      >
        {items.map((comment) => (
          <div key={comment.id}>
            {renderCommentRow(comment, depth)}
            {renderComments(comment.id, depth + 1)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="mt-14 w-full border-t border-[var(--page-fg)]/12 pt-10 lg:mx-auto lg:max-w-[760px]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[1.7rem] font-semibold tracking-[-0.04em]">Comments</h2>
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#314100] px-2 text-sm font-bold text-[#BFEF2E]">
            {comments.length}
          </span>
        </div>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as CommentSortOption)}
          className="h-10 rounded-full border border-[var(--outline-soft)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--page-fg)] outline-none transition hover:border-[#314100] hover:bg-[var(--surface-2)] focus:border-[#314100] focus:bg-[#314100] focus:text-[#BFEF2E]"
          aria-label="Sort comments"
        >
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
          <option value="most-replied">Most replied</option>
        </select>
      </div>

      {pinnedComment ? (
        <div className="mb-7 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--page-fg)]">
            <Pin className="size-4 text-[#6f8c09]" strokeWidth={2.3} />
            Pinned author note
          </div>
          <div
            className="wp-comment-content text-sm leading-7 text-[var(--page-fg)]/74"
            dangerouslySetInnerHTML={{ __html: pinnedComment.contentHtml }}
          />
        </div>
      ) : null}

      {comments.length ? (
        <div className="w-full rounded-[10px] bg-transparent">{renderComments()}</div>
      ) : null}

      {post.commentsOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mt-7 grid gap-4 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-5"
        >
          {replyTo ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--page-fg)]/72">
              <span>
                Replying to <strong className="text-[var(--page-fg)]">{replyTo.authorName}</strong>
              </span>
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="font-semibold text-[var(--page-fg)] transition hover:text-[#6f8c09]"
              >
                Cancel
              </button>
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--page-fg)]/72">
              Name
              <input
                required
                autoComplete="name"
                maxLength={80}
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--page-fg)]/72">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                maxLength={254}
                value={authorEmail}
                onChange={(event) => setAuthorEmail(event.target.value)}
                className="h-11 rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-[var(--page-fg)]/72">
            Comment
            <textarea
              required
              maxLength={2000}
              rows={5}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="resize-y rounded-[8px] border border-[var(--outline-soft)] bg-[var(--page-bg)] px-3 py-3 text-[var(--page-fg)] outline-none transition focus:border-[var(--page-fg)]/35"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {message ? (
              <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-[var(--page-fg)]/64'}`}>
                {message}
              </p>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#314100] px-5 text-sm font-bold text-[#BFEF2E] transition hover:bg-[#405600] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending' : 'Send Comment'}
              <Send className="size-4" strokeWidth={2.3} />
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-7 rounded-[10px] border border-[var(--outline-soft)] bg-[var(--surface-1)] p-5 text-sm text-[var(--page-fg)]/66">
          Comments are closed for this post in WordPress.
        </div>
      )}
    </section>
  )
}

export default function BlogPostLayout({ post, relatedPosts, trendingPosts, comments }: BlogPostLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [postsSwiper, setPostsSwiper] = useState<SwiperInstance | null>(null)
  const postContentRef = useRef<HTMLDivElement | null>(null)
  const computedTrendingPosts = useMemo(
    () => (trendingPosts.length ? trendingPosts : relatedPosts.slice(0, 4)),
    [relatedPosts, trendingPosts]
  )

  useEffect(() => {
    const root = postContentRef.current
    if (!root) return

    const accordions = Array.from(root.querySelectorAll<HTMLElement>('.wp-block-accordion'))
    const cleanups: Array<() => void> = []

    accordions.forEach((accordion) => {
      const buttons = Array.from(
        accordion.querySelectorAll<HTMLButtonElement>('.wp-block-accordion-heading__toggle')
      )

      const getPanel = (button: HTMLButtonElement) => {
        const panelId = button.getAttribute('aria-controls')
        if (!panelId) return null
        return accordion.querySelector<HTMLElement>(`#${panelId}`)
      }

      const setExpanded = (button: HTMLButtonElement, expanded: boolean) => {
        const panel = getPanel(button)
        if (!panel) return

        button.setAttribute('aria-expanded', expanded ? 'true' : 'false')
        panel.toggleAttribute('hidden', !expanded)
        panel.toggleAttribute('inert', !expanded)
      }

      buttons.forEach((button) => {
        const startsExpanded = button.getAttribute('aria-expanded') === 'true'
        setExpanded(button, startsExpanded)

        const handler = () => {
          const isExpanded = button.getAttribute('aria-expanded') === 'true'
          setExpanded(button, !isExpanded)
        }
        button.addEventListener('click', handler)
        cleanups.push(() => button.removeEventListener('click', handler))
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [post.contentHtml, post.id])

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-11/12 bg-[var(--page-bg)] text-[var(--page-fg)]"
    >
      <Navigation />

      <section className="mx-auto max-w-[1320px] pb-20 pt-6 sm:pb-24 sm:pt-10 lg:pt-12">
        <div className="mb-8 text-center text-sm text-[var(--page-fg)]/56">
          <div className="mx-auto flex max-w-[760px] flex-wrap items-center justify-center gap-2">
            <Link href="/" className="transition hover:text-[var(--page-fg)]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-[var(--page-fg)]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#8ab310]">{post.title}</span>
          </div>
        </div>

        <div
          className={`grid gap-8 transition-all duration-500 ease-out xl:gap-10 ${isSidebarOpen
            ? 'xl:grid-cols-[minmax(0,1fr)_52px_320px]'
            : 'xl:grid-cols-[minmax(0,1fr)_52px]'
            }`}
        >
          <div className="min-w-0">
            <article className="mx-auto max-w-[760px]">
              <header className="text-center">


                <h1 className="mx-auto mt-8  text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.06em] sm:text-[3.2rem] lg:text-[3rem]">
                  {post.title}
                </h1>

                <TaxonomyChips categories={post.categories} tags={post.tags} />

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-[var(--page-fg)]/12 pb-8 text-[0.96rem] text-[var(--page-fg)]/58">
                  <div className=" inline-flex size-8 items-center justify-center rounded-full bg-[var(--surface-2)] text-sm font-semibold text-[var(--page-fg)]">
                    {post.authorName.trim().charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="font-medium tracking-[-0.04em]">{post.authorName}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" strokeWidth={1.9} />
                    {post.readTime}
                  </span>
                  <span className="hidden size-2 rounded-full bg-[var(--page-fg)]/12 sm:inline-flex" />
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" strokeWidth={1.9} />
                    {post.dateLabel}
                  </span>
                </div>
              </header>

              <div className="mt-8 space-y-8">
                <PostImage
                  post={post}
                  wrapperClassName="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-black sm:aspect-[16/9]"
                  className="rounded-[12px] object-contain"
                />

                <div
                  ref={postContentRef}
                  className="wp-content max-w-none text-[var(--page-fg)]"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </div>
            </article>

            <CommentsSection post={post} initialComments={comments} />

            <section className="mx-auto mt-16 max-w-[1120px]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-[1.7rem] font-semibold tracking-[-0.04em]">More Posts</h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => postsSwiper?.slidePrev()}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--page-fg)]/12 bg-[var(--surface-1)] text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/24"
                    aria-label="Previous posts"
                  >
                    <ChevronLeft className="size-4" strokeWidth={2.3} />
                  </button>
                  <button
                    type="button"
                    onClick={() => postsSwiper?.slideNext()}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--page-fg)]/12 bg-[var(--surface-1)] text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/24"
                    aria-label="Next posts"
                  >
                    <ChevronRight className="size-4" strokeWidth={2.3} />
                  </button>
                </div>
              </div>

              <Swiper
                spaceBetween={20}
                slidesPerView={1.1}
                onSwiper={setPostsSwiper}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1280: { slidesPerView: isSidebarOpen ? 2 : 3 },
                }}
              >
                {relatedPosts.map((item) => (
                  <SwiperSlide key={item.id} className="!h-auto">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group block h-full rounded-[10px] border border-[var(--page-fg)]/10 bg-[var(--surface-1)] p-4 transition hover:border-[var(--page-fg)]/18 hover:bg-[var(--surface-2)]"
                    >
                      <PostImage
                        post={item}
                        wrapperClassName="relative h-[220px] w-full overflow-hidden rounded-[8px] bg-black"
                        className="rounded-[8px] object-contain"
                      />
                      <div className="mt-4 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.categories.map((category) => (
                            <Link
                              href={`/blog/category/${category.slug}`}
                              key={`${item.id}-${category.id}`}
                              className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--page-fg)]/72"
                            >
                              {category.name}
                            </Link>
                          ))}
                          {item.tags.slice(0, 1).map((tag) => (
                            <Link
                              href={`/blog/tag/${tag.slug}`}
                              key={`${item.id}-${tag.id}`}
                              className="rounded-full border border-[var(--outline-soft)] px-2.5 py-1 text-[11px] text-[var(--page-fg)]/60"
                            >
                              #{tag.name}
                            </Link>
                          ))}
                        </div>
                        <p className="text-xs text-[var(--page-fg)]/52">{item.dateLabel}</p>
                        <h3 className="line-clamp-2 text-[1.08rem] font-medium leading-7 tracking-[-0.03em] text-[var(--page-fg)]">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium text-[var(--page-fg)]/62 transition group-hover:text-[var(--page-fg)]">
                          Open Post
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>

          <div className="hidden xl:flex xl:justify-center">
            <div className="sticky top-32 h-fit">
              <button
                type="button"
                onClick={() => setIsSidebarOpen((current) => !current)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--page-fg)]/12 bg-[var(--surface-1)] text-sm font-medium text-[var(--page-fg)] transition hover:border-[var(--page-fg)]/22"
                aria-expanded={isSidebarOpen}
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

          <TrendingSidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((current) => !current)}
            trendingPosts={computedTrendingPosts}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
