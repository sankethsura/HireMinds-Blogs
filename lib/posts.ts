import { getPayload } from 'payload'
import config from '@payload-config'
import type { Post } from '@/types/post'

async function getPayloadClient() {
  return getPayload({ config })
}

export async function getAllPosts(options?: {
  limit?: number
  page?: number
  sort?: string
}): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: options?.sort ?? '-publishedAt',
    depth: 2,
    limit: options?.limit ?? 9,
    page: options?.page ?? 1,
    draft: false,
  })
  return result as any
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 2,
    limit: 1,
    draft: false,
  })
  return (docs[0] as Post) ?? null
}

export async function getPostsByType(type: string, options?: { limit?: number; page?: number }): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { type: { equals: type } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: options?.limit ?? 9,
    page: options?.page ?? 1,
    draft: false,
  })
  return result as any
}

export async function getPostsByCategory(category: string, options?: { limit?: number; page?: number }): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { category: { equals: category } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: options?.limit ?? 9,
    page: options?.page ?? 1,
    draft: false,
  })
  return result as any
}

export async function getPostsByTag(tagSlug: string, options?: { limit?: number; page?: number }): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> {
  const payload = await getPayloadClient()
  // First find the tag by slug
  const { docs: tags } = await payload.find({
    collection: 'tags',
    where: { slug: { equals: tagSlug } },
    limit: 1,
    depth: 0,
  })
  if (!tags[0]) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }

  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { tags: { in: [tags[0].id] } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: options?.limit ?? 9,
    page: options?.page ?? 1,
    draft: false,
  })
  return result as any
}

export async function getFeaturedPost(): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { featured: { equals: true } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 1,
    draft: false,
  })
  return (docs[0] as Post) ?? null
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const payload = await getPayloadClient()
  const tagIds = Array.isArray(post.tags)
    ? post.tags.filter((t) => typeof t === 'object').map((t: any) => t.id)
    : []

  const conditions: any[] = [
    { status: { equals: 'published' } },
    { slug: { not_equals: post.slug } },
  ]

  if (post.category) {
    conditions.push({ category: { equals: post.category } })
  }

  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: conditions },
    sort: '-publishedAt',
    depth: 2,
    limit,
    draft: false,
  })
  return docs as Post[]
}

export async function getAllCategories(): Promise<string[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    select: { category: true },
    depth: 0,
    limit: 200,
    draft: false,
  })
  const cats = docs
    .map((p: any) => p.category)
    .filter((c: any): c is string => typeof c === 'string' && c.length > 0)
  return [...new Set(cats)]
}

export async function getAllTags(): Promise<Array<{ id: string; name: string; slug?: string }>> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'tags',
    limit: 200,
    depth: 0,
  })
  return docs as any[]
}

export async function getAllAuthors(): Promise<Array<any>> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'authors',
    limit: 100,
    depth: 1,
  })
  return docs
}

export function calcReadingTime(content: Record<string, unknown>): number {
  try {
    const text = JSON.stringify(content)
    const words = text.split(/\s+/).length
    return Math.max(1, Math.round(words / 200))
  } catch {
    return 1
  }
}
