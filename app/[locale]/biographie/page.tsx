import CalloutBand from "@components/CalloutBand";
import ContactCta from "@components/ContactCta";
import { SOCIAL_LINKS } from "@components/Footer";
import Hero from "@components/Hero";
import IntroBand from "@components/IntroBand";
import JsonLd from "@components/JsonLd";
import ShowSection from "@components/ShowSection";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import { buildPageMetadata, SITE_NAME } from "@/i18n/pageMetadata";
import calloutImage from "@/public/images/biographie/marie-eve-musy-animatrice-plateau-tournage.jpg";
import heroImage from "@/public/images/biographie/marie-eve-musy-biographie-portrait-metro-geneve.jpg";
import portraitImage from "@/public/images/biographie/marie-eve-musy-comedienne-portrait-studio.jpg";
import { SITE_URL } from "@/utils/siteUrl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BiographiePage.meta" });

  return buildPageMetadata({
    locale,
    pathname: "/biographie",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BiographiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BiographiePage");
  const tFooter = await getTranslations("Footer");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          url: `${SITE_URL}${getPathname({ href: "/biographie", locale })}`,
          jobTitle: ["Comédienne", "Journaliste culturelle", "Animatrice radio"],
          description: t("lead"),
          image: `${SITE_URL}${heroImage.src}`,
          address: { "@type": "PostalAddress", addressLocality: "Genève", addressCountry: "CH" },
          sameAs: SOCIAL_LINKS.map(({ href }) => href),
        }}
      />

      <Hero image={heroImage} imageAlt={t("heroAlt")} title={t("title")} objectPosition="center" />

      <IntroBand text={t("lead")} className="bg-brand-blue-muted" />

      <ShowSection paragraphs={t.raw("paragraphs") as string[]} image={portraitImage} imageAlt={t("portraitAlt")} />

      {/*
       * TODO(#3): the live site plays a scroll-in animation on the lead and paragraphs, and a
       * slight parallax on the hero portrait — animations deliberately omitted here.
       */}
      <CalloutBand
        title={t("callout.title")}
        text={t("callout.text")}
        ctaLabel={t("callout.ctaLabel")}
        ctaHref={t("callout.ctaHref")}
        image={calloutImage}
        imageAlt={t("callout.imageAlt")}
      />

      <ContactCta text={tFooter("contactCta")} />
    </>
  );
}
