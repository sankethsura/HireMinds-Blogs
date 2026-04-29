import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'HireMinds Blog CMS',
  description: 'HireMinds Blog Content Management System',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
