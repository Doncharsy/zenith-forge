import { NextResponse } from "next/server";
import { subscribeToSheet, sheetsConfigured } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Newsletter subscribe endpoint. Public and stateless: it only records consent
 * in the Google Sheet (via the Apps Script Web App). Sending is handled
 * separately by an external n8n workflow that reads the sheet.
 *
 * Body: { email, website?, source? }
 *   website  honeypot: if non-empty the request is a bot, dropped silently.
 *   source   optional origin label, defaults to "website".
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function firstIp(header: string | null): string {
  if (!header) return "";
  return header.split(",")[0].trim();
}

export async function POST(request: Request) {
  let email = "";
  let website = "";
  let source = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    website = String(body?.website ?? "");
    source = String(body?.source ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success, write nothing.
  if (website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validation is the only case that returns ok:false.
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // No Web App configured yet: accept so the UI works, but nothing is stored.
  if (!sheetsConfigured()) {
    console.warn("[subscribe] SHEETS_WEBAPP_URL/SECRET not set; email accepted but not stored:", email);
    return NextResponse.json({ ok: true });
  }

  const ip = firstIp(request.headers.get("x-forwarded-for"));

  try {
    await subscribeToSheet({ email, source: source || "website", consentIp: ip });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] store failed:", err);
    // Genuine server error (not a branch outcome): let the client retry.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
