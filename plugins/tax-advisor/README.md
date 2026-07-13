# Tax Advisor Plugin

A source-backed U.S. tax advisor plugin for Claude Code. It supports general federal planning and return review, detailed Washington and California issues, and U.S.–Sweden cross-border cases.

## Features

- **Auto-triggered skill** for U.S. tax questions
- **`/tax-advisor` command** for explicit routing
- **4 specialized agents**:
  - Tax Situation Analyzer — comprehensive fact gathering and optimization report
  - Tax Document Reviewer — document reconciliation, errors, and missed items
  - Tax Strategy Explorer — scenario planning with authority and risk ratings
  - Tax Quarterly Estimator — federal/state safe-harbor and payment schedules
- **On-demand references** for federal income, capital gains, investments, business, WA, CA, case law, life events, deadlines, profiles/privacy, and U.S. international/Sweden
- **International coverage** for Form 1116, FTC carryovers, FTC versus FEIE, treaty re-sourcing, FBAR, Form 8938, PFICs, foreign pensions/entities/trusts, and totalization
- **Government-source bootstrap** for IRS, FinCEN, SSA, WA DOR, CA FTB, and Skatteverket material
- **Opt-in profiles** that are gitignored and exclude sensitive identifiers

## Installation

```bash
/plugin marketplace add austinfox/claude-plugins
/plugin install tax-advisor@austinfox-claude-plugins
```

## Setup

Requires [Bun](https://bun.sh).

```bash
cd plugins/tax-advisor/scripts
bun install
bun run bootstrap-knowledge.ts
```

Use `--force` to refresh. The generated `tax-knowledge/` directory is gitignored. `.bootstrap-status.json` records per-source success or failure.

## Usage

```text
/tax-advisor compare standard vs itemized for 2025
/tax-advisor review my W-2 and prior return
/tax-advisor estimate my 2026 Q3 payment
/tax-advisor plan for Washington capital gains
/tax-advisor compare a Roth conversion while living in California
/tax-advisor calculate Form 1116 for Swedish wages and tax
/tax-advisor screen my Swedish ISK for U.S. reporting issues
```

Simple questions are answered directly. Document upload and profile creation are not prerequisites. For detailed calculations, the plugin asks only for facts that materially change the answer.

## U.S.–Sweden workflow

The international reference requires the advisor to reconcile:

1. Worldwide U.S. income and source by work location/type
2. Swedish preliminary withholding versus final legal tax
3. Form 1116 category, paid/accrued method, SEK/USD conversion, limitation, and carryover
4. FTC versus Form 2555/FEIE
5. Article 23 treaty credit sequencing and re-sourcing for U.S.-source income
6. FBAR/Form 8938 and PFIC, pension, entity, trust, and totalization flags

Swedish tax wrappers such as ISK or KF are not assumed to receive equivalent U.S. treatment.

## Tax-year discipline

References may contain year-specific planning material. The skill requires the advisor to establish the requested tax year and verify changing figures against current primary authority before using them. Bootstrap sources use stable “latest” URLs where available and keep tax-year index pages for inflation-adjusted items.

## Privacy

Profiles are optional. When enabled, they are stored under `user-profiles/` (gitignored). The plugin must not persist SSNs/TINs, full account numbers, credentials, unredacted tax documents, or other unnecessary sensitive data.

## Local validation

```bash
claude plugin validate .
cd plugins/tax-advisor/scripts
bun run bootstrap-knowledge.ts --force
```

## Disclaimer

This plugin provides educational tax information, not professional tax advice. Cross-border treaty positions, PFICs, foreign pensions/entities/trusts, and delinquent international forms should be reviewed by a qualified U.S. international tax professional.
