# Claude Tax Advisor Plugin — Development Guide

## Project Overview

This is a Claude Code plugin that provides proactive US tax advisory, specializing in Washington State. It covers the 2025 tax year (post-One Big Beautiful Bill Act and WA SB 5813/SB 5814/HB 2081).

## Architecture

```
.claude-plugin/        Plugin + marketplace manifests
skills/tax-advisor/    Auto-triggered skill (SKILL.md) + 7 reference docs
commands/tax.md        /tax slash command with routing logic
agents/                4 specialized subagents (situation analyzer, document reviewer, strategy explorer, quarterly estimator)
scripts/               Bootstrap script to download IRS/WA DOR publications
tax-knowledge/         Generated knowledge base (gitignored, per-user)
```

## Key Files

- `skills/tax-advisor/SKILL.md` — Core skill logic, tax frameworks, agent dispatch rules
- `commands/tax.md` — Slash command routing and response structure
- `agents/*.md` — Each agent has detailed instructions, model config, and tool allowlists
- `scripts/bootstrap-knowledge.ts` — Downloads 26 IRS/WA DOR sources into `tax-knowledge/`
- `.claude-plugin/plugin.json` — Plugin manifest (name, components)
- `.claude-plugin/marketplace.json` — Marketplace catalog for distribution

## Development Workflow

### Bootstrap the knowledge base

```bash
cd scripts && bun install && bun run bootstrap-knowledge.ts
```

Use `--force` to re-download. The knowledge base auto-refreshes every 30 days.

### Test locally

```bash
claude --plugin-dir .
```

Then try `/tax` or mention taxes in conversation to trigger the skill.

### Validate plugin structure

```bash
claude plugin validate .
```

## Conventions

- Reference documents in `skills/tax-advisor/references/` are loaded on-demand by the skill and agents — keep them focused and under 500 lines each
- Agents use `${CLAUDE_PLUGIN_ROOT}` for all paths to work correctly after plugin caching
- All tax figures must cite their source (IRS publication or WA DOR page)
- Strategies are always risk-rated: Conservative / Moderate / Aggressive
- Dollar estimates are required — never give vague "this could save you money" advice
- The bootstrap script URLs break periodically as government sites restructure — if downloads fail, find the new URLs and update `WA_SOURCES` or `IRS_SOURCES` in `bootstrap-knowledge.ts`

## Dependencies

- **Runtime**: Bun (for bootstrap script)
- **npm**: `pdf-parse` (IRS PDF extraction)
- **Dev**: `@types/bun`

## Tax Year Updates

When a new tax year arrives:
1. Update brackets, limits, and thresholds in `SKILL.md` and all reference docs
2. Update the bootstrap script URLs if IRS/WA DOR changed their link structure
3. Run `bun run bootstrap-knowledge.ts --force` to verify all 26 sources download
4. Bump version in `.claude-plugin/plugin.json`
