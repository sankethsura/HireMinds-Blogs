import Image from 'next/image'
import Link from 'next/link'
import TypeBadge from './TypeBadge'
import type { Post } from '@/types/post'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function PostCard({ post }: { post: Post }) {
  const author = typeof post.author === 'object' ? post.author : null
  const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null
  const avatar = author && typeof author.avatar === 'object' ? author.avatar : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
        )}
        {/* Type badge overlay */}
        <div className="absolute top-3 left-3">
          <TypeBadge type={post.type ?? 'blog'} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {post.category && (
          <span className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand-secondary)' }}>
            {post.category}
          </span>
        )}

        <h2 className="font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
          {post.title}
        </h2>

        <p className="text-sm text-slate-500 line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Author + meta */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
          {avatar?.url ? (
            <Image
              src={avatar.url}
              alt={author?.name ?? ''}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-bold">
              {author?.name?.[0] ?? 'A'}
            </div>
          )}
          {author && <span className="font-medium text-slate-600">{author.name}</span>}
          <span>·</span>
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
