import {defineArrayMember, defineField, defineType} from 'sanity'

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Alternative Text',
    type: 'string',
  }),
]

export const topBenefits = defineType({
  name: 'topBenefits',
  title: 'Top Benefits',
  type: 'document',
  fields: [
    defineField({
      name: 'asSeenInText',
      title: 'Logo Slider Label',
      type: 'string',
      description: 'Text displayed above the company logos, for example “AS SEEN IN”.',
    }),
    defineField({
      name: 'companyLogos',
      title: 'Company Logos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'companyLogo',
          title: 'Company Logo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: {hotspot: false},
              fields: imageFields,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
              fields: imageFields,
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
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
      name: 'slides',
      title: 'Image Slider',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'topBenefitsSlide',
          title: 'Image Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: imageFields,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Image Name',
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
