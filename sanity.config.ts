"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./lib/sanity/client";

/** Posts sorted newest first, categories underneath — friendlier than the default A-Z schema list. */
const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .child(
          S.documentTypeList("post")
            .title("Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Categories")
        .child(S.documentTypeList("category").title("Categories")),
    ]);

export default defineConfig({
  name: "zenith-forge",
  title: "Zenith Forge",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
