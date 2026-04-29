'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons'

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : `/blog/${slug}`

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank', 'width=600,height=500',
    )
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank', 'width=600,height=400',
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select input
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Share</span>
      <button
        onClick={shareLinkedIn}
        className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon className="w-4 h-4" />
      </button>
      <button
        onClick={shareTwitter}
        className="p-2 rounded-lg text-slate-500 hover:text-sky-500 hover:bg-sky-50 transition-colors"
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="w-4 h-4" />
      </button>
      <button
        onClick={copyLink}
        className={`p-2 rounded-lg transition-colors ${
          copied ? 'text-emerald-500 bg-emerald-50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
        }`}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
