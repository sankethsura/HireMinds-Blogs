import Image from 'next/image'
import Link from 'next/link'
import { LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import type { Author } from '@/types/post'

export default function AuthorCard({ author }: { author: Author }) {
  const avatar = typeof author.avatar === 'object' ? author.avatar : null

  return (
    <div className="rounded-2xl border border-slate-100 p-6 bg-white flex flex-col sm:flex-row gap-5">
      {avatar?.url ? (
        <Image
          src={avatar.url}
          alt={author.name}
          width={80}
          height={80}
          className="rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500 shrink-0">
          {author.name[0]}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {author.slug ? (
            <Link href={`/blog/author/${author.slug}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              {author.name}
            </Link>
          ) : (
            <span className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{author.name}</span>
          )}
          {author.role && (
            <span className="text-sm text-slate-400">· {author.role}</span>
          )}
        </div>
        {author.bio && <p className="text-sm text-slate-500 leading-relaxed mb-3">{author.bio}</p>}
        <div className="flex items-center gap-2">
          {author.linkedin && (
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {author.twitter && (
            <a href={author.twitter} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-colors">
              <TwitterIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
