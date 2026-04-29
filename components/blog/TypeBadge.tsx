import { BookOpen, BarChart2, Star, Map, Newspaper, Mic } from 'lucide-react'
import type { PostType } from '@/types/post'

const typeConfig: Record<PostType, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  'blog':        { label: 'Blog',        color: '#2d5be3', bg: '#eff4ff', Icon: BookOpen   },
  'case-study':  { label: 'Case Study',  color: '#0891b2', bg: '#ecfeff', Icon: BarChart2  },
  'testimonial': { label: 'Testimonial', color: '#7c3aed', bg: '#f5f3ff', Icon: Star       },
  'guide':       { label: 'Guide',       color: '#059669', bg: '#ecfdf5', Icon: Map        },
  'news':        { label: 'News',        color: '#b45309', bg: '#fffbeb', Icon: Newspaper  },
  'podcast':     { label: 'Podcast',     color: '#db2777', bg: '#fdf2f8', Icon: Mic        },
}

export default function TypeBadge({ type, size = 'sm' }: { type: PostType; size?: 'sm' | 'md' }) {
  const cfg = typeConfig[type] ?? typeConfig['blog']
  const { label, color, bg, Icon } = cfg

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${
        size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'
      }`}
      style={{ color, background: bg }}
    >
      <Icon className={size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3'} />
      {label}
    </span>
  )
}
