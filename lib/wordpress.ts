export type WPPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  count?: number;
  description?: string;
  acf?: {
    image?: string | { url?: string };
  };
  meta?: Record<string, unknown>;
  image?: string;
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
  };
};

export type WPTaxonomyItem = {
  id: number;
  name: string;
  slug: string;
};

export type WPTaxonomySummary = {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  imageUrl: string | null;
};

export type BlogMappedPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  date: string;
  dateLabel: string;
  readTime: string;
  authorName: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  categories: WPTaxonomyItem[];
  tags: WPTaxonomyItem[];
};

const DEFAULT_WP_API_URL = "https://cms.100xlift.com/wp-json/wp/v2";

function normalizeApiBaseUrl(raw?: string): string {
  const normalized = (raw || "").trim().replace(/\/+$/, "");
  return normalized;
}

const API_URL = normalizeApiBaseUrl(
  process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || DEFAULT_WP_API_URL
);
const CMS_ORIGIN = API_URL ? new URL(API_URL).origin : "";
const CMS_HOST = CMS_ORIGIN ? new URL(CMS_ORIGIN).hostname : "";

async function wpFetch<T>(endpoint: string): Promise<T> {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const requestUrl = `${API_URL}${safeEndpoint}`;

  const res = await fetch(requestUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`WordPress fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPosts(): Promise<WPPost[]> {
  if (!API_URL) return [];
  return wpFetch<WPPost[]>("/posts?_embed&per_page=12&orderby=date&order=desc");
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!API_URL) return null;
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed`);
  return posts.length ? posts[0] : null;
}

export async function getCategoryBySlug(slug: string): Promise<WPTerm | null> {
  if (!API_URL) return null;
  const categories = await wpFetch<WPTerm[]>(`/categories?slug=${slug}&per_page=1`);
  return categories.length ? categories[0] : null;
}

export async function getTagBySlug(slug: string): Promise<WPTerm | null> {
  if (!API_URL) return null;
  const tags = await wpFetch<WPTerm[]>(`/tags?slug=${slug}&per_page=1`);
  return tags.length ? tags[0] : null;
}

export async function getCategories(): Promise<WPTerm[]> {
  if (!API_URL) return [];
  return wpFetch<WPTerm[]>("/categories?per_page=100&orderby=name&order=asc");
}

export async function getTags(): Promise<WPTerm[]> {
  if (!API_URL) return [];
  return wpFetch<WPTerm[]>("/tags?per_page=100&orderby=name&order=asc");
}

export async function getPostsByCategorySlug(slug: string): Promise<{ term: WPTerm | null; posts: WPPost[] }> {
  if (!API_URL) return { term: null, posts: [] };
  const category = await getCategoryBySlug(slug);
  if (!category) return { term: null, posts: [] };

  const posts = await wpFetch<WPPost[]>(
    `/posts?_embed&per_page=12&orderby=date&order=desc&categories=${category.id}`
  );
  return { term: category, posts };
}

export async function getPostsByTagSlug(slug: string): Promise<{ term: WPTerm | null; posts: WPPost[] }> {
  if (!API_URL) return { term: null, posts: [] };
  const tag = await getTagBySlug(slug);
  if (!tag) return { term: null, posts: [] };

  const posts = await wpFetch<WPPost[]>(
    `/posts?_embed&per_page=12&orderby=date&order=desc&tags=${tag.id}`
  );
  return { term: tag, posts };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/\[\&hellip;\]/g, "...")
    .replace(/\[…\]/g, "...")
    .replace(/&hellip;/g, "...")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

export function getFeaturedImageAlt(post: WPPost): string {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || decodeHtmlEntities(stripHtml(post.title.rendered));
}

export function getPostCategories(post: WPPost) {
  const terms = post._embedded?.["wp:term"] || [];
  const flatTerms = terms.flat();
  return flatTerms.filter((term) => term.taxonomy === "category");
}

export function getPostTags(post: WPPost) {
  const terms = post._embedded?.["wp:term"] || [];
  const flatTerms = terms.flat();
  return flatTerms.filter((term) => term.taxonomy === "post_tag");
}

function extractTermImageUrl(term: WPTerm): string | null {
  if (typeof term.image === "string" && term.image.length) return term.image;

  if (term.acf?.image) {
    if (typeof term.acf.image === "string") return term.acf.image;
    if (typeof term.acf.image.url === "string" && term.acf.image.url.length) return term.acf.image.url;
  }

  const meta = term.meta || {};
  const possibleMetaKeys = ["image", "image_url", "thumbnail", "thumbnail_url", "category_image", "cover"];
  for (const key of possibleMetaKeys) {
    const value = meta[key];
    if (typeof value === "string" && value.length) return value;
  }

  const yoastImage = term.yoast_head_json?.og_image?.[0]?.url;
  if (typeof yoastImage === "string" && yoastImage.length) return yoastImage;

  return null;
}

export function mapTermToSummary(term: WPTerm): WPTaxonomySummary {
  return {
    id: term.id,
    name: decodeHtmlEntities(term.name),
    slug: term.slug,
    count: term.count ?? 0,
    description: decodeHtmlEntities(term.description ?? ""),
    imageUrl: extractTermImageUrl(term),
  };
}

export function getPostAuthor(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || "Author";
}

export function formatWPDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function estimateReadTime(contentHtml: string): string {
  const plainText = decodeHtmlEntities(stripHtml(contentHtml));
  const normalized = plainText.replace(/\[[^\]]*\]/g, " ");
  const words = normalized.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rewriteContentLinksToLocal(contentHtml: string): string {
  const escapedOrigin = CMS_ORIGIN ? escapeRegex(CMS_ORIGIN) : "";
  const escapedHost = CMS_HOST ? escapeRegex(CMS_HOST) : "";

  let rewritten = contentHtml;

  if (escapedOrigin) {
    rewritten = rewritten.replace(
      new RegExp(`href=(["'])${escapedOrigin}(/[^"']*)\\1`, "gi"),
      'href="$2"'
    );
  }

  if (escapedHost) {
    rewritten = rewritten.replace(
      new RegExp(`href=(["'])https?:\\/\\/(?:www\\.)?${escapedHost}(/[^"']*)\\1`, "gi"),
      'href="$2"'
    );
  }

  return rewritten
    .replace(/href=(["'])\/category\/([^"'/?#]+)\/?\1/gi, 'href="/blog/category/$2"')
    .replace(/href=(["'])\/tag\/([^"'/?#]+)\/?\1/gi, 'href="/blog/tag/$2"')
    .replace(/href=(["'])\/?blog\/category\/([^"'/?#]+)\/?\1/gi, 'href="/blog/category/$2"')
    .replace(/href=(["'])\/?blog\/tag\/([^"'/?#]+)\/?\1/gi, 'href="/blog/tag/$2"');
}

export function mapWPPostToBlogPost(post: WPPost): BlogMappedPost {
  const normalizedContentHtml = post.content.rendered
    .replace(/\[\&hellip;\]/g, "...")
    .replace(/\[…\]/g, "...");
  const contentHtml = rewriteContentLinksToLocal(normalizedContentHtml);

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(stripHtml(post.title.rendered)),
    excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
    contentHtml,
    date: post.date,
    dateLabel: formatWPDate(post.date),
    readTime: estimateReadTime(post.content.rendered),
    authorName: decodeHtmlEntities(getPostAuthor(post)),
    featuredImage: getFeaturedImage(post),
    featuredImageAlt: decodeHtmlEntities(getFeaturedImageAlt(post)),
    categories: getPostCategories(post).map((item) => ({
      id: item.id,
      slug: item.slug,
      name: decodeHtmlEntities(item.name),
    })),
    tags: getPostTags(post).map((item) => ({
      id: item.id,
      slug: item.slug,
      name: decodeHtmlEntities(item.name),
    })),
  };
}
