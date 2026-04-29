export type PostType = 'blog' | 'case-study' | 'testimonial' | 'guide' | 'news' | 'podcast'

export interface MediaObject {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface Author {
  id: string
  name: string
  slug?: string
  role?: string
  bio?: string
  avatar?: MediaObject | string | null
  twitter?: string
  linkedin?: string
}

export interface Tag {
  id: string
  name: string
  slug?: string
}

export interface PostResult {
  label: string
  value: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown>
  type: PostType
  featured?: boolean
  category?: string
  readingTime?: number
  coverImage: MediaObject | string
  author: Author | string
  tags?: (Tag | string)[]
  company?: string
  companyLogo?: MediaObject | string | null
  industry?: string
  results?: PostResult[]
  rating?: number
  status: 'draft' | 'published'
  publishedAt?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: MediaObject | string | null
  }
  createdAt: string
  updatedAt: string
}
