/**
 * Newsletter subscriber store client.
 *
 * Talks to a Google Apps Script Web App that is bound to the subscriber Google
 * Sheet. The script does all the reading and writing, so the site needs no
 * Google Cloud project, service account, or key. Calls are authenticated with a
 * shared secret and only ever happen server side (from the API routes).
 *
 * Env:
 *   SHEETS_WEBAPP_URL     the Apps Script Web App deployment URL (ends in /exec)
 *   SHEETS_WEBAPP_SECRET  shared secret; must match SHARED_SECRET in the script
 */

const WEBAPP_URL = process.env.SHEETS_WEBAPP_URL || "";
const WEBAPP_SECRET = process.env.SHEETS_WEBAPP_SECRET || "";

/** True when both the Web App URL and secret are configured. */
export function sheetsConfigured(): boolean {
  return Boolean(WEBAPP_URL && WEBAPP_SECRET);
}

async function callScript(
  action: string,
  payload: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: WEBAPP_SECRET, action, ...payload }),
    // Apps Script Web Apps answer with a redirect to a googleusercontent host.
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`apps script request failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  if (!data.ok) {
    throw new Error(`apps script error: ${data.error || "unknown"}`);
  }
  return data;
}

/**
 * Add or re-subscribe an email. The Apps Script handles the not-found /
 * already-confirmed / re-subscribe branches, so this is a single call.
 */
export async function subscribeToSheet(input: {
  email: string;
  source?: string;
  consentIp?: string;
}): Promise<void> {
  await callScript("subscribe", {
    email: input.email,
    source: input.source || "website",
    consent_ip: input.consentIp || "",
  });
}

/** Unsubscribe by token. Returns whether a matching row was found. */
export async function unsubscribeFromSheet(
  token: string
): Promise<{ found: boolean }> {
  const data = await callScript("unsubscribe", { token });
  return { found: Boolean(data.found) };
}
