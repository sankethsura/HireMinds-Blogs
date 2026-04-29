'use client'

// Note: Lexical richText doesn't expose headings server-side without custom parsing.
// This component is a placeholder that can be hydrated when heading data is passed explicitly.

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export default function TableOfContents({ items = [] }: { items?: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <nav className="rounded-2xl border border-slate-100 p-5 bg-white sticky top-24">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
        On this page
      </h3>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors line-clamp-2"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
