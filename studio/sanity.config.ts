import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, sectionTypeNames } from "./schemaTypes";
import { deskStructure } from "./structure/deskStructure";

export default defineConfig({
  name: "default",
  title: "Dubai in Cairo",
  projectId: "nuiw015d",
  dataset: "production",
  plugins: [
    structureTool({ structure: deskStructure(sectionTypeNames) }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  vite: (config) => ({
    ...config,
    server: {
      ...(config.server ?? {}),
      fs: {
        ...(config.server?.fs ?? {}),
        allow: [".", "..", "../src"],
      },
    },
  }),
});
