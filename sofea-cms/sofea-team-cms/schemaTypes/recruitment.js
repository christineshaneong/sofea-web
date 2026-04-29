export default {
  name: 'recruitment',
  title: 'Recruitment Settings',
  type: 'document',
  fields: [
    {
      name: 'applicationLink',
      title: 'Global Application Link',
      type: 'url',
      description: 'The Google Form link for the "Apply as Committee Now" button',
    },
    {
      name: 'isLive',
      title: 'Is Recruitment Live?',
      type: 'boolean',
      description: 'Toggle this off to hide the button or show a "Closed" message',
      initialValue: true,
    },
  ],
}