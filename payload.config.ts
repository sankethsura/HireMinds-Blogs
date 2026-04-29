import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

import { Posts } from './collections/Posts'
import { Authors } from './collections/Authors'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— HireMinds Blog',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
  },

  collections: [Posts, Authors, Media, Tags, Users],

  plugins: [
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: `https://s3.${process.env.S3_REGION || 'us-east-1'}.amazonaws.com`,
        forcePathStyle: true,
      },
    }),
  ],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
})
