# Optional: Cross-Device Cloud Progress (Upstash Redis)

Use this pattern when localStorage isn't enough — the user has multiple devices, or "I cleared my cache and lost everything" must not be possible.

## When to use

- Same user across devices (laptop + phone + iPad).
- Multiple distinct users with individual progress (use with `middleware-multi-user.ts`).
- Data that the user would consider "theirs" and would notice missing.

## When NOT to use

- Single device, single user → just localStorage. Cheaper, faster, zero failure modes.
- Ephemeral state (current cursor position, transient UI flags) — keep that local.

## Cost

Upstash Redis on Vercel Marketplace has a free tier (currently around 10K commands/day, 256MB storage as of late 2025 — verify on the Marketplace listing before promising). A single-user app updating progress a few times per session won't approach the ceiling. For a multi-user personal site (~5–20 users), still free.

## Step 1: Provision Upstash Redis via Vercel Marketplace

In the Vercel dashboard for THIS project:

1. Project → **Storage** → **Browse Marketplace** → **Upstash for Redis** → **Add**.
2. Pick the free plan, name the database after the project (e.g. `lettera-progress`).
3. Click **Connect** and select your project.

Vercel automatically injects these env vars into all environments:

```
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
KV_URL                     # ioredis-style connection URL (don't need this for REST)
```

Run `vercel env pull` locally afterward to populate `.env.local`.

## Step 2: Add the Vercel Function `api/progress.ts`

Create `api/progress.ts` at project root (sibling to `vite.config.ts`):

```ts
// api/progress.ts — Vercel Function for cross-device progress storage.
// Single-password mode: pass keyName="shared". Multi-user mode: pass the
// `site_user` cookie value.

const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

function readCookies(request: Request): Record<string, string> {
  const out: Record<string, string> = {}
  const raw = request.headers.get('cookie') ?? ''
  for (const part of raw.split(';')) {
    const eq = part.indexOf('=')
    if (eq < 0) continue
    const k = part.slice(0, eq).trim()
    const v = part.slice(eq + 1).trim()
    if (k) out[k] = v
  }
  return out
}

function identityFromCookies(request: Request): string {
  const cookies = readCookies(request)
  // Multi-user: use the username set by middleware-multi-user.ts.
  const user = cookies['site_user']
  if (user) return decodeURIComponent(user)
  // Single-password: middleware sets only `site_auth`; everyone shares one slot.
  return 'shared'
}

function key(appSlug: string, identity: string): string {
  return `${appSlug}:progress:${identity}`
}

async function kvGet(k: string): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) return null
  const res = await fetch(`${KV_URL}/get/${encodeURIComponent(k)}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  })
  if (!res.ok) return null
  const data = (await res.json()) as { result: string | null }
  if (!data.result) return null
  try { return JSON.parse(data.result) } catch { return null }
}

async function kvSet(k: string, value: unknown): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false
  const res = await fetch(`${KV_URL}/set/${encodeURIComponent(k)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify(value)),
  })
  return res.ok
}

export default async function handler(request: Request): Promise<Response> {
  const APP_SLUG = '<replace-with-app-slug>' // e.g. 'lettera'
  const identity = identityFromCookies(request)
  const k = key(APP_SLUG, identity)

  if (request.method === 'GET') {
    const value = await kvGet(k)
    return Response.json({ value })
  }
  if (request.method === 'POST') {
    const body = await request.json()
    const ok = await kvSet(k, body)
    return Response.json({ ok })
  }
  return new Response('Method not allowed', { status: 405 })
}
```

Replace `<replace-with-app-slug>` with the project's name. This becomes the prefix of the Redis key — pick something unique per project so multiple personal projects can share the same Upstash instance later (though one-per-project is the default).

The middleware already gates `/api/progress` because the matcher catches every non-`_vercel` path. So unauthenticated requests get the login page; authenticated ones reach the function with valid `site_user` (multi-user) or `site_auth` (single-password) cookies.

## Step 3: Wire the React side

Replace `localStorage.getItem` / `setItem` calls with a small async wrapper that uses the cloud as source of truth and localStorage as a fast cache:

```ts
const STORAGE_KEY = 'lettera-progress'

async function loadProgress(): Promise<SavedProgress | null> {
  // 1. Show local cache immediately (instant UI, no flash of empty state)
  let cached: SavedProgress | null = null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) cached = JSON.parse(raw) as SavedProgress
  } catch {}

  // 2. Hydrate from cloud (overrides local if newer; for a personal app
  //    we trust whichever is more advanced — adjust if you have stronger
  //    consistency needs)
  try {
    const res = await fetch('/api/progress', { credentials: 'same-origin' })
    if (res.ok) {
      const { value } = await res.json() as { value: SavedProgress | null }
      if (value) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch {}
        return value
      }
    }
  } catch {
    // offline / network error → fall back to cache
  }

  return cached
}

async function saveProgress(data: SavedProgress): Promise<void> {
  // Write through to local first (instant; safe across reload even offline)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
  // Then fire-and-forget to cloud
  try {
    await fetch('/api/progress', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    // ignored — local copy will resync on next successful save
  }
}
```

Use these from the existing load/save effects. The localStorage fallback means the app stays usable offline; the cloud sync means progress survives device changes and cache clears.

## Conflict resolution

For a personal app, last-write-wins is usually fine. If you need stronger semantics (e.g., a user editing on two devices simultaneously), store a `version` or `updatedAt` timestamp in the JSON and pick the higher one in `loadProgress`. Don't add this until you have a real conflict to solve.

## What this pattern is NOT

- It is not a sync engine. Two devices editing simultaneously will race.
- It is not real-time. Devices see each other's progress on next page load, not instantly. (Add a `setInterval` poll if you want; rarely worth it for "progress" data.)
- It does not replace authentication. The middleware is what gates access; this layer just stores what an already-authenticated user wrote.
