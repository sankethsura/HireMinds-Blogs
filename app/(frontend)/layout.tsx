import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'HireMinds Blog — Insights on Hiring & Talent',
    template: '%s | HireMinds Blog',
  },
  description: 'Expert insights on AI hiring, talent acquisition, and the future of work from the HireMinds team.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bricolage.variable} ${dmSans.variable}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
