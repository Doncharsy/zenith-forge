# Sanity setup (content for the Journal / blog)

The blog is powered by **Sanity**, a free-tier headless CMS. The code side is
already wired up — project ID `kzsuphrf`, schema for posts/categories, and a
Studio built into the site at `/studio`. What's left is a few things only you
can do from your own browser, since they require your Sanity login.

---

## Part 1 — Confirm you can log in

Your project already has one human **Administrator** on it (added when the
project was created on 2026-07-10) — that's very likely you already. To
confirm:

1. Go to **sanity.io/manage** and sign in.
2. Open the project named **zenith forge** (ID `kzsuphrf`).
3. Click **Members** in the left sidebar. You should see yourself listed as
   **Administrator**.

If you don't see it, or you're not sure which email it's under, tell me and
we'll add the right one — that step needs an existing Administrator to invite
you, which an API token can't do.

---

## Part 2 — Allow the site to talk to Sanity (CORS)

This is the one real blocker right now. Without it, `/studio` loads its shell
but can't actually read or save posts — you'll see errors or a blank content
list.

1. In **sanity.io/manage**, open the project → **API** tab.
2. Under **CORS Origins**, click **Add CORS origin**.
3. Add `http://localhost:3000`, tick **Allow credentials**, save.
4. Once the site is deployed (Vercel), come back and add that live URL too
   (e.g. `https://zenithforgestudio.com`), same way, credentials ticked.

---

## Part 3 — Using the Studio

Run the site locally (`npm run dev`) and open **http://localhost:3000/studio**.
Sign in with the same account from Part 1.

The sidebar has two sections (this is customized — a plain Sanity project
would just show an A-Z list of every schema type instead):

- **Posts** — every article, newest first.
- **Categories** — the 5 categories already seeded (Tutorial, Guide, Case
  Study, List, SEO).

### Editing an existing post

1. Click **Posts**, pick one.
2. Edit any field — title, excerpt, body, featured image, tags, etc.
3. Changes autosave as drafts. Nothing goes live until you click **Publish**
   (top right).

### Creating a new post

1. Click **Posts** → the **+** button (top right) → **Post**.
2. Fill in **Title** (the URL slug auto-generates from it — you can edit it),
   **Excerpt**, pick a **Category**, add a **Featured image**, write the
   **Body**.
3. Set **Published at** — posts with a future date won't show on the live
   site yet, which is a handy way to schedule.
4. Click **Publish**.

The **SEO** tab (next to Content, top of the document) holds optional
**Meta title** / **Meta description** overrides — leave blank to fall back to
the title/excerpt.

---

## Part 4 — Environment variables

Already set locally in `.env.local` (gitignored, never committed):

| Key | Value | Used for |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `kzsuphrf` | which Sanity project to read |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | which dataset |
| `SANITY_API_WRITE_TOKEN` | (Editor token) | only used by `npm run seed`, not by the live site |

When you deploy to Vercel, add these same three in **Settings → Environment
Variables** (the write token only if you'll ever run the seed script against
production — day to day editing happens through `/studio`, which uses your own
login, not this token).

---

## Part 5 — Instant publish, no redeploy

Right now, publishing a post in Studio updates the live site within about 5
minutes (the homepage/blog re-fetch on a timer). To make it instant:

1. In **sanity.io/manage** → project → **API** → **Webhooks** → **Create webhook**.
2. **URL:** `https://YOUR-SITE/api/revalidate`
3. **Dataset:** `production`
4. **Trigger on:** Create, Update, Delete
5. **Filter:** `_type == "post"`
6. **Secret:** any long random string — then add it to Vercel as
   `SANITY_REVALIDATE_SECRET` (must match exactly).
7. Save.

After this, publishing/editing/deleting a post refreshes the live site within
seconds instead of minutes.

---

## Part 6 — Test it end to end

1. Do Part 2 (CORS) first, or the rest won't work.
2. Open `/studio` locally, edit the excerpt of any post, **Publish**.
3. Visit `/blog` — within ~5 minutes (or instantly once Part 5 is set up)
   the new excerpt should appear.
4. Try creating a brand new post and publishing it — it should show up in the
   article list and be filterable by its category.

---

## If something looks broken

- **Studio loads but shows no posts / a permissions error:** almost always
  Part 2 (CORS) not done yet, or you're signed into the wrong Sanity account.
- **Studio won't load at all:** check you're running `npm run dev` and that
  `.env.local` has the right `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- **Published changes don't show on the live site:** either wait ~5 minutes
  (no webhook yet), or double check the webhook secret in Part 5 matches
  Vercel exactly.
