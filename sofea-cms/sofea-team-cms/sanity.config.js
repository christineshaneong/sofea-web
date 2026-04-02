import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'SOFEA MJIIT CMS',

  projectId: 'lhe7vych',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // 1. SITE VISUALS
            S.listItem()
              .title('Site Visuals')
              .id('siteAssets')
              .child(
                S.document()
                  .schemaType('siteAssets')
                  .documentId('siteAssets')
                  .title('Global Site Assets')
              ),
            
            S.divider(),

            // 2. OTHERS (Events, Recruitment, Team)
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteAssets', 'media.tag'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  // This prevents the Studio from trying to use advanced routing 
  // features that clash with custom sidebar structures
  document: {
    productionViews: (prev, { schemaType }) => prev,
  },

  schema: {
    types: schemaTypes,
  },
})