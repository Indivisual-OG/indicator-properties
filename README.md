For the background and concept of this art project / first idea of an installation, please see the "The Indicator Properties" draft concept statement.

# The Indicator Properties: web version

## Run locally
    node server.js
Open http://localhost:8080. Needs Node 18 or newer and nothing else (no npm install).

If you open `index.html` directly without the server, it still works, but the tally and sky are private to that visitor.

## Settings (environment variables)
| var | default | what it does |
|---|---|---|
| `PORT` | 8080 | port the server listens on |
| `DATA_FILE` | ./data.json | where the tally and sky are saved; **put this on a persistent disk** |
| `ADMIN_KEY` | (none) | turns on the moderation page at `/admin?key=YOURKEY` |
| `MODERATION` | auto | `auto`: publish fragments that pass the filter. `queue`: hold every fragment until approved |

**Recommended for a public launch:** `MODERATION=queue` with an `ADMIN_KEY`. Visitors still see their own pair rise straight away. Everyone else sees it once it's approved.

## Deploy (any host that runs Node)
- **Render / Railway / Fly.io:** set the start command to `node server.js`, attach a small persistent volume, and set `DATA_FILE=/data/data.json`.
- **A VPS:** `ADMIN_KEY=... MODERATION=queue node server.js` behind nginx or Caddy for HTTPS.

## Notes
- No accounts, cookies, or analytics. Choices are anonymous counts. IP addresses are held in memory only for rate limiting and are never written to disk.
- If you edit the machine fragments in `index.html`, keep `MACHINE_FRAGMENT_COUNT` in `server.js` in sync.
- The same backend can drive the physical installation's tally screen and ceiling. Both can read `/api/state`.
