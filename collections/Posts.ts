import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
  },
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug e.g. "how-ai-is-changing-hiring"',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary shown in blog listings and SEO description.',
      },
    },

    // ── Content ───────────────────────────────────────────────────────────
    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // ── Meta ──────────────────────────────────────────────────────────────
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },

    // ── Publishing ────────────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft',     value: 'draft'     },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },

    // ── SEO ───────────────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Defaults to post title if empty.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: { description: 'Defaults to excerpt if empty.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Defaults to cover image if empty.' },
        },
      ],
    },
  ],
}
