import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 *   URL:    https://<your-site>/api/revalidate
 *   Secret: same value as SANITY_REVALIDATE_SECRET
 *   Filter: _type == "post"
 * Publishing/updating a post then refreshes the live site within seconds.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidateTag("post");
    if (body?.slug?.current) revalidateTag(`post:${body.slug.current}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
}
