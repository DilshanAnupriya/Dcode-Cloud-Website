import { z } from "zod";

export const INTERESTS = [
  { value: "payflow", label: "Payflow demo" },
  { value: "crm", label: "CRM early access" },
  { value: "procurement", label: "Procurement early access" },
  { value: "erp", label: "An ERP system" },
  { value: "custom", label: "Custom software or SaaS" },
  { value: "website", label: "A website" },
  { value: "integration", label: "An integration" },
  { value: "support", label: "Help with Payflow" },
] as const;

export type Interest = (typeof INTERESTS)[number]["value"];
const VALUES = INTERESTS.map((i) => i.value) as [Interest, ...Interest[]];

export function isInterest(v: unknown): v is Interest {
  return typeof v === "string" && (VALUES as string[]).includes(v);
}

/** Shared by the form (for instant feedback) and the API route (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Enter your name." }).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.email({ error: "Enter an email address we can reply to." }),
  phone: z.string().trim().max(40).optional().default(""),
  interest: z.enum(VALUES, { error: "Choose what you'd like to talk about." }),
  message: z.string().trim().min(10, { error: "Add a sentence or two about what you need." }).max(5000),
  // Honeypot. Real people never see or fill this field.
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
