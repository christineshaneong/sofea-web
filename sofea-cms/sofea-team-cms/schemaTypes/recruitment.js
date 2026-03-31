export default {
  name: 'recruitment',
  title: 'Open Positions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'e.g., Technical Lead',
    },
    {
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
      description: 'Link to Google Form',
    },
  ],
}