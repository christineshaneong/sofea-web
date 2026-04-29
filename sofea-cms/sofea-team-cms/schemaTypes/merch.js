export default {
  name: 'merch',
  title: 'Merchandise',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price (RM)',
      type: 'string',
      description: 'e.g., 50',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'isStocked',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'purchaseLink',
      title: 'Purchase Link (Google Form/WhatsApp)',
      type: 'url',
    }
  ],
}