"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** The theme lives on <html data-theme>; watch that attribute so every toggle stays in sync. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function apply(theme: Theme) {
  const root = document.documentElement;
  // Swap without every transition on the page firing at once.
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  window.setTimeout(() => root.classList.remove("theme-switching"), 60);
}

function stored(): string | null {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

/**
 * Light / dark switch. Follows the device setting until someone picks one,
 * then remembers the choice. The first paint is set by the inline script in
 * the root layout, so there is no flash of the wrong theme.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (e: MediaQueryListEvent) => {
      if (!stored()) apply(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  const toggle = () => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const dark = theme === "dark";
  const label = theme ? `Switch to ${dark ? "light" : "dark"} theme` : "Switch theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink transition-[transform,border-color,background-color] duration-150 hover:border-ink active:scale-95 ${className}`}
    >
      {/* Sun, shown in dark mode (the way back to light) */}
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" className="hidden dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      {/* Moon, shown in light mode */}
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" className="dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z" />
      </svg>
    </button>
  );
}
