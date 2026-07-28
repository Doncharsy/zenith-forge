import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The URL path: /blog/<slug>. Generate from the title, then edit freely.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on the blog index and used as the default meta description.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Show as the big featured card at the top of the journal.",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        { type: "codeBlock" },
        { type: "youtube" },
        { type: "figure" },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      description: "Overrides the post title in search results and browser tabs (≤60 chars ideal).",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "Overrides the excerpt in search results (≤160 chars ideal).",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(200),
    }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : "no date",
      };
    },
  },
});
