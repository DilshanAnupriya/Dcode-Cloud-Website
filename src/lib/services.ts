export type ServiceKey = "software" | "websites" | "saas" | "integrations" | "ai";

export type Service = {
  key: ServiceKey;
  name: string;
  body: string;
  tags: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    key: "software",
    name: "Custom software and ERP",
    body: "Internal systems, portals, approval workflows and ERP modules built around how your team already works, with roles, audit and reporting from the first release.",
    tags: ["Web apps", "ERP modules", "Workflows"],
    deliverables: [
      "Role-based access for every screen",
      "Approval chains and notifications",
      "Reports and exports your accountant can use",
      "Hosting, backups and monitoring set up for you",
    ],
  },
  {
    key: "websites",
    name: "Websites",
    body: "Fast company and product sites with motion and illustration, like this one. Built on Next.js, quick on a phone and easy for your team to update.",
    tags: ["Next.js", "GSAP", "CMS"],
    deliverables: [
      "Custom illustration and animation",
      "Content your team can edit",
      "Search-friendly pages and metadata",
      "Forms wired into your email or CRM",
    ],
  },
  {
    key: "saas",
    name: "SaaS applications",
    body: "Turn a product idea into a multi-tenant SaaS application with sign-up, company accounts, roles, billing and an admin console, on the architecture we run ourselves.",
    tags: ["Multi-tenant", "Billing", "Roles"],
    deliverables: [
      "Company separation enforced in the database",
      "Sign-in with rotating sessions",
      "Subscription billing and plans",
      "An admin console for your support team",
    ],
  },
  {
    key: "integrations",
    name: "Integrations",
    body: "Connect Zoho, banks, payment gateways and the tools you already use, with retries and monitoring, so nobody has to retype data between systems.",
    tags: ["Zoho", "REST APIs", "Webhooks"],
    deliverables: [
      "OAuth connections with encrypted tokens",
      "Two-way sync with conflict rules",
      "Webhooks checked against the source",
      "A sync history you can read",
    ],
  },
  {
    key: "ai",
    name: "AI features",
    body: "Document reading, assistants and search, added where they save real time and with a person approving anything that matters.",
    tags: ["Extraction", "Assistants", "Search"],
    deliverables: [
      "Invoice and form data extraction",
      "Assistants grounded in your own records",
      "Search across documents and data",
      "Human review before anything is posted",
    ],
  },
];
