"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Journalisme" },
  { href: "/biographie", label: "Biographie" },
  { href: "/ecriture", label: "Écriture" },
  { href: "/acting", label: "Acting" },
];

const isCurrentPath = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

// TODO: switch the links to white (as on marieevemusy.com) once pages
// have a hero image behind the transparent header.
const LINK_CLASSES =
  "text-brand-gray-900 hover:text-brand-gray-900/50 text-[20px] leading-5 font-semibold tracking-[1px] transition-colors duration-200";

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const siblings = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== headerRef.current
    );
    for (const element of siblings) element.inert = true;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      for (const element of siblings) element.inert = false;
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Navigation principale"
        className="relative z-50 mx-auto flex h-[79px] max-w-[1644px] items-center justify-end px-9"
      >
        <ul className="nav:flex hidden items-center gap-[5px]">
          {NAV_LINKS.map(({ href, label }) => {
            const isCurrent = isCurrentPath(pathname, href);
            return (
              <li key={href} className="first:*:pl-0 last:*:pr-0">
                <Link
                  href={href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`${LINK_CLASSES} px-3.5 ${isCurrent ? "text-brand-gray-900/50" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          // TODO: switch the bars to white together with LINK_CLASSES (see above).
          className="nav:hidden relative flex h-6 w-6 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`bg-brand-gray-900 h-0.5 w-6 transition-transform duration-200 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`bg-brand-gray-900 h-0.5 w-6 transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`bg-brand-gray-900 h-0.5 w-6 transition-transform duration-200 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!isMenuOpen}
        className="nav:hidden bg-brand-gray-50 fixed inset-0 z-40 flex flex-col items-end justify-center gap-8 px-9"
      >
        {NAV_LINKS.map(({ href, label }) => {
          const isCurrent = isCurrentPath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className={`${LINK_CLASSES} ${isCurrent ? "text-brand-gray-900/50" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
