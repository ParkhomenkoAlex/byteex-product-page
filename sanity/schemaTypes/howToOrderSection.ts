import {defineArrayMember, defineField, defineType} from 'sanity'

export const howToOrderSection = defineType({
  name: 'howToOrderSection',
  title: 'How to Order',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'How to Order Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'howToOrderCard',
          title: 'Card',
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
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'ctaLink', title: 'CTA Link', type: 'string'}),
  ],
})
