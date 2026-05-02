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

    // --- MISSION SECTION (DYNAMIC) ---
    {
      name: 'missionVideoUrl',
      title: 'Mission Section Video URL',
      type: 'string', 
      description: 'Paste the Instagram Reel link here (e.g., https://www.instagram.com/reel/...)'
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      description: 'e.g., Our Mission'
    },
    {
      name: 'missionText1',
      title: 'Mission Description Paragraph 1',
      type: 'text',
    },
    {
      name: 'missionText2',
      title: 'Mission Description Paragraph 2',
      type: 'text',
    },

    // --- VALUES SECTION (DYNAMIC) ---
    {
      name: 'valuesTitle',
      title: 'Values Section Title',
      type: 'string',
      initialValue: "SOFEA's Values"
    },
    {
      name: 'sofiaValues',
      title: 'SOFEA Values List',
      type: 'array',
      description: 'Add exactly 3 values for the layout to look best',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Value Title' },
            { name: 'description', type: 'text', title: 'Value Description' }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    },

    // --- FOUNDER SECTION (DYNAMIC) ---
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
    },

    // --- RECRUITMENT SECTION (DYNAMIC) ---
    {
      name: 'recruitmentTitle',
      title: 'Recruitment Section Title',
      type: 'string',
      description: 'e.g., Where are we now?'
    },
    {
      name: 'recruitmentSubtitle',
      title: 'Recruitment Subtitle / Description',
      type: 'text',
    },

    // --- OTHER HEROES & GRAPHICS ---
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