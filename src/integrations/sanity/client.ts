import { createClient } from "@sanity/client";

// Public project ID and dataset — same pattern as the existing Supabase
// client (anon key is also public). No env vars needed for runtime reads.
export const sanity = createClient({
  projectId: "nuiw015d",
  dataset: "production",
  apiVersion: "2026-05-14",
  useCdn: true,
  perspective: "published",
});
