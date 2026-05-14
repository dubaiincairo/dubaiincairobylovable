/**
 * One-shot migration: Supabase `site_content` → Sanity singletons.
 *
 * Reads every row from the legacy table, groups keys by section using
 * `src/lib/contentRegistry.ts`, and writes one Sanity document per section.
 * Idempotent — for each section type the script finds the existing doc (if
 * any), reuses its _id, and calls createOrReplace so re-runs never duplicate.
 *
 * Usage (from repo root):
 *   SANITY_WRITE_TOKEN=<editor-token> npm run migrate:cms
 *
 * Generate the token in https://www.sanity.io/manage → API → Tokens (Editor
 * scope). Never commit it.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { contentRegistry } from "../src/lib/contentRegistry";
import { SECTION_TYPES } from "../src/integrations/sanity/sections";

const SUPABASE_URL = "https://tblfnxaedhmwydjqngnb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibGZueGFlZGhtd3lkanFuZ25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMTYzNjMsImV4cCI6MjA5MjY5MjM2M30.MjXLYqzgqCmZqOrT4_Per3-P9tGjGIqfVM2zFtjJMYA";

const SANITY_PROJECT_ID = "nuiw015d";
const SANITY_DATASET = "production";

async function main() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    console.error(
      "Missing SANITY_WRITE_TOKEN. Generate one at https://www.sanity.io/manage → API → Tokens (Editor scope).",
    );
    process.exit(1);
  }

  const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const sanity = createSanityClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: "2026-05-14",
    token,
    useCdn: false,
  });

  console.log("Fetching site_content from Supabase…");
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value, section");
  if (error) throw error;
  const supabaseMap: Record<string, string> = {};
  for (const row of data ?? []) supabaseMap[row.key] = row.value ?? "";
  console.log(`  ${Object.keys(supabaseMap).length} rows fetched`);

  console.log("Looking up existing Sanity singletons by _type…");
  const existing = await sanity.fetch<{ _id: string; _type: string }[]>(
    `*[_type in $types]{ _id, _type }`,
    { types: SECTION_TYPES },
  );
  const idByType = new Map<string, string>();
  for (const row of existing) {
    // Prefer published IDs over draft IDs when both exist for a type.
    const existingId = idByType.get(row._type);
    if (!existingId || existingId.startsWith("drafts.")) {
      idByType.set(row._type, row._id);
    }
  }

  let fieldCount = 0;
  const transaction = sanity.transaction();
  for (const section of SECTION_TYPES) {
    const fields = contentRegistry.filter((f) => f.section === section);
    if (fields.length === 0) continue;

    const doc: Record<string, string> = {};
    for (const f of fields) {
      const v = supabaseMap[f.key];
      doc[f.key] = v ?? f.defaultValue ?? "";
      fieldCount++;
    }

    const id = idByType.get(section) ?? randomUUID();
    transaction.createOrReplace({
      _id: id,
      _type: section,
      ...doc,
    });
    console.log(
      `  ${section}: ${fields.length} fields → ${id}${
        idByType.has(section) ? " (replacing existing)" : " (creating new)"
      }`,
    );
  }

  console.log("Committing transaction to Sanity…");
  const result = await transaction.commit();
  console.log(
    `Migrated ${
      SECTION_TYPES.filter((s) => contentRegistry.some((f) => f.section === s))
        .length
    } sections, ${fieldCount} fields. ${result.results.length} mutations applied.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
