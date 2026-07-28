import { defineField, defineType } from "sanity";

/**
 * Stores only the video URL (+ optional caption). Whether the site renders
 * an inline embed or a styled link card is decided at render time by
 * NEXT_PUBLIC_VIDEO_MODE, so switching later needs no content changes.
 */
export const youtubeType = defineType({
  name: "youtube",
  title: "YouTube video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (r) =>
        r.required().uri({ scheme: ["https"] }).custom((url) =>
          url && !/youtube\.com|youtu\.be/.test(url)
            ? "Must be a YouTube URL"
            : true
        ),
    }),
    defineField({
      name: "caption",
      title: "Caption / link label",
      type: "string",
    }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare({ url, caption }) {
      return { title: caption || "YouTube video", subtitle: url };
    },
  },
});
