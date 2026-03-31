import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; 

export const client = createClient({
  projectId: 'lhe7vych',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-31', // Using a stable API version
});

// Use the builder directly from the import
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  // Added a safety check: if no source (image) is provided, return an empty object
  // so the app doesn't crash when trying to call .url()
  if (!source) return { url: () => '' };
  return builder.image(source);
};