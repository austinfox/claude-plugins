#!/usr/bin/env bun
/**
 * Bootstrap Tax Knowledge Base
 *
 * Downloads IRS publications, U.S. international guidance, WA DOR, CA FTB,
 * and Swedish government guidance into tax-knowledge/ for source-backed analysis.
 *
 * Usage:
 *   bun run scripts/bootstrap-knowledge.ts
 *   bun run scripts/bootstrap-knowledge.ts --force   # Skip staleness check
 *
 * The tax-knowledge/ directory is gitignored — each user generates their own local copy.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const KNOWLEDGE_DIR = join(ROOT, "tax-knowledge");
const IRS_DIR = join(KNOWLEDGE_DIR, "irs");
const IRS_NOTICES_DIR = join(IRS_DIR, "notices");
const WA_DIR = join(KNOWLEDGE_DIR, "wa-dor");
const CA_DIR = join(KNOWLEDGE_DIR, "ca-ftb");
const INTERNATIONAL_DIR = join(KNOWLEDGE_DIR, "international");
const SWEDEN_DIR = join(KNOWLEDGE_DIR, "sweden");
const LAST_UPDATED_FILE = join(KNOWLEDGE_DIR, ".last-updated");
const STATUS_FILE = join(KNOWLEDGE_DIR, ".bootstrap-status.json");

const STALENESS_DAYS = 30;
const FORCE = process.argv.includes("--force");

// ─── IRS Publication URLs ───────────────────────────────────────────────────────
// IRS publishes PDFs at predictable URLs. These are the current-year versions.
// If a PDF URL fails, we fall back to the HTML version where available.

interface DownloadSource {
  filename: string;
  urls: string[]; // Try in order; first success wins
  description: string;
}

const IRS_SOURCES: DownloadSource[] = [
  {
    filename: "pub-17-your-federal-income-tax.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p17.pdf",
      "https://www.irs.gov/publications/p17",
    ],
    description: "Pub 17 — Your Federal Income Tax",
  },
  {
    filename: "pub-505-tax-withholding-estimated-tax.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p505.pdf",
      "https://www.irs.gov/publications/p505",
    ],
    description: "Pub 505 — Tax Withholding and Estimated Tax",
  },
  {
    filename: "pub-590a-contributions-to-iras.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p590a.pdf",
      "https://www.irs.gov/publications/p590a",
    ],
    description: "Pub 590-A — Contributions to IRAs",
  },
  {
    filename: "pub-590b-distributions-from-iras.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p590b.pdf",
      "https://www.irs.gov/publications/p590b",
    ],
    description: "Pub 590-B — Distributions from IRAs",
  },
  {
    filename: "pub-969-hsa-and-other-tax-favored-health-plans.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p969.pdf",
      "https://www.irs.gov/publications/p969",
    ],
    description: "Pub 969 — HSA and Other Tax-Favored Health Plans",
  },
  {
    filename: "pub-334-tax-guide-small-business.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p334.pdf",
      "https://www.irs.gov/publications/p334",
    ],
    description: "Pub 334 — Tax Guide for Small Business",
  },
  {
    filename: "pub-535-business-expenses.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p535.pdf",
      "https://www.irs.gov/publications/p535",
    ],
    description: "Pub 535 — Business Expenses",
  },
  {
    filename: "pub-550-investment-income-expenses.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p550.pdf",
      "https://www.irs.gov/publications/p550",
    ],
    description: "Pub 550 — Investment Income and Expenses",
  },
  {
    filename: "pub-551-basis-of-assets.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p551.pdf",
      "https://www.irs.gov/publications/p551",
    ],
    description: "Pub 551 — Basis of Assets",
  },
  {
    filename: "pub-544-sales-and-dispositions-of-assets.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p544.pdf",
      "https://www.irs.gov/publications/p544",
    ],
    description: "Pub 544 — Sales and Other Dispositions of Assets",
  },
  {
    filename: "pub-523-selling-your-home.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p523.pdf",
      "https://www.irs.gov/publications/p523",
    ],
    description: "Pub 523 — Selling Your Home",
  },
  {
    filename: "pub-526-charitable-contributions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p526.pdf",
      "https://www.irs.gov/publications/p526",
    ],
    description: "Pub 526 — Charitable Contributions",
  },
  {
    filename: "pub-463-travel-gift-car-expenses.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p463.pdf",
      "https://www.irs.gov/publications/p463",
    ],
    description: "Pub 463 — Travel, Gift, and Car Expenses",
  },
  {
    filename: "pub-587-business-use-of-home.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p587.pdf",
      "https://www.irs.gov/publications/p587",
    ],
    description: "Pub 587 — Business Use of Your Home",
  },
  {
    filename: "form-1040-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i1040gi.pdf",
      "https://www.irs.gov/instructions/i1040",
    ],
    description: "Form 1040 Instructions",
  },
  {
    filename: "schedule-c-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i1040sc.pdf",
      "https://www.irs.gov/instructions/i1040sc",
    ],
    description: "Schedule C Instructions",
  },
  {
    filename: "schedule-d-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i1040sd.pdf",
      "https://www.irs.gov/instructions/i1040sd",
    ],
    description: "Schedule D Instructions",
  },
  {
    filename: "schedule-se-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i1040sse.pdf",
      "https://www.irs.gov/instructions/i1040sse",
    ],
    description: "Schedule SE Instructions",
  },
  {
    filename: "inflation-adjustments-by-tax-year.txt",
    urls: [
      "https://www.irs.gov/newsroom/inflation-adjusted-tax-items-by-tax-year",
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
      "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2025",
    ],
    description: "IRS Inflation-Adjusted Tax Items by Tax Year",
  },
  {
    filename: "pub-54-us-citizens-abroad.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p54.pdf",
      "https://www.irs.gov/forms-pubs/about-publication-54",
    ],
    description: "Pub 54 — U.S. Citizens and Resident Aliens Abroad",
  },
  {
    filename: "pub-514-foreign-tax-credit.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/p514.pdf",
      "https://www.irs.gov/publications/p514",
    ],
    description: "Pub 514 — Foreign Tax Credit for Individuals",
  },
  {
    filename: "form-1116-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i1116.pdf",
      "https://www.irs.gov/instructions/i1116",
    ],
    description: "Form 1116 Instructions — Foreign Tax Credit",
  },
  {
    filename: "form-2555-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i2555.pdf",
      "https://www.irs.gov/instructions/i2555",
    ],
    description: "Form 2555 Instructions — Foreign Earned Income",
  },
  {
    filename: "form-8938-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i8938.pdf",
      "https://www.irs.gov/instructions/i8938",
    ],
    description: "Form 8938 Instructions — Foreign Financial Assets",
  },
  {
    filename: "form-8621-instructions.txt",
    urls: [
      "https://www.irs.gov/pub/irs-pdf/i8621.pdf",
      "https://www.irs.gov/instructions/i8621",
    ],
    description: "Form 8621 Instructions — PFIC Reporting",
  },
];

const WA_SOURCES: DownloadSource[] = [
  {
    filename: "capital-gains-tax-guide.txt",
    urls: [
      "https://dor.wa.gov/taxes-rates/other-taxes/capital-gains-tax",
      "https://dor.wa.gov/get-form-or-publication/publications-subject/tax-topics/capital-gains-tax",
    ],
    description: "WA Capital Gains Tax Guide",
  },
  {
    filename: "bo-tax-classification-guide.txt",
    urls: [
      "https://dor.wa.gov/taxes-rates/business-occupation-tax/business-occupation-tax-classifications",
      "https://dor.wa.gov/taxes-rates/business-occupation-tax",
    ],
    description: "WA B&O Tax Classification Guide",
  },
  {
    filename: "bo-tax-rates.txt",
    urls: [
      "https://dor.wa.gov/find-taxes-rates/business-occupation-tax/business-occupation-tax-classifications",
      "https://dor.wa.gov/taxes-rates/business-occupation-tax/business-occupation-tax-classifications",
    ],
    description: "WA B&O Tax Rates",
  },
  {
    filename: "pfml-rates-and-rules.txt",
    urls: [
      "https://paidleave.wa.gov/employer-roles-responsibilities/",
      "https://paidleave.wa.gov/app/uploads/2024/10/2025-Premium-Rates-Employer-Mailer.pdf",
    ],
    description: "WA PFML Rates and Rules",
  },
  {
    filename: "wa-cares-fund-guide.txt",
    urls: [
      "https://wacaresfund.wa.gov/about-the-fund/",
      "https://wacaresfund.wa.gov/",
    ],
    description: "WA Cares Fund Guide",
  },
  {
    filename: "property-tax-guide.txt",
    urls: ["https://dor.wa.gov/taxes-rates/property-tax"],
    description: "WA Property Tax Guide",
  },
  {
    filename: "estate-tax-guide.txt",
    urls: [
      "https://dor.wa.gov/taxes-rates/other-taxes/estate-tax",
      "https://dor.wa.gov/get-form-or-publication/publications-subject/tax-topics/estate-tax",
    ],
    description: "WA Estate Tax Guide",
  },
];

const INTERNATIONAL_SOURCES: DownloadSource[] = [
  {
    filename: "us-sweden-treaty-technical-explanation-1994.txt",
    urls: ["https://www.irs.gov/pub/irs-trty/sweden-technical-explanation-1994.pdf"],
    description: "U.S.–Sweden Income Tax Treaty Technical Explanation — 1994",
  },
  {
    filename: "us-sweden-protocol-technical-explanation-2005.txt",
    urls: ["https://www.irs.gov/pub/irs-trty/swedente06.pdf"],
    description: "U.S.–Sweden Protocol Technical Explanation — 2005",
  },
  {
    filename: "us-sweden-totalization-agreement.txt",
    urls: [
      "https://www.ssa.gov/international/Agreement_Pamphlets/sweden.html",
      "https://www.ssa.gov/international/Agreement_Texts/sweden.html",
      "https://secure.ssa.gov/apps10/poms.nsf/lnx/0302001400",
    ],
    description: "SSA U.S.–Sweden Totalization Agreement",
  },
  {
    filename: "fbar-requirements.txt",
    urls: ["https://www.fincen.gov/report-foreign-bank-and-financial-accounts"],
    description: "FinCEN FBAR Requirements",
  },
];

const SWEDEN_SOURCES: DownloadSource[] = [
  {
    filename: "declaring-taxes-individuals.txt",
    urls: [
      "https://www.skatteverket.se/declaringtaxes",
      "https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/declaringtaxesforindividuals.4.7be5268414bea064694c5df.html",
    ],
    description: "Skatteverket — Declaring Taxes for Individuals",
  },
  {
    filename: "living-and-working-in-sweden.txt",
    urls: [
      "https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees/movingtosweden.4.7be5268414bea064694c40c.html",
      "https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/individualsandemployees.4.7be5268414bea064694c788.html",
    ],
    description: "Skatteverket — Individuals Living and Working in Sweden",
  },
  {
    filename: "investment-savings-account-isk.txt",
    urls: [
      "https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html",
    ],
    description: "Skatteverket — Investment Savings Account (ISK)",
  },
];

const CA_SOURCES: DownloadSource[] = [
  {
    filename: "ca-income-tax-rates.txt",
    urls: [
      "https://www.ftb.ca.gov/file/personal/tax-calculator-tables-rates.asp",
    ],
    description: "CA FTB Income Tax Rates",
  },
  {
    filename: "ca-standard-deduction.txt",
    urls: [
      "https://www.ftb.ca.gov/file/personal/deductions/index.html",
    ],
    description: "CA FTB Standard Deduction and Deductions",
  },
  {
    filename: "ca-estimated-tax.txt",
    urls: [
      "https://www.ftb.ca.gov/pay/estimated-tax-payments.html",
    ],
    description: "CA FTB Estimated Tax Payments",
  },
  {
    filename: "ca-sdi-rates.txt",
    urls: [
      "https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/",
    ],
    description: "CA SDI/Payroll Tax Rates",
  },
  {
    filename: "ca-credits.txt",
    urls: [
      "https://www.ftb.ca.gov/file/personal/credits/index.html",
    ],
    description: "CA FTB Personal Tax Credits",
  },
  {
    filename: "ca-conformity.txt",
    urls: [
      "https://www.ftb.ca.gov/tax-pros/law/conformity.html",
    ],
    description: "CA FTB Federal-State Conformity Differences",
  },
  {
    filename: "ca-nonresident-part-year.txt",
    urls: [
      "https://www.ftb.ca.gov/file/personal/residency-status/index.html",
    ],
    description: "CA FTB Nonresident and Part-Year Resident Guide",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function isStale(): boolean {
  if (!existsSync(LAST_UPDATED_FILE)) return true;
  const lastUpdated = new Date(readFileSync(LAST_UPDATED_FILE, "utf-8").trim());
  if (Number.isNaN(lastUpdated.getTime())) return true;
  const now = new Date();
  const diffDays =
    (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > STALENESS_DAYS;
}

/**
 * Strip HTML tags and decode common entities to get clean text.
 */
function htmlToText(html: string): string {
  return (
    html
      // Remove script/style blocks
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      // Replace <br>, <p>, <div>, <li>, <tr> with newlines
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/?(p|div|tr|li|h[1-6]|section|article)[^>]*>/gi, "\n")
      // Replace <td> and <th> with tabs
      .replace(/<\/?(td|th)[^>]*>/gi, "\t")
      // Remove remaining HTML tags
      .replace(/<[^>]+>/g, "")
      // Decode common HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&#(\d+);/g, (_m, code) =>
        String.fromCharCode(parseInt(code, 10))
      )
      // Collapse excessive whitespace
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Extract text from a PDF buffer using pdf-parse.
 */
async function pdfToText(buffer: Buffer): Promise<string | null> {
  try {
    // Dynamic import so the script doesn't hard-fail if pdf-parse isn't installed yet
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err) {
    console.warn(
      "  Warning: PDF extraction failed. Run bun install and retry the source."
    );
    console.warn(`  ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

/**
 * Download a source, trying each URL in order.
 * Returns the extracted text content or null on failure.
 */
async function downloadSource(source: DownloadSource): Promise<string | null> {
  for (const url of source.urls) {
    try {
      console.log(`  Trying: ${url}`);
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; TaxAdvisorBootstrap/1.0; educational-use)",
          Accept: "text/html,application/pdf,*/*",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(60_000), // 60 second timeout per request
      });

      if (!response.ok) {
        console.warn(`  HTTP ${response.status} for ${url}`);
        continue;
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("pdf")) {
        const buffer = Buffer.from(await response.arrayBuffer());
        const text = await pdfToText(buffer);
        if (text && text.length > 100) {
          return text;
        }
        console.warn(`  PDF text extraction yielded insufficient content`);
        continue;
      }

      // Assume HTML or plain text
      const html = await response.text();
      if (contentType.includes("html")) {
        const text = htmlToText(html);
        if (text && text.length > 100) {
          return text;
        }
        console.warn(`  HTML text extraction yielded insufficient content`);
        continue;
      }

      // Plain text
      if (html.length > 100) {
        return html;
      }
    } catch (err: any) {
      console.warn(`  Error fetching ${url}: ${err.message}`);
      continue;
    }
  }
  return null;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function downloadGroup(
  title: string,
  outputDir: string,
  sources: DownloadSource[],
  results: { source: string; status: "ok" | "failed" }[]
): Promise<void> {
  console.log(`\n--- ${title} ---\n`);
  for (const source of sources) {
    console.log(`Downloading: ${source.description}`);
    const text = await downloadSource(source);
    if (text) {
      const outPath = join(outputDir, source.filename);
      writeFileSync(outPath, text, "utf-8");
      console.log(
        `  Saved: ${source.filename} (${(text.length / 1024).toFixed(1)} KB)\n`
      );
      results.push({ source: source.description, status: "ok" });
    } else {
      console.warn(`  FAILED: Could not download ${source.description}\n`);
      results.push({ source: source.description, status: "failed" });
    }
  }
}

async function main(): Promise<void> {
  console.log("=== Tax Knowledge Base Bootstrap ===\n");

  // Check staleness
  if (!FORCE && !isStale()) {
    const lastUpdated = readFileSync(LAST_UPDATED_FILE, "utf-8").trim();
    console.log(`Knowledge base is current (last updated: ${lastUpdated}).`);
    console.log(`Use --force to re-download anyway.\n`);
    return;
  }

  // Ensure directories
  ensureDir(IRS_DIR);
  ensureDir(IRS_NOTICES_DIR);
  ensureDir(WA_DIR);
  ensureDir(CA_DIR);
  ensureDir(INTERNATIONAL_DIR);
  ensureDir(SWEDEN_DIR);

  const results: { source: string; status: "ok" | "failed" }[] = [];

  await downloadGroup("IRS Publications", IRS_DIR, IRS_SOURCES, results);
  await downloadGroup(
    "U.S. International Guidance",
    INTERNATIONAL_DIR,
    INTERNATIONAL_SOURCES,
    results
  );
  await downloadGroup(
    "Swedish Tax Agency",
    SWEDEN_DIR,
    SWEDEN_SOURCES,
    results
  );
  await downloadGroup("WA Department of Revenue", WA_DIR, WA_SOURCES, results);
  await downloadGroup("CA Franchise Tax Board", CA_DIR, CA_SOURCES, results);

  const completedAt = new Date().toISOString();
  writeFileSync(LAST_UPDATED_FILE, completedAt, "utf-8");
  writeFileSync(
    STATUS_FILE,
    JSON.stringify({ completedAt, results }, null, 2),
    "utf-8"
  );

  // Summary
  console.log("\n=== Summary ===\n");
  const succeeded = results.filter((r) => r.status === "ok");
  const failed = results.filter((r) => r.status === "failed");
  console.log(`Downloaded: ${succeeded.length}/${results.length} sources`);
  if (failed.length > 0) {
    console.log(`\nFailed sources:`);
    for (const f of failed) {
      console.log(`  - ${f.source}`);
    }
    console.log(
      `\nFailed sources may be temporarily unavailable. Re-run with --force to retry.`
    );
  }
  console.log(
    `\nKnowledge base saved to: ${KNOWLEDGE_DIR}`
  );
  console.log(
    `Next auto-refresh: ${STALENESS_DAYS} days (use --force to override)`
  );
}

main().catch((err) => {
  console.error("Bootstrap failed:", err);
  process.exit(1);
});
