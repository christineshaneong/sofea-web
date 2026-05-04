export default {
  name: 'news',
  title: 'SOFEA News',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'mainImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string', title: 'Caption' }] }
      ],
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
    name: 'author',
    title: 'Author',
    type: 'string', // or 'text' if you want a larger input box
    },
  ],
};