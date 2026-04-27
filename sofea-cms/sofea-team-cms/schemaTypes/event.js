export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    // ADD THIS FIELD BELOW
    { 
      name: 'year', 
      title: 'Session Year', 
      type: 'string', 
      description: 'Must match the Archive format (e.g., 2025/2026)',
      validation: Rule => Rule.required() 
    },
    { 
      name: 'category', 
      title: 'Event Category', 
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Competition', value: 'competition' },
          { title: 'Social', value: 'social' },
          { title: 'Meeting', value: 'meeting' },
        ]
      }
    },
    { name: 'mainImage', title: 'Main Event Photo', type: 'image', options: { hotspot: true } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'time', title: 'Time', type: 'string', description: 'e.g., 2:00 PM - 5:00 PM' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'description', title: 'Detailed Description', type: 'text' },
    { name: 'googleFormUrl', title: 'Registration Link (Google Form)', type: 'url' },
  ]
}