import Link from 'next/link'
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from '@/components/icons/SocialIcons'

const footerLinks = {
  Product: [
    { label: 'Features',   href: '/#features' },
    { label: 'Pricing',    href: '/#pricing'  },
    { label: 'Integrations', href: '/#integrations' },
    { label: 'Changelog',  href: '/blog?type=news' },
  ],
  Resources: [
    { label: 'Blog',       href: '/blog'                 },
    { label: 'Guides',     href: '/blog?type=guide'      },
    { label: 'Case Studies', href: '/blog?type=case-study' },
    { label: 'Podcast',    href: '/blog?type=podcast'    },
  ],
  Company: [
    { label: 'About',      href: '/#about'   },
    { label: 'Careers',    href: '/careers'  },
    { label: 'Contact',    href: '/contact'  },
    { label: 'Privacy',    href: '/privacy'  },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-navy)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold" style={{ background: 'var(--brand-secondary)' }}>
                H
              </span>
              HireMinds
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              AI-powered hiring that finds the right people, faster. Built for modern talent teams.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="p-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="p-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">{col}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-slate-300 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} HireMinds, Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span>🍪 We use cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
