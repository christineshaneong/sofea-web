import { createClient } from "@sanity/client";

export default createClient({
  projectId: "YOUR_PROJECT_ID_HERE", // Get this from sanity.io/manage
  dataset: "production",
  useCdn: true, // true for fast response
  apiVersion: "2024-03-05", 
});