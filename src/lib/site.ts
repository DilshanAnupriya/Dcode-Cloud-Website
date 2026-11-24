export const site = {
  name: "Dcode Cloud",
  tagline: "IT Solutions | AI Powered | SaaS Product",
  // Where existing customers sign in. Point this at the production Payflow app.
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/login",
};

export const nav = [
  { href: "/#products", label: "Products" },
  { href: "/erp", label: "ERP" },
  { href: "/#platform", label: "Platform" },
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How we work" },
] as const;

export type ProductSlug = "payflow" | "crm" | "procurement";

export type Product = {
  slug: ProductSlug;
  name: string;
  area: string;
  status: "live" | "building";
  statusLabel: string;
  headline: string;
  summary: string;
  bullets: string[];
  cta: { label: string; href: string };
  groups: { title: string; items: string[] }[];
};

export const products: Product[] = [
  {
    slug: "payflow",
    name: "Dcode Payflow",
    area: "Payroll",
    status: "live",
    statusLabel: "Live",
    headline: "Payroll that gets EPF, ETF and APIT right, then closes the books.",
    summary:
      "Run monthly payroll with approvals, lock finalized payslips so nobody can change them, and post a balanced journal to Zoho Books on its own.",
    bullets: [
      "Draft to paid in seven tracked steps, with a separate approver",
      "EPF C-Form, ETF return, APIT schedule and bank transfer files",
      "Employees download their own payslips",
    ],
    cta: { label: "Explore Payflow", href: "/products/payflow" },
    groups: [
      {
        title: "Run payroll",
        items: [
          "Monthly pay schedules on Asia/Colombo time",
          "Earnings, deductions and employer costs as configurable components",
          "Calculation runs in the background, so large companies never wait on a spinner",
          "Creator and approver can be forced to be different people",
        ],
      },
      {
        title: "Stay compliant",
        items: [
          "EPF 8% employee and 12% employer, ETF 3%",
          "APIT from the IRD monthly tables, including lump-sum payments",
          "Stamp duty on payslips above the threshold",
          "Rates stored as dated versions, so a new budget never rewrites history",
        ],
      },
      {
        title: "Close the month",
        items: [
          "Finalized payslips are locked at the database level",
          "Corrections go into the next run as adjustments, with the reason recorded",
          "Bank transfer files in SLIPS-compatible formats",
          "One balanced journal posted to Zoho Books per run",
        ],
      },
      {
        title: "Look after people",
        items: [
          "PDF payslips emailed to every employee",
          "Self-service access to past payslips",
          "Bank details and NIC numbers encrypted at rest",
          "Every view of bank details written to the audit log",
        ],
      },
    ],
  },
  {
    slug: "crm",
    name: "Dcode CRM",
    area: "Sales",
    status: "building",
    statusLabel: "In development",
    headline: "A sales pipeline your managers can trust.",
    summary:
      "Configurable stages with required fields at each gate, record-level visibility for reps, managers and teams, and forecasts built from what is really in the pipeline.",
    bullets: [
      "Stage gates checked by the server, so required fields can't be skipped",
      "Reps see their own deals, managers see their team's",
      "Custom fields, saved views and duplicate detection",
    ],
    cta: { label: "Join early access", href: "/contact?interest=crm" },
    groups: [
      {
        title: "Pipeline",
        items: [
          "Your own stages, probabilities and forecast categories",
          "Required fields per stage, enforced on save",
          "Stage history for every deal",
          "Weighted amounts that roll up into the forecast",
        ],
      },
      {
        title: "Accounts and contacts",
        items: [
          "Account hierarchies and branches",
          "Duplicate warnings on create, convert and import",
          "Tags, custom fields and saved views per team",
          "Imports with row-level error reports",
        ],
      },
      {
        title: "Visibility",
        items: [
          "Ownership, team and manager-hierarchy access",
          "Filters applied in the database, so reports never leak a row",
          "Transfer records when people change roles",
          "Seven role templates to start from",
        ],
      },
      {
        title: "Automation",
        items: [
          "Workflow rules: trigger, condition, action",
          "Runs in the background with retries",
          "Loop protection and a dead-letter queue",
          "Connected to Payflow on the same platform",
        ],
      },
    ],
  },
  {
    slug: "procurement",
    name: "Dcode Procurement",
    area: "Purchasing",
    status: "building",
    statusLabel: "In development",
    headline: "Purchase orders that match before anyone pays.",
    summary:
      "Requisitions, approvals, purchase orders and goods received notes in one flow, with three-way matching that flags price and quantity differences before an invoice is paid.",
    bullets: [
      "Approval limits by role and amount",
      "Three-way match: PO, GRN and supplier invoice",
      "Differences routed to the right approver",
    ],
    cta: { label: "Join early access", href: "/contact?interest=procurement" },
    groups: [
      {
        title: "Request",
        items: [
          "Purchase requisitions from any team",
          "Budgets checked as the request is raised",
          "Attach quotes and specifications",
          "Track every request to its PO",
        ],
      },
      {
        title: "Approve",
        items: [
          "Approval chains by amount, department and category",
          "Approve from email or the app",
          "Separation between requester and approver",
          "Full history in the audit log",
        ],
      },
      {
        title: "Order and receive",
        items: [
          "Purchase orders generated from approved requests",
          "Supplier records with tax and bank details",
          "Goods received notes, including partial deliveries",
          "Documents stored with the order",
        ],
      },
      {
        title: "Match and pay",
        items: [
          "Three-way match of PO, GRN and invoice",
          "Price and quantity tolerances you set",
          "Variances sent to the right approver",
          "Matched invoices synced to Zoho Books",
        ],
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
