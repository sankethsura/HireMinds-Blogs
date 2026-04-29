import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 60

export default async function BlogListingPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    draft: false,
  })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">HireMinds Blog</h1>
      <p className="text-zinc-500 mb-12">Insights on hiring, talent, and the future of work.</p>

      {posts.length === 0 && (
        <p className="text-zinc-400">No posts published yet.</p>
      )}

      <div className="flex flex-col gap-12">
        {posts.map((post) => {
          const author = typeof post.author === 'object' ? post.author : null
          const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null
          const tags = Array.isArray(post.tags)
            ? post.tags.filter((t) => typeof t === 'object')
            : []

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row gap-6 hover:opacity-90 transition-opacity"
            >
              {coverImage?.url && (
                <div className="relative w-full sm:w-56 h-48 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                  <Image
                    src={coverImage.url}
                    alt={coverImage.alt || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>
              )}

              <div className="flex flex-col justify-center gap-2">
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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

                <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-zinc-500 text-sm line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                  {author && (
                    <>
                      {typeof author.avatar === 'object' && author.avatar?.url && (
                        <Image
                          src={author.avatar.url}
                          alt={author.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      )}
                      <span>{author.name}</span>
                      <span>·</span>
                    </>
                  )}
                  {post.publishedAt && (
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
