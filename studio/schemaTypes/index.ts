import {
  defineType,
  defineField,
  type FieldDefinition,
  type DocumentDefinition,
} from "sanity";
import {
  contentRegistry,
  sectionLabels,
  sectionOrder,
  type ContentField,
} from "../../src/lib/contentRegistry";

const isLongCopy = (key: string, label: string) =>
  /(_body|_desc|_description|_subtext)/.test(key) ||
  /Description|Body|Subtext/i.test(label);

const isUrlField = (f: ContentField) =>
  f.type === "upload" ||
  /(_url|_og_image)$/.test(f.key) ||
  /og_image/.test(f.key);

const fieldType = (f: ContentField): "string" | "text" | "url" => {
  if (isUrlField(f)) return "url";
  if (isLongCopy(f.key, f.label)) return "text";
  return "string";
};

const buildField = (f: ContentField): FieldDefinition => {
  const t = fieldType(f);
  return defineField({
    name: f.key,
    title: f.label,
    type: t,
    ...(t === "text" ? { rows: 4 } : {}),
  } as FieldDefinition);
};

export const sectionTypeNames: string[] = Array.from(
  new Set(["seo", ...sectionOrder, ...contentRegistry.map((f) => f.section)]),
);

export const schemaTypes: DocumentDefinition[] = sectionTypeNames.map(
  (section) =>
    defineType({
      name: section,
      title: sectionLabels[section] ?? section,
      type: "document",
      // Singleton: editors should never create or delete these — the migration
      // script seeds exactly one document per section type and the desk
      // structure points at fixed IDs.
      __experimental_actions: ["update", "publish"],
      fields: contentRegistry
        .filter((f) => f.section === section)
        .map(buildField),
      preview: {
        prepare: () => ({ title: sectionLabels[section] ?? section }),
      },
    }) as DocumentDefinition,
);
