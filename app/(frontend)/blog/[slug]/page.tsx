import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    select: { slug: true },
    depth: 0,
  })
  return docs.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  const post = docs[0]
  if (!post) return {}

  const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      images: post.seo?.ogImage
        ? [{ url: (post.seo.ogImage as any).url }]
        : coverImage?.url
          ? [{ url: coverImage.url }]
          : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

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

  const post = docs[0]
  if (!post) notFound()

  const author = typeof post.author === 'object' ? post.author : null
  const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null
  const tags = Array.isArray(post.tags) ? post.tags.filter((t) => typeof t === 'object') : []

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Back */}
      <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-8 inline-block">
        ← All posts
      </Link>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag: any) => (
            <span
              key={tag.id}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-8 text-sm text-zinc-500">
        {author && (
          <>
            {typeof author.avatar === 'object' && author.avatar?.url && (
              <Image
                src={author.avatar.url}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
            <span className="font-medium text-zinc-700">{author.name}</span>
            <span>·</span>
          </>
        )}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        )}
      </div>

      {/* Cover image */}
      {coverImage?.url && (
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 bg-zinc-100">
          <Image
            src={coverImage.url}
            alt={coverImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Rich text content */}
      <article className="prose prose-zinc max-w-none">
        <RichText data={post.content} />
      </article>
    </main>
  )
}
