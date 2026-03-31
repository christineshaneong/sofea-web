import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sofea-team-cms',
  projectId: 'lhe7vych',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // 1. SITE VISUALS (The single page for Slideshow/Backgrounds)
            S.listItem()
              .title('Site Visuals')
              .id('siteAssets')
              .child(
                S.document()
                  .schemaType('siteAssets')
                  .documentId('siteAssets')
              ),
            
            S.divider(),

            // 2. ALL OTHER DOCUMENTS (Team Members & Open Positions)
            // This filter automatically shows everything registered in schemaTypes/index.js
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteAssets', 'media.tag'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})