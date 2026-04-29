import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Use this import style

const client = createClient({
  projectId: 'lhe7vych',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Use the builder like this to avoid the warning
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;