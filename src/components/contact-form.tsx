"use client";

import { useRef, useState } from "react";
import { contactSchema, INTERESTS, type Interest } from "@/lib/contact";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { TraceArrow } from "./trace-arrow";

type Errors = Partial<Record<string, string>>;

const input =
  "h-12 w-full rounded-xl border border-line-2 bg-paper/50 px-4 text-[0.98rem] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-150 focus:border-ink focus:bg-card focus:outline-none focus:ring-4 focus:ring-navy-100 aria-[invalid=true]:border-red";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-[0.9rem] font-semibold text-ink">
        {label}
        {optional && <span className="text-[0.8rem] font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[0.85rem] text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ defaultInterest }: { defaultInterest: Interest }) {
  const [interest, setInterest] = useState<Interest>(defaultInterest);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [firstName, setFirstName] = useState("");
  const done = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (status !== "sent" || !done.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "dc-out" } })
          .from(done.current!.querySelector("[data-ring]"), { scale: 0.85, autoAlpha: 0, transformOrigin: "50% 50%", duration: 0.5 })
          .fromTo(done.current!.querySelector("[data-tick]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.5, ease: "dc-inout" }, 0.15)
          .from(done.current!.querySelectorAll("[data-done-text]"), { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.08 }, 0.3);
      });
      return () => mm.revert();
    },
    { dependencies: [status] },
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = contactSchema.safeParse({ ...data, interest });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(first === "interest" ? `interest-${interest}` : first)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setFirstName(parsed.data.name.split(" ")[0]);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div ref={done} className="flex flex-col items-start py-10" role="status">
        <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" className="ill">
          <circle data-ring cx="32" cy="32" r="30" fill="#DEF7EC" />
          <path data-tick d="M20 33 l8 8 l16 -18" fill="none" stroke="#0E9F6E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 data-done-text className="mt-8 text-[2rem] font-semibold tracking-tight">
          Thanks, {firstName}. Your message is with us.
        </h2>
        <p data-done-text className="mt-4 max-w-md text-body">
          We will reply by email to the address you gave us.
        </p>
        <button
          data-done-text
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.95rem] font-semibold text-red hover:text-red-deep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={(e) => {
        const name = (e.target as HTMLInputElement).name;
        if (!errors[name]) return;
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }}
      noValidate
      className="flex flex-col gap-7"
    >
      <fieldset>
        <legend className="text-[0.9rem] font-semibold text-ink">What would you like to talk about?</legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
          {INTERESTS.map((opt) => {
            const on = opt.value === interest;
            return (
              <label
                key={opt.value}
                htmlFor={`interest-${opt.value}`}
                className={`relative inline-flex h-10 cursor-pointer select-none items-center rounded-full border px-4 text-[0.88rem] font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-navy-100 ${
                  on ? "border-ink bg-ink text-paper" : "border-line-2 bg-card text-ink hover:border-ink"
                }`}
              >
                <input
                  id={`interest-${opt.value}`}
                  type="radio"
                  name="interest"
                  value={opt.value}
                  checked={on}
                  onChange={() => setInterest(opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
        {errors.interest && <p className="mt-2 text-[0.85rem] text-red">{errors.interest}</p>}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field id="company" label="Company" optional>
          <input id="company" name="company" autoComplete="organization" className={input} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={input}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+94" className={input} />
        </Field>
      </div>

      <Field id="message" label="What do you need?" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="For example: 120 staff, monthly payroll in Excel today, we use Zoho Books."
          className={`${input} h-auto min-h-[140px] resize-y py-3 leading-relaxed`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.85rem] text-muted">We only use your details to reply to this message.</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? "Sending…" : "Send message"} <TraceArrow />
        </button>
      </div>
      {status === "failed" && (
        <p role="alert" className="rounded-xl bg-red-soft px-4 py-3 text-[0.9rem] text-red-deep">
          The message didn&apos;t send. Check your connection and try again.
        </p>
      )}
    </form>
  );
}
