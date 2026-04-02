import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; 

// 1. Create the client
const client = createClient({
  projectId: 'lhe7vych',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-31', 
});

// 2. Setup the image builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return { url: () => '' };
  return builder.image(source);
};

// 3. THE FIX: Export the client as the default
export default client;