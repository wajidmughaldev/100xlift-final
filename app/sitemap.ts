import type { MetadataRoute } from 'next'

import {
  getSitemapCategories,
  getSitemapPosts,
  getSitemapTags,
  type WPSitemapPost,
} from '@/lib/wordpress'

const siteUrl = 'https://100xlift.com'

export const revalidate = 300

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${siteUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${siteUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  },
  {
    url: `${siteUrl}/blog/category`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.65,
  },
  {
    url: `${siteUrl}/blog/tag`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.55,
  },
]

function getPostLastModified(post: WPSitemapPost): Date {
  const value = post.modified_gmt || post.modified || post.date_gmt || post.date
  const date = value ? new Date(value) : new Date()
  return Number.isNaN(date.getTime()) ? new Date() : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, categories, tags] = await Promise.all([
      getSitemapPosts(),
      getSitemapCategories(),
      getSitemapTags(),
    ])

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: getPostLastModified(post),
      changeFrequency: 'monthly',
      priority: 0.75,
    }))

    const categoryRoutes: MetadataRoute.Sitemap = categories
      .filter((category) => (category.count ?? 0) > 0)
      .map((category) => ({
        url: `${siteUrl}/blog/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }))

    const tagRoutes: MetadataRoute.Sitemap = tags
      .filter((tag) => (tag.count ?? 0) > 0)
      .map((tag) => ({
        url: `${siteUrl}/blog/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes]
  } catch {
    return staticRoutes
  }
}
