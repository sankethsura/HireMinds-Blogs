import PostCard from './PostCard'
import type { Post } from '@/types/post'

export default function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <p className="text-slate-400 text-lg">No posts found.</p>
        <p className="text-slate-300 text-sm mt-1">Try a different filter or search term.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
