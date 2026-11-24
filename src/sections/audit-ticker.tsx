"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// What a morning looks like in the platform's append-only audit log.
const EVENTS: { t: string; action: string; detail: string; tone?: "red" | "green" }[] = [
  { t: "09:41:07", action: "payroll.run.finalized", detail: "42 payslips · Nov 2026", tone: "green" },
  { t: "09:41:09", action: "integration.journal_posted", detail: "Zoho Books · LKR 212,750.00" },
  { t: "09:42:15", action: "crm.deal.stage_changed", detail: "Proposal → Negotiation" },
  { t: "09:43:02", action: "auth.login.new_device", detail: "alert emailed to owner", tone: "red" },
  { t: "09:44:30", action: "procurement.invoice.matched", detail: "PO-1187 · GRN-0932", tone: "green" },
  { t: "09:45:11", action: "org.member.invited", detail: "role: Payroll Approver" },
  { t: "09:46:48", action: "payroll.payslip.emailed", detail: "42 recipients" },
  { t: "09:47:20", action: "report.export.ready", detail: "EPF C-Form · Nov 2026" },
];

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {EVENTS.map((e) => (
        <li key={e.t} className="mono flex shrink-0 items-center gap-3 text-[0.8rem]">
          <span className="text-navy-400">{e.t}</span>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              e.tone === "red" ? "bg-red-bright" : e.tone === "green" ? "bg-[#34D399]" : "bg-navy-400"
            }`}
          />
          <span className="text-white">{e.action}</span>
          <span className="text-navy-200">{e.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export function AuditTicker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Constant motion, so linear. Two identical rows make the loop seamless.
        const tween = gsap.to(track, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6, ease: "power2.out" });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.out" });
        const el = root.current!;
        el.addEventListener("pointerenter", slow);
        el.addEventListener("pointerleave", resume);
        return () => {
          el.removeEventListener("pointerenter", slow);
          el.removeEventListener("pointerleave", resume);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="on-dark relative bg-navy-950">
      <div className="container-x flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8">
        <p className="mono flex shrink-0 items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-navy-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-bright opacity-60 motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-red-bright" />
          </span>
          Audit log · append-only
        </p>
        <div className="marquee-mask relative min-w-0 flex-1 overflow-hidden">
          <div data-track className="flex w-max">
            <Row />
            <Row />
          </div>
          <p className="sr-only">
            Example audit log entries: a payroll run finalized, a journal posted to Zoho Books, a CRM deal moved
            stage, a new-device sign-in alert, an invoice matched, a member invited, payslips emailed and an EPF
            report exported.
          </p>
        </div>
      </div>
    </div>
  );
}
