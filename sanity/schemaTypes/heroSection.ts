import {defineArrayMember, defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'brandLogo',
      title: 'Brand Logo',
      type: 'image',
      options: {hotspot: false},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'benefit',
          title: 'Benefit',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {hotspot: false},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
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
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Slider Images',
      description: 'Ordered images displayed in the Hero carousel.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'heroSlide',
          title: 'Hero Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
  ],
})
