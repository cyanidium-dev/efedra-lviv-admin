import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва послуги',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categoryImage',
      title: 'Картинка послуги для секції категорії послуг',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Унікальна частина посилання, формується на основі назви послуги',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'categoryImage',
    },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
