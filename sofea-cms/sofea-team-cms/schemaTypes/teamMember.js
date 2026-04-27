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
      name: 'roleOrder',
      title: 'Priority Order',
      type: 'number',
      description: 'Use 1 for President, 2 for VP, etc. (Lower numbers show first)',
      validation: Rule => Rule.required()
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
        ],
      }
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'year',
      title: 'Session Year',
      type: 'string',
      description: 'Type the session (e.g., 2025/2026). The website will update automatically!',
      validation: Rule => Rule.required().regex(/^\d{4}\/\d{4}$/, {
        name: 'session format',
        invert: false,
      }).error('Please use the format YYYY/YYYY (e.g. 2025/2026)')
    }
  ],
}