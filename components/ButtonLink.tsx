import { cn } from "@utils/cn";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "teal";
  external?: boolean;
  className?: string;
};

const INTERNAL_PATHS = new Set(Object.keys(routing.pathnames));

const BASE_CLASSES = "inline-block rounded-full px-10.5 py-4.25 text-base font-semibold";

export default function ButtonLink({
  href,
  children,
  variant = "light",
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    BASE_CLASSES,
    {
      "bg-brand-blue-light text-brand-teal": variant === "light",
      "bg-brand-teal-light text-white": variant === "teal",
    },
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (!INTERNAL_PATHS.has(href)) {
    throw new Error(`ButtonLink: "${href}" is not a known internal route declared in i18n/routing.ts`);
  }

  return (
    <Link href={href as Parameters<typeof Link>[0]["href"]} className={classes}>
      {children}
    </Link>
  );
}
