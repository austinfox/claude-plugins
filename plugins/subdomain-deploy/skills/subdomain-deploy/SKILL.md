---
name: subdomain-deploy
description: Spin up a new personal project at a subdomain of austinfox.com on Vercel. Use when the user says "deploy this", "ship this", "put it on austinfox.com", "set up <name>.austinfox.com", "spin up a new personal project", or anything that implies creating a new Vercel project on an austinfox.com subdomain. One Vercel project per subdomain, Bun+Vite+React+TypeScript default stack, password-gated via custom Edge middleware. Wildcard DNS for *.austinfox.com is already configured on Porkbun, so subdomain creation is Vercel-only.
user-invocable: true
disable-model-invocation: false
metadata:
  author: Austin Fox
  version: "1.0.0"
---

# Personal Subdomain Deploy (austinfox.com)

Stand up a new personal project at `<name>.austinfox.com` on Vercel, password-gated, with a single command flow. This skill is for Austin's personal projects only — not client work, not company projects.

## Non-Negotiables

These are the rules that distinguish this workflow from generic "deploy to Vercel":

1. **One Vercel project per subdomain.** Never combine multiple personal projects into a single Vercel project, never use path-based routing across them. Each subdomain gets its own GitHub repo, its own Vercel project, its own env vars, its own analytics.
2. **Default stack: Bun + Vite + React 19 + TypeScript.** Bun is the runtime/package manager; Vite is the dev server/bundler — they do different jobs and both are needed. Add Tailwind v4 (via `@tailwindcss/vite`) when styling is non-trivial. Don't reach for Next.js for static personal projects — Vite is faster to build, simpler to reason about, and cheaper to keep running. Bun-only (no Vite) is not yet recommended — `bun build`'s React/Tailwind ecosystem is still thin.
3. **Password protection via custom Edge middleware**, not Vercel's built-in Password Protection. Vercel's feature requires the Advanced Deployment Protection add-on (~$150/mo) — overkill for personal projects. The middleware in `references/middleware.ts` is a no-op when `SITE_PASSWORD` is unset, so it costs nothing during local dev.
4. **Wildcard DNS is already set on Porkbun** (`*.austinfox.com → cname.vercel-dns.com`). New subdomains require zero DNS work — `vercel domains add` is sufficient.
5. **Private GitHub repo by default.** Personal projects are private unless the user explicitly says otherwise.

## When to Use This Skill

Activate when the user's request implies creating a brand-new project on an austinfox.com subdomain. Strong signals:

- "deploy this" / "ship this" + the project is local-only and has no Vercel link yet
- "put it on austinfox.com" / "set up `<name>`.austinfox.com"
- "spin up a new personal project"
- Mentions of austinfox.com or a subdomain like `lettera.austinfox.com`

Do NOT use this skill when:

- The project is already linked to a Vercel project — in that case use the generic `deploy-to-vercel` skill.
- The user wants to deploy to a non-austinfox.com domain — use the generic flow.
- The user is deploying a redeploy / preview / hotfix to an existing project — use the generic flow.

## Step 1: Confirm Project Identity

Before writing any code or running any CLI commands:

1. **Confirm the subdomain.** If the user said "ship this" without naming the subdomain, ask what to call it. The subdomain becomes the GitHub repo name, Vercel project name, and live URL.
2. **Confirm the password.** Ask the user for the `SITE_PASSWORD` value. Do not invent one. Do not store it in the repo. It will be set via `vercel env add` and pasted at the prompt — never echoed in plain text in chat history if avoidable.
3. **Confirm Tailwind.** If the project has more than two screens or a custom visual identity, default Tailwind v4 to enabled. Otherwise ask once.

## Step 2: Stack Setup

Use Bun for everything (install, dev, build). Do not generate a `package-lock.json` or `yarn.lock`.

```bash
bun create vite . --template react-ts
bun install
```

If Tailwind v4:

```bash
bun add tailwindcss @tailwindcss/vite
```

Then in `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

And replace `src/index.css` with:

```css
@import "tailwindcss";
```

Tailwind v4 uses no `tailwind.config.js` by default — configuration goes in CSS via `@theme`.

## Step 3: Add the Password Middleware

Copy `references/middleware.ts` to the project root (sibling to `vite.config.ts`, NOT in `src/`).

```bash
bun add @vercel/edge
```

Vercel auto-detects `middleware.ts` at the project root and deploys it as an Edge Function for any framework — no `vercel.json` needed.

The middleware:
- Is a no-op when `SITE_PASSWORD` is unset (so local dev works without setup).
- Serves a custom-styled login page on every unauthenticated request.
- Sets a 1-year `HttpOnly`, `Secure`, `SameSite=Lax` auth cookie on successful login.
- Stores `SHA-256(SITE_PASSWORD)` in the cookie, never the password itself.

If the project has a custom visual identity (cream/serif/sans like Lettera, or anything else), edit the `loginHtml()` function in `middleware.ts` to match — colors, fonts, heading text. The default styling matches Lettera's cream + Lora + Outfit aesthetic; replace it for other projects.

## Step 4: Deploy Flow

Run these in order. Each command is a single line — no chaining `&&` so failures are easy to spot.

```bash
# 1. Initialize git and create private GitHub repo
git init
git add .
git commit -m "Initial commit"
gh repo create austinfox/<name> --private --source=. --push

# 2. Link to a new Vercel project (NOT an existing one)
vercel link
# At the prompts: choose your personal scope, "No" to existing project, accept the inferred project name (should match the repo name)

# 3. Set the SITE_PASSWORD env var for all environments
vercel env add SITE_PASSWORD
# Paste the password at the prompt. Select "Production, Preview, and Development".

# 4. Add the custom subdomain to THIS project
vercel domains add <name>.austinfox.com
# Wildcard DNS handles the rest — no Porkbun changes needed.
# Equivalent UI path: this project's Settings → Domains → add <name>.austinfox.com.
# Do NOT use the team-level "Domains → Add Domain" dialog (that one binds the
# apex austinfox.com to a single project). Subdomains attach per-project; that
# dialog is only relevant if you want the apex itself to serve something.

# 5. Deploy to production
vercel --prod
```

After deploy, smoke-test:

```bash
curl -sI https://<name>.austinfox.com | head -3   # expect 401 (login page)
curl -sI https://<name>.austinfox.com/_vercel/insights/script.js | head -3  # should NOT be 401 — _vercel paths are excluded
```

Open the URL in a browser, paste the password, confirm the app loads.

## Step 5: Verify Wildcard DNS (one-time, only if it's missing)

The user has already set `*.austinfox.com → CNAME → cname.vercel-dns.com` on Porkbun, so `vercel domains add` should succeed without DNS work. If `vercel domains inspect <name>.austinfox.com` shows a misconfiguration:

1. Have the user log in to Porkbun → `austinfox.com` → DNS Records.
2. Add a record: Type `CNAME`, Host `*`, Answer `cname.vercel-dns.com`, TTL default.
3. Wait 1–5 minutes, then re-run `vercel domains inspect`.

This is a one-time fix per domain. Once set, every future subdomain works with zero DNS work.

## Step 6: Hand Off

Tell the user:
- The live URL.
- The repo URL.
- That the password is `SITE_PASSWORD` in the Vercel project (point to `https://vercel.com/<scope>/<project>/settings/environment-variables` if they need to rotate it).
- That `git push` to `main` triggers an auto-deploy via the Vercel GitHub integration — no need to run `vercel --prod` again unless they want a manual deploy.

## Vercel UI Gotcha: Two Different "Domains" Screens

Vercel has two domain UIs that look similar and confuse newcomers:

| UI | Purpose | Use it when |
|---|---|---|
| **Team → Domains** (account-level) | Claims an apex domain (e.g. `austinfox.com`) and binds it to one project for SSL/nameserver bookkeeping | Only if you want the apex itself to serve a project (e.g. a landing page) |
| **Project → Settings → Domains** | Attaches a specific (sub)domain to that project | **Every subdomain** — `lettera.austinfox.com`, `foo.austinfox.com`, etc. |

Subdomains of the same apex can live on different Vercel projects independently — Vercel verifies each via a DNS lookup against the wildcard CNAME on Porkbun. You do **not** need to claim `austinfox.com` at the team level to attach subdomains to projects. If the user lands on the team-level "Add Domain" dialog asking to assign `austinfox.com` to a project, tell them to back out and use the project-level Domains screen (or the `vercel domains add` CLI from inside the project directory).

## What NOT to Do

- **Don't** enable Vercel's built-in Password Protection (Settings → Deployment Protection). It requires Advanced Deployment Protection (~$150/mo). The custom middleware achieves the same UX for free.
- **Don't** deploy without setting `SITE_PASSWORD` first — the middleware is a no-op when unset, which would publish the project unprotected.
- **Don't** combine multiple personal projects into one Vercel project. The cost of a separate project is zero; the cost of disentangling later is high.
- **Don't** add Next.js for static personal projects. Vite + React is faster and simpler.
- **Don't** create the GitHub repo as public unless the user explicitly asks.
- **Don't** check `SITE_PASSWORD` into the repo (no `.env`, no fallback default in code).

## References

- `references/middleware.ts` — the Edge middleware template. Copy to the project root and adjust the `loginHtml()` styling per project.
