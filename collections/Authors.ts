import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'URL slug e.g. "jane-doe"',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title / role e.g. "Head of Talent"',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'twitter',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
  ],
}
