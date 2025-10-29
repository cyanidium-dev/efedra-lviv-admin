import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'serviceOld',
  title: 'ServiceOld',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Категорія послуги',
      type: 'string',
      options: {
        list: [
          { title: 'Стоматологія', value: 'dentistry' },
          { title: 'Естетична медицина', value: 'aesthetic' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Назва послуги',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядок відображення в секції категорії послуг',
      type: 'number',
    }),
    defineField({
      name: 'categoryImage',
      title: 'Картинка послуги для секції категорії послуг',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Головна картинка послуги',
      description:
        'Велике фото, яке відображається на початку сторінки послуги',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Короткий опис',
      description:
        'Короткий опис послуги, який відображається в картці товару на сторінках послуг Стоматологія та Естетична медицина',
      type: 'text',
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

    // Розділ: Опис процедури
    defineField({
      name: 'procedureDescription',
      title: 'Опис процедури',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Короткий опис',
          type: 'text',
          validation: Rule => Rule.required(),
        },
        {
          name: 'images',
          title: 'Три картинки',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          validation: Rule => Rule.min(3).max(3).required(),
        },
        {
          name: 'info',
          title: 'Інформація про процедуру',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.min(1).required(),
        },
      ],
    }),

    // Розділ: Коли рекомендовано
    defineField({
      name: 'recommended',
      title: 'Коли рекомендовано',
      description: 'Заповніть список з чотирьох елементів',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Картинка',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            },
            {
              name: 'text',
              title: 'Короткий рядок',
              type: 'string',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      validation: Rule =>
        Rule.custom((items: any[] | undefined) => {
          if (!items || items.length === 0) {
            return true; // поле необов'язкове
          }
          if (items.length !== 4) {
            return 'Має бути рівно 4 елементи списка';
          }
          return true;
        }),
    }),

    // Розділ: Як проходить процедура
    defineField({
      name: 'howItGoes',
      title: 'Як проходить процедура',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Картинка',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
        },
        {
          name: 'steps',
          title: 'Кроки',
          description: 'Введіть інформацію про три кроки',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Назва',
                  type: 'string',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Короткий опис',
                  type: 'text',
                  validation: Rule => Rule.required(),
                },
              ],
            },
          ],
          validation: Rule => Rule.min(3).max(3).required(),
        },
      ],
    }),

    // Розділ: Переваги
    defineField({
      name: 'advantages',
      title: 'Переваги',
      description: 'Потрібно ввести три переваги',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Іконка',
              type: 'image',
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: 'Назва',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'text',
              title: 'Короткий текст',
              type: 'text',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      validation: Rule =>
        Rule.custom((items: any[] | undefined) => {
          if (!items || items.length === 0) {
            return true; // поле необов'язкове
          }
          if (items.length !== 3) {
            return 'Має бути рівно 3 переваги';
          }
          return true;
        }),
    }),

    // Розділ: Протипоказання
    defineField({
      name: 'contraindications',
      title: 'Протипоказання',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Картинка',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required(),
        },
        {
          name: 'items',
          title: 'Список',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule =>
            Rule.required()
              .min(2)
              .custom((items: string[]) => {
                if (items.length % 2 !== 0) {
                  return 'Кількість елементів має бути парною';
                }
                return true;
              }),
        },
      ],
    }),

    // Розділ: Види
    defineField({
      name: 'types',
      title: 'Види',

      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Заголовок секції',
          description: 'Наприклад - Види аугментації.',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'list',
          title: 'Список видів',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Картинка',
                  type: 'image',
                  options: { hotspot: true },
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Заголовок',
                  type: 'string',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'text',
                  title: 'Короткий текст',
                  type: 'text',
                  validation: Rule => Rule.required(),
                },
                {
                  name: 'details',
                  title: 'Список деталей',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
          validation: Rule => Rule.min(1).required(),
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      const categoryName =
        subtitle === 'dentistry'
          ? 'Стоматологія'
          : subtitle === 'aesthetic'
            ? 'Естетична медицина'
            : 'Без категорії';

      return {
        title,
        subtitle: categoryName,
        media,
      };
    },
  },
});
