import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zenith Forge, tech company and consultancy for the web, AI and data";

/** Default social share image, used when a page has no specific OG image. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#16130F",
          color: "#F2EFE9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            color: "#EE4700",
            fontWeight: 700,
          }}
        >
          ZF® ZENITH FORGE
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          We forge websites,
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          agents & pipelines.
        </div>
        <div style={{ marginTop: 34, fontSize: 30, color: "rgba(242,239,233,0.7)" }}>
          Web · AI · Data. For startups that move fast.
        </div>
      </div>
    ),
    size
  );
}
