# Newsletter setup (Google Apps Script, no Google Cloud)

The website captures newsletter subscribes and unsubscribes into a Google Sheet.
It talks to the sheet through a small **Google Apps Script Web App** that lives
inside the sheet itself, so there is **no Google Cloud project, no service
account, and no key** to create. Nothing your organisation can block.

The website has two public endpoints:

- `POST /api/subscribe` records consent.
- `GET/POST /api/unsubscribe` handles one-click unsubscribe (RFC 8058).

Both call the Apps Script, which reads and writes the sheet. Sending the actual
emails is done separately by your n8n workflow.

You only do three things: make a sheet, paste a script into it and deploy it,
then paste two values into Vercel.

---

## Part 1 — Make the Google Sheet

1. Go to **sheets.google.com** and click **Blank spreadsheet**.
2. Rename it (top left) to something like **Zenith Forge Subscribers**.
3. That is all. You do **not** need to create tabs or type headers. The script
   creates the `subscribers` tab and its columns for you the first time it runs.

---

## Part 2 — Add the script

1. In that sheet, click the **Extensions** menu → **Apps Script**. A new tab
   opens with a code editor and a file called `Code.gs` containing a default
   `myFunction`.
2. Select all the code in that editor and delete it.
3. Open the file **`google-apps-script/Code.gs`** from this project, copy its
   entire contents, and paste it into the empty editor.
4. Near the top you will see this line:

   ```js
   var SHARED_SECRET = 'REPLACE_WITH_A_LONG_RANDOM_SECRET';
   ```

   Replace the text in quotes with a long random password of your own (letters
   and numbers, 30+ characters). Keep a copy; you paste the same value into
   Vercel in Part 4. Example of the shape (make your own):
   `zf_7Qm2Xr9Lp4Vt8Nw1Kd6Hb3Yc5Fg0Ss`.
5. Click the **Save** icon (the floppy disk) at the top.

---

## Part 3 — Deploy it as a Web App

1. Top right of the Apps Script editor, click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** anything, e.g. `newsletter`.
   - **Execute as:** **Me** (your email).
   - **Who has access:** **Anyone**.
     (This is safe: the script ignores any request that does not include your
     secret from Part 2.)
4. Click **Deploy**.
5. Google asks you to **authorise access**. Click **Authorize access**, pick
   your Google account, and if you see a "Google hasn't verified this app"
   screen click **Advanced** → **Go to (your project name)** → **Allow**. This
   is normal for your own script.
6. You now get a **Web app URL** that ends in `/exec`. Click **Copy**. Keep it
   for Part 4.

> Test it quickly: paste that URL into a browser. You should see
> `{"ok":true,"service":"zenith-forge-subscribers"}`. That means it is live.

---

## Part 4 — Put two values into Vercel

1. Go to **vercel.com**, open your **Zenith Forge** project.
2. **Settings** → **Environment Variables**.
3. Add these, one at a time (leave all environments ticked, then **Save**):

   | Key | Value |
   |---|---|
   | `SHEETS_WEBAPP_URL` | the Web app URL from Part 3 (ends in `/exec`) |
   | `SHEETS_WEBAPP_SECRET` | the exact secret you set in Part 2 |
   | `SITE_URL` | your live address, e.g. `https://zenithforge.studio` |

4. Redeploy so the values take effect: **Deployments** tab → the newest one →
   **⋯** → **Redeploy** → confirm.

---

## Part 5 — Test it

1. On your live site, use the newsletter box with your own email → you should
   see "You're on the list."
2. Open the Google Sheet. A row appears: your email, `confirmed`, a random
   `unsub_token`, `website`, your IP, and a timestamp.
3. Copy the `unsub_token`, then visit
   `https://YOUR-SITE/api/unsubscribe?token=THAT_TOKEN`, click **Confirm
   unsubscribe** → the row flips to `unsubscribed` with an `unsub_ts`.
4. Subscribe again with the same email → it flips back to `confirmed`.

---

## Updating the script later

If you edit `Code.gs`, you must redeploy for the change to go live: **Deploy** →
**Manage deployments** → pencil (edit) icon → **Version: New version** →
**Deploy**. The Web app URL stays the same, so you do not need to change Vercel.

---

## Sending (handled in n8n, not here)

The site's job ends at the sheet. In n8n you:

- Read the `subscribers` tab and send only to rows where `status` is
  `confirmed`.
- Add the unsubscribe link and headers to each email:
  - `List-Unsubscribe: <https://YOUR-SITE/api/unsubscribe?token={{unsub_token}}>`
  - `List-Unsubscribe-Post: List-Unsubscribe=One-Click`
- When Gmail or Yahoo fire one-click unsubscribe, they POST straight to
  `/api/unsubscribe?token=…` and the row flips to `unsubscribed`. Your next send
  skips it automatically.
