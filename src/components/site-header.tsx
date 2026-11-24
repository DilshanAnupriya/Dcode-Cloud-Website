"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { TraceArrow } from "./trace-arrow";

/** The wordmark, with a light-lettered version for dark mode. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <Image src="/brand/logo-full.png" alt="Dcode Cloud" width={201} height={40} priority className={`${className} dark:hidden`} />
      <Image src="/brand/logo-full-dark.png" alt="Dcode Cloud" width={201} height={40} priority className={`${className} hidden dark:block`} />
    </>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide while reading downwards, come back the moment the reader scrolls up.
      setHidden(y > 320 && y > lastY.current + 2);
      if (y < lastY.current - 2 || y <= 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  // At the top of the page the bar sits flat; once you scroll it lifts into a rounded, floating bar.
  const floating = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,padding] duration-500 ease-out-strong ${
        floating ? "px-3 md:px-6" : "px-0"
      } ${hidden && !open ? "-translate-y-[130%]" : "translate-y-0"}`}
      style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + ${floating ? 12 : 0}px)` }}
    >
      <div
        className={`relative mx-auto border transition-[max-width,border-radius,background-color,border-color,box-shadow] duration-500 ease-out-strong ${
          floating
            ? "max-w-[1180px] rounded-[20px] border-line bg-paper/80 shadow-[0_18px_40px_-24px_rgba(12,20,40,0.45)] backdrop-blur-xl backdrop-saturate-150"
            : "max-w-[1320px] rounded-none border-transparent bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-6 transition-[height,padding] duration-500 ease-out-strong ${
            floating ? "h-[60px] pl-4 pr-2.5 md:pl-5" : "h-[72px] px-5 md:px-10"
          }`}
        >
          <Link href="/" onClick={close} className="relative flex shrink-0 items-center" aria-label="Dcode Cloud home">
            <Logo className={`w-auto transition-[height] duration-500 ease-out-strong ${floating ? "h-8" : "h-9 md:h-10"}`} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-body transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <a href={site.appUrl} className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-body transition-colors duration-200 hover:text-ink">
              Sign in
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Talk to us <TraceArrow />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line-2 bg-card/70 transition-transform duration-150 active:scale-95"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={`absolute h-[2px] w-[18px] rounded-full bg-ink transition-transform duration-200 ease-out-strong ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[2px] w-[18px] rounded-full bg-ink transition-transform duration-200 ease-out-strong ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-96px)] overflow-y-auto rounded-[20px] border border-line bg-paper shadow-[0_24px_48px_-24px_rgba(12,20,40,0.5)] transition-[opacity,transform] duration-200 ease-out-strong lg:hidden ${
            open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          inert={!open}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pb-6 pt-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line py-4 font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" onClick={close} className="btn btn-primary">
                Talk to us <TraceArrow />
              </Link>
              <a href={site.appUrl} className="btn btn-ghost">
                Sign in
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
