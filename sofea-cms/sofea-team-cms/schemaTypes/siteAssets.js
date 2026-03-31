export default {
  name: 'siteAssets',
  title: 'Site Visuals',
  type: 'document',
  fields: [
    {
      name: 'homeSlideshow',
      title: 'Home Page Slideshow',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'accordionBackgrounds',
      title: 'Menu Accordion Backgrounds',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Menu Item Name (e.g., about)', type: 'string' },
            { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    },
    {
      name: 'aboutHero',
      title: 'About Us: Hero Background',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'missionImage',
      title: 'About Us: Our Mission Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'teamHero',
      title: 'Meet The Team: Hero Background',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'recruitmentHero',
      title: 'Recruitment: Hero Background',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'sponsorHero',
      title: 'Sponsor Us: Hero Background',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}