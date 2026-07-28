import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import { videoMode } from "@/lib/site";
import ProseImage from "./ProseImage";

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

function YouTubeBlock({ url, caption }: { url: string; caption?: string }) {
  const id = youtubeId(url);
  if (videoMode === "embed" && id) {
    return (
      <div className="zf-video-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={caption || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="zf-video-link">
      <span className="zf-video-link__play">▶</span>
      <span>
        <span className="zf-video-link__label">{caption || "Watch the video"}</span>
        <span className="zf-video-link__sub" style={{ display: "block" }}>
          WATCH ON YOUTUBE →
        </span>
      </span>
    </a>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value)?.width(1400).url();
      if (!src) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={value.alt || ""} loading="lazy" />
      );
    },
    codeBlock: ({ value }) => (
      <pre>
        <code data-language={value.language}>{value.code}</code>
      </pre>
    ),
    figure: ({ value }) => (
      <ProseImage src={value.url} caption={value.caption} />
    ),
    youtube: ({ value }) => (
      <YouTubeBlock url={value.url} caption={value.caption} />
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PostBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="zf-prose">
      <PortableText value={body} components={components} />
    </div>
  );
}
