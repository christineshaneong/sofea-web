export default {
  name: 'teamMember',
  type: 'document',
  title: 'Team Member',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department',
      options: {
        list: [
          {title: 'Management', value: 'management'},
          {title: 'EXCOS', value: 'excos'},
          {title: 'Projects', value: 'projects'},
        ], // You can edit these or remove 'options' to make it a free-text field
      }
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true, // This lets you crop faces perfectly later
      },
    },
  ],
}