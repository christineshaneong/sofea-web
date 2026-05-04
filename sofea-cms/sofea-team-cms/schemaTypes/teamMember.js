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
      description: 'e.g., Club Advisor, President, EXCO Multimedia'
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Bio / Description',
      rows: 3
    },
    {
      name: 'departments', // Changed to plural
      type: 'array',
      title: 'Departments / Filters',
      description: 'Select all that apply. Members will show up in every filter selected here.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Club Advisor', value: 'Club Advisor' },
          { title: 'High Committees', value: 'High Committees' },
          { title: 'Project Committees', value: 'Project Committees' },
          { title: 'Propaganda and Student Enlightment', value: 'Propaganda and Student Enlightment' },
          { title: 'Internal Affairs Division', value: 'Internal Affairs Division' },
          { title: 'Finance & Entrepreneur Division', value: 'Finance & Entrepreneur Division' },
          { title: 'Logistics & Operations Division', value: 'Logistics & Operations Division' },
          { title: 'Sports & Games Division', value: 'Sports & Games Division' },
        ],
      },
      validation: Rule => Rule.required().min(1)
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