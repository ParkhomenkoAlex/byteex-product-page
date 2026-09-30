import {defineArrayMember, defineField, defineType} from 'sanity'

export const finalCta = defineType({
  name: 'finalCta',
  title: 'Final CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'ctaLink', title: 'CTA Link', type: 'string'}),
    defineField({
      name: 'shippingIcon',
      title: 'Shipping Icon',
      type: 'image',
      options: {hotspot: false},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
    }),
    defineField({
      name: 'shippingText',
      title: 'Shipping Text',
      type: 'string',
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      description: 'Drag to reorder the payment method logos.',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: 'bottomItems',
      title: 'Service Information Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'footerItem',
          title: 'Information Item',
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
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'slides',
      title: 'Slider Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'finalCtaSlide',
          title: 'Slider Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'alt', title: 'Alternative Text', type: 'string'}),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
  ],
})
