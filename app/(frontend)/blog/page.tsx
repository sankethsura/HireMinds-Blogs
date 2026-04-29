import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAllPosts, getPostsByType, getFeaturedPost, getAllTags } from '@/lib/posts'
import FeaturedPost from '@/components/blog/FeaturedPost'
import PostGrid from '@/components/blog/PostGrid'
import FilterTabs from '@/components/blog/FilterTabs'
import SearchBar from '@/components/blog/SearchBar'
import Sidebar from '@/components/blog/Sidebar'
import type { Post } from '@/types/post'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Insights on AI hiring, talent acquisition, and the future of work.',
}

const PAGE_SIZE = 9

type SearchParams = { type?: string; q?: string; page?: string }

async function getFilteredPosts(searchParams: SearchParams): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> {
  const type = searchParams.type ?? ''
  const q = searchParams.q ?? ''
  const page = parseInt(searchParams.page ?? '1', 10)

  const payload = await getPayload({ config })

  const where: any = { and: [{ status: { equals: 'published' } }] }
  if (type) where.and.push({ type: { equals: type } })
  if (q) where.and.push({ title: { like: q } })

  const result = await payload.find({
    collection: 'posts',
    where,
    sort: '-publishedAt',
    depth: 2,
    limit: PAGE_SIZE,
    page,
    draft: false,
  })
  return result as any
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { type, q, page: pageStr } = params
  const page = parseInt(pageStr ?? '1', 10)
  const showFeatured = !type && !q && page === 1

  const [postsData, featuredPost, tags] = await Promise.all([
    getFilteredPosts(params),
    showFeatured ? getFeaturedPost() : Promise.resolve(null),
    getAllTags(),
  ])

  const { docs: posts, totalPages, totalDocs } = postsData

  // Filter featured post out of grid if showing separately
  const gridPosts = showFeatured && featuredPost
    ? posts.filter((p) => p.id !== featuredPost.id)
    : posts

  return (
    <main>
      {/* Hero */}
      <section className="py-16 px-4 text-center" style={{ background: 'var(--brand-primary)' }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            HireMinds Blog
          </h1>
          <p className="text-slate-300 mb-8">
            Insights on AI hiring, talent acquisition, and the future of work.
          </p>
          <Suspense>
            <SearchBar placeholder="Search articles, guides, case studies…" />
          </Suspense>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="mb-8">
          <Suspense>
            <FilterTabs />
          </Suspense>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Featured post */}
            {showFeatured && featuredPost && (
              <div className="mb-12">
                <FeaturedPost post={featuredPost} />
              </div>
            )}

            {/* Post grid */}
            <PostGrid posts={gridPosts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/blog?${new URLSearchParams({ ...(type ? { type } : {}), ...(q ? { q } : {}), page: String(page - 1) }).toString()}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Link>
                )}
                <span className="text-sm text-slate-500">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/blog?${new URLSearchParams({ ...(type ? { type } : {}), ...(q ? { q } : {}), page: String(page + 1) }).toString()}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <Sidebar tags={tags} />
          </div>
        </div>
      </div>
    </main>
  )
}
