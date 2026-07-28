/**
 * Zenith Forge — newsletter subscriber store (Google Apps Script Web App).
 *
 * This script lives inside the Google Sheet that holds your subscribers. Deploy
 * it as a Web App and the website's /api/subscribe and /api/unsubscribe
 * endpoints call it to read and write the sheet. No Google Cloud project,
 * service account, or key is needed, so organisation key policies cannot block
 * it.
 *
 * The script creates the `subscribers` tab and its header row automatically the
 * first time it runs, so you do not have to set them up by hand.
 *
 * SETUP (see NEWSLETTER_SETUP.md for the click by click version):
 *   1. Replace the SHARED_SECRET value below with a long random string.
 *   2. Deploy: Deploy -> New deployment -> Web app ->
 *        Execute as: Me
 *        Who has access: Anyone
 *      Deploy, authorise, and copy the Web app URL (it ends in /exec).
 *   3. In Vercel set:
 *        SHEETS_WEBAPP_URL     = that Web app URL
 *        SHEETS_WEBAPP_SECRET  = the same secret you set below
 */

var SHARED_SECRET = 'REPLACE_WITH_A_LONG_RANDOM_SECRET';
var TAB = 'subscribers';
var HEADERS = ['email', 'status', 'unsub_token', 'source', 'consent_ip', 'consent_ts', 'unsub_ts'];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.secret !== SHARED_SECRET) {
      return json_({ ok: false, error: 'unauthorized' });
    }
    if (body.action === 'subscribe') return json_(handleSubscribe_(body));
    if (body.action === 'unsubscribe') return json_(handleUnsubscribe_(body));
    return json_({ ok: false, error: 'unknown action' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  // Health check: open the Web app URL in a browser to confirm it is live.
  return json_({ ok: true, service: 'zenith-forge-subscribers' });
}

function handleSubscribe_(body) {
  var email = String(body.email || '').trim().toLowerCase();
  if (!email) return { ok: false, error: 'no email' };
  var source = String(body.source || 'website').trim() || 'website';
  var consentIp = String(body.consent_ip || '');
  var now = new Date().toISOString();

  var sheet = getSheet_();
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var found = findRow_(sheet, 0, email); // column 0 = email
    if (!found) {
      sheet.appendRow([email, 'confirmed', Utilities.getUuid(), source, consentIp, now, '']);
    } else if (String(found.values[1]).toLowerCase() === 'unsubscribed') {
      // Re-subscribe: reuse the token, refresh consent, clear the unsub time.
      setCells_(sheet, found.rowNumber, { 2: 'confirmed', 5: consentIp, 6: now, 7: '' });
    }
    // else already confirmed -> idempotent no-op.
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function handleUnsubscribe_(body) {
  var token = String(body.token || '').trim();
  if (!token) return { ok: true, found: false };
  var now = new Date().toISOString();

  var sheet = getSheet_();
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var found = findRow_(sheet, 2, token); // column 2 = unsub_token
    if (!found) return { ok: true, found: false };
    if (String(found.values[1]).toLowerCase() !== 'unsubscribed') {
      setCells_(sheet, found.rowNumber, { 2: 'unsubscribed', 7: now });
    }
    return { ok: true, found: true };
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  var firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var ok = true;
  for (var i = 0; i < HEADERS.length; i++) {
    if (String(firstRow[i]) !== HEADERS[i]) { ok = false; break; }
  }
  if (!ok) sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function findRow_(sheet, colIndex, value) {
  var last = sheet.getLastRow();
  if (last < 2) return null;
  var values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var target = String(value).trim().toLowerCase();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][colIndex]).trim().toLowerCase() === target) {
      return { rowNumber: i + 2, values: values[i] };
    }
  }
  return null;
}

// patch keys are 1-based column numbers.
function setCells_(sheet, rowNumber, patch) {
  for (var col in patch) {
    sheet.getRange(rowNumber, Number(col)).setValue(patch[col]);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
