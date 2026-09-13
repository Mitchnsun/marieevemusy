import type { Locale } from "next-intl";

// The old WordPress site declared `fr-FR`/`fr_FR`, which signals French content to search
// engines and social platforms rather than Swiss content — see ticket #7. Marie-Eve Musy's
// activity is entirely Swiss, so every locale is tagged with the `-CH` region instead.
const HTML_LANG_TAGS: Record<Locale, string> = {
  fr: "fr-CH",
  en: "en-CH",
};

export function getHtmlLang(locale: Locale): string {
  return HTML_LANG_TAGS[locale];
}

export function getOgLocale(locale: Locale): string {
  return getHtmlLang(locale).replace("-", "_");
}
