import { getPayload } from 'payload'
import config from '@payload-config'
import PostGrid from '@/components/blog/PostGrid'
import Sidebar from '@/components/blog/Sidebar'
import { getAllTags } from '@/lib/posts'
import type { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    select: { category: true },
    depth: 0,
    limit: 200,
    draft: false,
  })
  const cats = [...new Set(docs.map((p: any) => p.category).filter(Boolean))]
  return cats.map((c) => ({ category: encodeURIComponent(c as string) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = decodeURIComponent(category)
  return {
    title: `${label} — Blog`,
    description: `Browse HireMinds blog posts in the ${label} category.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: encoded } = await params
  const category = decodeURIComponent(encoded)

  const payload = await getPayload({ config })
  const [postsData, tags] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          { category: { equals: category } },
        ],
      },
      sort: '-publishedAt',
      depth: 2,
      limit: 9,
      draft: false,
    }),
    getAllTags(),
  ])

  const posts = postsData.docs as any[]

  return (
    <main>
      <section className="py-14 px-4" style={{ background: 'var(--brand-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            All posts
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {category}
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
