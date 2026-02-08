#!/usr/bin/env bun
/**
 * Bootstrap Tax Knowledge Base
 *
 * Downloads the latest IRS publications and WA DOR guidance into tax-knowledge/
 * so the tax advisor skill and agents can reference current, authoritative source material.
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
const LAST_UPDATED_FILE = join(KNOWLEDGE_DIR, ".last-updated");

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
    filename: "rev-proc-current-year.txt",
    urls: [
      "https://www.irs.gov/pub/irs-irbs/irb24-44.pdf", // Rev Proc 2024-40 (2025 figures)
      "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2025",
    ],
    description: "Revenue Procedure — 2025 Inflation Adjustments",
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
      "https://dor.wa.gov/taxes-rates/business-occupation-tax/business-occupation-tax-rates",
    ],
    description: "WA B&O Tax Rates",
  },
  {
    filename: "pfml-rates-and-rules.txt",
    urls: [
      "https://paidleave.wa.gov/employers/premiums/",
      "https://paidleave.wa.gov/help-center/premiums/",
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

// ─── Helpers ────────────────────────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function isStale(): boolean {
  if (!existsSync(LAST_UPDATED_FILE)) return true;
  const lastUpdated = new Date(readFileSync(LAST_UPDATED_FILE, "utf-8").trim());
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
async function pdfToText(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import so the script doesn't hard-fail if pdf-parse isn't installed yet
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err) {
    // If pdf-parse isn't available, return a placeholder
    console.warn(
      "  Warning: pdf-parse not available. Install with: bun install pdf-parse"
    );
    console.warn("  Saving raw PDF metadata instead.");
    return `[PDF content — install pdf-parse to extract text. Buffer size: ${buffer.length} bytes]`;
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

  const results: { source: string; status: "ok" | "failed" }[] = [];

  // Download IRS sources
  console.log("--- IRS Publications ---\n");
  for (const source of IRS_SOURCES) {
    console.log(`Downloading: ${source.description}`);
    const text = await downloadSource(source);
    if (text) {
      const outPath = join(IRS_DIR, source.filename);
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

  // Download WA DOR sources
  console.log("\n--- WA Department of Revenue ---\n");
  for (const source of WA_SOURCES) {
    console.log(`Downloading: ${source.description}`);
    const text = await downloadSource(source);
    if (text) {
      const outPath = join(WA_DIR, source.filename);
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

  // Write timestamp
  writeFileSync(LAST_UPDATED_FILE, new Date().toISOString(), "utf-8");

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
