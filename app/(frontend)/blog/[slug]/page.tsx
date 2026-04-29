import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import TypeBadge from '@/components/blog/TypeBadge'
import AuthorCard from '@/components/blog/AuthorCard'
import RelatedPosts from '@/components/blog/RelatedPosts'
import ShareButtons from '@/components/blog/ShareButtons'
import CTABanner from '@/components/blog/CTABanner'
import ReadingProgress from '@/components/blog/ReadingProgress'
import { getRelatedPosts, calcReadingTime } from '@/lib/posts'
import { ChevronRight, Star } from 'lucide-react'

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
  const author = typeof post.author === 'object' ? post.author : null
  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt
  const ogUrl = (post.seo?.ogImage as any)?.url ?? coverImage?.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      authors: author ? [author.name] : undefined,
      images: ogUrl ? [{ url: ogUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogUrl ? [ogUrl] : [],
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
  const avatar = author && typeof (author as any).avatar === 'object' ? (author as any).avatar : null
  const tags = Array.isArray(post.tags) ? post.tags.filter((t) => typeof t === 'object') : []
  const readingTime = post.readingTime ?? calcReadingTime(post.content)

  const relatedPosts = await getRelatedPosts(post as any, 3)

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: author ? { '@type': 'Person', name: author.name } : undefined,
    image: coverImage?.url ? [coverImage.url] : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'HireMinds',
      logo: { '@type': 'ImageObject', url: '/logo.png' },
    },
  }

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover hero */}
      <section className="relative w-full h-72 sm:h-96 overflow-hidden bg-slate-900">
        {coverImage?.url && (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || post.title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            {post.category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/blog/category/${encodeURIComponent(post.category)}`} className="hover:text-white transition-colors capitalize">
                  {post.category}
                </Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <TypeBadge type={(post.type as any) ?? 'blog'} size="md" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Author + meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 max-w-4xl">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            {avatar?.url ? (
              <Image src={avatar.url} alt={author?.name ?? ''} width={36} height={36} className="rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                {author?.name?.[0] ?? 'A'}
              </div>
            )}
            {author && <span className="font-medium text-slate-700">{author.name}</span>}
            {post.publishedAt && (
              <>
                <span>·</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </>
            )}
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Case Study results */}
        {post.type === 'case-study' && Array.isArray((post as any).results) && (post as any).results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl border border-slate-100 bg-slate-50">
            {(post as any).results.map((r: any, i: number) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--brand-secondary)', fontFamily: 'var(--font-heading)' }}>{r.value}</p>
                <p className="text-xs text-slate-500 mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial rating */}
        {post.type === 'testimonial' && (post as any).rating && (
          <div className="flex items-center gap-1 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5"
                fill={i < (post as any).rating ? 'currentColor' : 'none'}
                style={{ color: i < (post as any).rating ? '#f59e0b' : '#cbd5e1' }}
              />
            ))}
          </div>
        )}

        {/* 2-col layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-a:text-blue-600">
              <RichText data={post.content} />
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
                {tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/blog/tag/${tag.slug ?? tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors bg-slate-50"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Share bar */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <span className="text-sm text-slate-400">Found this useful? Share it.</span>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Author card */}
            {author && (
              <div className="mt-10">
                <AuthorCard author={author as any} />
              </div>
            )}
          </article>

          {/* Sticky sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Mini TOC placeholder */}
              <div className="rounded-2xl border border-slate-100 p-5 bg-white">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">In this article</h3>
                <p className="text-sm text-slate-400 italic">Table of contents will appear here once headings are detected.</p>
              </div>

              {/* Newsletter mini */}
              <div className="rounded-2xl p-5" style={{ background: 'var(--brand-primary)' }}>
                <p className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Weekly hiring insights</p>
                <p className="text-slate-300 text-xs mb-3">Join 5,000+ talent leaders.</p>
                <form action="/api/newsletter/subscribe" method="POST" className="flex flex-col gap-2">
                  <input type="email" name="email" required placeholder="you@company.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none" />
                  <button type="submit" className="py-2 text-xs font-semibold text-white rounded-lg" style={{ background: 'var(--brand-accent)' }}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}

        {/* CTA banner */}
        <CTABanner />
      </div>
    </>
  )
}
