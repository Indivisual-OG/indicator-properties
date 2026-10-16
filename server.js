// The Indicator Properties: shared tally + shared sky server
// Zero dependencies. Requires Node 18+.
//   node server.js            -> http://localhost:8080
// Env vars:
//   PORT          (default 8080)
//   DATA_FILE     (default ./data.json)  put this on a persistent disk when deployed
//   ADMIN_KEY     (optional) enables the /admin moderation page
//   MODERATION    "auto" (default: publish if it passes the filter) | "queue" (hold everything for review)

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const MODERATION = process.env.MODERATION === 'queue' ? 'queue' : 'auto';
const MACHINE_FRAGMENT_COUNT = 12;   // must match machineFragments.length in index.html
const NICE_FORM_COUNT = 12;          // must match forms.length in index.html (Somewhere Nice)
const MAX_STARS = 2000;
const MAX_PAIRS = 500;

// ---------- storage ----------
let db = { days: {}, total: { reset: 0, stay: 0, walk: 0 }, pairs: [], stars: [], nice: {} };
try { db = { ...db, ...JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) }; } catch (_) {}
let dirty = false;
setInterval(() => {
  if (!dirty) return;
  dirty = false;
  const tmp = DATA_FILE + '.tmp';
  fs.writeFile(tmp, JSON.stringify(db), err => { if (!err) fs.rename(tmp, DATA_FILE, () => {}); });
}, 2000);

const today = () => new Date().toISOString().slice(0, 10);
function dayTally() { return db.days[today()] ||= { reset: 0, stay: 0, walk: 0 }; }

// ---------- moderation ----------
// Deliberately small. Extend for your venue. Queue mode + /admin is the safe option for a public launch.
const BLOCK = [/https?:\/\//i, /www\./i, /\b[\w.-]+@[\w-]+\.\w+/, /\b(?:\d[\s-]?){9,}\b/,
  /\b(fuck|shit|cunt|nigg|fag|retard|kill yourself|kys)\w*/i];
function clean(text) {
  if (typeof text !== 'string') return null;
  text = text.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280);
  if (text.length < 2) return null;
  return text;
}
const flagged = t => BLOCK.some(r => r.test(t));

// ---------- rate limiting ----------
const hits = new Map(); // ip -> [timestamps]
function limited(ip, max, windowMs) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}
setInterval(() => hits.clear(), 10 * 60 * 1000);

// ---------- helpers ----------
function send(res, code, body, type = 'application/json') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
}
function readBody(req) {
  return new Promise(resolve => {
    let b = '';
    req.on('data', c => { b += c; if (b.length > 4000) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(b || '{}')); } catch { resolve({}); } });
  });
}
const publicPairs = () => db.pairs.filter(p => p.status === 'ok').slice(-40)
  .map(({ id, text, m, at }) => ({ id, text, m, at }));
const publicStars = () => db.stars.filter(s => s.ok);

function addStars(pairId, ok) {
  const x = 0.08 + Math.random() * 0.84, y = 0.04 + Math.random() * 0.38;
  db.stars.push({ x, y, h: 1, p: pairId, ok },
                { x: x + (Math.random() - .5) * .07, y: y + (Math.random() - .5) * .07, h: 0, p: pairId, ok });
  if (db.stars.length > MAX_STARS) db.stars = db.stars.slice(-MAX_STARS);
}

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

  // static
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return fs.readFile(path.join(__dirname, 'index.html'), (e, d) => e ? send(res, 500, 'missing index.html', 'text/plain') : send(res, 200, d, 'text/html; charset=utf-8'));
  }

  // public API
  if (req.method === 'GET' && url.pathname === '/api/state') {
    return send(res, 200, { today: dayTally(), total: db.total, stars: publicStars(), pairs: publicPairs() });
  }

  if (req.method === 'POST' && url.pathname === '/api/choice') {
    if (limited('c' + ip, 60, 60_000)) return send(res, 429, { error: 'slow down' });
    const { kind } = await readBody(req);
    if (!['reset', 'stay', 'walk'].includes(kind)) return send(res, 400, { error: 'bad kind' });
    dayTally()[kind]++; db.total[kind]++; dirty = true;
    return send(res, 200, { today: dayTally(), total: db.total });
  }

  if (req.method === 'POST' && url.pathname === '/api/fragment') {
    if (limited('f' + ip, 5, 10 * 60_000)) return send(res, 429, { error: 'The table is full for a moment. Sit with what you wrote.' });
    const body = await readBody(req);
    const text = clean(body.text);
    const m = Number.isInteger(body.m) && body.m >= 0 && body.m < MACHINE_FRAGMENT_COUNT ? body.m : null;
    if (!text || m === null) return send(res, 400, { error: 'bad fragment' });
    const status = flagged(text) ? 'rejected' : (MODERATION === 'queue' ? 'pending' : 'ok');
    const pair = { id: crypto.randomUUID().slice(0, 8), text, m, at: Date.now(), status };
    db.pairs.push(pair);
    if (db.pairs.length > MAX_PAIRS) db.pairs = db.pairs.slice(-MAX_PAIRS);
    if (status !== 'rejected') addStars(pair.id, status === 'ok');
    dirty = true;
    // The visitor always sees their own pair rise. Only approved ones are shown to others.
    return send(res, 200, { status, stars: db.stars.filter(s => s.p === pair.id) });
  }

  // Somewhere Nice: a shared meadow. Only fixed forms and positions, no free text, no counts exposed.
  if (req.method === 'GET' && url.pathname === '/api/nice') {
    const week = Date.now() - 7 * 24 * 3600 * 1000;
    const residents = Object.entries(db.nice || {})
      .filter(([, r]) => r.at > week)
      .sort((a, b) => b[1].at - a[1].at).slice(0, 150)
      .map(([id, r]) => ({ id, f: r.f, x: r.x, y: r.y, nap: r.nap }));
    return send(res, 200, { residents });
  }

  if (req.method === 'POST' && url.pathname === '/api/nice') {
    if (limited('n' + ip, 40, 60_000)) return send(res, 429, { error: 'rest a moment' });
    const { id, f, x, y, nap } = await readBody(req);
    const num = v => typeof v === 'number' && isFinite(v) && v >= 0 && v <= 100;
    if (typeof id !== 'string' || !/^[a-z0-9]{6,16}$/.test(id) || !Number.isInteger(f) || f < 0 || f >= NICE_FORM_COUNT || !num(x) || !num(y))
      return send(res, 400, { error: 'bad resident' });
    db.nice ||= {};
    db.nice[id] = { f, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, nap: !!nap, at: Date.now() };
    const ids = Object.keys(db.nice);
    if (ids.length > 1000) ids.sort((a, b) => db.nice[a].at - db.nice[b].at).slice(0, ids.length - 1000).forEach(k => delete db.nice[k]);
    dirty = true;
    return send(res, 200, { ok: true });
  }

  // admin (moderation)
  if (ADMIN_KEY && url.pathname.startsWith('/admin')) {
    if (url.searchParams.get('key') !== ADMIN_KEY) return send(res, 403, 'forbidden', 'text/plain');
    if (req.method === 'POST') {
      const { id, action } = await readBody(req);
      const p = db.pairs.find(p => p.id === id);
      if (p) {
        p.status = action === 'approve' ? 'ok' : 'rejected';
        db.stars.forEach(s => { if (s.p === id) s.ok = p.status === 'ok'; });
        dirty = true;
      }
      return send(res, 200, { ok: true });
    }
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const rows = db.pairs.slice().reverse().slice(0, 200).map(p => `<tr><td>${new Date(p.at).toLocaleString()}</td>
      <td>${p.status}</td><td>${esc(p.text)}</td>
      <td><button onclick="act('${p.id}','approve')">approve</button><button onclick="act('${p.id}','reject')">hide</button></td></tr>`).join('');
    return send(res, 200, `<!doctype html><meta charset=utf-8><title>moderation</title>
      <style>body{font-family:sans-serif;padding:1em}td{border-bottom:1px solid #ddd;padding:.4em;vertical-align:top}</style>
      <h2>Workspace fragments (mode: ${MODERATION})</h2>
      <p>Tally today: ${JSON.stringify(dayTally())} · all time: ${JSON.stringify(db.total)}</p>
      <table>${rows}</table>
      <script>function act(id,action){fetch(location.href,{method:'POST',body:JSON.stringify({id,action})}).then(()=>location.reload())}</script>`,
      'text/html; charset=utf-8');
  }

  send(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`The Indicator Properties: http://localhost:${PORT}  (moderation: ${MODERATION}${ADMIN_KEY ? ', /admin?key=…' : ''})`));
