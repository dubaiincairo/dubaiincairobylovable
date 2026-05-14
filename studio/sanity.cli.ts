import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "nuiw015d",
    dataset: "production",
  },
  studioHost: "dubaiincairo",
  autoUpdates: true,
});
