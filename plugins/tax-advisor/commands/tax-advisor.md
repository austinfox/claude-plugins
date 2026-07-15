---
name: tax-advisor
description: Source-backed U.S. tax planning, document review, estimates, and international/Sweden guidance
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
  - WebSearch
  - Task
  - AskUserQuestion
arguments:
  - name: query
    description: Tax question or workflow, such as "review my return", "estimate Q3", or "Swedish tax credit"
    required: false
---

# /tax-advisor

Apply the operating rules in `${CLAUDE_PLUGIN_ROOT}/skills/tax-advisor/SKILL.md` to the user's query. This is a U.S. tax workflow with detailed WA, CA, and U.S.–Sweden support; do not assume every user lives in Washington or California.

## 1. Parse before intake

- Identify the requested tax year and task.
- Answer a simple conceptual question directly.
- For calculations, reviews, or comprehensive planning, gather only facts that change the answer.
- Offer document review when useful. Do not require documents before addressing the query.
- Load a saved profile only when the user selects it. Save/update one only under the consent and privacy rules in `references/profiles-and-privacy.md`.

## 2. Route the request

| Trigger | Workflow |
|---|---|
| `review`, `check`, `W-2`, `1099`, `return`, `document` | Dispatch `tax-document-reviewer` |
| `estimate`, `quarterly`, `Q1`–`Q4`, `safe harbor`, `payment` | Dispatch `tax-quarterly-estimator` |
| `comprehensive`, `full review`, `analyze my situation` | Dispatch `tax-situation-analyzer` |
| `strategy`, `optimize`, `compare`, `reduce`, `planning` | Load relevant references; dispatch `tax-strategy-explorer` only for a broad multi-strategy request |
| `capital gain`, `loss harvest`, `RSU`, `ESPP`, `option`, `investment` | Load `federal-capital-gains.md` and/or `investment-optimization.md` |
| `self-employment`, `business`, `S-Corp`, `LLC`, `QBI` | Load `self-employment-business.md` |
| `Washington`, `WA` | Load `washington-state.md` |
| `California`, `CA` | Load `california-state.md` |
| `foreign tax`, `Form 1116`, `Form 2555`, `expat`, `abroad`, `FBAR`, `FATCA`, `PFIC`, `Sweden`, `Swedish`, `ISK`, `KF` | Load `international-us-sweden.md` |
| `retirement`, `401(k)`, `IRA`, `Roth`, `HSA` | Load `federal-income-strategies.md` |
| `marriage`, `child`, `home`, `job change`, `move`, `retire` | Load `life-events-planning.md` plus any jurisdiction reference |
| `deadline`, `calendar`, `checklist` | Load `annual-checklist.md` |
| `case`, `ruling`, `Voss`, `acquiescence` | Load and verify `case-law-strategies.md` |
| `profile`, `remember`, `forget me`, `delete profile` | Follow `profiles-and-privacy.md` |

References are under `${CLAUDE_PLUGIN_ROOT}/skills/tax-advisor/references/`.

## 3. Source current law

For substantive advice:

1. Check `${CLAUDE_PLUGIN_ROOT}/tax-knowledge/.last-updated`.
2. If missing, attempt `cd "${CLAUDE_PLUGIN_ROOT}/scripts" && bun install && bun run bootstrap-knowledge.ts` without blocking the answer if it fails.
3. If older than 30 days, refresh with `--force` when practical.
4. Search the knowledge base for the exact tax year and issue.
5. If authority is missing or stale, use official sources via WebSearch. Do not rely on an uncited remembered threshold.

## 4. Cross-border gate

For any foreign income, residence, tax, account, pension, entity, trust, or asset:

- establish U.S. tax status, country/treaty residence, tax year, work locations, income character/source, and foreign-tax timing;
- reconcile worldwide income before calculating credits;
- screen Form 1116 categories and carryovers, FEIE interaction, treaty relief/re-sourcing, exchange rates, foreign-tax redeterminations, FBAR/Form 8938, PFICs, foreign pensions/entities/trusts, and social-security totalization;
- for Sweden, use both U.S. primary authority and Skatteverket evidence. Do not equate preliminary Swedish withholding with final creditable tax or assume Swedish account wrappers receive U.S. tax deferral.

## 5. Respond

Include, as applicable:

- direct conclusion;
- calculations or scenario comparison;
- assumptions and missing facts;
- actionable steps, forms, and dates;
- primary-source citations with tax year;
- scoped professional-review flags;
- the disclaimer required by the skill.

Never fabricate precision. If inputs are incomplete, give a formula, bounded estimate, or document request instead of an invented dollar amount.
