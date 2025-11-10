import { defineType, defineField } from 'sanity';

export const doctor = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Імʼя',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Посада',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядок відображення на сайті',
      type: 'number',
      validation: Rule =>
        Rule.required().min(1).error('Вкажіть порядок від 1 і вище'),
    }),
  ],
});
