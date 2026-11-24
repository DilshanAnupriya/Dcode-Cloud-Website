import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PageHeroMotion } from "@/components/page-hero";
import { isInterest } from "@/lib/contact";
import { abs, breadcrumbLd, graph, ORG, pageMeta, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact us for a demo or a custom project",
  description:
    "Book a Payflow payroll demo, join early access for Dcode CRM or Procurement, or start a custom software or website project with Dcode Cloud in Sri Lanka.",
  path: "/contact",
});

const NEXT = [
  ["We read your message", "The right person picks it up: product questions go to the Payflow team, project briefs to an engineer."],
  ["A short call", "Half an hour to understand your team, your current tools and what needs to change."],
  ["A demo or a proposal", "A Payflow demo on your own numbers, or a written scope and estimate for custom work."],
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { interest } = await searchParams;
  const defaultInterest = isInterest(interest) ? interest : "payflow";

  return (
    <section className="relative overflow-hidden pb-24 pt-[112px] lg:pb-32 lg:pt-[150px]">
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 50% 60% at 20% 20%, #000 30%, transparent 75%)" }}
      />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <PageHeroMotion className="lg:col-span-5">
          <p data-rise className="hero-pre eyebrow">
            Contact
          </p>
          <h1 className="hero-pre h-display mt-7 text-[clamp(2.6rem,5vw,4.6rem)]">Tell us what you need.</h1>
          <p data-rise className="hero-pre lede mt-7 max-w-md">
            A demo, early access or a custom build. Send a few lines and the right person replies by email.
          </p>
          <ol data-rise className="hero-pre mt-12 space-y-6">
            {NEXT.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="mono grid h-9 w-9 place-items-center rounded-full border border-line-2 text-[0.75rem] text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-[0.95rem] text-body">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p data-rise className="hero-pre mt-12 border-t border-line pt-6 text-[0.95rem] text-body">
            Already using Payflow?{" "}
            <a href={site.appUrl} className="font-semibold text-red hover:text-red-deep">
              Sign in
            </a>{" "}
            or choose &ldquo;Help with Payflow&rdquo; in the form.
          </p>
          <p data-rise className="hero-pre mt-4 text-[0.95rem] text-body">
            Prefer email? Write to{" "}
            <a href={`mailto:${ORG.email}`} className="font-semibold text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink">
              {ORG.email}
            </a>
            .
          </p>
        </PageHeroMotion>

        <div className="lg:col-span-7">
          <div className="board p-6 md:p-10">
            <ContactForm defaultInterest={defaultInterest} />
          </div>
        </div>
      </div>
      <JsonLd
        data={graph(breadcrumbLd([{ name: "Contact", path: "/contact" }]), {
          "@type": "ContactPage",
          name: "Contact Dcode Cloud",
          url: abs("/contact"),
          about: { "@id": `${SITE_URL}/#organization` },
        })}
      />
    </section>
  );
}
