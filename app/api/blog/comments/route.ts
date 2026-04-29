import { NextResponse } from 'next/server'

import { createComment, mapWPCommentToBlogComment } from '@/lib/wordpress'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MAX_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 254
const MAX_COMMENT_LENGTH = 2000

const commentAttempts = new Map<string, { count: number; resetAt: number }>()

function trimToLength(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength)
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (
    forwardedFor ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function getAllowedOriginHosts() {
  const values = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ]

  return values.flatMap((value) => {
    if (!value) return []

    try {
      return [new URL(value).host]
    } catch {
      return [value.replace(/^https?:\/\//, "").replace(/\/+$/, "")]
    }
  })
}

function isLocalHostAlias(host: string) {
  const hostname = host.split(":")[0]
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || "")
    .split(",")[0]
    .trim()

  if (!origin) {
    return process.env.NODE_ENV !== 'production'
  }

  if (!host) return false

  try {
    const originHost = new URL(origin).host
    if (originHost === host) return true

    if (
      process.env.NODE_ENV !== "production" &&
      isLocalHostAlias(originHost) &&
      isLocalHostAlias(host)
    ) {
      return originHost.split(":")[1] === host.split(":")[1]
    }

    return getAllowedOriginHosts().includes(originHost)
  } catch {
    return false
  }
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = commentAttempts.get(key)

  if (!current || current.resetAt <= now) {
    commentAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1
  return false
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Comment request was rejected.' }, { status: 403 })
    }

    const body = await request.json()
    const postId = Number(body.postId)
    const parentId = Number(body.parentId || 0)
    const authorName = trimToLength(body.authorName, MAX_NAME_LENGTH)
    const authorEmail = trimToLength(body.authorEmail, MAX_EMAIL_LENGTH)
    const content = trimToLength(body.content, MAX_COMMENT_LENGTH)

    if (!Number.isInteger(postId) || postId <= 0) {
      return NextResponse.json({ error: 'A valid post is required.' }, { status: 400 })
    }

    const rateLimitKey = `${getClientIp(request)}:${postId}`
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many comment attempts. Please try again later.' },
        { status: 429 }
      )
    }

    if (!authorName || !authorEmail || !content) {
      return NextResponse.json({ error: 'Name, email, and comment are required.' }, { status: 400 })
    }

    if (!isValidEmail(authorEmail)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    if (String(body.content || '').trim().length > MAX_COMMENT_LENGTH) {
      return NextResponse.json(
        { error: `Comments must be ${MAX_COMMENT_LENGTH} characters or fewer.` },
        { status: 400 }
      )
    }

    const comment = await createComment({
      postId,
      parentId: Number.isInteger(parentId) && parentId > 0 ? parentId : undefined,
      authorName,
      authorEmail,
      content,
    })

    return NextResponse.json({ comment: mapWPCommentToBlogComment(comment) }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Comment could not be submitted.'

    if (message.includes('rest_comment_closed')) {
      return NextResponse.json({ error: 'Comments are closed for this post in WordPress.' }, { status: 403 })
    }

    if (message.includes('rest_comment_login_required')) {
      return NextResponse.json(
        {
          error:
            'WordPress requires users to be logged in before they can comment. Disable that setting in WordPress or configure a WordPress application password for comment submissions.',
        },
        { status: 401 }
      )
    }

    return NextResponse.json({ error: message || 'Comment could not be submitted.' }, { status: 500 })
  }
}
