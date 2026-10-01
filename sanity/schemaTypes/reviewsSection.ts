import {defineArrayMember, defineField, defineType} from 'sanity'

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Reviews Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({name: 'ctaLink', title: 'CTA Link', type: 'string'}),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'review',
          title: 'Review',
          type: 'object',
          fields: [
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              description: 'A whole number from 1 to 5.',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(1).max(5),
            }),
            defineField({
              name: 'text',
              title: 'Review Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
