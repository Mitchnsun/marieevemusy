import type { MetadataRoute } from "next";

import { getHtmlLang } from "@/i18n/localeTags";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/utils/siteUrl";

type RoutePathname = keyof typeof routing.pathnames;

const PRIORITIES: Record<RoutePathname, number> = {
  "/": 1,
  "/biographie": 0.8,
  "/ecriture": 0.8,
  "/acting": 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = Object.keys(routing.pathnames) as RoutePathname[];

  return pathnames.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ href: pathname, locale })}`,
      changeFrequency: "monthly" as const,
      priority: PRIORITIES[pathname],
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((altLocale) => [
            getHtmlLang(altLocale),
            `${SITE_URL}${getPathname({ href: pathname, locale: altLocale })}`,
          ])
        ),
      },
    }))
  );
}
