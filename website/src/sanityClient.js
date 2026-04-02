import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; 

const client = createClient({
  projectId: 'lhe7vych',
  dataset: 'production',
  useCdn: false, // <--- CHANGE THIS TO FALSE
  apiVersion: '2024-03-31', 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return { url: () => '' };
  return builder.image(source);
};

export default client;