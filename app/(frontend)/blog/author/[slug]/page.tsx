import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import PostGrid from '@/components/blog/PostGrid'
import { LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'authors',
    select: { slug: true },
    depth: 0,
    limit: 100,
  })
  return docs.filter((a: any) => a.slug).map((a: any) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'authors',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const author = docs[0]
  if (!author) return {}
  return {
    title: `${author.name} — Author`,
    description: (author as any).bio ?? `Articles by ${author.name} on HireMinds Blog.`,
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const [authorResult, postsResult] = await Promise.all([
    payload.find({
      collection: 'authors',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    }),
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 2,
      limit: 20,
      draft: false,
    }),
  ])

  const author = authorResult.docs[0] as any
  if (!author) notFound()

  const avatar = typeof author.avatar === 'object' ? author.avatar : null

  // Filter posts by this author
  const posts = postsResult.docs.filter((p: any) => {
    const a = typeof p.author === 'object' ? p.author : null
    return a?.id === author.id
  }) as any[]

  return (
    <main>
      {/* Author hero */}
      <section className="py-16 px-4" style={{ background: 'var(--brand-primary)' }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          {avatar?.url ? (
            <Image
              src={avatar.url}
              alt={author.name}
              width={112}
              height={112}
              className="rounded-full object-cover border-4 border-white/20 shrink-0"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold text-white shrink-0">
              {author.name[0]}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {author.name}
            </h1>
            {author.role && <p className="text-slate-300 text-sm mb-3">{author.role}</p>}
            {author.bio && <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-xl">{author.bio}</p>}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {author.twitter && (
                <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              <span className="text-sm text-slate-400">{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-bold text-slate-900 text-xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          Articles by {author.name}
        </h2>
        <PostGrid posts={posts} />
      </div>
    </main>
  )
}
