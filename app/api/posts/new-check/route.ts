import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600 // 1 hour

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { totalDocs } = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          { publishedAt: { greater_than: sevenDaysAgo } },
        ],
      },
      limit: 1,
      depth: 0,
    })

    return NextResponse.json({ hasNew: totalDocs > 0 })
  } catch {
    return NextResponse.json({ hasNew: false })
  }
}
