import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/biographie": {
      fr: "/biographie",
      en: "/biography",
    },
    "/ecriture": {
      fr: "/ecriture",
      en: "/writing",
    },
    "/acting": "/acting",
  },
});
