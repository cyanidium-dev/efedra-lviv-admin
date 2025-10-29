import { defineType, defineField } from 'sanity';

export const doctorOld = defineType({
  name: 'doctorOld',
  title: 'DoctorOld',
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
      name: 'startYear',
      title: 'Рік початку роботи',
      type: 'number',
      validation: Rule =>
        Rule.required()
          .min(1950)
          .max(new Date().getFullYear())
          .error('Вкажіть коректний рік'),
    }),
    defineField({
      name: 'direction',
      title: 'Напрямок',
      type: 'string',
      options: {
        list: [
          { title: 'Стоматологія', value: 'dentistry' },
          { title: 'Естетична медицина', value: 'aesthetic' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
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
