# California State Tax Reference — Tax Year 2025

*Deep-dive reference for CA-specific tax questions. Verify against `${CLAUDE_PLUGIN_ROOT}/tax-knowledge/ca-ftb/` files.*

---

## CA Income Tax — 9 Base Brackets (1% to 12.3%)

California has nine base rate brackets. A separate 1% Mental Health Services Tax on taxable income over $1,000,000 produces a **13.3% effective top marginal rate**—not 14.3%.

### 2025 Tax Brackets

**Single / Married Filing Separately:**

| Rate | Taxable Income Range |
|------|---------------------|
| 1% | $0 - $11,079 |
| 2% | $11,080 - $26,264 |
| 4% | $26,265 - $41,452 |
| 6% | $41,453 - $57,542 |
| 8% | $57,543 - $72,724 |
| 9.3% | $72,725 - $371,479 |
| 10.3% | $371,480 - $445,771 |
| 11.3% | $445,772 - $742,953 |
| 12.3% | Over $742,953 |

**Married Filing Jointly / Qualifying Surviving Spouse:** The 2025 Schedule Y thresholds are twice the single/MFS thresholds.

**Source:** [2025 California Tax Rate Schedules](https://www.ftb.ca.gov/forms/2025/2025-540-tax-rate-schedules.pdf). Use the tax table instead when the form instructions require it, and retrieve another year's schedule before calculating that year.

### Mental Health Services Tax (Additional 1%)

An additional 1% tax applies to taxable income exceeding **$1,000,000** for all filing statuses. It applies only to the excess over $1,000,000 and raises the effective top marginal rate from 12.3% to 13.3%.

---

## Capital Gains Treatment

California taxes capital gains as **ordinary income** — there is no preferential rate for long-term gains. This is the single most significant difference from federal tax and from states like Washington.

- **Short-term and long-term gains** are taxed at the same CA rates
- The maximum CA marginal rate, including the 1% Mental Health Services Tax, is **13.3%**
- **Compare to WA:** WA uses a separate capital-gains excise tax with indexed deductions, exemptions, and tax-year rates
- **Combined federal + CA marginal rate on LTCG:** up to **37.1%** before other interactions (20% federal + 3.8% NIIT + 13.3% CA)
- This makes tax-loss harvesting, installment sales, and gain deferral strategies significantly more valuable for CA residents

---

## Roth Conversion Analysis

CA taxes Roth conversions at **full ordinary income rates**. This is a fundamental difference from WA, where conversions cost $0 in state tax.

- A $100,000 Roth conversion costs **$9,300 to $13,300** in CA state income tax alone (depending on marginal bracket), compared to **$0** in WA
- **If planning to move to a no-income-tax state:** consider deferring Roth conversions until after establishing residency in the new state
- **If planning to stay in CA:** conversions may still make sense if current CA marginal rate is lower than expected retirement rate, but the state tax cost must be factored into the breakeven analysis
- **CA does not tax Roth distributions:** once converted and meeting the 5-year rule, qualified Roth withdrawals are CA tax-free
- **Planning insight:** For CA residents, traditional 401(k) contributions provide a CA tax deduction worth 9.3-13.3% immediately. This state deduction does not exist in WA, making the traditional vs. Roth decision fundamentally different in CA

---

## CA SDI / PFL (State Disability Insurance / Paid Family Leave)

### SDI Rate and Wage Base

- **SDI rate (2025):** **1.2%** of wages ([California EDD historical rates](https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/#historical))
- **Wage cap:** **None** — since January 1, 2024, CA removed the SDI wage cap entirely. All wages are subject to SDI withholding regardless of amount
- At $200,000 salary: SDI = ~$2,200/year. At $500,000: ~$5,500/year
- **Paid Family Leave (PFL)** is funded through the SDI program — there is no separate PFL withholding

### Tax Treatment

- SDI withholding is **deductible as a state tax on federal Schedule A**, subject to the SALT cap ($40,000 OBBBA)
- For CA residents, SDI withholding + CA income tax often exceed the $40,000 SALT cap alone, especially for higher earners
- SDI is **not** deductible on the CA state return (it's already a CA tax)

---

## CA Standard Deduction

CA's standard deduction is **much lower** than the federal standard deduction:

| Filing Status | CA Standard Deduction (2025 approx.) |
|---------------|--------------------------------------|
| Single / MFS | $5,706 |
| MFJ / QSS | $11,412 |
| Head of Household | $11,412 |

As a result, more CA taxpayers benefit from itemizing on their CA return than on their federal return. CA also provides **personal exemption credits** (approximately $144 per exemption) rather than personal exemptions.

---

## CA Credits

Key California-specific credits:

- **CalEITC (California Earned Income Tax Credit):** Refundable credit for low-income workers. Earned income under approximately $30,950. Maximum ~$3,529 with 3+ children. Available even if no federal EITC claimed.
- **Young Child Tax Credit:** Up to $1,117 for families with a qualifying child under age 6 who also qualify for CalEITC.
- **Renter's Credit:** $60 (single) / $120 (MFJ) for renters with CA AGI under approximately $50,746 (single) / $101,492 (MFJ). Nonrefundable. Small but frequently overlooked.
- **Child and Dependent Care Expenses Credit:** CA version of the federal credit. Percentage varies by CA AGI. Can be claimed on CA return even if not claimed federally.
- **Senior Head of Household Credit:** Up to approximately $1,748 for qualifying seniors age 65+ filing as HoH with CA AGI under certain thresholds.
- Verify credit amounts, refundability, and whether a credit can offset each component of tax in the tax-year Form 540 instructions.

---

## Federal-State Conformity

California **does NOT fully conform** to the Internal Revenue Code. Key differences:

### CA Does NOT Conform To:
- **Federal SALT cap:** California does not simply import the federal limitation into its itemized-deduction calculation, but California income tax itself is not deductible on the California return. Reconcile each tax through Schedule CA and the tax-year Form 540 instructions; do not describe all state and local taxes as fully deductible.
- **Bonus depreciation:** CA has different depreciation rules. CA generally does not allow 100% bonus depreciation — taxpayers must add back the federal bonus depreciation and take CA depreciation over the standard recovery period.
- **529 contributions:** Not deductible on the CA return (unlike some states that offer state deductions for 529 contributions).
- **Health Savings Accounts (HSAs):** CA does **not** recognize HSA tax benefits. HSA contributions are not deductible on the CA return, and HSA earnings are taxable income for CA purposes. Taxpayers must add back the federal HSA deduction on their CA return. This makes HSAs less valuable for CA residents than for residents of conforming states.
- **OBBBA new deductions:** Check conformity status for the No Tax on Tips deduction, Overtime deduction, and Auto Loan Interest deduction. CA typically conforms to federal changes with a lag of 1-2 years.

### Common conformity areas

California uses its **own** brackets, standard deduction, and exemption credits; those are not examples of federal conformity. California does conform to selected federal concepts, including many retirement-plan rules, capital-gain holding periods, section 121 home-sale exclusion, and real-property section 1031 exchanges, but with state modifications. Check [FTB conformity guidance](https://www.ftb.ca.gov/tax-pros/law/conformity.html), Schedule CA, and the affected form instructions for the tax year.

---

## CA Estimated Tax

Required if estimated CA tax liability (after withholding and credits) is **$500 or more** ($250 MFS).

### Safe Harbor Rules
- Generally compare **90% of current-year CA tax** with **100% of prior-year CA tax** (110% when prior-year CA AGI exceeds the applicable threshold).
- Taxpayers at or above California's high-income current-year AGI threshold generally must use 90% of current-year tax rather than prior-year safe harbor. Verify thresholds, exceptions, and the exact year in Form 540-ES instructions.

### Installment Pattern

California differs from the federal equal-installment pattern. Under current FTB guidance, the standard required installments are **30% / 40% / 0% / 30%** on the April, June, September, and January due dates, respectively. Retrieve the tax-year dates and disaster relief before calculating.

### Filing
- Use **Form 540-ES** for estimated payments
- Payments can be made via CA FTB website, by mail, or through tax preparation software
- The annualized income installment method may help taxpayers with uneven income
- **Source:** [CA FTB Estimated Tax Payments](https://www.ftb.ca.gov/pay/estimated-tax-payments.html)

---

## CA Business Taxes

### $800 Minimum Franchise Tax
- LLCs organized or doing business in California generally owe the **$800 annual tax**, even with no revenue; verify short-year, cancellation, and other exceptions
- The temporary first-year LLC exemption applied to specified entities organized in 2021–2023 and should not be presented as a general 2025 rule
- California corporations have different first-year minimum-franchise-tax rules; verify entity type and formation year rather than applying one statement to LLCs and corporations
- This is a significant cost for holding companies, dormant entities, or very small businesses

### LLC Fee (Based on Total Income)
In addition to the $800 minimum, LLCs owe an annual fee based on total income:

| Total Income | LLC Fee |
|-------------|---------|
| $250,000 - $499,999 | $900 |
| $500,000 - $999,999 | $2,500 |
| $1,000,000 - $4,999,999 | $6,800 |
| $5,000,000+ | $11,790 |

### S-Corp Tax
- CA imposes a **1.5% tax on net income** (minimum $800) on S-Corps, in addition to pass-through taxation at the individual level
- This is unusual — most states do not tax S-Corp income at the entity level

### C-Corp Tax Rate
- **8.84%** on net income (minimum $800 franchise tax)

### Planning Implications
- The $800 minimum and S-Corp 1.5% tax make entity formation more expensive in CA than in most states
- Consider whether the SE tax savings from S-Corp election justify the additional 1.5% CA entity-level tax + $800 minimum
- **Compare to WA:** WA has no income-based business tax. WA B&O is a gross receipts tax at lower rates (1.5% for services), but applies to gross revenue, not net income

---

## Nonresident / Part-Year Resident Rules

### Source-Based Taxation
CA taxes nonresidents on income **sourced to California** — including wages for services performed in CA, rental income from CA property, and gains from CA-based businesses.

### Residency Audits
CA is **aggressive about residency audits**, particularly for high-income individuals who claim to have moved out of state. The FTB examines:
- Physical presence (days in CA vs. elsewhere)
- Location of primary residence, family, and social connections
- Professional and business ties
- Financial account locations
- Vehicle registrations, voter registration, club memberships
- California's more-than-nine-month rule is a presumption of residency, not a general safe harbor for anyone present fewer than nine months. A separate employment-related safe harbor has detailed requirements; use FTB Publication 1031.

### RSU / Stock Option Allocation
For individuals who earned equity compensation while working in CA but later moved out of state:
- RSU income is allocated based on the ratio of **CA service days to total service days** during the vesting period
- Stock option income is similarly allocated based on service days between grant and exercise/vest
- CA may claim taxing rights on equity compensation even years after a taxpayer has left the state

---

## No CA Estate Tax

California does **not** impose a state estate or inheritance tax. Contrast with Washington's estate tax ($3,000,000 exclusion, rates up to 35%). For high-net-worth individuals considering relocation, the absence of CA estate tax is an advantage over WA, though CA's income tax is far higher during the accumulation phase.

---

## Community Property

California, like Washington, is a **community property state**. The same rules apply:
- Income earned during marriage is community property, split 50/50
- Separate property (pre-marriage, gifts, inheritance) retains its character
- At death of one spouse, **both halves** of community property receive a full stepped-up basis (double step-up)
- If filing MFS, each spouse reports half of all community income

---

## Key Interactions with Federal Tax

### SALT Dominated by CA Income Tax
For CA residents, federal Schedule A SALT often includes substantial California income tax plus property tax. Apply the federal cap and any income-based phase-down for the tax year; do not infer itemizing from income alone.

### Roth Conversion Planning
California residents must include the applicable state marginal tax in a Roth-conversion model. A genuine future move to a no-income-tax state can change timing, but tax brackets, RMDs, Medicare IRMAA, estate goals, and residency substance still control; do not recommend accelerating or deferring solely from state labels.

### Retirement Income
California generally taxes private pensions and 401(k)/IRA distributions but **does not tax U.S. Social Security benefits**. Reconcile federal AGI through Schedule CA rather than treating all retirement income alike.

### Remote Worker CA-Sourcing Rules
California residents generally report income from all sources. A nonresident employee is generally sourced based on services physically performed in California; having a California-based employer alone does not create a blanket “convenience of the employer” rule. Equity and deferred compensation can require service-period allocation, so verify the specific item and workdays.

### CA Muni Bonds
Interest from **CA-issued municipal bonds** is exempt from both federal and CA state income tax — a double tax benefit. For CA residents in high brackets, the tax-equivalent yield of CA munis can be substantial. Interest from non-CA munis is exempt from federal tax but **taxable** for CA state income tax purposes.
