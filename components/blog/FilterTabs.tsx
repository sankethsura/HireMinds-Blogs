'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const TABS = [
  { label: 'All',           value: ''            },
  { label: 'Blog',          value: 'blog'        },
  { label: 'Case Studies',  value: 'case-study'  },
  { label: 'Guides',        value: 'guide'       },
  { label: 'Testimonials',  value: 'testimonial' },
  { label: 'News',          value: 'news'        },
  { label: 'Podcast',       value: 'podcast'     },
]

export default function FilterTabs({
  counts = {},
}: {
  counts?: Record<string, number>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('type') ?? ''

  const setType = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set('type', value)
      else params.delete('type')
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {TABS.map(({ label, value }) => {
        const active = current === value
        const count = value ? counts[value] : undefined
        return (
          <button
            key={value}
            onClick={() => setType(value)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              active
                ? 'text-white shadow-sm'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
            style={active ? { background: 'var(--brand-secondary)' } : {}}
          >
            {label}
            {count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
