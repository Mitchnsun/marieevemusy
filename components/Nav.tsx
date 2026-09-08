"use client";

import { cn } from "@utils/cn";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/", key: "journalisme" },
  { href: "/biographie", key: "biographie" },
  { href: "/ecriture", key: "ecriture" },
  { href: "/acting", key: "acting" },
] as const;

const isCurrentPath = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

const LINK_CLASSES =
  "text-white hover:text-white/50 text-xl leading-5 font-semibold tracking-[1px] transition-colors duration-200";
const BAR_CLASSES = "bg-white h-0.5 w-6 duration-200";

export default function Nav() {
  const t = useTranslations("Nav");
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
    <header ref={headerRef} data-component="Nav" className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Navigation principale"
        className="max-w-page relative z-50 mx-auto flex h-20 items-center justify-end px-9"
      >
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ href, key }) => {
            const isCurrent = isCurrentPath(pathname, href);
            return (
              <li key={href} className="first:*:pl-0 last:*:pr-0">
                <Link
                  href={href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(LINK_CLASSES, "px-3.5", { "text-white/50": isCurrent })}
                >
                  {t(key)}
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
          className="relative flex h-6 w-6 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={cn(BAR_CLASSES, "transition-transform", { "translate-y-2 rotate-45": isMenuOpen })} />
          <span className={cn(BAR_CLASSES, "transition-opacity", { "opacity-0": isMenuOpen })} />
          <span className={cn(BAR_CLASSES, "transition-transform", { "-translate-y-2 -rotate-45": isMenuOpen })} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!isMenuOpen}
        className={cn(
          "bg-brand-gray-50 fixed inset-0 z-40 flex flex-col items-end justify-center gap-8 px-9 lg:hidden",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          { "-translate-y-full": !isMenuOpen }
        )}
      >
        {NAV_LINKS.map(({ href, key }, index) => {
          const isCurrent = isCurrentPath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: isMenuOpen ? `${250 + index * 70}ms` : "0ms" }}
              className={cn(
                LINK_CLASSES,
                "text-brand-gray-900 hover:text-brand-gray-900/50",
                "transition-[color,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                { "translate-y-3 opacity-0": !isMenuOpen, "text-brand-gray-900/50": isCurrent }
              )}
            >
              {t(key)}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
