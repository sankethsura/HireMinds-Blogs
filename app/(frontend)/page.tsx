import Link from 'next/link'
import { ArrowRight, Zap, Users, Brain, BarChart2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'var(--brand-primary)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--brand-secondary)' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--brand-accent)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 text-white border border-white/20 bg-white/10">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--brand-accent)' }} />
            AI-Powered Hiring Platform
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Hire the right people,{' '}
            <span style={{ color: 'var(--brand-accent)' }}>10× faster</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10">
            HireMinds uses AI to screen, rank, and match candidates — so your team spends time on the best fits, not the noise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#get-started"
              className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-white rounded-xl transition-all hover:opacity-90 hover:-translate-y-px"
              style={{ background: 'var(--brand-accent)' }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-white rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            Everything your team needs to hire better
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Brain,    title: 'AI Screening',    desc: 'Automatically rank applicants based on skills, experience, and culture fit.' },
              { icon: Users,    title: 'Talent Matching',  desc: 'Surface passive candidates from our network before they even apply.' },
              { icon: BarChart2, title: 'Hiring Analytics', desc: 'Track time-to-hire, pipeline health, and team performance in real time.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl text-white" style={{ background: 'var(--brand-secondary)' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-16 px-4" style={{ background: 'var(--surface-card)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            Latest from the HireMinds Blog
          </h2>
          <p className="text-slate-500 mb-6">Case studies, guides, and insights on the future of hiring.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl transition-all hover:opacity-90"
            style={{ background: 'var(--brand-secondary)' }}
          >
            Explore the Blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
