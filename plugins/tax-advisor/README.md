# Tax Advisor Plugin

A proactive US tax advisor plugin for Claude Code — specializing in Washington State residents with aggressive-but-legal strategies grounded in current IRS publications and WA DOR guidance.

## Features

- **Auto-triggered skill** — activates on any tax-related conversation
- **`/tax` command** — explicit invocation for specific questions
- **4 specialized subagents** for deep analysis:
  - **Tax Situation Analyzer** — structured interview + optimization report
  - **Tax Document Reviewer** — reads W-2s/1099s, finds missed opportunities
  - **Tax Strategy Explorer** — creative aggressive-but-legal strategies with risk ratings
  - **Tax Quarterly Estimator** — quarterly payment calculator with credit card optimization
- **7 reference documents** — loaded on demand for deep dives
- **Bootstrap script** — downloads latest IRS publications and WA DOR guidance

## Installation

```bash
# Add the marketplace
/plugin marketplace add austinfox/claude-plugins

# Install the plugin
/plugin install tax-advisor@austinfox-claude-plugins
```

## Setup

After installation, bootstrap the tax knowledge base:

```bash
cd scripts
bun install
bun run bootstrap-knowledge.ts
```

This downloads the latest IRS publications and WA DOR guidance into `tax-knowledge/` (gitignored — each user generates their own). The knowledge base auto-refreshes every 30 days. Use `--force` to re-download immediately.

### Prerequisites

- [Bun](https://bun.sh) runtime (`curl -fsSL https://bun.sh/install | bash`)

## Usage

### Automatic activation

Start any conversation about taxes — the skill auto-activates and checks for the bootstrapped knowledge base.

### Explicit invocation

```
/tax strategies for capital gains
/tax review my W-2
/tax estimate Q1 payment
/tax compare standard vs itemized
/tax self-employment deductions
/tax WA capital gains planning
```

### Agent workflows

Ask for deep analysis and the appropriate agent will be dispatched:

- "Review my complete tax situation" → Tax Situation Analyzer
- "Look at my W-2 and find what I'm missing" → Tax Document Reviewer
- "What aggressive strategies am I missing?" → Tax Strategy Explorer
- "How much should I pay for Q1 estimated taxes?" → Tax Quarterly Estimator

## Tax Year Coverage

**2025 tax year** (for returns filed in 2026), incorporating:

### Federal (post-One Big Beautiful Bill Act, signed July 4, 2025)
- TCJA made permanent (brackets, standard deduction, estate exemption)
- Standard deduction increased: $15,750 single / $31,500 MFJ
- SALT cap raised to $40,000 (2025-2029)
- Child Tax Credit: $2,200/child
- Section 179: $2,500,000
- New deductions: tips ($25K), overtime ($12.5K), auto loan interest ($10K)
- Senior Bonus Deduction: $6,000 for 65+ (2025-2028)
- Clean Vehicle and Energy credits ended

### Washington State (post-SB 5813, SB 5814, HB 2081, signed May 20, 2025)
- Capital gains tax: tiered 7%/9.9% rate, $278K deduction
- B&O tax: tiered rates by gross income
- PFML: 0.92% total premium
- WA Cares: 0.58% (no cap)
- Estate tax: $3M exclusion, top rate 35%
- Sales tax expanded to IT services, web development, and more

## Philosophy

This advisor is **aggressive but legal**:

- Pushes boundaries within the law
- Understands economic substance doctrine, step transaction doctrine, business purpose doctrine
- Rates every strategy: Conservative / Moderate / Aggressive
- Cites legal basis (IRC sections, case law) for aggressive positions
- Notes audit risk and documentation requirements

## Disclaimer

This plugin provides educational tax information, not professional tax advice. Consult a CPA or tax attorney for advice specific to your situation. Tax laws change frequently — verify current figures before filing.
