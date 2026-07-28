import { defineField, defineType } from "sanity";

/**
 * Image referenced by URL (public path or remote). Kept so the built-in
 * fallback articles validate when seeded. In Studio you will normally use the
 * native image block instead, which uploads and serves via the Sanity CDN.
 */
export const figureType = defineType({
  name: "figure",
  title: "Image by URL",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Image URL",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "caption", subtitle: "url" },
  },
});
