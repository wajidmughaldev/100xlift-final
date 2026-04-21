'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'

import SiteFooter from '@/components/SiteFooter'
import Navigation from '@/components/Navigation'
import type { BlogMappedPost } from '@/lib/wordpress'

type BlogPostLayoutProps = {
  post: BlogMappedPost
  relatedPosts: BlogMappedPost[]
  trendingPosts: BlogMappedPost[]
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
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
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
                wrapperClassName="relative h-[84px] w-[84px] overflow-hidden rounded-[6px]"
                className="rounded-[6px] object-cover"
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

export default function BlogPostLayout({ post, relatedPosts, trendingPosts }: BlogPostLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
                  wrapperClassName="relative h-[440px] w-full overflow-hidden rounded-[12px]"
                  className="rounded-[12px] object-cover"
                />

                <div
                  ref={postContentRef}
                  className="wp-content prose prose-neutral max-w-none text-[var(--page-fg)] [&_a]:text-[var(--page-fg)] [&_h1]:text-[var(--page-fg)] [&_h2]:text-[var(--page-fg)] [&_h3]:text-[var(--page-fg)] [&_h4]:text-[var(--page-fg)] [&_li]:text-[var(--page-fg)] [&_p]:text-[var(--page-fg)]/78"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </div>
            </article>

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
                        wrapperClassName="relative h-[220px] w-full overflow-hidden rounded-[8px]"
                        className="rounded-[8px] object-cover"
                      />
                      <div className="mt-4 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.categories.slice(0, 1).map((category) => (
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
