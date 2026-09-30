import {defineArrayMember, defineField, defineType} from 'sanity'

export const talkAboutSection = defineType({
  name: 'talkAboutSection',
  title: 'Talk About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      description: 'Use {{name}} in any paragraph to insert this name automatically.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      description:
        'Each item is displayed as a separate paragraph. Use {{name}} where the person name should appear.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'images',
      title: 'Talk About Slider Images',
      type: 'array',
      description: 'Ordered visual images for the Talk About Slider.',
      of: [
        defineArrayMember({
          name: 'talkAboutImage',
          title: 'Slider Image',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
