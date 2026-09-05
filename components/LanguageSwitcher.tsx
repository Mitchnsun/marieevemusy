"use client";

import { cn } from "@utils/cn";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <nav aria-label={t("label")} className="flex items-center gap-2">
      {routing.locales.map((availableLocale) => {
        const isCurrent = availableLocale === locale;
        return (
          <Link
            key={availableLocale}
            href={pathname}
            locale={availableLocale}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={t(availableLocale)}
            className={cn("text-brand-blue-light text-sm font-semibold uppercase", {
              "underline underline-offset-4": isCurrent,
              "opacity-60 hover:opacity-100": !isCurrent,
            })}
          >
            {availableLocale}
          </Link>
        );
      })}
    </nav>
  );
}
