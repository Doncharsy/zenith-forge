import type { PortableTextBlock } from "@portabletext/react";

/** Tiny helpers to author Portable Text bodies in plain TypeScript. */

let keyCounter = 0;
const key = () => `a${(keyCounter++).toString(36).padStart(6, "0")}`;

type Span = { _type: "span"; _key: string; text: string; marks: string[] };

function span(text: string): Span {
  return { _type: "span", _key: key(), text, marks: [] };
}

function block(
  style: "normal" | "h2" | "h3" | "blockquote",
  text: string,
  listItem?: "bullet" | "number"
): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [span(text)],
    ...(listItem ? { listItem, level: 1 } : {}),
  } as unknown as PortableTextBlock;
}

export const p = (text: string) => block("normal", text);
export const h2 = (text: string) => block("h2", text);
export const h3 = (text: string) => block("h3", text);
export const quote = (text: string) => block("blockquote", text);
export const bullet = (text: string) => block("normal", text, "bullet");
export const numbered = (text: string) => block("normal", text, "number");

export function code(language: string, codeText: string) {
  return {
    _type: "codeBlock",
    _key: key(),
    language,
    code: codeText,
  } as unknown as PortableTextBlock;
}

/** Image referenced by a public/remote URL (used by the built-in fallback articles). */
export function figure(url: string, caption?: string) {
  return {
    _type: "figure",
    _key: key(),
    url,
    ...(caption ? { caption } : {}),
  } as unknown as PortableTextBlock;
}
