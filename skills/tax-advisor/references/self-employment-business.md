*Loaded on demand for self-employment and business tax deep dives. Verify figures against `${CLAUDE_PLUGIN_ROOT}/tax-knowledge/irs/` files.*

# Self-Employment & Business Taxation — 2025 (Post-One Big Beautiful Bill Act)

## Self-Employment Tax Calculation

Self-employment (SE) tax covers Social Security and Medicare for individuals who work for themselves. Unlike W-2 employees, self-employed individuals pay both the employer and employee portions.

- **SE tax rate**: 15.3% total (12.4% Social Security + 2.9% Medicare) applied to **92.35%** of net SE income. The 92.35% multiplier approximates the employer-equivalent deduction that W-2 workers receive.
- **Social Security wage base for 2025**: $176,100. The 12.4% Social Security portion of SE tax stops applying once combined SE earnings and W-2 wages exceed this threshold. The 2.9% Medicare portion has no cap.
- **Additional Medicare Tax**: 0.9% surtax on SE income exceeding $200,000 (single) or $250,000 (MFJ). This threshold is combined with W-2 wages — if a taxpayer earns $150,000 in W-2 wages and $100,000 in SE income, the additional Medicare tax applies to the $50,000 above the $200,000 threshold.
- **Above-the-line deduction**: 50% of SE tax is deductible on Form 1040, Schedule 1 (Line 15). This reduces AGI but does not reduce net SE income for SE tax calculation purposes.
- **Net SE income** = gross income minus allowable business expenses reported on Schedule C (Form 1040).

**Worked example**: A freelancer with $100,000 net SE income:
- Taxable SE base: $100,000 x 92.35% = $92,350
- SE tax: $92,350 x 15.3% = **$14,130**
- Above-the-line deduction: $14,130 / 2 = **$7,065** (reduces AGI and therefore income tax)

For high earners above the Social Security wage base, only the 2.9% Medicare portion (plus 0.9% additional Medicare if applicable) continues to apply on income above $176,100.

---

## S-Corp Election Analysis

### Purpose
An S-Corp election allows a business owner to split income between a reasonable salary (subject to FICA/payroll taxes) and distributions (not subject to FICA). This can produce significant SE tax savings.

### Example
Consider $200,000 in net business income:
- **As sole proprietorship**: SE tax = $200,000 x 92.35% x 15.3% = ~$28,260 (Social Security portion caps at the wage base, so the actual figure is approximately $28,340 after accounting for the cap and Medicare-only portion above $176,100).
- **As S-Corp with $100,000 salary**: FICA on salary = $100,000 x 15.3% = $15,300. FICA on $100,000 in distributions = $0. Total payroll tax = ~$15,300. **Annual savings: ~$13,000.**

### Reasonable Compensation Rules
The IRS requires that S-Corp owner-employees pay themselves a salary reflecting fair market value for the services they provide. Courts and the IRS evaluate:
- Comparable wages for similar roles in the industry
- Education, training, and experience of the owner
- Duties performed and hours worked
- Business gross revenue and profitability
- Compensation paid to non-owner employees

Setting salary too low invites IRS reclassification of distributions as wages, triggering back payroll taxes, penalties, and interest.

### S-Corp Costs
- Payroll processing: $500-$2,000/year (services like Gusto, ADP)
- Additional tax filing: Form 1120-S (S-Corp return), typically $1,000-$3,000 if CPA-prepared
- State registration and annual report fees (vary by state)
- Potential state-level franchise or privilege taxes

### Break-Even Analysis
S-Corp election generally becomes beneficial when net business profit exceeds **$50,000-$60,000** after accounting for the additional administrative costs. Below this range, the payroll and filing costs often negate any SE tax savings.

### Timing
- File **Form 2553** by **March 15** for current-year election.
- New entities can file within 75 days of formation.
- Late election relief is available in some cases using Rev. Proc. 2013-30.

### Washington State Note
S-Corp election does **not** change B&O (Business and Occupation) tax liability. B&O is a gross receipts tax, not an income-based tax, so the entity structure is largely irrelevant for B&O purposes.

---

## Entity Comparison

| Feature | Sole Prop | SMLLC | S-Corp | C-Corp | Partnership/MMLLC |
|---|---|---|---|---|---|
| **Federal filing** | Schedule C | Schedule C (disregarded) | Form 1120-S + K-1 | Form 1120 | Form 1065 + K-1 |
| **SE tax** | Full on net income | Full on net income | Only on salary | N/A (wages only) | General partners: full |
| **Liability protection** | None | Yes | Yes | Yes | Depends on role |
| **Tax rate** | Individual rates | Individual rates | Pass-through (individual) | Flat 21% corporate | Pass-through (individual) |
| **Double taxation** | No | No | No | Yes (corporate + dividends) | No |

**Key considerations by entity**:
- **Sole Proprietorship**: Simplest structure. All income flows to Schedule C. Subject to full SE tax. Owner bears unlimited personal liability.
- **Single-Member LLC**: Disregarded entity for federal tax purposes (treated as sole prop). Provides state-law liability protection. Can elect S-Corp or C-Corp treatment.
- **S-Corp**: Pass-through entity. Income reported on K-1 to shareholders. Salary + distributions split reduces payroll taxes. Limited to 100 shareholders, one class of stock, no nonresident alien shareholders.
- **C-Corp**: Flat 21% corporate tax rate. Subject to double taxation (corporate level + shareholder dividends at 0/15/20%). Enables **QSBS under IRC Section 1202** — exclude up to $10 million (or 10x basis) in gain on qualified small business stock held 5+ years. Best for businesses planning to retain and reinvest earnings or startups planning exits.
- **Partnership / Multi-Member LLC**: Flexible allocation of income, losses, and credits. K-1 reporting to each partner. General partners face SE tax on their distributive share; limited partners generally do not.

---

## QBI Deduction — Section 199A (2025, Made Permanent by OBBBA)

The Qualified Business Income (QBI) deduction provides a **20% deduction** on qualified business income from pass-through entities (sole proprietorships, S-Corps, partnerships). It is **not** available for C-Corp income.

### Taxable Income Thresholds (2025)
Limitations begin when taxable income (before QBI deduction) exceeds:
- **Single**: $197,300 (phase-in range: $50,000, fully phased in at $247,300)
- **MFJ**: $394,600 (phase-in range: $100,000, fully phased in at $494,600)

### Below Threshold
Full 20% deduction on QBI regardless of business type or W-2 wages paid.

### Above Threshold + Phase-In
- **Specified Service Trades or Businesses (SSTBs)**: Deduction phases out completely above the phase-in range. SSTBs include: health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage services, and any trade or business where the principal asset is the reputation or skill of one or more employees/owners.
- **Non-SSTBs**: Deduction limited to the **greater of**:
  - (a) 50% of W-2 wages paid by the business, **OR**
  - (b) 25% of W-2 wages + 2.5% of UBIA (unadjusted basis immediately after acquisition of qualified property)

### Strategies
- If taxable income is near the threshold, **maximize pre-tax retirement contributions** (Solo 401(k), SEP-IRA) and **HSA contributions** to push taxable income below $197,300 (single) or $394,600 (MFJ).
- **S-Corp QBI planning**: W-2 wages paid to owner-employees count toward the 50% W-2 wage limitation. Setting an appropriate salary can both satisfy reasonable compensation requirements and maximize the QBI deduction.
- **OBBBA made Section 199A permanent** — it was previously scheduled to expire after 2025 under the original TCJA sunset provisions.

---

## Business Deductions Deep Dive

### Home Office (Schedule C or Form 8829)

**Regular method**: Calculate actual expenses (mortgage interest or rent, utilities, insurance, repairs, depreciation) multiplied by the business-use percentage. Business-use percentage = square footage of dedicated office space / total home square footage.

**Simplified method**: $5 per square foot, up to 300 square feet = **maximum $1,500 deduction**. No depreciation, no recapture at sale.

The regular method usually produces a larger deduction for larger offices or more expensive homes. Key requirements: the space must be used **regularly and exclusively** for business. Exceptions exist for daycare facilities and inventory/product storage.

**Depreciation note**: Under the regular method, depreciation on the business portion of the home is required (not optional). This depreciation is recaptured at sale as ordinary income taxed at up to 25%, even if the simplified method was used in other years.

**Washington State advantage**: No state income tax means the federal deduction is the sole benefit, but it remains significant at federal marginal rates of 22-37%.

### Vehicle Deduction

- **Standard mileage rate for 2025**: 67.5 cents per mile for business use.
- **Actual expense method**: Track depreciation, fuel, insurance, maintenance, repairs, and registration, then multiply total by business-use percentage.
- Actual method often yields a larger deduction for expensive vehicles or those with heavy business use.
- **Section 179 for vehicles**:
  - SUVs over 6,000 lbs GVWR: up to **$30,500** first-year Section 179 deduction (SUV-specific cap).
  - Vehicles over 6,000 lbs with no passenger-use restriction (trucks, vans): eligible for the **full Section 179 amount** (up to $2,500,000).
- **Luxury auto depreciation limits** (passenger vehicles under 6,000 lbs): Year 1 with bonus depreciation: $20,400 | Year 2: $19,800 | Year 3: $11,900 | Year 4+: $7,160.
- **Documentation**: Maintain a contemporaneous mileage log recording date, destination, business purpose, and miles driven. The IRS frequently challenges and disallows vehicle deductions lacking proper documentation.

### Meals

- **50% deductible** for business meals with clients, customers, or business associates where a clear business purpose exists and the taxpayer (or employee) is present.
- The temporary 100% deduction for restaurant meals (2021-2022) has expired. All business meals are back to 50%.
- Employee meals provided for the convenience of the employer on business premises: 50% deductible.
- De minimis meals (coffee, snacks provided in the office): 50% deductible.

### Section 179 Expensing (2025, Post-OBBBA)

- **Maximum deduction**: $2,500,000 (increased by OBBBA from $1,250,000 under TCJA).
- **Phase-out threshold**: $4,050,000 in total qualifying property placed in service. The deduction reduces dollar-for-dollar for amounts above this threshold.
- **Eligible property**: tangible personal property (equipment, furniture, machinery), off-the-shelf computer software, qualified improvement property, and certain real property improvements (HVAC, fire protection and alarm systems, security systems, roofing).
- **Ineligible property**: buildings and structural components, land, inventory.
- **100% bonus depreciation**: OBBBA extended 100% first-year bonus depreciation for qualified property (it was phasing down 20% per year under TCJA starting in 2023). Applies to both new and used property acquired and placed in service during the tax year.

### Startup Costs (IRC Section 195)

- Up to **$5,000** deductible in the first year of business. This amount phases out dollar-for-dollar when total startup costs exceed $50,000.
- Remaining startup costs are amortized over **180 months** (15 years) beginning in the month the business opens.
- Qualifying costs include: market research, pre-opening advertising, employee training, travel to establish suppliers or customers, professional fees for business formation (legal, accounting), and surveys of potential markets or products.

---

## Retirement Plans for Self-Employed

### Solo 401(k)

- **Employee deferral**: $23,500 (under 50) / $31,000 (age 50+) / $34,750 (ages 60-63, enhanced catch-up under SECURE 2.0)
- **Employer contribution**: up to 25% of net SE income (net SE income = Schedule C profit minus the deductible half of SE tax)
- **Total maximum**: up to $70,000/year (under 50); higher with catch-up contributions
- **Roth option**: available for the employee deferral portion
- **Loan provision**: borrow up to $50,000 or 50% of vested balance, whichever is less
- **Establishment deadline**: must be established by **December 31** to make employee deferrals for that tax year
- **Eligibility**: only available to self-employed individuals with no full-time W-2 employees other than a spouse

### SEP-IRA

- **Employer contribution only**: up to 25% of net SE income (same calculation as Solo 401(k) employer portion)
- **Maximum**: $70,000 for 2025
- **Administration**: simpler than a Solo 401(k) — no annual Form 5500 filing required (unless plan assets exceed $250,000)
- **Establishment and funding deadline**: can be established and funded up until the tax filing deadline, **including extensions** (April 15 or October 15)
- **Limitations**: no employee deferral, no Roth option, no loan provision
- **Employee coverage**: if the business has employees, the SEP must generally cover those who are 21+, have worked in 3 of the last 5 years, and earned at least $750 in compensation

### Defined Benefit Plan

- Contributions based on actuarial calculations, not a simple percentage of income
- Can shelter **$200,000+** per year for high earners, especially those over 50
- **Annual benefit limit**: $280,000 (2025) — this is the maximum annual retirement benefit, not the contribution limit
- **Best for**: high-income self-employed professionals over age 50 with consistent, predictable income
- **Administration costs**: $1,500-$3,000/year for required actuarial services
- **Combination strategy**: can be paired with a Solo 401(k) for maximum tax-deferred savings

### SIMPLE IRA

- **Employee contribution**: $16,500 (under 50) / $20,000 (age 50+) / $21,250 (ages 60-63)
- **Employer contribution**: either a 3% dollar-for-dollar match or a 2% non-elective contribution on all eligible employee compensation
- Generally **less beneficial** than a Solo 401(k) for most self-employed individuals due to lower contribution limits and less flexibility
- **Establishment deadline**: must be established by **October 1** of the tax year (exception for new employers who come into existence after October 1)

---

## Quarterly Estimated Taxes

Self-employed individuals must make estimated tax payments throughout the year since no employer is withholding taxes on their behalf.

**Due dates**: April 15, June 15, September 15, and January 15 of the following year.

**Safe harbor rules** (avoid underpayment penalty by meeting either):
- Pay at least **100%** of the prior year's total tax liability (or **110%** if prior year AGI exceeded $150,000), **OR**
- Pay at least **90%** of the current year's tax liability

**Underpayment penalty**: calculated on a per-quarter basis using the IRS underpayment interest rate (federal short-term rate + 3%).

**Strategy for irregular income**: Use the **annualized income installment method** (Form 2210, Schedule AI) if income is concentrated in certain quarters. This method calculates the required payment based on income actually earned through each quarter rather than assuming income is earned evenly throughout the year. This is particularly useful for seasonal businesses or those with large Q4 earnings.

---

## Hobby Loss Rules (IRC Section 183)

If an activity is **not engaged in for profit**, losses from that activity cannot be used to offset other income. Under TCJA, miscellaneous itemized deductions (which previously allowed partial hobby expense deductions) were eliminated. OBBBA made this elimination permanent.

### IRS Factors for Determining Profit Motive
The IRS evaluates the following (no single factor is determinative):
1. Manner in which the taxpayer carries on the activity (businesslike records, separate bank account, business plan)
2. Expertise of the taxpayer or their advisors
3. Time and effort expended
4. Expectation that assets used may appreciate in value
5. Taxpayer's success in carrying on similar activities
6. History of income or losses from the activity
7. Amount of occasional profits earned
8. Financial status of the taxpayer (does taxpayer need the income?)
9. Elements of personal pleasure or recreation

### Safe Harbor Presumption
If the activity produces a **profit in 3 out of 5 consecutive years** (2 out of 7 years for horse breeding, training, showing, or racing), a rebuttable presumption of profit motive exists. The taxpayer can elect under IRC Section 183(e) to postpone the determination by filing Form 5213, but this also extends the statute of limitations.

### Strategy
- Maintain separate books and a dedicated business bank account
- Document business intent with a written business plan
- Track time spent on the activity
- Treat the activity professionally: obtain business licenses, maintain insurance, engage in marketing
- Seek advice from experts in the field and document that advice
- Adjust operations based on results (show you are learning from losses and changing strategy)
