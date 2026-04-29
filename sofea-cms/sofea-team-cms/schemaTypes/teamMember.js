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
      description: 'e.g., President, EXCO Multimedia, etc. (Must match the list in the code for sorting)'
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Bio / Description',
      description: 'This text appears on the back of the player card.',
      rows: 3
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department',
      options: {
        list: [
          { title: 'Project Committee', value: 'Project Committee' },
          { title: 'Propaganda and Student Enlightment', value: 'Propaganda and Student Enlightment' },
          { title: 'Internal Affairs Division', value: 'Internal Affairs Division' },
          { title: 'Finance & Entrepreneur Division', value: 'Finance & Entrepreneur Division' },
          { title: 'Logistics & Operations Division', value: 'Logistics & Operations Division' },
          { title: 'Sports & Games Division', value: 'Sports & Games Division' },
        ],
      }
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    },
    {
      name: 'year',
      title: 'Session Year',
      type: 'string',
      placeholder: '2025/2026',
      validation: Rule => Rule.required()
    }
  ],
}