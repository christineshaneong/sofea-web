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
      description: 'Add images for: about, team, archive, shop, recruitment, sponsor, contact',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'label', 
              title: 'Menu Item Name (Exact ID)', 
              type: 'string',
              description: 'Must match the ID in code (e.g., "shop", "archive")'
            },
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
    /* Added Shop Hero Field */
    {
      name: 'shopHero',
      title: 'The Shop: Hero Background',
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
    },
    {
      name: 'timelineImage',
      type: 'image',
      title: 'Annual Timeline Graphic',
      options: { hotspot: true }
    },
    {
      name: 'roadmapTitle',
      type: 'string',
      title: 'Roadmap Section Subtitle',
      description: 'e.g., The SOFEA Journey • 2025/2026'
    },
    {
      name: 'sponsors',
      type: 'array',
      title: 'Sponsor Logos',
      of: [{ type: 'image' }]
    },
    {
      name: 'collaborators',
      type: 'array',
      title: 'Collaborator Logos',
      of: [{ type: 'image' }]
    }
  ]
}