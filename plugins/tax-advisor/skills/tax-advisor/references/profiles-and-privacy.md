# Tax Profiles and Privacy

Use profiles only when the user explicitly asks the plugin to remember information or agrees after being offered persistence. A profile is a convenience cache, never the source of truth over current documents or user corrections.

## Privacy rules

- Store profiles only in `${CLAUDE_PLUGIN_ROOT}/user-profiles/`; this directory is gitignored.
- Before first save, summarize the fields to be stored and get consent.
- Never store SSNs/TINs, full birth dates, full street addresses, full account or policy numbers, login credentials, document images, or tax-software recovery data.
- Prefer ranges or rounded planning values when exact values are unnecessary.
- Do not infer consent from a document path. Do not copy unredacted document text into a profile.
- Support: **show my profile**, **update my profile**, **forget/delete my profile**, and **start fresh**. Confirm before deletion.
- On load, state the profile date and confirm stale facts that affect the answer.

## Profile schema (version 3)

Unknown values should be `null`; do not guess. Add tax years under `yearOverYear` as needed.

```json
{
  "version": 3,
  "identifier": "example-user",
  "name": "Example User",
  "lastUpdated": "2026-07-13",
  "lastSessionDate": "2026-07-13",
  "sessionCount": 1,
  "consent": {
    "profileStorage": true,
    "consentedAt": "2026-07-13"
  },
  "personal": {
    "filingStatus": null,
    "ageRange": null,
    "dependents": [],
    "countryOfResidence": "US",
    "stateOfResidence": null,
    "citizenships": [],
    "usTaxStatus": null
  },
  "income": {
    "incomeTypes": [],
    "approximateW2Wages": null,
    "approximateTotalIncome": null,
    "hasSelfEmployment": false,
    "hasRentalIncome": false,
    "hasCryptoActivity": false,
    "hasK1Income": false
  },
  "employer": {
    "name": null,
    "hasRSUs": false,
    "hasISOs": false,
    "hasNQSOs": false,
    "hasESPP": false,
    "healthInsuranceType": null,
    "isHDHP": null
  },
  "retirement": {
    "has401k": false,
    "employeeDeferralAmount": null,
    "totalEmployerContribution": null,
    "mbdrCapacity": null,
    "mbdrCurrentContribution": null,
    "hasTraditionalIRA": false,
    "hasRothIRA": false,
    "iraPreTaxBalance": null,
    "doesBackdoorRoth": false,
    "hsaEligible": null,
    "hsaContributionAmount": null,
    "foreignPensions": []
  },
  "deductions": {
    "typicalMethod": null,
    "saltTotal": null,
    "homeownership": {
      "isHomeowner": false,
      "ownershipType": null,
      "ownershipSplit": null,
      "mortgageBalance": null,
      "mortgageInterestAnnual": null,
      "mortgageOriginationDate": null,
      "propertyTaxAnnual": null
    },
    "charitableGivingAnnual": null
  },
  "investments": {
    "hasTaxableBrokerage": false,
    "estimatedLTCG": null,
    "estimatedSTCG": null,
    "capitalLossCarryforward": null,
    "dividendIncome": null,
    "interestIncome": null,
    "hasForeignFunds": false
  },
  "selfEmployment": {
    "hasBusinessIncome": false,
    "entityType": null,
    "annualRevenue": null,
    "annualExpenses": null,
    "hasQBI": null
  },
  "estimatedPayments": {
    "paysEstimatedTaxes": false,
    "totalEstimatedPaid": null,
    "safeHarborMethod": null,
    "priorYearTax": null,
    "usesAnnualizedIncomeMethod": false
  },
  "international": {
    "treatyResidenceCountry": null,
    "taxHomeAbroad": null,
    "daysInUS": null,
    "foreignEarnedIncome": [],
    "foreignTaxes": [],
    "ftc": {
      "method": null,
      "categories": [],
      "carryovers": [],
      "treatyResourcingNeeded": null
    },
    "feie": {
      "claimed": null,
      "qualificationTest": null,
      "lastElectionYear": null
    },
    "foreignReporting": {
      "fbarRequired": null,
      "fbarFiled": null,
      "form8938Required": null,
      "form8938Filed": null,
      "otherForms": []
    },
    "sweden": {
      "swedishTaxResident": null,
      "employmentIncomeSEK": null,
      "preliminaryTaxPaidSEK": null,
      "finalIncomeTaxSEK": null,
      "refundOrAdditionalTaxSEK": null,
      "hasISK": false,
      "hasKF": false,
      "hasSwedishMutualFunds": false,
      "hasSwedishPension": false
    }
  },
  "stateSpecific": {
    "WA": {
      "capitalGainsExposure": null,
      "boTaxClassification": null,
      "pfmlPremiumPaid": null,
      "waCaresPremiumPaid": null
    },
    "CA": {
      "estimatedStateIncomeTax": null,
      "sdiPremiumPaid": null,
      "mentalHealthSurtaxApplies": null,
      "itemizesOnState": null
    }
  },
  "yearOverYear": {},
  "priorAnalysis": {
    "keyFindings": [],
    "openActionItems": [],
    "strategiesDiscussed": [],
    "flags": []
  },
  "notes": []
}
```

`foreignTaxes` entries should identify country, tax year, income category, currency, amount, whether paid or accrued, payment/withholding date when known, whether final or refundable, and the U.S.-dollar translation method. Do not store foreign tax identification numbers.

## Migration

On an approved save:

1. Preserve unknown fields for backward compatibility.
2. For a v1 profile without `stateSpecific`, copy legacy WA fields into `stateSpecific.WA`.
3. For v1/v2, map `personal.state` to `personal.stateOfResidence`, add `countryOfResidence: "US"` only when supported by facts, and add the `international` and `consent` sections.
4. Set `version` to `3`; do not mark consent true unless the user actually consented.
5. Record discussed strategies separately from strategies the user confirms were implemented.

## Profile lifecycle

1. **Load:** select the profile explicitly if more than one exists; summarize relevant facts and date.
2. **Use:** confirm material stale or conflicting facts. Current documents and explicit corrections win.
3. **Save:** show what changed, obtain consent if not already recorded, merge without erasing unknown fields, update timestamps and session count.
4. **Delete:** confirm, remove only the selected profile, and report the path removed.
