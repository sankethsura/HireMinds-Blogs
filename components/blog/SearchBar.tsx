'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ placeholder = 'Search articles…' }: { placeholder?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync with URL on mount
  useEffect(() => {
    setValue(searchParams.get('q') ?? '')
  }, [searchParams])

  const pushSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (q.trim()) params.set('q', q.trim())
      else params.delete('q')
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setValue(q)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => pushSearch(q), 300)
  }

  const clear = () => {
    setValue('')
    pushSearch('')
  }

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:border-blue-300 text-slate-900 placeholder:text-slate-400 transition-all"
        style={{ '--tw-ring-color': 'var(--brand-secondary)' } as React.CSSProperties}
      />
      {value && (
        <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
