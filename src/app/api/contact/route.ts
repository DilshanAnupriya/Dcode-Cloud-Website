import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The form could not be read. Refresh the page and try again." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some fields need attention.",
        issues: parsed.error.issues.map((i) => ({ field: String(i.path[0] ?? ""), message: i.message })),
      },
      { status: 422 },
    );
  }

  // Bots fill the hidden field. Answer as if it worked and drop it.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  // TODO: deliver the enquiry. The platform's notification module already has
  // an SMTP channel (Brevo now, Amazon SES later); send it there, or create a
  // lead in Dcode CRM once that ships. Personal details are not logged.
  console.info("[contact] enquiry received", { interest: parsed.data.interest, hasCompany: Boolean(parsed.data.company) });

  return NextResponse.json({ ok: true });
}
