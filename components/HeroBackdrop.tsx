"use client";

import { cn } from "@utils/cn";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type HeroBackdropProps = {
  image: StaticImageData;
  imageAlt: string;
  objectPosition: "top" | "left" | "center" | "left-top";
};

/**
 * The hero image as a fixed backdrop: it stays put while the page content scrolls over it, until
 * the hero section has fully scrolled past the viewport, at which point the backdrop is removed
 * from the render tree (no leftover paint cost, no image peeking through at the page bottom).
 *
 * The anchor div matches the hero section's box exactly so an IntersectionObserver on it tells us
 * when the section — and therefore the image behind it — has scrolled out of view.
 *
 * `prefers-reduced-motion` disables the fixed positioning entirely: the image then scrolls with
 * the page like a plain banner, matching the previous (non-sticky) behavior.
 */
export default function HeroBackdrop({ image, imageAlt, objectPosition }: HeroBackdropProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isCovered, setIsCovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(([entry]) => setIsCovered(!entry.isIntersecting));
    observer.observe(anchor);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={anchorRef} data-component="HeroBackdrop" className="absolute inset-0">
      <div
        className={cn("inset-0", {
          "fixed z-0": !prefersReducedMotion,
          absolute: prefersReducedMotion,
          hidden: isCovered,
        })}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          // object-cover on a full-height hero scales these 16:9 sources well past the
          // viewport width on portrait phones, so the mobile slot exceeds 100vw on purpose.
          sizes="(max-width: 1024px) 200vw, 100vw"
          className={cn("object-cover", {
            "object-top": objectPosition === "top",
            "object-left": objectPosition === "left",
            "object-center": objectPosition === "center",
            // A single keyword only sets that axis, defaulting the other to center — for a subject
            // framed off-center (e.g. the home hero's portrait sits in the left third), "top" alone
            // re-centers horizontally and crops the subject out entirely on narrow/tall viewports.
            "object-top-left": objectPosition === "left-top",
          })}
        />
        <div className="absolute inset-0 bg-neutral-900/16" />
      </div>
    </div>
  );
}
