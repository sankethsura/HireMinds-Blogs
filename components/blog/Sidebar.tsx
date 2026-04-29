import Link from 'next/link'
import { LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import type { Post } from '@/types/post'

function NewsletterWidget() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--brand-primary)' }}>
      <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
        Stay in the loop
      </h3>
      <p className="text-slate-300 text-sm mb-4">Weekly insights on AI hiring delivered to your inbox.</p>
      <form action="/api/newsletter/subscribe" method="POST" className="flex flex-col gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="w-full px-3 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90"
          style={{ background: 'var(--brand-accent)' }}
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

function SocialFollow() {
  return (
    <div className="rounded-2xl border border-slate-100 p-6 bg-white">
      <h3 className="font-bold text-slate-900 text-base mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
        Follow Us
      </h3>
      <div className="flex gap-3">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-white rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#0077b5' }}>
          <LinkedinIcon className="w-4 h-4" />
          LinkedIn
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-white rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#1da1f2' }}>
          <TwitterIcon className="w-4 h-4" />
          Twitter
        </a>
      </div>
    </div>
  )
}

export default function Sidebar({
  tags = [],
  featuredCaseStudy,
}: {
  tags?: Array<{ id: string; name: string; slug?: string }>
  featuredCaseStudy?: Post | null
}) {
  return (
    <aside className="flex flex-col gap-6">
      <NewsletterWidget />

      {/* Tag cloud */}
      {tags.length > 0 && (
        <div className="rounded-2xl border border-slate-100 p-6 bg-white">
          <h3 className="font-bold text-slate-900 text-base mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Popular Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.slug ?? tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-1 text-xs font-medium rounded-full border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors bg-slate-50"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <SocialFollow />
    </aside>
  )
}
