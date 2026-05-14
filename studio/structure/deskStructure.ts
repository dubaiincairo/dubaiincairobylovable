import type { StructureBuilder } from "sanity/structure";
import { sectionLabels } from "../../src/lib/contentRegistry";

// Each section is a singleton — there's exactly one document of each type in
// the dataset. Instead of pinning to fixed IDs (the MCP-bootstrap step
// generated random UUIDs), we open the document-type list and let editors
// pick the single document. The schemas omit "create" from
// `__experimental_actions`, so no second document can be added by accident.
export const deskStructure =
  (sectionTypeNames: string[]) => (S: StructureBuilder) =>
    S.list()
      .title("Site Content")
      .items(
        sectionTypeNames.map((name) =>
          S.documentTypeListItem(name).title(sectionLabels[name] ?? name),
        ),
      );
