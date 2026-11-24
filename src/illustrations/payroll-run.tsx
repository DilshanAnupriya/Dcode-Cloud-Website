import { money } from "@/lib/format";
import { gsap } from "@/lib/gsap";

/*
 * One Payflow payroll run, from draft to paid. Figures are worked through
 * with the 2025/26 rules: EPF 8% / 12%, ETF 3%, APIT Table 1 with the
 * LKR 150,000 monthly relief (35,000 × 6% = 2,100), stamp duty LKR 25.
 * The journal balances: Dr 212,750.00 = Cr 212,750.00.
 */

export const RUN_STATES = ["Draft", "Calculating", "Review", "Approval", "Approved", "Finalized", "Paid"];

const DEDUCTIONS: [string, number][] = [
  ["EPF employee · 8%", -14800],
  ["APIT · Table 1", -2100],
  ["Stamp duty", -25],
];
const EMPLOYER: [string, number][] = [
  ["EPF employer · 12%", 22200],
  ["ETF · 3%", 5550],
];
const JOURNAL: [("Dr" | "Cr"), string, number][] = [
  ["Dr", "Salaries expense", 185000],
  ["Dr", "EPF expense, employer", 22200],
  ["Dr", "ETF expense", 5550],
  ["Cr", "EPF payable", 37000],
  ["Cr", "ETF payable", 5550],
  ["Cr", "APIT payable", 2100],
  ["Cr", "Stamp duty payable", 25],
  ["Cr", "Net salaries payable", 168075],
];
const NET = 168075;
const TOTAL = 212750;

function Lock() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <rect x="1.5" y="5" width="9" height="6.5" rx="1.5" fill="currentColor" />
      <path d="M3.5 5V3.6a2.5 2.5 0 0 1 5 0V5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#DEF7EC" />
      <path d="M4.2 7.2l1.9 1.9 3.8-4.3" fill="none" stroke="#0E9F6E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PayrollRun() {
  return (
    <div className="board relative p-5 md:p-7" data-pr-root>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">RUN-2026-11 · Monthly · 42 employees</p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink md:text-xl">November 2026 payroll</p>
        </div>
        <span data-pr-status className="chip chip-live chip-dot">
          Paid
        </span>
      </div>

      {/* State machine */}
      <div className="relative mt-7" aria-label="Run status: paid">
        <div className="absolute left-[7px] right-[7px] top-[6px] h-[2px] rounded-full bg-line" />
        <div data-pr-progress className="absolute left-[7px] right-[7px] top-[6px] h-[2px] origin-left rounded-full bg-red" />
        <ol className="relative flex justify-between">
          {RUN_STATES.map((s) => (
            <li key={s} data-pr-node className="is-done flex w-0 flex-col items-center">
              <span className="pr-dot block h-[14px] w-[14px] shrink-0 rounded-full border-2 border-red bg-red transition-colors duration-200" />
              <span className="pr-label mono mt-2.5 hidden whitespace-nowrap text-[0.66rem] uppercase tracking-[0.08em] text-ink sm:block">
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.08fr_1fr]">
        {/* Payslip */}
        <div className="relative rounded-2xl border border-line bg-paper/60 p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="mono whitespace-nowrap text-[0.66rem] uppercase tracking-[0.12em] text-muted">Payslip · EMP-0042</p>
              <p className="mt-0.5 text-[0.95rem] font-bold text-ink">N. Perera · Accountant</p>
            </div>
            <span data-pr-lock className="mono inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-white">
              <Lock /> Locked
            </span>
          </div>
          <dl className="mt-4 space-y-1.5 text-[0.82rem]">
            <div data-pr-row className="flex justify-between gap-3">
              <dt className="text-body">Basic salary</dt>
              <dd className="mono text-ink">{money(185000)}</dd>
            </div>
            {DEDUCTIONS.map(([label, amount]) => (
              <div key={label} data-pr-row className="flex justify-between gap-3">
                <dt className="text-body">{label}</dt>
                <dd className="mono text-red">{money(amount)}</dd>
              </div>
            ))}
          </dl>
          <div data-pr-row className="mt-3 flex items-baseline justify-between gap-3 border-t border-dashed border-line-2 pt-3">
            <span className="text-[0.82rem] font-bold text-ink">Net pay</span>
            <span className="mono text-[1.25rem] font-medium text-ink">
              <span className="text-[0.7rem] text-muted">LKR </span>
              <span data-pr-net>{money(NET)}</span>
            </span>
          </div>
          <div data-pr-row className="mt-3 rounded-xl bg-card px-3 py-2.5">
            <p className="mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">Employer pays on top</p>
            <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem]">
              {EMPLOYER.map(([label, amount]) => (
                <span key={label} className="text-body">
                  {label} <span className="mono text-ink">{money(amount)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Journal posted to Zoho Books */}
        <div className="relative rounded-2xl border border-dashed border-line-2 p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="mono whitespace-nowrap text-[0.66rem] uppercase tracking-[0.12em] text-muted">Zoho Books · Journal</p>
              <p className="mt-0.5 text-[0.95rem] font-bold text-ink">Ref RUN-2026-11</p>
            </div>
            <span className="mono shrink-0 text-[0.62rem] text-faint">Asia/Colombo</span>
          </div>
          <ul className="relative mt-4 space-y-1.5 text-[0.78rem]">
            <li
              data-pr-wait
              aria-hidden
              className="invisible absolute inset-0 grid place-items-center rounded-xl border border-dashed border-line-2 bg-paper/60 px-6 text-center text-[0.8rem] leading-snug text-muted opacity-0"
            >
              Posts to Zoho Books on its own when the run is finalized.
            </li>
            {JOURNAL.map(([side, label, amount]) => (
              <li key={label} data-pr-jrow className="grid grid-cols-[1.6rem_1fr_auto] items-baseline gap-2">
                <span className={`mono text-[0.68rem] ${side === "Dr" ? "text-navy-400" : "text-red"}`}>{side}</span>
                <span className={`truncate text-body ${side === "Cr" ? "pl-3" : ""}`}>{label}</span>
                <span className="mono text-ink">{money(amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-end gap-2 border-t border-dashed border-line-2 pt-3 text-[0.72rem]">
            <p>
              <span className="mono block text-[0.62rem] uppercase tracking-[0.12em] text-muted">Total Dr</span>
              <span data-pr-total className="mono text-[0.9rem] text-ink">
                {money(TOTAL)}
              </span>
            </p>
            <span data-pr-balanced className="chip chip-live mb-0.5 px-2">
              <Check /> Balanced
            </span>
            <p className="text-right">
              <span className="mono block text-[0.62rem] uppercase tracking-[0.12em] text-muted">Total Cr</span>
              <span data-pr-total className="mono text-[0.9rem] text-ink">
                {money(TOTAL)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[0.78rem]">
        <span data-pr-chip className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-semibold text-ink">
          <Check /> Approved by K. Silva
        </span>
        <span data-pr-chip className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-semibold text-ink">
          <Check /> Bank file · SLIPS · 42 transfers
        </span>
        <span data-pr-chip className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-semibold text-ink">
          <Check /> 42 payslips emailed
        </span>
      </div>
    </div>
  );
}

/** Builds the draft→paid story. Plays forwards and scrubs backwards cleanly. */
export function buildPayrollTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const nodes = q("[data-pr-node]");
  const status = q("[data-pr-status]")[0] as HTMLElement;
  const net = q("[data-pr-net]")[0] as HTMLElement;
  const totals = q("[data-pr-total]") as HTMLElement[];
  const unit = 10 / (RUN_STATES.length - 1);

  const paint = (step: number) => {
    const current = Math.round(step);
    nodes.forEach((n, i) => {
      n.classList.toggle("is-done", i <= current);
      const dot = n.querySelector<HTMLElement>(".pr-dot");
      const label = n.querySelector<HTMLElement>(".pr-label");
      if (dot) {
        dot.style.backgroundColor = i < current ? "#C8102E" : i === current ? "#FFFFFF" : "#FFFFFF";
        dot.style.borderColor = i <= current ? "#C8102E" : "#C9CEDB";
      }
      if (label) label.style.color = i <= current ? "#14213D" : "#9AA1B4";
    });
    if (current === RUN_STATES.length - 1) {
      const last = nodes[current]?.querySelector<HTMLElement>(".pr-dot");
      if (last) last.style.backgroundColor = "#C8102E";
    }
    if (status) {
      status.textContent = RUN_STATES[current];
      status.className = `chip chip-dot ${current >= 5 ? "chip-live" : "chip-build"}`;
    }
  };

  const step = { v: 0 };
  const money0 = { v: 0 };
  const total0 = { v: 0 };
  const tl = gsap.timeline({ defaults: { ease: "dc-out" } });

  tl.to(step, { v: RUN_STATES.length - 1, duration: 10, ease: "none", onUpdate: () => paint(step.v) }, 0)
    .fromTo(q("[data-pr-progress]"), { scaleX: 0 }, { scaleX: 1, duration: 10, ease: "none" }, 0)
    // Calculating → Review: lines appear, net pay counts up
    .from(q("[data-pr-row]"), { autoAlpha: 0, x: -10, duration: 0.6, stagger: 0.18 }, unit * 1)
    .fromTo(money0, { v: 0 }, {
      v: NET,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (net) net.textContent = money(money0.v);
      },
    }, unit * 1 + 0.4)
    // Approval → Approved
    .from(q("[data-pr-chip]")[0], { autoAlpha: 0, y: 8, scale: 0.96, duration: 0.5 }, unit * 4 - 0.2)
    // Finalized: payslip locks, journal posts and balances
    .from(q("[data-pr-lock]"), { autoAlpha: 0, scale: 0.9, duration: 0.4 }, unit * 5 - 0.1)
    .fromTo(q("[data-pr-wait]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, unit * 5 - 0.2)
    .from(q("[data-pr-jrow]"), { autoAlpha: 0, x: 10, duration: 0.45, stagger: 0.1 }, unit * 5)
    .fromTo(total0, { v: 0 }, {
      v: TOTAL,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => totals.forEach((t) => (t.textContent = money(total0.v))),
    }, unit * 5 + 0.2)
    .from(q("[data-pr-balanced]"), { autoAlpha: 0, scale: 0.85, duration: 0.45, ease: "back.out(2)" }, unit * 5 + 1.1)
    // Paid
    .from(q("[data-pr-chip]").slice(1), { autoAlpha: 0, y: 8, scale: 0.96, duration: 0.5, stagger: 0.15 }, unit * 6 - 0.6);

  // Start from a clean draft; the HTML itself shows the finished run.
  paint(0);
  if (net) net.textContent = money(0);
  totals.forEach((t) => (t.textContent = money(0)));
  return tl;
}
