import ContactCta from "@components/ContactCta";
import Hero from "@components/Hero";
import IntroBand from "@components/IntroBand";
import MediaGallery from "@components/MediaGallery";
import ShowSection from "@components/ShowSection";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import cultureMagImage from "@/public/images/journalisme/marie-eve-musy-culture-mag-one-tv.jpg";
import galerie1 from "@/public/images/journalisme/marie-eve-musy-journalisme-galerie-1.jpg";
import galerie2 from "@/public/images/journalisme/marie-eve-musy-journalisme-galerie-2.jpg";
import galerie3 from "@/public/images/journalisme/marie-eve-musy-journalisme-galerie-3.jpg";
import galerie4 from "@/public/images/journalisme/marie-eve-musy-journalisme-plateau.jpg";
import midiBasculeImage from "@/public/images/journalisme/marie-eve-musy-midi-bascule-radio-vostok.jpg";
import heroImage from "@/public/images/shared/marie-eve-musy-journaliste-geneve-portrait.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: `${t("title")} — Journalisme`,
    description: t("intro"),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const tFooter = await getTranslations("Footer");

  return (
    <>
      <Hero image={heroImage} imageAlt={t("heroAlt")} title={t("title")} />

      <IntroBand text={t("intro")} className="bg-brand-blue-muted" />

      <ShowSection
        title={t("midiBascule.title")}
        lead={t("midiBascule.lead")}
        paragraphs={t.raw("midiBascule.paragraphs") as string[]}
        note={t("midiBascule.note")}
        ctaLabel={t("midiBascule.ctaLabel")}
        ctaHref={t("midiBascule.ctaHref")}
        image={midiBasculeImage}
        imageAlt={t("midiBascule.imageAlt")}
      />

      <ShowSection
        title={t("cultureMag.title")}
        lead={t("cultureMag.lead")}
        paragraphs={t.raw("cultureMag.paragraphs") as string[]}
        ctaLabel={t("cultureMag.ctaLabel")}
        ctaHref={t("cultureMag.ctaHref")}
        image={cultureMagImage}
        imageAlt={t("cultureMag.imageAlt")}
      />

      <MediaGallery
        images={[
          { src: galerie1, alt: t("gallery.alt1") },
          { src: galerie2, alt: t("gallery.alt2") },
          { src: galerie3, alt: t("gallery.alt3") },
          { src: galerie4, alt: t("gallery.alt4") },
        ]}
      />

      <ContactCta text={tFooter("contactCta")} />
    </>
  );
}
