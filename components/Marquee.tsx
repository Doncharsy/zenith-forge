const TEXT =
  "WEB DEVELOPMENT × WEB DESIGN × AI AUTOMATION × AI AGENTS × DATA ANALYSIS × MOBILE × WORDPRESS × SEO × ";

export default function Marquee() {
  return (
    <div className="zf-marquee" data-cursor-theme="dark" aria-hidden>
      <div className="zf-marquee__track">
        <span className="zf-marquee__text">{TEXT}</span>
        <span className="zf-marquee__text">{TEXT}</span>
      </div>
    </div>
  );
}
