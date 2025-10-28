import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Публікація',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Картинка',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'direction',
      title: 'Напрямок',
      type: 'string',
      options: {
        list: [
          {title: 'Стоматологія', value: 'dentistry'},
          {title: 'Естетична медицина', value: 'aesthetic'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Основний текст',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [{title: 'Bold', value: 'strong'}],
            annotations: [],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'direction',
    },
    prepare({title, media, subtitle}) {
      return {
        title,
        media,
        subtitle:
          subtitle === 'dentistry'
            ? 'Стоматологія'
            : subtitle === 'aesthetic'
              ? 'Естетична медицина'
              : '',
      }
    },
  },
})
