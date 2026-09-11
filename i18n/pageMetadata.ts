import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { getHtmlLang, getOgLocale } from "./localeTags";

export const SITE_NAME = "Marie-Eve Musy";

type RoutePathname = keyof typeof routing.pathnames;

type BuildPageMetadataParams = {
  locale: Locale;
  pathname: RoutePathname;
  title: string;
  description: string;
};

export function buildPageMetadata({ locale, pathname, title, description }: BuildPageMetadataParams): Metadata {
  const url = getPathname({ href: pathname, locale });
  // hreflang alternates use BCP 47 tags (fr-CH/en-CH), the same ones declared on <html lang>,
  // so search engines see one consistent Swiss locale signal instead of next-intl's bare codes.
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [getHtmlLang(loc), getPathname({ href: pathname, locale: loc })])
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
