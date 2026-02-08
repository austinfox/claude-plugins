# Investment Tax Optimization — 2025 Reference

*Loaded on demand for investment tax deep dives. Verify figures against `${CLAUDE_PLUGIN_ROOT}/tax-knowledge/irs/` files.*

## RSU (Restricted Stock Unit) Taxation

RSUs are the most common equity compensation at public companies and carry straightforward tax rules — but the withholding math catches many high earners off guard.

### Tax Treatment at Vesting

RSUs are taxed as **ordinary income** at vesting, based on the fair market value (FMV) on the vest date. The income is reported on your W-2 and is subject to all normal payroll taxes. Your employer typically withholds at the **federal supplemental wage rate**:

- **22% federal** income tax (flat rate on supplemental wages up to $1M)
- **6.2% Social Security** (up to the $176,100 wage base for 2025)
- **1.45% Medicare** (+0.9% Additional Medicare Tax on wages above $200K single / $250K MFJ)

Combined, the total withholding is roughly **22% + 7.65% FICA**. This is almost always **under-withheld** for high earners. If your total taxable income places you in the 32%, 35%, or 37% bracket, the 22% flat rate leaves a significant gap that must be covered through W-4 adjustments or estimated tax payments. Failing to account for this results in a large balance due at filing and potential underpayment penalties.

### Cost Basis and Subsequent Sales

Your cost basis in RSU shares equals the **FMV at the vest date** — the amount already taxed as ordinary income. Any movement in price after vesting is a **capital gain or loss**:

- **Short-term** if sold within 1 year of the vest date (taxed at ordinary income rates)
- **Long-term** if sold more than 1 year after vesting (taxed at 0%/15%/20% depending on income)

### Sell-to-Cover Strategy

Most employers default to sell-to-cover: at vesting, enough shares are sold to cover the tax withholding, and the remaining shares are deposited in your brokerage account. This is generally the most practical approach, but remember the withholding amount is based on the 22% supplemental rate — not your actual marginal rate.

### Washington State Capital Gains Consideration

For WA residents, RSU shares sold after vesting are subject to the WA capital gains tax if your net long-term capital gains exceed the **$278,000 threshold**. The rate is **7% on gains up to $500,000** and **9.9% on gains above $500,000**. This applies to the appreciation after vesting — not the ordinary income at vest (which is not subject to WA tax since WA has no income tax).

### Planning Strategies

Consider **selling RSU shares immediately at vesting** to eliminate single-stock concentration risk and avoid WA capital gains exposure on future appreciation. If you are bullish on the stock and want to hold, understand you are making an active investment decision to concentrate in your employer — and the holding period for long-term capital gains treatment starts at the vest date. Set up **specific lot identification** with your broker so you can control which lots are sold and optimize your tax outcome.

## ISO (Incentive Stock Option) Taxation

ISOs offer a potential path to all-capital-gains treatment, but the AMT trap makes them significantly more complex than they appear.

### Regular Tax Treatment

There is **no regular income tax at exercise** — unlike NQSOs, the spread is not included in ordinary income when you exercise ISOs. If you meet the qualifying holding periods, the entire gain from exercise price to sale price is taxed as **long-term capital gain**.

### The AMT Complication

The spread at exercise (FMV minus exercise price) is an **AMT adjustment item** reported on Form 6251. Even though no cash is received, this spread can push you into AMT territory, generating a tax bill on phantom income. The 2025 AMT exemption amounts are:

- **$88,100** for single filers
- **$137,000** for married filing jointly

If your ISO spread plus other AMT adjustments exceeds these exemptions, you will owe AMT. This is a real cash outlay on unrealized gains — and if the stock drops after exercise, you still owe the AMT.

### Qualifying vs. Disqualifying Disposition

- **Qualifying disposition**: hold shares for more than **2 years from the grant date** AND more than **1 year from the exercise date**. All gain is long-term capital gain.
- **Disqualifying disposition**: sell before meeting both holding periods. The spread at exercise is reclassified as **ordinary income**, and any additional gain above the exercise-date FMV is capital gain/loss.

### AMT Credit Carryforward

If you pay AMT due to ISO exercises, you receive an **AMT credit** (reported on Form 8801) that carries forward to future years. The credit is recoverable in years when your regular tax exceeds your tentative minimum tax. This credit can take several years to fully recoup — track it diligently and ensure your tax preparer applies it each year.

### Planning Strategies

**Calculate your AMT exposure before exercising.** Run Form 6251 projections to determine how many ISOs you can exercise before triggering AMT — the goal is to exercise up to but not beyond your AMT exemption. Consider **exercising in tranches across multiple tax years** to spread the AMT impact. If you exercise early in the year and the stock drops, you can do a same-year disqualifying disposition to unwind the AMT impact. For WA residents, ISOs are particularly attractive because there is no state income tax on the ordinary income component of a disqualifying disposition — the federal tax advantage is your only consideration.

## NQSO (Non-Qualified Stock Option) Taxation

NQSOs are simpler than ISOs but provide no special tax advantages.

### Tax Treatment

The spread at exercise (FMV minus exercise price) is taxed as **ordinary income** and is subject to **FICA taxes** (Social Security + Medicare). If the options are from your employer, the income is reported on your W-2. Your cost basis in the acquired shares equals the **FMV at the exercise date**, and any subsequent gain or loss from that point is treated as a capital gain or loss (short-term or long-term based on holding period from exercise).

### Planning Strategies

**Time your exercises around income levels.** If you anticipate a low-income year — a sabbatical, gap between jobs, or a year with large deductions — exercise NQSOs then to capture the spread at a lower marginal rate. Consider **exercising before expected stock price increases** to minimize the ordinary income component (but be mindful of insider trading rules and blackout periods). If you have both ISOs and NQSOs, exercise NQSOs in higher-income years (where ISO AMT benefits are limited) and save ISO exercises for lower-income years.

## ESPP (Employee Stock Purchase Plan) Taxation

ESPPs under Section 423 are one of the most reliably profitable benefits available to employees.

### Plan Structure

Qualifying ESPP plans offer up to a **15% discount** on company stock, with a **$25,000 annual purchase limit** (based on FMV at the offering date, not the purchase date). Many plans include a **lookback provision** that sets the purchase price based on the lower of the stock price at the start or end of the offering period — combined with the 15% discount, this can yield returns far exceeding 15%.

### Qualifying vs. Disqualifying Disposition

- **Qualifying disposition**: hold shares for more than **2 years from the offering date** AND more than **1 year from the purchase date**. The discount (up to 15% of offering-date FMV) is taxed as ordinary income; any additional gain is long-term capital gain.
- **Disqualifying disposition**: sell before meeting both holding periods. The full spread at purchase (FMV at purchase minus your purchase price) is taxed as **ordinary income**, and any further gain/loss is capital.

### Planning Strategies

ESPP is **almost always free money** — participate at the maximum contribution. The guaranteed 15% discount, especially with a lookback provision, produces an instant, outsized return. Even an **immediate sale at disqualifying disposition rates is profitable**: you pay ordinary income tax only on the discount, and you pocket the after-tax difference with zero market risk. At minimum, every eligible employee should participate and sell immediately for a risk-free return minus ordinary income tax on the discount. Holding for a qualifying disposition can improve the tax outcome but introduces stock price risk during the holding period.

## 83(b) Election

The 83(b) election is a powerful planning tool when you receive restricted property (unvested stock) that is subject to a vesting schedule.

### What It Does

By filing an 83(b) election, you choose to recognize **ordinary income on the current value of the stock at grant** — rather than waiting until vesting, when the value may be dramatically higher. All subsequent appreciation is then treated as capital gain (long-term if held more than 1 year from the election date).

### Filing Requirements — STRICT

You must file the election with the IRS within **30 calendar days** of receiving the restricted property. There are **no extensions, no exceptions, and no relief for late filing**. This deadline is irrevocable — missing it means you are stuck with default tax treatment (taxed at vesting on the full FMV). File via certified mail with return receipt for proof of timeliness, attach a copy to your federal tax return, and provide a copy to your employer.

### The Risk

If you leave the company and forfeit the unvested stock, you **cannot deduct the tax you already paid** via the 83(b) election. Your only recourse is a capital loss on the forfeited shares, which is limited to $3,000/year against ordinary income. This makes 83(b) a calculated bet.

### When to Use It

The election is **almost always beneficial for early-stage startup equity** where the current FMV is nominal — often fractions of a cent per share. Recognizing pennies of ordinary income now, rather than potentially millions at vesting, is an enormous tax advantage. The best case scenario: file 83(b) on stock worth $0.001/share, pay negligible tax, and all growth is long-term capital gain. The 30-day deadline is **STRICT** — calendar it the day you receive the grant.

## Crypto Taxation (2025)

The IRS treats cryptocurrency as **property**, not currency. Every sale, exchange, or use of crypto is a potentially taxable event.

### Taxable Events

Any disposition of crypto triggers a taxable event: selling for fiat currency, exchanging one crypto for another (BTC to ETH), paying for goods or services with crypto, and receiving crypto as compensation (taxed as ordinary income at FMV when received).

### Cost Basis Methods

- **FIFO (First In, First Out)**: the default method if you do not specifically identify lots
- **Specific identification**: you must identify the exact lot being sold at the time of the transaction (not retroactively). This allows you to **sell highest-basis lots first** to minimize taxable gain or maximize deductible losses.

### Mining and Staking

Mining and staking rewards are taxed as **ordinary income** at FMV when the crypto is received (when you gain dominion and control). If mining constitutes a trade or business, self-employment tax may also apply. Your cost basis for future sales equals the FMV at the time of receipt.

### DeFi and Emerging Issues

DeFi introduces significant complexity. Providing liquidity to a pool, yield farming, and wrapping/unwrapping tokens **each may constitute a taxable event** — IRS guidance is still evolving in this area. Yield farming and staking rewards are generally treated as ordinary income at FMV when received. Document every transaction meticulously.

### NFT Taxation

NFTs are taxed as capital assets on sale. If an NFT is classified as a **collectible** (e.g., digital art), the maximum long-term capital gains rate is **28%** rather than the standard 20%. Otherwise, normal capital gains rates apply.

### Reporting and Broker Requirements

Report all crypto transactions on **Form 8949**. Beginning in 2025, centralized exchanges are subject to expanded reporting requirements and must issue **Form 1099-DA**. Full cost basis reporting by brokers begins in **2026** for assets acquired after January 1, 2025. Decentralized platforms and self-custody wallets are not yet subject to broker reporting, but taxpayers must still self-report all transactions.

### Wash Sale Rule — Now Applies to Crypto (2025)

A major change for 2025: **crypto is now subject to wash sale rules**, which were codified to include digital assets. You can no longer sell crypto at a loss, immediately repurchase the same asset, and claim the loss. The 30-day wash sale window applies just as it does to stocks and securities. Plan your tax-loss harvesting accordingly — you must wait 31 days before repurchasing the same crypto, or harvest into a meaningfully different asset.

### WA Capital Gains

Crypto gains count toward the **$278,000 WA capital gains threshold**. Long-term crypto gains above this amount are subject to the 7%/9.9% WA capital gains tax.

## Real Estate Investment Taxation

### Rental Income and Deductions

Rental income is reported on **Schedule E** and can be offset by a range of deductions: depreciation, mortgage interest, property taxes, repairs and maintenance, insurance premiums, property management fees, and travel expenses related to the property.

### Depreciation

- **Residential rental property**: 27.5-year straight-line depreciation
- **Commercial property**: 39-year straight-line depreciation

### Cost Segregation

A cost segregation study reclassifies building components (carpeting, cabinetry, certain electrical systems, site improvements) from 27.5/39-year property to **5, 7, or 15-year recovery periods**. Combined with bonus depreciation, this generates substantial first-year deductions. Under the **OBBBA extension, bonus depreciation is restored to 100%** for qualifying assets placed in service in 2025. Section 179 expensing allows up to **$2,500,000** for qualifying property (OBBBA increase). Cost segregation is typically cost-effective for properties valued at $500K or more.

### 1031 Like-Kind Exchange

Defer **all capital gains** by exchanging one investment property for like-kind property. The timeline is strict:

- **45-day identification window**: identify replacement property within 45 days of selling the relinquished property
- **180-day closing window**: close on the replacement property within 180 days

There is no limit on the number of 1031 exchanges — you can defer indefinitely, and at death the stepped-up basis eliminates the deferred gain entirely. Any cash or non-like-kind property received ("boot") is taxable.

### Passive Activity Loss Rules (Section 469)

Rental real estate losses are **generally passive** — they can only offset other passive income. Two important exceptions:

- **$25,000 active participation allowance**: taxpayers who actively participate in rental activities can deduct up to $25,000 of rental losses against ordinary/active income. This phases out between **$100,000 and $150,000 AGI** and is fully eliminated at $150,000.
- **Short-term rental loophole**: STRs with an average rental period of **7 days or less** are NOT classified as rental activities for passive loss purposes. If you materially participate in the STR operation, losses can offset **ordinary income without REPS qualification**. This is a powerful strategy for high-income earners seeking real estate losses against W-2 income.

### Real Estate Professional Status (REPS)

REPS converts rental activities from passive to **non-passive**, allowing rental losses to offset W-2 and other ordinary income without limitation. Requirements:

- Spend more than **750 hours** per year in real estate trades or businesses
- Real estate activities must constitute more than **50% of your total personal service time**
- Must **materially participate** in each rental activity (or elect to aggregate all rentals)

REPS is **heavily scrutinized by the IRS**. Maintain a contemporaneous time log — calendar entries, daily records, and detailed descriptions of activities. Courts have repeatedly denied REPS claims where logs were reconstructed after the fact.

### Sale of Primary Residence (Section 121)

Exclude up to **$250,000 of gain** (single) or **$500,000** (married filing jointly) on the sale of your primary residence if you owned and used it as your primary residence for at least **2 of the last 5 years**.

## Asset Location Strategy

Asset location is about placing each investment type in the account where it will be most tax-efficient — distinct from asset allocation (what to own).

### Tax-Advantaged Accounts (Traditional 401(k), Traditional IRA, HSA)

Place **tax-inefficient** assets here, where their income is sheltered from annual taxation:

- Bonds and bond funds (interest is taxed as ordinary income)
- REITs (dividends are mostly non-qualified ordinary income)
- Actively traded / high-turnover funds (frequent taxable distributions)
- Commodities and commodity funds

### Taxable Brokerage Accounts

Place **tax-efficient** assets here, where you benefit from lower capital gains rates and control over realization timing:

- Broad market index funds and ETFs (low turnover, minimal distributions)
- Individual stocks held long-term (you control when to realize gains/losses)
- Municipal bonds (interest is federally tax-exempt)
- Qualified dividend stocks (taxed at preferential 0%/15%/20% rates)

### Roth Accounts (Roth 401(k), Roth IRA)

Place your **highest expected growth** investments here, since all growth is tax-free:

- Small-cap growth funds
- Emerging market funds
- Speculative positions — if they produce large gains, those gains are never taxed

### Note for Washington State Residents

Since WA has no state income tax, the asset location benefit for WA residents is **purely federal** — there is no state-level tax drag to optimize around. However, the federal benefit remains significant at higher income levels, where the spread between ordinary income rates (up to 37%) and long-term capital gains rates (up to 20%) creates meaningful savings from proper asset placement. Additionally, the absence of state income tax makes Roth conversions and taxable brokerage gains relatively more attractive for WA residents compared to residents of high-income-tax states.
