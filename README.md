# austinfox-claude-plugins

A collection of Claude Code plugins by Austin Fox.

## Plugins

### tax-advisor

Source-backed U.S. tax planning, document review, and estimated-tax guidance with detailed Washington, California, and U.S.–Sweden cross-border coverage.

**Features:**
- Auto-triggered tax skill and `/tax-advisor` command
- 4 specialized subagents for comprehensive analysis, documents, planning, and estimates
- On-demand federal, state, international, case-law, and privacy references
- Foreign tax credit, FEIE, treaty, FBAR/FATCA, PFIC, and Sweden-specific screening
- Bootstrap script for current U.S., WA, CA, and Swedish government sources
- Opt-in, gitignored profiles that exclude sensitive identifiers

**[Full documentation](plugins/tax-advisor/README.md)**

## Installation

```bash
/plugin marketplace add austinfox/claude-plugins
/plugin install tax-advisor@austinfox-claude-plugins
```

## License

MIT
