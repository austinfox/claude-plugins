# austinfox-claude-plugins

A collection of Claude Code plugins by Austin Fox.

## Plugins

### tax-advisor

Proactive US tax advisor specializing in Washington State — aggressive but legal strategies grounded in current IRS publications and WA DOR guidance.

**Features:**
- Auto-triggered skill — activates on any tax-related conversation
- `/tax-advisor` command — explicit invocation for specific questions
- 4 specialized subagents (situation analyzer, document reviewer, strategy explorer, quarterly estimator)
- 7 reference documents loaded on demand for deep dives
- Bootstrap script downloads latest IRS publications and WA DOR guidance

**[Full documentation](plugins/tax-advisor/README.md)**

### subdomain-deploy

Spin up a new personal project at `<name>.austinfox.com` on Vercel. Auto-triggers on phrases like "deploy this", "ship this", or "set up `<name>`.austinfox.com".

**Features:**
- Auto-triggered skill — activates on austinfox.com subdomain deploy phrases
- One Vercel project per subdomain (no project sharing)
- Default stack: Bun + Vite + React 19 + TypeScript (+ Tailwind v4 when needed)
- Custom Edge middleware for password protection (no Vercel Advanced Deployment Protection required)
- Wildcard DNS already on Porkbun, so subdomain creation is Vercel-only
- Includes a drop-in `middleware.ts` template

## Installation

```bash
# Add the marketplace
/plugin marketplace add austinfox/claude-plugins

# Install a plugin
/plugin install tax-advisor@austinfox-claude-plugins
```

## License

MIT
