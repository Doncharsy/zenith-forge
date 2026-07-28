import { defineField, defineType } from "sanity";

/** Minimal code block (language + text) — avoids the @sanity/code-input peer-dependency matrix. */
export const codeType = defineType({
  name: "codeBlock",
  title: "Code block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "bash",
      options: {
        list: [
          "bash", "javascript", "typescript", "json", "yaml",
          "python", "php", "html", "css", "sql", "text",
        ],
      },
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 8,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { code: "code", language: "language" },
    prepare({ code, language }) {
      return {
        title: (code || "").split("\n")[0],
        subtitle: language,
      };
    },
  },
});
