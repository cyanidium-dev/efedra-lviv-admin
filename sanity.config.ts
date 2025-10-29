import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Clinic Admin Test',

  projectId: '8k581woh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Лікарі')
              .child(
                S.documentList().title('Лікарі').filter('_type == "doctor"')
              ),
            S.listItem()
              .title('Блог')
              .child(
                S.documentList().title('Статті блогу').filter('_type == "post"')
              ),
            S.listItem()
              .title('Послуги')
              .child(
                S.documentList().title('Послуги').filter('_type == "service"')
              ),
            S.listItem()
              .title('Каталог цін')
              .child(
                S.documentList()
                  .title('Ціни')
                  .filter('_type == "priceCategory"')
              ),
            S.listItem()
              .title('Послуги (стара версія)')
              .child(
                S.documentList()
                  .title('Послуги (стара версія)')
                  .filter('_type == "serviceOld"')
              ),
            S.listItem()
              .title('Лікарі (стара версія)')
              .child(
                S.documentList()
                  .title('Лікарі (стара версія)')
                  .filter('_type == "doctorOld"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
