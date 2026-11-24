import { money } from "@/lib/format";
import { gsap } from "@/lib/gsap";

/*
 * A CRM pipeline. Weighted pipeline = Σ amount × stage probability.
 * Before: 120,000 + 65,000 + 215,000 + 1,200,000 + 825,000 + 1,750,000 = 4,175,000
 * Hill Country Tea moves Proposal (50%) → Negotiation (75%) → Won (100%):
 * 4,175,000 → 4,775,000 → 5,375,000. Won this quarter: 1,750,000 → 4,150,000.
 */

type Deal = { name: string; amount: number; owner: string };
const COLUMNS: { key: string; name: string; p: number; deals: Deal[]; slot?: boolean; mobile?: boolean }[] = [
  { key: "lead", name: "Lead", p: 10, deals: [{ name: "Lotus Pharma", amount: 1200000, owner: "AS" }, { name: "Island Motors", amount: 650000, owner: "RD" }] },
  { key: "qualified", name: "Qualified", p: 25, deals: [{ name: "Harbour Logistics", amount: 860000, owner: "AS" }] },
  { key: "proposal", name: "Proposal", p: 50, deals: [], slot: true, mobile: true },
  { key: "negotiation", name: "Negotiation", p: 75, deals: [{ name: "Coral Bay Hotels", amount: 1100000, owner: "MP" }], slot: true, mobile: true },
  { key: "won", name: "Won", p: 100, deals: [{ name: "Kelani Textiles", amount: 1750000, owner: "RD" }], mobile: true },
];

const MOVER: Deal = { name: "Hill Country Tea", amount: 2400000, owner: "AS" };
const GATE = ["Decision maker named", "Signed quote attached", "Close date set"];

function short(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 2 : 1).replace(/0$/, "")}M` : `${n / 1000}K`;
}

function DealCard({ deal, mover = false }: { deal: Deal; mover?: boolean }) {
  return (
    <div
      {...(mover ? { "data-crm-mover": "" } : { "data-crm-card": "" })}
      className={`relative z-10 rounded-xl border bg-card p-2.5 text-left shadow-[0_6px_16px_-10px_rgba(20,33,61,0.35)] ${
        mover ? "border-red" : "border-line"
      }`}
    >
      <p className="text-[0.76rem] font-bold leading-tight text-ink [overflow-wrap:anywhere]">{deal.name}</p>
      <div className="mt-1.5 flex items-center justify-between gap-1">
        <span className="mono text-[0.68rem] text-body">LKR {short(deal.amount)}</span>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-navy-100 text-[0.55rem] font-bold text-navy-700">
          {deal.owner}
        </span>
      </div>
    </div>
  );
}

export function CrmPipeline() {
  return (
    <div className="board relative p-5 md:p-7" data-crm-root>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">Pipeline · Q4 2026 · My team</p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink md:text-xl">New business</p>
        </div>
        <div className="text-right">
          <p className="mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">Weighted pipeline</p>
          <p className="mono text-[1.05rem] text-ink">
            <span className="text-[0.7rem] text-muted">LKR </span>
            <span data-crm-weighted>{money(5375000, 0)}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
        {COLUMNS.map((col) => (
          <div key={col.key} className={`min-w-0 flex-col ${col.mobile ? "flex" : "hidden sm:flex"}`}>
            <div className="flex items-baseline justify-between gap-1 border-b border-line pb-2">
              <span className="truncate text-[0.74rem] font-bold text-ink">{col.name}</span>
              <span className="mono text-[0.64rem] text-muted">{col.p}%</span>
            </div>
            <div className="mt-2.5 flex min-h-[150px] flex-col gap-2 rounded-xl bg-paper/70 p-1.5">
              {col.deals.map((d) => (
                <DealCard key={d.name} deal={d} />
              ))}
              {col.slot && (
                <div data-crm-slot={col.key} className="h-[68px] rounded-xl border border-dashed border-line-2" />
              )}
              {col.key === "won" && <DealCard deal={MOVER} mover />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-line p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="mono text-[0.64rem] uppercase tracking-[0.12em] text-muted">Stage gate · Won</p>
            <span data-crm-gate-state className="mono text-[0.64rem] uppercase tracking-[0.1em] text-green-ink">
              3 / 3 passed
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-[0.8rem]">
            {GATE.map((g) => (
              <li key={g} className="flex items-center gap-2.5 text-body">
                <span className="relative grid h-[18px] w-[18px] place-items-center rounded-full border border-line-2">
                  <span data-crm-check className="absolute inset-[-1px] grid place-items-center rounded-full bg-green">
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2.2 5.2l1.7 1.7 3.9-4.2" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-navy-900 p-4 text-mist">
          <p className="mono text-[0.64rem] uppercase tracking-[0.12em] text-navy-200">Won this quarter</p>
          <p className="mt-2 font-display text-[1.6rem] font-semibold leading-none tracking-tight text-white">
            <span className="mono align-top text-[0.7rem] font-normal text-navy-200">LKR </span>
            <span data-crm-won className="num">{money(4150000, 0)}</span>
          </p>
          <p data-crm-toast className="mt-3 text-[0.74rem] text-navy-200">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#34D399] align-middle" />
            Deal won · written to the audit log
          </p>
        </div>
      </div>
    </div>
  );
}

export function buildCrmTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const mover = q("[data-crm-mover]")[0] as HTMLElement;
  const slotP = q("[data-crm-slot='proposal']")[0] as HTMLElement;
  const slotN = q("[data-crm-slot='negotiation']")[0] as HTMLElement;
  const weighted = q("[data-crm-weighted]")[0] as HTMLElement;
  const won = q("[data-crm-won]")[0] as HTMLElement;
  const gateState = q("[data-crm-gate-state]")[0] as HTMLElement;

  // Offsets are measured from layout (offsetLeft ignores transforms), so
  // they stay right after a resize; invalidateOnRefresh recomputes them.
  const dx = (slot: HTMLElement) => () => slot.offsetLeft - mover.offsetLeft;
  const dy = (slot: HTMLElement) => () => slot.offsetTop - mover.offsetTop;

  const w = { v: 4175000 };
  const wonV = { v: 1750000 };
  const writeW = () => weighted && (weighted.textContent = money(w.v, 0));
  const writeWon = () => won && (won.textContent = money(wonV.v, 0));
  let passed = 0;
  const writeGate = (n: number) => {
    passed = n;
    if (gateState) {
      gateState.textContent = `${passed} / 3 passed`;
      gateState.style.color = passed === 3 ? "#065F46" : "#92400E";
    }
  };

  const tl = gsap.timeline({ defaults: { ease: "dc-out" } });
  tl.from(q("[data-crm-card]"), { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.06 }, 0)
    .fromTo(mover, { x: dx(slotP), y: dy(slotP), autoAlpha: 0 }, { x: dx(slotP), y: dy(slotP), autoAlpha: 1, duration: 0.4 }, 0.3)
    // Proposal → Negotiation
    .to(mover, { x: dx(slotN), y: dy(slotN), duration: 1, ease: "dc-inout" }, 1)
    .to(w, { v: 4775000, duration: 0.9, ease: "power2.out", onUpdate: writeW }, 1.2)
    // Gate checks tick, one per required field
    .from(q("[data-crm-check]"), { autoAlpha: 0, scale: 0.4, duration: 0.35, stagger: 0.45, ease: "back.out(2.4)" }, 2.1)
    .call(() => writeGate(1), [], 2.1)
    .call(() => writeGate(2), [], 2.55)
    .call(() => writeGate(3), [], 3.0)
    // Negotiation → Won
    .to(mover, { x: 0, y: 0, duration: 1, ease: "dc-inout" }, 3.5)
    .to(w, { v: 5375000, duration: 0.9, ease: "power2.out", onUpdate: writeW }, 3.7)
    .to(wonV, { v: 4150000, duration: 0.9, ease: "power2.out", onUpdate: writeWon }, 3.9)
    .from(q("[data-crm-toast]"), { autoAlpha: 0, y: 6, duration: 0.5 }, 4.4);

  // Clean opening state; the HTML holds the finished board.
  writeW();
  writeWon();
  writeGate(0);
  tl.eventCallback("onUpdate", () => {
    // Keep the gate counter honest when scrubbing backwards past the checks.
    const t = tl.time();
    const n = t < 2.1 ? 0 : t < 2.55 ? 1 : t < 3 ? 2 : 3;
    if (n !== passed) writeGate(n);
  });
  return tl;
}
