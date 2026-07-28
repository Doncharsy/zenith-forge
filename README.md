# Zenith Forge — studio website

Next.js (App Router) implementation of the Zenith Forge design: scroll-zoom hero, sideways services journey with page-flip cards, manifesto, team + profile pages, and a Sanity-powered journal (blog) with full SEO.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

The site works immediately **without any CMS configured** — the blog serves built-in fallback content until Sanity is connected.

## Connect Sanity (free tier — $0/month)

1. Create a free account + project at [sanity.io](https://www.sanity.io/) (or `npx sanity login && npx sanity projects create`). Note the **project ID**.
2. In [sanity.io/manage](https://sanity.io/manage) → your project → **API**:
   - Add `http://localhost:3000` and your production domain to **CORS origins** (with credentials).
   - Create a token with **Editor** role (for seeding).
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
   SANITY_API_WRITE_TOKEN=<editor token>
   ```
4. Seed the 10 draft articles + categories:
   ```bash
   npm run seed
   ```
   Re-runnable; it never overwrites documents you've edited.
5. Edit content at **`/studio`** on your running site (localhost or production).

## Instant publish (no redeploys)

Create a webhook at sanity.io/manage → API → Webhooks:

- **URL:** `https://<your-domain>/api/revalidate`
- **Secret:** same value as `SANITY_REVALIDATE_SECRET` in your env
- **Filter:** `_type == "post"`
- **Trigger on:** create, update, delete

Publishing in Studio then updates the live site within seconds.

## Videos in articles

Insert a **YouTube video** block in the post body (stores only the URL).
`NEXT_PUBLIC_VIDEO_MODE=embed` renders an inline player; `link` renders a styled link card. Switch anytime — no content changes needed.

## Deploy (Vercel Hobby — free)

Import the repo in Vercel (root directory: `zenith-forge`), set the env vars from `.env.example` (use your real site URL for `NEXT_PUBLIC_SITE_URL`), deploy.

## Where things live

| What | Where |
|---|---|
| Homepage sections | `components/` (Hero, ServicesRail, Manifesto, TeamGrid, …) |
| Services copy (front + card backs) | `lib/services.ts` |
| Team names/bios/photos | `lib/team.ts` (drop photos in `public/` and set `photo`) |
| Social links + contact email | `lib/site.ts` |
| Sanity schema | `sanity/schemaTypes/` |
| Seed articles | `scripts/seed-content.ts` |
| SEO: sitemap / robots / webhook | `app/sitemap.ts`, `app/robots.ts`, `app/api/revalidate/route.ts` |
