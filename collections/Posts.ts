import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true, // Public read — blog content is publicly accessible
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'author', 'status', 'publishedAt'],
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

    // ── Type & Category ───────────────────────────────────────────────────
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Blog Post',    value: 'blog'        },
        { label: 'Case Study',   value: 'case-study'  },
        { label: 'Testimonial',  value: 'testimonial' },
        { label: 'Guide',        value: 'guide'       },
        { label: 'News',         value: 'news'        },
        { label: 'Podcast',      value: 'podcast'     },
      ],
      defaultValue: 'blog',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show as featured post on blog listing page.',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'e.g. "AI in Hiring", "Recruiter Tips"',
        position: 'sidebar',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes.',
        position: 'sidebar',
      },
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

    // ── Case Study / Testimonial fields ───────────────────────────────────
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company name (for case studies and testimonials).',
        condition: (data) => ['case-study', 'testimonial'].includes(data?.type),
      },
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo.',
        condition: (data) => ['case-study', 'testimonial'].includes(data?.type),
      },
    },
    {
      name: 'industry',
      type: 'text',
      admin: {
        description: 'Industry vertical (e.g. "SaaS", "Healthcare").',
        condition: (data) => ['case-study', 'testimonial'].includes(data?.type),
      },
    },
    {
      name: 'results',
      type: 'array',
      label: 'Key Results',
      admin: {
        description: 'Stat highlights for case studies.',
        condition: (data) => data?.type === 'case-study',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Star rating 1–5 (for testimonials).',
        condition: (data) => data?.type === 'testimonial',
      },
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
