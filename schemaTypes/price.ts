import { defineType, defineField } from 'sanity';

export const priceCategory = defineType({
  name: 'priceCategory',
  title: 'Категорія цін',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва категорії',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorScheme',
      title: 'Кольорова схема',
      type: 'string',
      options: {
        list: [
          { title: 'Зелений', value: 'green' },
          { title: 'Світло-зелений', value: 'light-green' },
          { title: 'Чорний', value: 'black' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subcategories',
      title: 'Підкатегорії',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'subcategory',
          title: 'Підкатегорія',
          fields: [
            defineField({
              name: 'title',
              title: 'Назва підкатегорії',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'services',
              title: 'Послуги',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'priceService',
                  title: 'Послуга',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Назва послуги',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'price',
                      title: 'Ціна',
                      type: 'string',
                      description: 'Наприклад: від 250 або 300-400',
                    }),
                    defineField({
                      name: 'duration',
                      title: 'Тривалість процедури',
                      type: 'string',
                      description: 'Наприклад: 30 хвилин',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
});
