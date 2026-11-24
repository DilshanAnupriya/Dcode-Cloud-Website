import { money } from "@/lib/format";
import { gsap } from "@/lib/gsap";

/*
 * Three-way match. PO total: 40×2,450 + 6×18,900 + 12×7,800 = 305,000.
 * The invoice bills toner at 19,400: +500 × 6 = +3,000 (+2.6%), above a
 * 2% tolerance, so it goes to an approver. Invoice total 308,000.
 */

const ITEMS = [
  { name: "A4 paper, box", qty: 40, po: 2450, inv: 2450 },
  { name: "Toner cartridge", qty: 6, po: 18900, inv: 19400 },
  { name: "Laptop stand", qty: 12, po: 7800, inv: 7800 },
];

function Doc({
  kind,
  number,
  date,
  side,
}: {
  kind: "Purchase order" | "Goods received" | "Supplier invoice";
  number: string;
  date: string;
  side: "po" | "grn" | "inv";
}) {
  const total = ITEMS.reduce((s, it) => s + it.qty * (side === "inv" ? it.inv : it.po), 0);
  return (
    <div data-pm-doc={side} className="min-w-0 rounded-2xl border border-line bg-card p-3.5 shadow-[0_10px_24px_-18px_rgba(20,33,61,0.4)]">
      <div className="flex items-baseline justify-between gap-2 border-b border-line pb-2.5">
        <div className="min-w-0">
          <p className="mono truncate text-[0.6rem] uppercase tracking-[0.12em] text-muted">{kind}</p>
          <p className="mono mt-0.5 text-[0.82rem] font-medium text-ink">{number}</p>
        </div>
        <span className="mono shrink-0 text-[0.62rem] text-faint">{date}</span>
      </div>
      <ul className="mt-2 space-y-1">
        {ITEMS.map((it, r) => {
          const variance = side === "inv" && it.inv !== it.po;
          return (
            <li
              key={it.name}
              data-pm-row={r}
              className="grid grid-cols-[1fr_auto] items-baseline gap-2 rounded-lg px-2 py-1.5 text-[0.72rem]"
              // Plain rgba so GSAP can interpolate the highlight. Translucent, so it tints a light or a dark card.
              style={{ backgroundColor: r === 1 ? "rgba(217, 119, 6, 0.14)" : "rgba(14, 159, 110, 0.12)" }}
            >
              <span className="truncate text-body">{it.name}</span>
              <span className={`mono ${variance ? "font-medium text-amber-ink" : "text-ink"}`}>
                {side === "grn" ? `${it.qty} recd` : `${it.qty} × ${money(side === "inv" ? it.inv : it.po, 0)}`}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 flex items-baseline justify-between px-2 text-[0.72rem]">
        <span className="text-muted">{side === "grn" ? "Delivery" : "Total"}</span>
        <span className="mono text-ink">{side === "grn" ? "complete" : money(total)}</span>
      </div>
    </div>
  );
}

export function ProcurementMatch() {
  return (
    <div className="board relative overflow-hidden p-5 md:p-7" data-pm-root>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">Harbour Office Supplies · INV-55120</p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink md:text-xl">Three-way match</p>
        </div>
        <span data-pm-status className="chip chip-live chip-dot">
          Ready to pay
        </span>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        <Doc kind="Purchase order" number="PO-1187" date="04 Nov" side="po" />
        <Doc kind="Goods received" number="GRN-0932" date="18 Nov" side="grn" />
        <Doc kind="Supplier invoice" number="INV-55120" date="20 Nov" side="inv" />
      </div>

      {/* Row verdicts */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-[0.7rem]">
        {ITEMS.map((it, r) => (
          <div
            key={it.name}
            data-pm-verdict={r}
            className={`mono flex items-center gap-1.5 truncate rounded-lg px-2 py-1.5 ${
              r === 1 ? "bg-amber-soft text-amber-ink" : "bg-green-soft text-green-ink"
            }`}
          >
            <span aria-hidden>{r === 1 ? "≈" : "✓"}</span>
            <span className="truncate">{r === 1 ? "price +2.6%" : "match"}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1.35fr_1fr]">
        <div data-pm-variance className="rounded-2xl border border-amber/40 bg-amber-soft/50 p-4">
          <p className="mono text-[0.64rem] uppercase tracking-[0.12em] text-amber-ink">Price variance · toner cartridge</p>
          <p className="mt-1.5 text-[0.82rem] leading-snug text-ink">
            <span className="mono">+500.00 × 6 = 3,000.00</span> is above the 2% tolerance. Sent to the finance manager.
          </p>
          <p data-pm-approved className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-[0.74rem] font-semibold text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-green" /> Approved by R. Fernando
          </p>
        </div>
        <div data-pm-pay className="flex flex-col justify-between rounded-2xl bg-navy-900 p-4">
          <p className="mono text-[0.64rem] uppercase tracking-[0.12em] text-navy-200">Ready to pay</p>
          <p className="mt-2 font-display text-[1.5rem] font-semibold leading-none tracking-tight text-white">
            <span className="mono align-top text-[0.7rem] font-normal text-navy-200">LKR </span>
            {money(308000)}
          </p>
          <p className="mt-2 text-[0.72rem] text-navy-200">Synced to Zoho Books as a bill</p>
        </div>
      </div>
    </div>
  );
}

export function buildProcurementTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const status = q("[data-pm-status]")[0] as HTMLElement;
  const setStatus = (label: string, tone: "live" | "build") => {
    if (!status) return;
    status.textContent = label;
    status.className = `chip chip-dot ${tone === "live" ? "chip-live" : "chip-build"}`;
  };

  const tl = gsap.timeline({ defaults: { ease: "dc-out" } });
  // Documents arrive from different places and settle into line
  tl.from(q("[data-pm-doc='po']"), { autoAlpha: 0, x: -40, y: 18, rotation: -5, duration: 1 }, 0)
    .from(q("[data-pm-doc='grn']"), { autoAlpha: 0, y: 46, rotation: 3, duration: 1 }, 0.15)
    .from(q("[data-pm-doc='inv']"), { autoAlpha: 0, x: 40, y: 18, rotation: 5, duration: 1 }, 0.3);

  // Each line is compared across all three documents in turn
  [0, 1, 2].forEach((r) => {
    const at = 1.4 + r * 0.6;
    tl.from(q(`[data-pm-row='${r}']`), { backgroundColor: "rgba(255,255,255,0)", duration: 0.35, stagger: 0.08 }, at).from(
      q(`[data-pm-verdict='${r}']`),
      { autoAlpha: 0, y: 6, duration: 0.4 },
      at + 0.25,
    );
  });

  tl.call(() => setStatus("Matching", "build"), [], 0)
    .call(() => setStatus("Needs approval", "build"), [], 3.2)
    .from(q("[data-pm-variance]"), { autoAlpha: 0, y: 12, duration: 0.6 }, 3.2)
    .from(q("[data-pm-approved]"), { autoAlpha: 0, scale: 0.9, duration: 0.45, ease: "back.out(2)" }, 4.2)
    .call(() => setStatus("Ready to pay", "live"), [], 4.6)
    .from(q("[data-pm-pay]"), { autoAlpha: 0, y: 12, duration: 0.6 }, 4.6);

  tl.eventCallback("onUpdate", () => {
    const t = tl.time();
    if (t < 3.2) setStatus("Matching", "build");
    else if (t < 4.6) setStatus("Needs approval", "build");
    else setStatus("Ready to pay", "live");
  });
  setStatus("Matching", "build");
  return tl;
}
