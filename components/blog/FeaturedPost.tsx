import Image from 'next/image'
import Link from 'next/link'
import TypeBadge from './TypeBadge'
import type { Post } from '@/types/post'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function FeaturedPost({ post }: { post: Post }) {
  const author = typeof post.author === 'object' ? post.author : null
  const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null
  const avatar = author && typeof author.avatar === 'object' ? author.avatar : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-100 bg-white transition-all duration-200 hover:shadow-xl"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Content — left */}
      <div className="flex flex-col justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="flex items-center gap-2 mb-4">
          <TypeBadge type={post.type ?? 'blog'} size="md" />
          {post.category && (
            <span className="text-sm font-semibold" style={{ color: 'var(--brand-secondary)' }}>
              {post.category}
            </span>
          )}
        </div>

        <h2 className="font-bold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
          {post.title}
        </h2>

        <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          {avatar?.url ? (
            <Image src={avatar.url} alt={author?.name ?? ''} width={36} height={36} className="rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
              {author?.name?.[0] ?? 'A'}
            </div>
          )}
          <div>
            {author && <p className="font-medium text-slate-700 text-sm">{author.name}</p>}
            <p className="text-xs">
              {post.publishedAt && formatDate(post.publishedAt)}
              {post.readingTime && ` · ${post.readingTime} min read`}
            </p>
          </div>
        </div>
      </div>

      {/* Image — right */}
      <div className="relative w-full aspect-video lg:aspect-auto min-h-56 order-1 lg:order-2 overflow-hidden bg-slate-100">
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
        )}
      </div>
    </Link>
  )
}
