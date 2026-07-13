# austinfox-claude-plugins — Development Guide

## Project Overview

This is a Claude Code plugin marketplace containing plugins by Austin Fox. Each plugin lives in its own subdirectory under `plugins/`.

## Structure

```
.claude-plugin/marketplace.json    Marketplace catalog (lists all plugins)
plugins/
  tax-advisor/                     Tax advisor plugin
    .claude-plugin/plugin.json       Plugin manifest
    skills/tax-advisor/              Auto-triggered skill + on-demand federal, state, profile, and international references
    commands/tax-advisor.md            /tax-advisor slash command with routing logic
    agents/                          4 specialized subagents
    scripts/                         Bootstrap script for IRS, FinCEN, SSA, WA DOR, CA FTB, and Skatteverket sources
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

Then try `/tax-advisor` or mention taxes in conversation.

### Conventions

- Reference documents in `skills/tax-advisor/references/` are loaded on-demand — keep them under 500 lines each
- Agents use `${CLAUDE_PLUGIN_ROOT}` for all paths
- All tax figures and material conclusions must cite current primary authority for the relevant tax year
- Strategies are risk-rated: Conservative / Moderate / Aggressive
- Quantify when supported by the user's inputs; never fabricate precision
- Bootstrap URLs break when government sites restructure — update the relevant source group in `bootstrap-knowledge.ts`

### Tax Year Updates

1. Update year-specific brackets, limits, and thresholds in the relevant reference docs
2. Update bootstrap source URLs when any agency changes its link structure
3. Run `bun run bootstrap-knowledge.ts --force` and review `.bootstrap-status.json` for failed sources
4. Bump version in `plugins/tax-advisor/.claude-plugin/plugin.json`

## Validate

```bash
claude plugin validate .
```
