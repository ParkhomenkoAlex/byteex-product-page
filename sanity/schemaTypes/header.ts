import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'desktopText',
      title: 'Desktop Text',
      type: 'string',
    }),
    defineField({
      name: 'mobileText',
      title: 'Mobile Text',
      type: 'string',
    }),
  ],
})
