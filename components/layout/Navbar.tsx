'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'Features', href: '/#features' },
  { label: 'Blog',     href: '/blog'     },
  { label: 'Pricing',  href: '/#pricing'  },
  { label: 'About',    href: '/#about'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hasNewPosts, setHasNewPosts] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Check for new posts (last 7 days) — fetch from API
  useEffect(() => {
    fetch('/api/posts/new-check')
      .then((r) => r.json())
      .then((d) => setHasNewPosts(!!d?.hasNew))
      .catch(() => {})
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href.split('#')[0])
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-primary)' }}>
              <span className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold" style={{ background: 'var(--brand-secondary)' }}>
                H
              </span>
              HireMinds
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive(href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {label}
                  {label === 'Blog' && hasNewPosts && (
                    <span className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full text-white" style={{ background: 'var(--brand-accent)' }}>
                      New
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/#get-started"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-150 hover:opacity-90 hover:-translate-y-px"
                style={{ background: 'var(--brand-secondary)' }}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col p-6 gap-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-primary)' }}>Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive(href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
                {label === 'Blog' && hasNewPosts && (
                  <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full text-white" style={{ background: 'var(--brand-accent)' }}>
                    New
                  </span>
                )}
              </Link>
            ))}
            <div className="mt-auto pt-4 border-t border-slate-100">
              <Link
                href="/#get-started"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white rounded-xl"
                style={{ background: 'var(--brand-secondary)' }}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
