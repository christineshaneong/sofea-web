export default {
  name: 'socialPost',
  title: 'Social Media Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Give this a name like "IG Post 1" (won\'t show on website)'
    },
    {
      name: 'postImage',
      title: 'Post Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Post Link',
      type: 'url',
      description: 'The link to your Instagram or LinkedIn post'
    },
  ],
}