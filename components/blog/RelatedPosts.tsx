import PostCard from './PostCard'
import type { Post } from '@/types/post'

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="font-bold text-slate-900 text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
