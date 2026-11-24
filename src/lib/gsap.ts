"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, CustomEase, useGSAP);
  // Strong curves from the design-engineering skill. The CSS built-ins are
  // too weak to read as intentional.
  CustomEase.create("dc-out", "M0,0 C0.23,1 0.32,1 1,1");
  CustomEase.create("dc-inout", "M0,0 C0.77,0 0.175,1 1,1");
  // Dev only: lets you scrub and inspect timelines from the console.
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).gsap = gsap;
    (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Movement only runs for people who have not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

/**
 * Play an entrance the first time its trigger is reached, then stay put.
 * Used instead of `once: true`: a once-trigger kills itself, and when several
 * fire inside the same refresh (landing deep on a page via #process, or
 * React re-running effects) ScrollTrigger's trigger list shrinks mid-loop and
 * it throws. These stay alive, so the list never changes under it.
 */
export const PLAY_ONCE = "play none none none";
