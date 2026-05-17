import { contentRegistry, sectionOrder } from "@/lib/contentRegistry";

// Every section that exists as a Sanity singleton document. Shared by the
// runtime hook (for the GROQ query) and the migration script (for grouping
// keys when seeding).
export const SECTION_TYPES: string[] = Array.from(
  new Set(["seo", ...sectionOrder, ...contentRegistry.map((f) => f.section)]),
);
