export default {
  name: 'siteAssets',
  title: 'Site Visuals & Content',
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
            { name: 'label', title: 'Menu ID', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
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
      name: 'missionVideoFile',
      title: 'Mission Section Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'Upload the vertical Reel MP4 here.'
    },
    // --- 24/25 RECAP FIELDS ---
    {
      name: 'recapVideoFile',
      title: '24/25 Recap Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'Upload the 16:9 Landscape Season Recap MP4 here.'
    },
    {
      name: 'recapText',
      title: '24/25 Recap Description',
      type: 'text',
      description: 'Description text that appears next to the recap video.'
    },
    // ---------------------------
    {
      name: 'founderImage',
      title: 'Founder: Dr. Halinawati Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'founderText',
      title: 'Founder Description',
      type: 'text',
      description: 'The quote or bio from the founder.'
    },
    {
      name: 'teamHero',
      title: 'Meet The Team: Hero Background',
      type: 'image',
      options: { hotspot: true }
    },
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
      title: 'Roadmap Subtitle',
      initialValue: "The SOFEA Journey • 2025/2026"
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