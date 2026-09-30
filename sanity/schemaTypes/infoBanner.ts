import {defineArrayMember, defineField, defineType} from 'sanity'

export const infoBanner = defineType({
  name: 'infoBanner',
  title: 'Info Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Information Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'infoBannerItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {hotspot: false},
              fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
