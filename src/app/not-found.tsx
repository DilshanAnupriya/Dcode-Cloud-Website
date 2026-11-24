import type { Metadata } from "next";
import Link from "next/link";
import { TraceArrow } from "@/components/trace-arrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-28 pt-[160px]">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-70" />
      <div className="container-x relative">
        <svg aria-hidden className="ill h-auto w-[220px]" viewBox="0 0 220 60" fill="none">
          <path d="M6 30 H90" stroke="#25376A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="96" cy="30" r="6" fill="#25376A" />
          <path d="M130 30 H214" stroke="#C9CEDB" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
          <circle cx="124" cy="30" r="6" fill="none" stroke="#C8102E" strokeWidth="2.5" />
        </svg>
        <p className="eyebrow mt-10">404 · Broken trace</p>
        <h1 className="h-section mt-6 max-w-[18ch]">This page isn&apos;t connected to anything.</h1>
        <p className="lede mt-6 max-w-lg">The link may be old, or the page has moved. Start again from the home page.</p>
        <Link href="/" className="btn btn-primary mt-10">
          Back to home <TraceArrow />
        </Link>
      </div>
    </section>
  );
}
