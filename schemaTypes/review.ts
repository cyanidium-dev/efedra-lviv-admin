import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Відгук',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: "Ім'я автора",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст відгуку',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото автора',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Фото автора відгуку',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Вік',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(120),
    }),
    defineField({
      name: 'order',
      title: 'Порядок відображення',
      type: 'number',
      description: 'Порядок відображення відгуку на сайті (менше число = вище)',
      validation: Rule => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'age',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Без імені',
        subtitle: subtitle ? `${subtitle} років` : '',
      };
    },
  },
  orderings: [
    {
      title: 'Порядок відображення',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Вік (молодші спочатку)',
      name: 'ageAsc',
      by: [{ field: 'age', direction: 'asc' }],
    },
    {
      title: 'Вік (старші спочатку)',
      name: 'ageDesc',
      by: [{ field: 'age', direction: 'desc' }],
    },
    {
      title: "Ім'я (А-Я)",
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
