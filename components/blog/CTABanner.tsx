import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="rounded-3xl overflow-hidden mt-16 relative" style={{ background: 'var(--brand-primary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: 'var(--brand-secondary)' }} />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-10" style={{ background: 'var(--brand-accent)' }} />
      </div>

      <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5" style={{ color: 'var(--brand-accent)' }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--brand-accent)' }}>
              Try HireMinds Free
            </span>
          </div>
          <h2 className="font-bold text-white text-2xl md:text-3xl leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Hire smarter with AI-powered talent intelligence
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl">
            Join thousands of hiring teams using HireMinds to find better candidates, faster.
            No credit card required.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/#get-started"
            className="flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all hover:opacity-90 hover:-translate-y-px text-white"
            style={{ background: 'var(--brand-accent)' }}
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#demo"
            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Watch demo
          </Link>
        </div>
      </div>
    </section>
  )
}
