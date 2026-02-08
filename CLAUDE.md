# austinfox-claude-plugins — Development Guide

## Project Overview

This is a Claude Code plugin marketplace containing plugins by Austin Fox. Each plugin lives in its own subdirectory under `plugins/`.

## Structure

```
.claude-plugin/marketplace.json    Marketplace catalog (lists all plugins)
plugins/
  tax-advisor/                     Tax advisor plugin
    .claude-plugin/plugin.json       Plugin manifest
    skills/tax-advisor/              Auto-triggered skill (SKILL.md) + 7 reference docs
    commands/tax.md                  /tax slash command with routing logic
    agents/                          4 specialized subagents
    scripts/                         Bootstrap script for IRS/WA DOR publications
    tax-knowledge/                   Generated knowledge base (gitignored, per-user)
```

## Adding a New Plugin

1. Create `plugins/<plugin-name>/` with the standard plugin layout (agents/, commands/, skills/)
2. Add `.claude-plugin/plugin.json` inside the plugin directory
3. Add an entry to `.claude-plugin/marketplace.json` in the `plugins` array
4. Run `claude plugin validate .` to verify

## Tax Advisor Plugin

### Bootstrap the knowledge base

```bash
cd plugins/tax-advisor/scripts && bun install && bun run bootstrap-knowledge.ts
```

Use `--force` to re-download. Auto-refreshes every 30 days.

### Test locally

```bash
claude --plugin-dir plugins/tax-advisor
```

Then try `/tax` or mention taxes in conversation.

### Conventions

- Reference documents in `skills/tax-advisor/references/` are loaded on-demand — keep them under 500 lines each
- Agents use `${CLAUDE_PLUGIN_ROOT}` for all paths
- All tax figures must cite their source (IRS publication or WA DOR page)
- Strategies are risk-rated: Conservative / Moderate / Aggressive
- Dollar estimates required — never vague advice
- Bootstrap URLs break when government sites restructure — update `WA_SOURCES` or `IRS_SOURCES` in `bootstrap-knowledge.ts`

### Tax Year Updates

1. Update brackets, limits, and thresholds in `SKILL.md` and all reference docs
2. Update bootstrap script URLs if IRS/WA DOR changed their link structure
3. Run `bun run bootstrap-knowledge.ts --force` to verify all 26 sources download
4. Bump version in `plugins/tax-advisor/.claude-plugin/plugin.json`

## Validate

```bash
claude plugin validate .
```
