import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostGrid from '@/components/blog/PostGrid'
import Sidebar from '@/components/blog/Sidebar'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const revalidate = 60

type Props = { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((t) => ({ tag: t.slug ?? t.name.toLowerCase().replace(/\s+/g, '-') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `#${tag} — Blog`,
    description: `Browse HireMinds posts tagged with ${tag}.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const [postsData, tags] = await Promise.all([
    getPostsByTag(tag),
    getAllTags(),
  ])
  const posts = postsData.docs

  return (
    <main>
      <section className="py-14 px-4" style={{ background: 'var(--brand-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            All posts
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            #{tag}
          </h1>
          <p className="text-slate-300 mt-2">{postsData.totalDocs} article{postsData.totalDocs !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <PostGrid posts={posts} />
        </div>
        <div className="lg:w-80 shrink-0">
          <Sidebar tags={tags} />
        </div>
      </div>
    </main>
  )
}
