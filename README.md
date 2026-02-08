# austinfox-claude-plugins

A collection of Claude Code plugins by Austin Fox.

## Plugins

### tax-advisor

Proactive US tax advisor specializing in Washington State — aggressive but legal strategies grounded in current IRS publications and WA DOR guidance.

**Features:**
- Auto-triggered skill — activates on any tax-related conversation
- `/tax` command — explicit invocation for specific questions
- 4 specialized subagents (situation analyzer, document reviewer, strategy explorer, quarterly estimator)
- 7 reference documents loaded on demand for deep dives
- Bootstrap script downloads latest IRS publications and WA DOR guidance

**[Full documentation](plugins/tax-advisor/README.md)**

## Installation

```bash
# Add the marketplace
/plugin marketplace add austinfox/claude-plugins

# Install a plugin
/plugin install tax-advisor@austinfox-claude-plugins
```

## License

MIT
