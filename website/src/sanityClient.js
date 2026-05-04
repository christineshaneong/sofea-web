import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'lhe7vych',
  dataset: 'production',
  useCdn: false, // Changed to false to ensure you always see the latest video upload
  apiVersion: '2023-05-03',
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return { url: () => "" };
  return builder.image(source);
};

export default client;