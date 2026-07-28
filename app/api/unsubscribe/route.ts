import { unsubscribeFromSheet, sheetsConfigured } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Unsubscribe endpoint.
 *
 *   GET  ?token=…  renders a brand confirmation page with a button. No state
 *                  change on GET, so link prefetchers cannot unsubscribe anyone.
 *   POST           token in body or query. Sets status=unsubscribed. Works with
 *                  no session or CSRF token, so RFC 8058 one-click
 *                  (List-Unsubscribe-Post: List-Unsubscribe=One-Click) can hit
 *                  it directly from Gmail / Yahoo.
 *
 * Invalid or missing tokens always render a neutral page with HTTP 200.
 */

const BRAND = {
  ink: "#16130f",
  paper: "#f2efe9",
  accent: "#ee4700",
  muted: "rgba(242,239,233,0.6)",
};

function shell(title: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title} · Zenith Forge</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${BRAND.ink};
    color: ${BRAND.paper};
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    padding: 24px;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    width: 100%;
    max-width: 460px;
    text-align: center;
    border: 1px solid rgba(242,239,233,0.14);
    border-radius: 10px;
    padding: 44px 36px;
    background: radial-gradient(120% 140% at 100% 0%, rgba(238,71,0,0.10), transparent 60%);
  }
  .mark {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    letter-spacing: 0.3em;
    color: ${BRAND.accent};
    margin-bottom: 24px;
  }
  h1 {
    font-size: 26px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    font-weight: 700;
  }
  p { color: ${BRAND.muted}; line-height: 1.6; margin: 0 0 28px; font-size: 15px; }
  .email { color: ${BRAND.paper}; }
  button {
    appearance: none;
    border: none;
    cursor: pointer;
    background: ${BRAND.accent};
    color: ${BRAND.paper};
    font: inherit;
    font-weight: 650;
    font-size: 16px;
    padding: 15px 34px;
    border-radius: 999px;
    transition: opacity 0.2s ease;
  }
  button:hover { opacity: 0.9; }
  a.home {
    display: inline-block;
    margin-top: 26px;
    color: ${BRAND.muted};
    text-decoration: none;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
  }
  a.home:hover { color: ${BRAND.paper}; }
</style>
</head>
<body>
  <div class="card">
    <div class="mark">ZF® ZENITH FORGE</div>
    ${inner}
  </div>
</body>
</html>`;
}

function siteHome(): string {
  const url = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  return url ? `<a class="home" href="${url}">RETURN TO ZENITHFORGE →</a>` : "";
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function confirmPage(token: string): string {
  const safeToken = encodeURIComponent(token);
  return shell(
    "Unsubscribe",
    `<h1>Unsubscribe from The Forge Dispatch?</h1>
     <p>You will stop receiving our emails. You can resubscribe anytime.</p>
     <form method="POST" action="/api/unsubscribe?token=${safeToken}">
       <input type="hidden" name="token" value="${escapeHtml(token)}" />
       <button type="submit">Confirm unsubscribe</button>
     </form>
     ${siteHome()}`
  );
}

function donePage(): string {
  return shell(
    "Unsubscribed",
    `<h1>You have been unsubscribed.</h1>
     <p>You will not receive any more emails from The Forge Dispatch. Sorry to see you go.</p>
     ${siteHome()}`
  );
}

function invalidPage(): string {
  return shell(
    "Link expired",
    `<h1>This link is invalid or expired.</h1>
     <p>If you are still receiving emails you did not sign up for, reply to any of them and we will sort it out.</p>
     ${siteHome()}`
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!token) return html(invalidPage());
  // No state change on GET.
  return html(confirmPage(token));
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  let token = url.searchParams.get("token") || "";

  // Fall back to the request body (form POST or JSON). RFC 8058 one-click sends
  // "List-Unsubscribe=One-Click" as the body with the token in the query, which
  // the query read above already covers.
  if (!token) {
    const contentType = request.headers.get("content-type") || "";
    try {
      if (contentType.includes("application/json")) {
        const body = await request.json();
        token = String(body?.token ?? "");
      } else {
        const form = await request.formData();
        token = String(form.get("token") ?? "");
      }
    } catch {
      // ignore; handled below
    }
  }

  if (!token) return html(invalidPage(), 200);

  if (!sheetsConfigured()) {
    // Nothing to update; still confirm so mail clients see a clean 200.
    return html(donePage(), 200);
  }

  try {
    const { found } = await unsubscribeFromSheet(token);
    return html(found ? donePage() : invalidPage(), 200);
  } catch (err) {
    console.error("[unsubscribe] failed:", err);
    return html(invalidPage(), 200);
  }
}
